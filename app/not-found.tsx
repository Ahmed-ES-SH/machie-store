"use client";
import React from "react";
import { motion } from "framer-motion";
import { FaHome } from "react-icons/fa";
import Img from "./_components/_global/Img";
import Link from "next/link";

export default function NotFound() {
  return (
    <motion.div
      className="flex flex-col items-center justify-center min-h-screen bg-white px-4"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.5 }}
    >
      {/* Logo Placeholder */}
      <div className="mb-8">
        <Img
          src="/path-to-logo.png"
          alt="Logo"
          className="h-16 w-auto mx-auto"
        />
      </div>

      {/* Animated 404 Text */}
      <motion.h1
        className="text-6xl font-bold text-[#0070DC] mb-4"
        initial={{ y: -20, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ duration: 0.6 }}
      >
        404
      </motion.h1>

      {/* Animated “Page Not Found” Subtitle */}
      <motion.p
        className="text-xl text-gray-700 mb-8"
        initial={{ y: 20, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ duration: 0.6, delay: 0.2 }}
      >
        Page Not Found
      </motion.p>

      {/* Decorative Icon */}
      <motion.div
        className="text-[#FACC15] text-8xl mb-8"
        initial={{ scale: 0 }}
        animate={{ scale: 1 }}
        transition={{ type: "spring", stiffness: 120, delay: 0.4 }}
      >
        <FaHome />
      </motion.div>

      {/* “Go Home” Button */}
      <motion.div
        className="flex items-center justify-center bg-[#0070DC] hover:bg-[#FACC15] text-white font-medium py-3 px-6 rounded-lg shadow-lg transition-colors"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.6, delay: 0.6 }}
      >
        <Link href={"/"} className="flex items-center space-x-2">
          <FaHome className="w-5 h-5" />
          <span>Go Home</span>
        </Link>
      </motion.div>
    </motion.div>
  );
}
