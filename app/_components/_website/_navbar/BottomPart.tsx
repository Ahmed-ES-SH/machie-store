import { mainlinks } from "@/constants/Links";
import Link from "next/link";
import React from "react";
import ShopHover from "./ShopHover";
import { IoIosArrowDown } from "react-icons/io";
import { FaPercent } from "react-icons/fa";
import Departmentsbtn from "./Departmentsbtn";

export default function BottomPart() {
  return (
    <>
      <div className="w-full flex items-center justify-between gap-12 mt-8 relative max-xl:hidden">
        {/* All Departments */}
        <Departmentsbtn />

        {/* middle-links */}
        <div className="xl:flex-1/2 w-fit mx-auto " id="middle-links">
          <ul className="flex items-center  gap-3">
            <li className="flex items-center  gap-3  px-4 group cursor-pointer ">
              <p className="text-gray-700 group-hover:text-primary-blue duration-200">
                Shop
              </p>
              <IoIosArrowDown className="text-icon-color group-hover:text-black duration-200" />
              {/* ShopHover   */}
              <ShopHover />
              {/* ////////////////////////// */}
            </li>
            {mainlinks.map((link, index) => (
              <Link
                href={link.to ? link.to : "#"}
                key={index}
                className="flex items-center gap-3 px-4 cursor-pointer group"
              >
                <p className="text-gray-700 group-hover:text-primary-blue whitespace-nowrap duration-200">
                  {link.title}
                </p>
                <link.icon className="text-icon-color group-hover:text-black duration-200 size-5" />
              </Link>
            ))}
          </ul>
        </div>

        {/* //////////////////// right element */}
        <div className="flex items-center gap-3 max-2xl:hidden">
          <div className=" flex items-center justify-center w-[25px] h-[25px] rounded-full bg-red-500 border-white border border-dashed ">
            <FaPercent className="text-white size-3" />
          </div>
          <div className="content text-[12px]">
            <p className="font-thin text-gray-400 whitespace-nowrap">
              Only this weekend
            </p>
            <h1 className="whitespace-nowrap">Super Discount</h1>
          </div>
          <IoIosArrowDown />
        </div>
      </div>
    </>
  );
}
