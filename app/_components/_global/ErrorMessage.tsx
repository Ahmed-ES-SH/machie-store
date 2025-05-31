"use client";
import React from "react";
import { MdErrorOutline } from "react-icons/md";
import { motion, AnimatePresence } from "framer-motion";
import { FaTimes } from "react-icons/fa";

interface props {
  Message: string;
  isOpen: boolean;
  onClose: () => void;
}

export default function ErrorMessage({ Message, isOpen, onClose }: props) {
  return (
    <AnimatePresence>
      {isOpen && (
        <motion.div
          initial={{ y: -200, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          exit={{ y: -200, opacity: 0 }}
          transition={{ duration: 0.5 }}
          className="w-full h-screen fixed top-0 left-0 z-[999] flex items-center justify-center bg-black/50 backdrop-blur-md"
        >
          <div className="xl:w-1/2 lg:w-3/4 w-[95%] bg-white py-12 px-4 flex items-center justify-center rounded-lg shadow-lg relative">
            <FaTimes
              onClick={onClose}
              className="text-red-300 hover:text-red-600 hover:scale-110 duration-300 cursor-pointer absolute top-2 right-2"
            />
            <div className="flex flex-col items-center gap-4">
              <MdErrorOutline className="text-red-400 size-14" />
              <p className="text-icon-color text-lg text-center">{Message}</p>
            </div>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
