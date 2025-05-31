"use client";
import { useData } from "@/app/context/DataContext";
import { AnimatePresence, motion } from "framer-motion";
import React, { useRef, useState } from "react";
import { FaPercent } from "react-icons/fa";
import { IoIosArrowDown } from "react-icons/io";
import MiniProductCard from "../_products/MiniProductCard";

export default function HoverSection() {
  const { randomProducts } = useData();

  const [isOpen, setIsOpen] = useState(false);
  const timeoutRef = useRef<NodeJS.Timeout | null>(null);

  const handleMouseEnter = () => {
    if (timeoutRef.current) {
      clearTimeout(timeoutRef.current);
      timeoutRef.current = null;
    }
    setIsOpen(true);
  };

  const handleMouseLeave = () => {
    timeoutRef.current = setTimeout(() => {
      setIsOpen(false);
    }, 200);
  };

  return (
    <div
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
      className="relative z-[9999] max-2xl:hidden"
    >
      {/* Trigger */}
      <div className="flex items-center gap-3 cursor-pointer">
        <div className="flex items-center justify-center w-[25px] h-[25px] rounded-full bg-red-500 border-white border border-dashed">
          <FaPercent className="text-white size-3" />
        </div>
        <div className="content text-[12px]">
          <p className="font-thin text-gray-400 whitespace-nowrap">
            Only this weekend
          </p>
          <h1 className="whitespace-nowrap">Super Discount</h1>
        </div>
        <IoIosArrowDown />
      </div>

      {/* Dropdown */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            key="product-dropdown"
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            transition={{ duration: 0.3 }}
            className="c-container bg-white px-4 py-2 fixed top-[21.5%] left-1/2 -translate-x-1/2 border border-gray-200 rounded-sm shadow-xl z-[999]"
          >
            {/* texts */}
            <div className="flex flex-col gap-1 items-start">
              <h1 className="font-bold">Items on sale this week</h1>
              <p className="text-[14px] text-icon-color">
                Top picks this week. Up to 50% off the best selling products.
              </p>
            </div>
            {/* products */}
            <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-6 gap-4 mt-4 items-center justify-items-center w-full">
              {randomProducts?.map((product) => (
                <MiniProductCard product={product} key={product?.id} />
              ))}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
