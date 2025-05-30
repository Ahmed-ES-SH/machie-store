"use client";
import React from "react";
import { motion } from "framer-motion";
import { AiOutlineLoading } from "react-icons/ai";
export default function Loading() {
  return (
    <>
      <div className="w-full h-screen flex items-center justify-center fixed top-0 left-0 bg-white z-[9999]">
        <motion.div
          animate={{ rotate: "360deg" }}
          transition={{ duration: 0.5, repeat: Infinity, ease: "linear" }}
        >
          <AiOutlineLoading className="size-32 text-primary-yellow" />
        </motion.div>
      </div>
    </>
  );
}
