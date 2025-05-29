"use client";
import React, { useEffect, useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import Link from "next/link";
import { FaCaretRight, FaTimes } from "react-icons/fa";
import { mainlinksmobail } from "@/constants/Links";
import SidebarSubLinks from "./_sidebarmobail/SidebarSubLinks";
import SideLang from "./_sidebarmobail/SideMo";
import SlideLinks from "./_sidebarmobail/SlideLinks";
import Img from "../../_global/Img";
import { useVariables } from "@/app/context/VariablesContext";

// main component ///////////////////////////////////////////////////////////////////////

export default function MobailSideBar() {
  const { mobailMenu, setMobailMenu, width } = useVariables();
  const [submenue, setsubmenue] = useState("");

  const sidebarVariants = {
    hidden: { x: "-100%" },
    visible: { x: 0 },
    exit: { x: "-100%" },
  };

  const mainMenuVariants = {
    hidden: { x: "-100%", opacity: 0 },
    visible: { x: 0, opacity: 1 },
    exit: { x: "-100%", opacity: 0 },
  };

  const transitionSettings = {
    type: "spring",
    stiffness: 500,
    damping: 40,
    duration: 0.3,
  };

  const handleCloseMenu = () => {
    setMobailMenu(false);
  };

  useEffect(() => {
    if (width >= 1280) {
      handleCloseMenu();
    }
  }, [width]);

  return (
    <AnimatePresence>
      {mobailMenu && (
        <motion.div
          initial="hidden"
          animate="visible"
          exit="exit"
          variants={sidebarVariants}
          transition={transitionSettings}
          className="side-bar w-[320px] h-screen  bg-white fixed top-0 left-0  shadow-lg overflow-y-auto overflow-x-hidden  z-[999]"
        >
          <div className="head w-full h-[60px] bg-[#031624] p-3  flex items-center justify-between">
            <Img
              className="w-[150px] h-[35px]"
              src="/dark-logo.png"
              alt="logo"
            />
            <FaTimes
              onClick={handleCloseMenu}
              className="text-white cursor-pointer"
            />
          </div>
          <AnimatePresence>
            {submenue === "" && (
              <motion.div
                initial="hidden"
                animate="visible"
                exit="exit"
                variants={mainMenuVariants}
                transition={transitionSettings}
              >
                <div className="mt-4 flex items-center justify-center  pb-3 px-2 ">
                  <SlideLinks posation="block" width={280} />
                </div>
                {/* //////////////// main links */}
                <div className="pb-3 border-b border-gray-300">
                  <ul className="flex flex-col items-start gap-3 relative">
                    <li
                      onClick={() => setsubmenue("shop")}
                      className="cursor-pointer flex items-center  p-4 justify-between w-full pt-4 gap-3  px-4 "
                    >
                      <p>shop</p>
                      <FaCaretRight />
                    </li>
                    {mainlinksmobail.map((link, index) => (
                      <Link
                        href={link.to ? link.to : "#"}
                        key={index}
                        className="flex items-center justify-between w-full pt-4 gap-3  px-4 "
                      >
                        <p>{link.title}</p>
                        <link.icon />
                      </Link>
                    ))}
                  </ul>
                </div>
                <div className="pt-3">
                  <ul className="flex flex-col items-start gap-6 h-[20px] w-full ">
                    <li className="text-[14px]  p-2"> Order Tracking </li>
                    <li
                      onClick={() => setsubmenue("lang")}
                      className="flex flex-col w-full cursor-pointer"
                    >
                      <div className="text-[17px]  flex items-center justify-between w-full gap-2 px-2  ">
                        <p>English</p>
                        <FaCaretRight />
                      </div>
                    </li>
                    <li
                      onClick={() => setsubmenue("mo")}
                      className="flex flex-col w-full cursor-pointer"
                    >
                      <div className="text-[17px]  flex items-center justify-between  gap-2 px-3">
                        <p> USD</p>
                        <FaCaretRight />
                      </div>
                    </li>
                    <li>
                      <p className="text-xs text-gray-500 leading-relaxed p-2 pt-6 border-t border-gray-300">
                        Copyright byearl © Machic WordPress Theme. All right
                        reserved. Powered by{" "}
                        <span className="font-medium text-gray-600">
                          Ahmed Ismail
                        </span>{" "}
                      </p>
                    </li>
                  </ul>
                </div>
              </motion.div>
            )}
            {submenue === "shop" && (
              <SidebarSubLinks
                setsubmenu={setsubmenue}
                submenue={submenue}
                subtitle="Shop"
              />
            )}
            {submenue === "lang" && (
              <SideLang setsubmenu={setsubmenue} subtitle="Languages" />
            )}
            {submenue === "mo" && (
              <SideLang setsubmenu={setsubmenue} subtitle="Currency" />
            )}
          </AnimatePresence>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
