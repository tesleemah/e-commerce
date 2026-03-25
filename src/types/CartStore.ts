import { create } from "zustand";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { CartItem, Product } from "../types";
import { createJSONStorage, persist } from "zustand/middleware";

type CartStore = {
  cartItems: CartItem[];
  addToCart: (product: Product, quantity: number) => void;
  removeFromCart: (productId: number) => void;
  increaseQty: (productId: number) => void;
  decreaseQty: (productId: number) => void;
  clearCart: () => void;
  cartTotal: () => number;
  cartCount: () => number;
  loadCart?: () => Promise<void>;
  saveCart?: (items: CartItem[]) => Promise<void>;
};
//creating the store
export const useCartStore = create<CartStore>()(
  persist(
    (set, get) => ({
      cartItems: [],

      addToCart: (product, quantity) => {
        const existing = get().cartItems.find((item) => item.id === product.id);
        if (existing) {
          set((state) => ({
            cartItems: state.cartItems.map((item) =>
              item.id === product.id
                ? { ...item, quantity: item.quantity + quantity }
                : item,
            ),
          }));
        } else {
          set((state) => ({
            cartItems: [...state.cartItems, { ...product, quantity }],
          }));
        }
      },

      removeFromCart: (productId) => {
        set((state) => ({
          cartItems: state.cartItems.filter((item) => item.id !== productId),
        }));
      },

      increaseQty: (productId) => {
        set((state) => ({
          cartItems: state.cartItems.map((item) =>
            item.id === productId
              ? { ...item, quantity: item.quantity + 1 }
              : item,
          ),
        }));
      },

      decreaseQty: (productId) => {
        set((state) => ({
          cartItems: state.cartItems.map((item) =>
            item.id === productId
              ? { ...item, quantity: Math.max(1, item.quantity - 1) }
              : item,
          ),
        }));
      },

      clearCart: () => set({ cartItems: [] }),

      // getter functions — not state, computed from cartItems
      cartTotal: () => {
        return get().cartItems.reduce(
          (sum, item) => sum + item.price * item.quantity,
          0,
        );
      },

      cartCount: () => {
        return get().cartItems.reduce((sum, item) => sum + item.quantity, 0);
      },
    }),

    {
      name: "cart-storage",
      storage: createJSONStorage(() => AsyncStorage),
    },
  ),
);
