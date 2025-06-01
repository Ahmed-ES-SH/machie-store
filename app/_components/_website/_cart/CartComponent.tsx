"use client";
import React, { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { FiMinus, FiPlus, FiX, FiCheck } from "react-icons/fi";
import { useCartStore } from "@/app/store/CartStore";
import Img from "../../_global/Img";
import { handleCheckout } from "@/app/helpers/handleCheckout";

export default function CartComponent() {
  const { cartItems, increaseQuantity, decreaseQuantity, removeFromCart } =
    useCartStore();

  const [couponCode, setCouponCode] = useState("");
  const [appliedCoupons, setAppliedCoupons] = useState<string[]>([]);

  const applyCoupon = () => {
    if (couponCode.trim() && !appliedCoupons.includes(couponCode)) {
      setAppliedCoupons([...appliedCoupons, couponCode]);
      setCouponCode("");
    }
  };

  const removeCoupon = (coupon: string) => {
    setAppliedCoupons(appliedCoupons.filter((c) => c !== coupon));
  };

  const subtotal = cartItems.reduce(
    (sum, item) => sum + item.price * item.quantity,
    0
  );
  const total = subtotal;

  return (
    <div className="c-container p-6 bg-gray-50 min-h-screen">
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        {/* Cart Items */}
        <div className="lg:col-span-2">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="bg-white rounded-2xl shadow-xl overflow-hidden"
          >
            {/* Free Shipping Banner */}
            <div className="bg-gradient-to-r from-green-500 to-emerald-500 p-4">
              <div className="flex items-center justify-center text-white">
                <FiCheck className="mr-2" />
                <span className="font-medium">
                  Your order qualifies for free shipping!
                </span>
              </div>
              <div className="w-full bg-white/20 rounded-full h-2 mt-2">
                <div className="bg-white h-2 rounded-full w-full"></div>
              </div>
            </div>

            {/* Table Header */}
            <div className="grid grid-cols-12 gap-4 p-6 border-b border-gray-200 text-sm font-medium text-gray-600 uppercase tracking-wider">
              <div className="col-span-6">Product</div>
              <div className="col-span-2 text-center">Price</div>
              <div className="col-span-2 text-center">Quantity</div>
              <div className="col-span-2 text-center">Subtotal</div>
            </div>

            {/* Cart Items */}
            <AnimatePresence>
              <div className="w-full h-[60vh] overflow-y-auto custom-scrollbar">
                {cartItems.map((item, index) => (
                  <motion.div
                    key={item.id}
                    initial={{ opacity: 0, x: -20 }}
                    animate={{ opacity: 1, x: 0 }}
                    exit={{ opacity: 0, x: 20 }}
                    transition={{ delay: index * 0.1 }}
                    className="grid grid-cols-12 gap-4 p-6 border-b border-gray-100 hover:bg-gray-50 transition-colors group"
                  >
                    {/* Product Info */}
                    <div className="col-span-6 flex items-center space-x-4">
                      <Img
                        src={item.images[0]}
                        className="w-16 object-contain"
                      />
                      <div className="flex-1 min-w-0">
                        <h3 className="font-medium text-gray-900 truncate">
                          {item.title}
                        </h3>
                      </div>
                    </div>

                    {/* Price */}
                    <div className="col-span-2 flex items-center justify-center">
                      <span className="text-gray-600">
                        ${item.price.toFixed(2)}
                      </span>
                    </div>

                    {/* Quantity Controls */}
                    <div className="col-span-2 flex items-center justify-center">
                      <div className="flex items-center bg-gray-100 rounded-lg">
                        <motion.button
                          whileHover={{ scale: 1.1 }}
                          whileTap={{ scale: 0.9 }}
                          onClick={() => decreaseQuantity(item.id)}
                          className="p-2 hover:bg-gray-200 rounded-l-lg transition-colors"
                        >
                          <FiMinus className="w-4 h-4" />
                        </motion.button>
                        <span className="px-4 py-2 font-medium min-w-[3rem] text-center">
                          {item.quantity}
                        </span>
                        <motion.button
                          whileHover={{ scale: 1.1 }}
                          whileTap={{ scale: 0.9 }}
                          onClick={() => increaseQuantity(item.id)}
                          className="p-2 hover:bg-gray-200 rounded-r-lg transition-colors"
                        >
                          <FiPlus className="w-4 h-4" />
                        </motion.button>
                      </div>
                    </div>

                    {/* Subtotal & Remove */}
                    <div className="col-span-2 flex items-center justify-center space-x-3">
                      <span className="font-semibold text-gray-900">
                        ${(item.price * item.quantity).toFixed(2)}
                      </span>
                      <motion.button
                        whileHover={{ scale: 1.1, rotate: 90 }}
                        whileTap={{ scale: 0.9 }}
                        onClick={() => removeFromCart(item.id)}
                        className="p-1 text-gray-400 hover:text-red-500 transition-colors opacity-0 group-hover:opacity-100"
                      >
                        <FiX className="w-4 h-4" />
                      </motion.button>
                    </div>
                  </motion.div>
                ))}
              </div>
            </AnimatePresence>

            {/* Coupon Section */}
            <div className="p-6 bg-gray-50">
              <div className="flex flex-col sm:flex-row gap-3">
                <input
                  type="text"
                  placeholder="Coupon code"
                  value={couponCode}
                  onChange={(e) => setCouponCode(e.target.value)}
                  className="flex-1 px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent outline-none transition-all"
                />
                <motion.button
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                  onClick={applyCoupon}
                  className="px-6 py-3 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors font-medium"
                >
                  Apply coupon
                </motion.button>
                {appliedCoupons.length > 0 && (
                  <motion.button
                    whileHover={{ scale: 1.02 }}
                    whileTap={{ scale: 0.98 }}
                    onClick={() => setAppliedCoupons([])}
                    className="px-6 py-3 bg-red-600 text-white rounded-lg hover:bg-red-700 transition-colors font-medium"
                  >
                    Remove All
                  </motion.button>
                )}
              </div>

              {/* Applied Coupons */}
              {appliedCoupons.length > 0 && (
                <div className="mt-3 flex flex-wrap gap-2">
                  {appliedCoupons.map((coupon) => (
                    <motion.div
                      key={coupon}
                      initial={{ opacity: 0, scale: 0.8 }}
                      animate={{ opacity: 1, scale: 1 }}
                      className="flex items-center bg-green-100 text-green-800 px-3 py-1 rounded-full text-sm"
                    >
                      <span>{coupon}</span>
                      <button
                        onClick={() => removeCoupon(coupon)}
                        className="ml-2 hover:text-green-600"
                      >
                        <FiX className="w-3 h-3" />
                      </button>
                    </motion.div>
                  ))}
                </div>
              )}
            </div>
          </motion.div>
        </div>

        {/* Cart Totals */}
        <div className="lg:col-span-1">
          <motion.div
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.2 }}
            className="bg-white rounded-2xl shadow-xl p-6 sticky top-6"
          >
            <h2 className="text-xl font-bold text-gray-900 mb-6">
              CART TOTALS
            </h2>

            <div className="space-y-4">
              <div className="flex justify-between items-center">
                <span className="text-gray-600">Subtotal</span>
                <span className="font-semibold text-gray-900">
                  ${subtotal.toFixed(2)}
                </span>
              </div>

              <div className="border-t border-gray-200 pt-4">
                <div className="space-y-3">
                  <div className="flex items-center justify-between">
                    <label className="flex items-center text-gray-700">
                      <input
                        type="radio"
                        name="shipping"
                        className="mr-2 text-blue-600"
                        defaultChecked
                      />
                      Free shipping
                    </label>
                  </div>
                  <div className="flex items-center justify-between">
                    <label className="flex items-center text-gray-700">
                      <input
                        type="radio"
                        name="shipping"
                        className="mr-2 text-blue-600"
                      />
                      Local pickup
                    </label>
                  </div>
                </div>
                <div className="mt-3 text-sm text-gray-600">
                  Shipping to <span className="font-medium">NY</span>
                  <motion.button
                    whileHover={{ scale: 1.05 }}
                    className="text-blue-600 hover:text-blue-700 ml-2"
                  >
                    Change address
                  </motion.button>
                </div>
              </div>

              <div className="border-t border-gray-200 pt-4">
                <div className="flex justify-between items-center text-lg font-bold">
                  <span>Total</span>
                  <span className="text-2xl text-blue-600">
                    ${total.toFixed(2)}
                  </span>
                </div>
              </div>

              <button
                onClick={() => handleCheckout(cartItems)}
                className="w-full bg-primary-blue text-white py-4 rounded-xl font-semibold text-lg shadow-lg hover:shadow-xl hover:scale-110 hover:bg-blue-700 transition-all duration-300"
              >
                Proceed to checkout
              </button>
            </div>
          </motion.div>
        </div>
      </div>
    </div>
  );
}
