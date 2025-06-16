import { toast } from "sonner";
import { create } from "zustand";
import { persist, createJSONStorage } from "zustand/middleware";
import { ProductType } from "../types/productType";

interface CartState {
  cartItems: ProductType[];
  addToCart: (item: ProductType) => void;
  removeFromCart: (id: number) => void;
  increaseQuantity: (product: ProductType) => void;
  decreaseQuantity: (id: number) => void;
  clearCart: () => void;
}

export const useCartStore = create<CartState>()(
  persist(
    (set, get) => ({
      cartItems: [],

      addToCart: (item) => {
        const existingItem = get().cartItems.find((i) => i.id === item.id);
        if (existingItem) {
          toast.warning("Item already in cart!");
        } else {
          set((state) => ({
            cartItems: [...state.cartItems, { ...item, quantity: 1 }],
          }));
          toast.success("Item added to cart!");
        }
      },

      removeFromCart: (id) => {
        set((state) => ({
          cartItems: state.cartItems.filter((i) => i.id !== id),
        }));
        toast.info("Item removed from cart.");
      },

      increaseQuantity: (product) => {
        set((state) => {
          const exists = state.cartItems.find((item) => item.id === product.id);

          if (exists) {
            return {
              cartItems: state.cartItems.map((item) =>
                item.id === product.id
                  ? { ...item, quantity: item.quantity + 1 }
                  : item
              ),
            };
          } else {
            toast.success("Item added to cart!");
            return {
              cartItems: [...state.cartItems, { ...product, quantity: 2 }],
            };
          }
        });
      },

      decreaseQuantity: (id) => {
        set((state) => ({
          cartItems: state.cartItems.map((i) =>
            i.id === id && i.quantity > 1
              ? { ...i, quantity: i.quantity - 1 }
              : i
          ),
        }));
      },

      clearCart: () => {
        set({ cartItems: [] });
        toast.info("Cart cleared.");
      },
    }),
    {
      name: "cart-storage",
      storage: createJSONStorage(() => localStorage),
    }
  )
);
