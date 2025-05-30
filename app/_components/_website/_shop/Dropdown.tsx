"use client";
import React, { useEffect, useRef } from "react";
import { motion, AnimatePresence } from "framer-motion";

interface Props {
  lines: string[];
  isOpen: boolean;
  onClose: () => void;
}

export default function Dropdown({ lines, isOpen, onClose }: Props) {
  const dropdownRef = useRef<HTMLUListElement>(null);

  // إغلاق عند الضغط خارج العنصر
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (
        dropdownRef.current &&
        !dropdownRef.current.contains(event.target as Node)
      ) {
        onClose();
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, [onClose]);

  return (
    <AnimatePresence>
      {isOpen && (
        <motion.ul
          ref={dropdownRef}
          initial={{ opacity: 0, y: -10, scale: 0.95 }}
          animate={{ opacity: 1, y: 0, scale: 1 }}
          exit={{ opacity: 0, y: -10, scale: 0.95 }}
          transition={{ duration: 0.2 }}
          className="absolute z-[999] top-8 right-2 w-fit h-fit px-2 py-2 bg-white border border-gray-200 rounded-md shadow-sm"
        >
          {lines.map((line: string, index: number) => (
            <li
              key={index}
              className="py-2 px-1 whitespace-nowrap cursor-pointer hover:bg-sky-500 hover:text-white rounded-sm duration-200"
            >
              {line}
            </li>
          ))}
        </motion.ul>
      )}
    </AnimatePresence>
  );
}
