"use client";
import React, { useState } from "react";
import { IoIosArrowDown } from "react-icons/io";
import { motion, AnimatePresence } from "framer-motion";

type categoryType = {
  name: string;
  slug: string;
  url: string;
};

interface Props {
  data: categoryType[] | null;
}

export default function Categories({ data }: Props) {
  const [currentCategory, setCurrentCategory] = useState("All");
  const [isOpen, setIsOpen] = useState(false);

  const toggleDropdown = () => {
    setIsOpen((prev) => !prev);
  };

  const handleSelect = (categoryName: string) => {
    setCurrentCategory(categoryName);
    setIsOpen(false);
  };

  return (
    <div className="relative inline-block">
      <div
        className="flex items-center gap-2 border-r border-gray-300 h-full p-2 cursor-pointer select-none"
        onClick={toggleDropdown}
      >
        <p className="whitespace-nowrap">{currentCategory}</p>
        <IoIosArrowDown />
      </div>

      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -10 }}
            transition={{ duration: 0.3 }}
            className="absolute left-0 top-full mt-1 bg-white shadow-md rounded z-50 w-max max-h-60 overflow-y-auto custom-scrollbar"
          >
            <p
              className="px-4 py-2 hover:bg-gray-200 cursor-pointer whitespace-nowrap"
              onClick={() => handleSelect("All")}
            >
              All
            </p>
            {data &&
              data.slice(0, 15).map((cat) => (
                <p
                  key={cat.slug}
                  className="px-4 py-2 hover:bg-gray-200 cursor-pointer whitespace-nowrap"
                  onClick={() => handleSelect(cat.name)}
                >
                  {cat.name}
                </p>
              ))}
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
