import { create } from "zustand";
import { persist, createJSONStorage } from "zustand/middleware";
import { toast } from "sonner";
import { ProductType } from "../types/productType";

type WishlistState = {
  wishlistItems: ProductType[];
  addToWishlist: (product: ProductType) => void;
  removeFromWishlist: (productId: number) => void;
  isInWishlist: (productId: number) => boolean;
  clearWishlist: () => void;
};

export const useWishlistStore = create<WishlistState>()(
  persist(
    (set, get) => ({
      wishlistItems: [],

      addToWishlist: (product) => {
        const exists = get().wishlistItems.some(
          (item) => item.id === product.id
        );
        if (exists) {
          toast.info("This product is already in your wishlist.");
          return;
        }

        set((state) => ({
          wishlistItems: [...state.wishlistItems, product],
        }));

        toast.success("Added to wishlist.");
      },

      removeFromWishlist: (productId) => {
        set((state) => ({
          wishlistItems: state.wishlistItems.filter(
            (item) => item.id !== productId
          ),
        }));

        toast.warning("Removed from wishlist.");
      },

      isInWishlist: (productId) => {
        return get().wishlistItems.some((item) => item.id === productId);
      },

      clearWishlist: () => {
        set({ wishlistItems: [] });
        toast.info("Wishlist cleared.");
      },
    }),
    {
      name: "wishlist-storage",
      storage: createJSONStorage(() => localStorage),
    }
  )
);
