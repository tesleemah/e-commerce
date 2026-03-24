import {
  useContext,
  useState,
  useEffect,
  ReactNode,
  createContext,
} from "react";
import { User } from "../types";
import { saveSecure, getSecure, deleteSecure } from "../utils/storage";

type AuthContextType = {
  user: User | null;
  token: string | null;
  isLoading: boolean;
  login: (user: User, token: string) => Promise<void>;
  logout: () => Promise<void>;
  updateUser: (updatedUser: User) => Promise<void>;
};

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const useAuth = (): AuthContextType => {
  const auth = useContext(AuthContext);
  if (!auth) {
    throw Error("useAuth must be used within a AuthProvider");
  }
  return auth;
};

export const AuthProvider = (props: { children: ReactNode }) => {
  const [user, setUser] = useState<User | null>(null);
  const [token, setToken] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  useEffect(() => {
    const loadAuthState = async () => {
      try {
        const stored_token = await getSecure("auth_token");
        if (stored_token !== null) {
          const storedUser = await getSecure("auth_user");
          if (storedUser !== null) {
            setUser(JSON.parse(storedUser));
            setToken(stored_token);
          }
        }
      } catch (error) {
        console.error("Error loading auth State", error);
      } finally {
        setIsLoading(false);
      }
    };
    loadAuthState();
  }, []);
  const login = async (userData: User, authToken: string) => {
    try {
      await saveSecure("auth_token", authToken);
      await saveSecure("auth_user", JSON.stringify(userData));
      setUser(userData);
      setToken(authToken);
    } catch (error) {
      throw error;
    }
  };
  const logout = async () => {
    try {
      await deleteSecure("auth_token");
      await deleteSecure("auth_user");
      setUser(null);
      setToken(null);
    } catch (error) {
      throw error;
    }
  };
  const updateUser = async (updatedUser: User) => {
    try {
      await saveSecure("auth_user", JSON.stringify(updatedUser));
      setUser(updatedUser);
    } catch (error) {
      console.error("Error updating user", error);
    }
  };
  return (
    <AuthContext.Provider
      value={{ login, logout, user, token, isLoading, updateUser }}
    >
      {props.children}
    </AuthContext.Provider>
  );
};
