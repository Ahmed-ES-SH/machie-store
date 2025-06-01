"use client";

import { useCartStore } from "@/app/store/CartStore";
import React, { useRef, useState } from "react";
import { BsMinecart } from "react-icons/bs";
import { motion, AnimatePresence } from "framer-motion";
import { useRouter } from "next/navigation";
import Img from "../../_global/Img";
import { FaTimes } from "react-icons/fa";
import { TbShoppingCartX } from "react-icons/tb";
import { handleCheckout } from "@/app/helpers/handleCheckout";

export default function CartProducts() {
  const { cartItems, removeFromCart } = useCartStore();
  const timeoutRef = useRef<NodeJS.Timeout | null>(null);

  const [showMiniCart, setShowMiniCart] = useState(false);
  const router = useRouter();

  const handleMouseEnter = () => {
    if (timeoutRef.current) {
      clearTimeout(timeoutRef.current);
      timeoutRef.current = null;
    }
    setShowMiniCart(true);
  };

  const handleMouseLeave = () => {
    timeoutRef.current = setTimeout(() => {
      setShowMiniCart(false);
    }, 100);
  };

  const totalPrice = cartItems.reduce((acc, item) => {
    return acc + item.price * item.quantity;
  }, 0);

  return (
    <div
      className="relative"
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
    >
      {/* Cart Icon and Summary */}
      <div className="flex items-center gap-4 cursor-pointer">
        <div className="relative">
          <BsMinecart className="size-7 text-icon-color" />
          {cartItems.length > 0 && (
            <div className="w-4 h-4 absolute -top-1 -right-2 bg-primary-yellow flex items-center justify-center text-gray-950 text-[10px] font-bold rounded-full">
              {cartItems.length}
            </div>
          )}
        </div>
        <div className="flex flex-col items-start">
          <p className="text-[11px] text-icon-color">Total</p>
          <p className="text-[15px] font-semibold">${totalPrice.toFixed(2)}</p>
        </div>
      </div>

      {/* Mini Cart */}
      <AnimatePresence>
        {showMiniCart && (
          <motion.div
            initial={{ opacity: 0, y: -10, scale: 0.95 }}
            animate={{ opacity: 1, y: 0, scale: 1.02 }}
            exit={{ opacity: 0, y: -10, scale: 0.95 }}
            transition={{ duration: 0.25, ease: "easeInOut" }}
            className="absolute right-0  mt-4 w-[340px] bg-white shadow-2xl rounded-xl p-4 space-y-3 z-[99999]"
          >
            <h4 className="text-lg font-semibold text-gray-800">Cart Items</h4>

            {cartItems.length === 0 ? (
              <div className="h-60 flex items-center justify-center">
                <div className="flex flex-col items-center gap-2">
                  <TbShoppingCartX className="size-12 text-icon-color" />
                  <p className="text-sm text-gray-500">Your cart is empty.</p>
                </div>
              </div>
            ) : (
              <div className="max-h-72 overflow-y-auto hidden-scrollbar space-y-3  pr-1">
                {cartItems.map((item) => (
                  <div
                    key={item.id}
                    className="flex items-center gap-3 relative not-last:border-b border-gray-200 pb-2"
                  >
                    <div
                      onClick={() => removeFromCart(item.id)}
                      className="group w-4 h-4 cursor-pointer absolute top-0 right-0 rounded-full  bg-gray-200 hover:bg-gray-400 hover:scale-110 duration-300 flex items-center justify-center"
                    >
                      <FaTimes className="size-3 text-icon-color group-hover:text-white duration-300" />
                    </div>
                    <Img
                      src={item.images[0]}
                      alt={item.title}
                      className="w-14 h-14 object-cover rounded-md"
                    />
                    <div className="flex-1">
                      <p className="text-sm font-medium ">{item.title}</p>
                      <p className="text-xs text-gray-500">
                        {item.quantity} × ${item.price}
                      </p>
                    </div>
                    <p className="text-sm mt-2 font-semibold text-gray-800">
                      ${(item.price * item.quantity).toFixed(2)}
                    </p>
                  </div>
                ))}
              </div>
            )}

            {/* Total & Actions */}
            <div className="border-t border-gray-200 pt-3 space-y-2">
              <div className="flex justify-between text-sm my-3">
                <span className="text-gray-600">Total</span>
                <span className="font-bold text-lg text-primary-blue ">
                  ${totalPrice.toFixed(2)}
                </span>
              </div>
              <div className="flex flex-col items-center w-full  gap-2">
                <button
                  onClick={() => router.push("/cart")}
                  className="flex-1 w-full py-2 text-sm font-medium bg-gray-100 hover:bg-gray-200 text-gray-800 rounded-lg transition"
                >
                  View Cart
                </button>
                <button
                  onClick={() => handleCheckout(cartItems)}
                  className="flex-1 w-full py-2 text-sm font-medium bg-primary-yellow hover:bg-yellow-300 text-white rounded-lg transition"
                >
                  Checkout
                </button>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
