"use client";
import React, { useState } from "react";
import { FaAngleDown, FaBars } from "react-icons/fa";
import { menuData } from "@/constants/constantsDetails";
import { AnimatePresence, motion } from "framer-motion";
import { useRouter } from "next/navigation";
import { useVariables } from "@/app/context/VariablesContext";

interface propsType {
  width: number;
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  posation: any;
}

export default function SlideLinks({ width, posation }: propsType) {
  const { setMobailMenu } = useVariables();
  const router = useRouter();

  const [open, setopen] = useState(false);

  const handleGo = (direct: string) => {
    router.push(direct);
    setMobailMenu(false);
  };

  return (
    <>
      <div className="z-[99] overflow-hidden">
        <div
          onClick={() => setopen(!open)}
          style={{ width: `${width}px` }}
          className={`flex items-center  justify-between  bg-[#eee]  cursor-pointer py-3 px-2`}
        >
          <div className="flex gap-2 items-center">
            <FaBars />
            <p className="">All Departments</p>
          </div>
          <FaAngleDown />
        </div>
        {/* //////////////////////////////////////////slide links */}
        <AnimatePresence>
          {open && (
            <motion.div
              initial={{
                height: 0,
                opacity: 0,
                visibility: "hidden",
              }}
              animate={{
                height: 584,
                opacity: 1,
                visibility: "visible",
                width: width,
                position: posation,
              }}
              exit={{
                height: 0,
                opacity: 0,
                visibility: "hidden",
              }}
              transition={{ duration: 0.5 }}
              className="slide-links bg-white overflow-hidden"
            >
              <div className="divide-y divide-gray-100">
                {menuData.map((item, index) => (
                  <div
                    onClick={() => handleGo("/shop")}
                    key={index}
                    className="flex items-center justify-between px-4 py-3 hover:bg-gray-50 cursor-pointer transition-colors duration-200"
                  >
                    <div className="flex items-center space-x-3 w-full">
                      <item.icon className="w-5 h-5 text-gray-600" />
                      <span className="text-gray-800 whitespace-nowrap font-light">
                        {item.text}
                      </span>
                      {item.badge && (
                        <span className="bg-red-500 text-white text-xs px-2 py-1 rounded-full font-bold ml-auto text-[10px] whitespace-nowrap">
                          {item.badge}
                        </span>
                      )}
                    </div>
                  </div>
                ))}
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </>
  );
}
