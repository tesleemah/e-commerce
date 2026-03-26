import React, {
  createContext,
  useContext,
  useReducer,
  useEffect,
  ReactNode,
} from "react";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { Product } from "../types";

interface WishlistState {
  wishlistItems: Product[];
}

type WishlistAction =
  | { type: "ADD_TO_WISHLIST"; payload: Product }
  | { type: "REMOVE_FROM_WISHLIST"; payload: number }
  | { type: "SET_WISHLIST"; payload: Product[] };

interface WishlistContextType {
  wishlistItems: Product[];
  addToWishlist: (product: Product) => void;
  removeFromWishlist: (id: number) => void;
  isWishlisted: (id: number) => boolean;
}

const WishlistContext = createContext<WishlistContextType | undefined>(
  undefined,
);

const wishlistReducer = (
  state: WishlistState,
  action: WishlistAction,
): WishlistState => {
  switch (action.type) {
    case "ADD_TO_WISHLIST":
      return {
        ...state,
        wishlistItems: [...state.wishlistItems, action.payload],
      };
    case "REMOVE_FROM_WISHLIST":
      return {
        ...state,
        wishlistItems: state.wishlistItems.filter(
          (item) => item.id !== action.payload,
        ),
      };
    case "SET_WISHLIST":
      return { ...state, wishlistItems: action.payload };
    default:
      return state;
  }
};

export const WishlistProvider = ({ children }: { children: ReactNode }) => {
  const [state, dispatch] = useReducer(wishlistReducer, { wishlistItems: [] });

  useEffect(() => {
    const loadWishlist = async () => {
      const saved = await AsyncStorage.getItem("@wishlist");
      if (saved) dispatch({ type: "SET_WISHLIST", payload: JSON.parse(saved) });
    };
    loadWishlist();
  }, []);

  useEffect(() => {
    AsyncStorage.setItem("@wishlist", JSON.stringify(state.wishlistItems));
  }, [state.wishlistItems]);

  const addToWishlist = (product: Product) =>
    dispatch({ type: "ADD_TO_WISHLIST", payload: product });
  const removeFromWishlist = (id: number) =>
    dispatch({ type: "REMOVE_FROM_WISHLIST", payload: id });
  const isWishlisted = (id: number) =>
    state.wishlistItems.some((item) => item.id === id);

  return (
    <WishlistContext.Provider
      value={{
        wishlistItems: state.wishlistItems,
        addToWishlist,
        removeFromWishlist,
        isWishlisted,
      }}
    >
      {children}
    </WishlistContext.Provider>
  );
};

export const useWishlist = () => {
  const context = useContext(WishlistContext);
  if (!context)
    throw new Error("useWishlist must be used within a WishlistProvider");
  return context;
};
