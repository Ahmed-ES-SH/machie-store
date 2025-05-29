"use client";
import React, { useState, useRef } from "react";
import { IoIosArrowDown } from "react-icons/io";
import { motion, AnimatePresence } from "framer-motion";

interface props {
  options: string[];
}

export default function MiniDrop({ options }: props) {
  const [currentLanguage, setCurrentLanguage] = useState(options[0]);
  const [isOpen, setIsOpen] = useState(false);
  const timeoutRef = useRef<NodeJS.Timeout | null>(null);

  const handleChoose = (lang: string) => {
    setCurrentLanguage(lang);
    setIsOpen(false);
  };

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
    }, 100);
  };

  return (
    <div
      className="relative inline-block w-[85px]"
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
    >
      <div className="text-[14px] flex items-center gap-2 px-2 cursor-pointer select-none">
        <p>{currentLanguage}</p>
        <IoIosArrowDown />
      </div>

      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -10 }}
            transition={{ duration: 0.3 }}
            className="absolute left-0 top-full mt-1 w-max bg-[#eee] rounded shadow-lg z-50"
          >
            {options.map((option, index) => (
              <p
                key={index}
                onClick={() => handleChoose(option)}
                className="font-light cursor-pointer px-3 py-1 hover:bg-gray-300 whitespace-nowrap"
              >
                {option}
              </p>
            ))}
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
