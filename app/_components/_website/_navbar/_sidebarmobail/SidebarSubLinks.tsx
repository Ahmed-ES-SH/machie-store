"use client";
import React, { useState } from "react";
import { motion } from "framer-motion";
import { FaAngleLeft, FaAngleRight } from "react-icons/fa";
import {
  linksprodctdetail,
  linksshop,
  linksshoplayouts,
  linksshoppages,
} from "@/constants/constantsDetails";
interface menuprops {
  setsubmenu: React.Dispatch<React.SetStateAction<string>>;
  submenue: string;
  subtitle: string;
}
export default function SidebarSubLinks({
  setsubmenu,
  submenue,
  subtitle,
}: menuprops) {
  // states
  const [shoplist, setshoplist] = useState(false);
  const [productdetail, setproductdetail] = useState(false);
  const [shoppage, setshoppage] = useState(false);
  const [shoplayout, setshoplayout] = useState(false);

  const subMenuVariants = {
    hidden: { x: "100%", opacity: 0 },
    visible: { x: 0, opacity: 1 },
    exit: { x: "100%", opacity: 0 },
  };

  const transitionSettings = {
    type: "spring",
    stiffness: 500,
    damping: 40,
    duration: 0.3,
  };

  return (
    <>
      <div>
        {submenue && (
          <motion.ul
            key="subMenu"
            initial={
              !shoplist && !productdetail && !shoppage && !shoplayout
                ? "hidden"
                : "visible"
            }
            animate={
              !shoplist && !productdetail && !shoppage && !shoplayout
                ? "visible"
                : "hidden"
            }
            exit="exit"
            variants={subMenuVariants}
            transition={transitionSettings}
            className="absolute top-12 left-0 w-full p-4"
          >
            <li>
              <button
                onClick={() => setsubmenu("")}
                className="w-full cursor-pointer text-left py-4 text-[18px] font-semibold flex items-center gap-4"
              >
                <FaAngleLeft />
                <p>{subtitle}</p>
              </button>
            </li>

            <li
              onClick={() => setshoplist(true)}
              className="ml-8 py-2 flex items-center cursor-pointer justify-between"
            >
              <p>Shop Lists</p>
              <FaAngleRight />
            </li>
            <li
              onClick={() => setproductdetail(true)}
              className="ml-8 py-2 flex items-center cursor-pointer justify-between"
            >
              <p>Product Detail</p>
              <FaAngleRight />
            </li>
            <li
              onClick={() => setshoppage(true)}
              className="ml-8 py-2 flex items-center cursor-pointer justify-between"
            >
              <p>Shop Pages</p>
              <FaAngleRight />
            </li>
            <li
              onClick={() => setshoplayout(true)}
              className="ml-8 py-2 flex items-center cursor-pointer justify-between"
            >
              <p>Shop Layouts</p>
              <FaAngleRight />
            </li>
          </motion.ul>
        )}

        {/*// shop list links*/}
        {shoplist && (
          <motion.ul
            initial="hidden"
            animate="visible"
            exit="exit"
            variants={subMenuVariants}
            transition={transitionSettings}
            className="absolute top-12 left-0 w-full p-4"
          >
            <li className=" ">
              <button
                onClick={() => setshoplist(!shoplist)}
                className="w-full text-left py-4 text-[18px] cursor-pointer font-semibold flex items-center gap-4"
              >
                <FaAngleLeft />
                <p>Shop Lists</p>
              </button>
            </li>

            {linksshop.map((link, index) => (
              <li
                key={index}
                className="ml-8 py-2 flex items-center cursor-pointer justify-between"
              >
                <p>{link.title}</p>
              </li>
            ))}
          </motion.ul>
        )}
        {/*// productdetail list links*/}

        {productdetail && (
          <motion.ul
            initial="hidden"
            animate="visible"
            exit="exit"
            variants={subMenuVariants}
            transition={transitionSettings}
            className="absolute top-12 left-0 w-full p-4"
          >
            <li>
              <button
                onClick={() => setproductdetail(!productdetail)}
                className="w-full cursor-pointer text-left py-4 text-[18px] font-semibold flex items-center gap-4"
              >
                <FaAngleLeft />
                <p>Product Details</p>
              </button>
            </li>

            {linksprodctdetail.map((link, index) => (
              <li
                key={index}
                className="ml-8 py-2 flex items-center justify-between cursor-pointer"
              >
                <p>{link.title}</p>
              </li>
            ))}
          </motion.ul>
        )}
        {/*// shoppage list links*/}
        {shoppage && (
          <motion.ul
            initial="hidden"
            animate="visible"
            exit="exit"
            variants={subMenuVariants}
            transition={transitionSettings}
            className="absolute top-12 left-0 w-full p-4"
          >
            <li>
              <button
                onClick={() => setshoppage(!shoppage)}
                className="w-full text-left py-4 text-[18px] font-semibold flex items-center gap-4"
              >
                <FaAngleLeft />
                <p>Shop Pages</p>
              </button>
            </li>

            {linksshoppages.map((link, index) => (
              <li
                key={index}
                className="ml-8 py-2 flex items-center justify-between cursor-pointer"
              >
                <p>{link.title}</p>
              </li>
            ))}
          </motion.ul>
        )}
        {/*// shoplayout list links*/}
        {shoplayout && (
          <motion.ul
            initial="hidden"
            animate="visible"
            exit="exit"
            variants={subMenuVariants}
            transition={transitionSettings}
            className="absolute top-12 left-0 w-full p-4"
          >
            <li>
              <button
                onClick={() => setshoplayout(!shoplayout)}
                className="w-full text-left py-4 text-[18px] font-semibold flex items-center gap-4"
              >
                <FaAngleLeft />
                <p>Shop layout</p>
              </button>
            </li>

            {linksshoplayouts.map((link, index) => (
              <li
                key={index}
                className="ml-8 py-2 flex items-center justify-between cursor-pointer"
              >
                <p>{link.title}</p>
              </li>
            ))}
          </motion.ul>
        )}
      </div>
    </>
  );
}
