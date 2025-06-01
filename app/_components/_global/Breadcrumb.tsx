"use client";
import React from "react";
import { usePathname } from "next/navigation";
import { FiChevronRight } from "react-icons/fi";
import { motion } from "framer-motion";
import Link from "next/link";

export default function Breadcrumb() {
  const pathname = usePathname();

  const segments = pathname.split("/").filter((segment) => segment !== "");

  const paths = segments.map((segment, index) => {
    return {
      name: decodeURIComponent(segment.replace(/-/g, " ")), // تنسيق الاسم
      href: "/" + segments.slice(0, index + 1).join("/"),
    };
  });

  return (
    <nav className="w-full py-4 px-6 bg-gray-50 rounded-md mt-2">
      <ul className="flex items-center gap-2 text-sm text-gray-600">
        <motion.li
          initial={{ opacity: 0, y: -5 }}
          animate={{ opacity: 1, y: 0 }}
          className="flex items-center gap-2"
        >
          <Link href="/" className="hover:text-primary-blue">
            Home
          </Link>
          {paths.length > 0 && <FiChevronRight className="text-gray-400" />}
        </motion.li>

        {paths.map((path, index) => {
          const isLast = index === paths.length - 1;
          return (
            <motion.li
              key={index}
              initial={{ opacity: 0, y: -5 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: (index + 1) * 0.1 }}
              className="flex items-center gap-2"
            >
              {!isLast ? (
                <>
                  <Link
                    href={path.href}
                    className="hover:text-primary-blue transition-colors duration-200 capitalize"
                  >
                    {path.name}
                  </Link>
                  <FiChevronRight className="text-gray-400" />
                </>
              ) : (
                <span className="font-semibold text-gray-800 capitalize">
                  {path.name}
                </span>
              )}
            </motion.li>
          );
        })}
      </ul>
    </nav>
  );
}
