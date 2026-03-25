import { create } from "zustand";
import { persist, createJSONStorage } from "zustand/middleware";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { CartItem, Product } from "../types";

type CartStore = {
  cartItems: CartItem[];
  addToCart: (product: Product, quantity: number) => void;
  removeFromCart: (productId: number) => void;
  increaseQty: (productId: number) => void;
  decreaseQty: (productId: number) => void;
  clearCart: () => void;
  cartTotal: () => number;
  cartCount: () => number;
};

export const useCartStore = create<CartStore>()(
  persist(
    (set, get) => ({
      cartItems: [],

      // Add product to cart — if exists increase qty, if not add new item
      addToCart: (product: Product, quantity: number) => {
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

      // Remove item from cart by product id
      removeFromCart: (productId: number) => {
        set((state) => ({
          cartItems: state.cartItems.filter((item) => item.id !== productId),
        }));
      },

      // Increase quantity of a specific item by 1
      increaseQty: (productId: number) => {
        set((state) => ({
          cartItems: state.cartItems.map((item) =>
            item.id === productId
              ? { ...item, quantity: item.quantity + 1 }
              : item,
          ),
        }));
      },

      // Decrease quantity — never goes below 1
      decreaseQty: (productId: number) => {
        set((state) => ({
          cartItems: state.cartItems.map((item) =>
            item.id === productId
              ? { ...item, quantity: Math.max(1, item.quantity - 1) }
              : item,
          ),
        }));
      },

      // Clear all items from cart
      clearCart: () => set({ cartItems: [] }),

      // Compute total price of all items in cart
      // Uses get() to access latest cartItems state
      cartTotal: () => {
        return get().cartItems.reduce(
          (sum, item) => sum + item.price * item.quantity,
          0,
        );
      },

      // Compute total number of items in cart
      // Uses get() to access latest cartItems state
      cartCount: () => {
        return get().cartItems.reduce((sum, item) => sum + item.quantity, 0);
      },
    }),
    {
      // Key used to save cart in AsyncStorage
      name: "cart-storage",

      // Tell persist to use AsyncStorage as the storage engine
      storage: createJSONStorage(() => AsyncStorage),

      // Only persist cartItems — not the functions
      partialize: (state) => ({ cartItems: state.cartItems }),
    },
  ),
);
