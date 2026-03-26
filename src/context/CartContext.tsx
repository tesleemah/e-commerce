import React, {
  createContext,
  useContext,
  useReducer,
  useEffect,
  ReactNode,
  useState,
} from "react";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { CartItems, Product } from "../types";

// 1. Define the Storage Key
const CART_STORAGE_KEY = "@shopping_cart_data";

interface CartState {
  cartItems: CartItems[];
}

type CartAction =
  | { type: "ADD_TO_CART"; payload: { product: Product; quantity: number } }
  | { type: "REMOVE_FROM_CART"; payload: number }
  | { type: "INCREASE_QTY"; payload: number }
  | { type: "DECREASE_QTY"; payload: number }
  | { type: "CLEAR_CART" }
  | { type: "HYDRATE_CART"; payload: CartItems[] }; // New action for loading saved data

const initialState: CartState = {
  cartItems: [],
};

const cartReducer = (state: CartState, action: CartAction): CartState => {
  switch (action.type) {
    case "HYDRATE_CART":
      return { ...state, cartItems: action.payload };

    case "ADD_TO_CART":
      const existingItem = state.cartItems.find(
        (item) => item.id === action.payload.product.id,
      );
      if (existingItem) {
        return {
          ...state,
          cartItems: state.cartItems.map((item) =>
            item.id === action.payload.product.id
              ? { ...item, quantity: item.quantity + action.payload.quantity }
              : item,
          ),
        };
      }
      return {
        ...state,
        cartItems: [
          ...state.cartItems,
          { ...action.payload.product, quantity: action.payload.quantity },
        ],
      };

    case "REMOVE_FROM_CART":
      return {
        ...state,
        cartItems: state.cartItems.filter((item) => item.id !== action.payload),
      };

    case "INCREASE_QTY":
      return {
        ...state,
        cartItems: state.cartItems.map((item) =>
          item.id === action.payload
            ? { ...item, quantity: item.quantity + 1 }
            : item,
        ),
      };

    case "DECREASE_QTY":
      return {
        ...state,
        cartItems: state.cartItems.map((item) =>
          item.id === action.payload
            ? { ...item, quantity: Math.max(1, item.quantity - 1) }
            : item,
        ),
      };

    case "CLEAR_CART":
      return initialState;

    default:
      return state;
  }
};

const CartContext = createContext<
  | {
      state: CartState;
      dispatch: React.Dispatch<CartAction>;
    }
  | undefined
>(undefined);

export const CartProvider = ({ children }: { children: ReactNode }) => {
  const [state, dispatch] = useReducer(cartReducer, initialState);

  // 2. LOAD DATA
  useEffect(() => {
    const loadCart = async () => {
      try {
        const savedCart = await AsyncStorage.getItem(CART_STORAGE_KEY);
        if (savedCart) {
          dispatch({ type: "HYDRATE_CART", payload: JSON.parse(savedCart) });
        }
      } catch (e) {
        console.error("Failed to load cart", e);
      }
    };
    loadCart();
  }, []);

  // 3. SAVE DATA
  useEffect(() => {
    const saveCart = async () => {
      try {
        await AsyncStorage.setItem(
          CART_STORAGE_KEY,
          JSON.stringify(state.cartItems),
        );
      } catch (e) {
        console.error("Failed to save cart", e);
      }
    };
    saveCart();
  }, [state.cartItems]);

  return (
    <CartContext.Provider value={{ state, dispatch }}>
      {children}
    </CartContext.Provider>
  );
};

export const useCart = () => {
  const context = useContext(CartContext);
  if (!context) throw new Error("useCart must be used within a CartProvider");
  return context;
};
