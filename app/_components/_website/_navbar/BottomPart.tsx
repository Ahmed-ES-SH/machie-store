import { mainlinks } from "@/constants/Links";
import Link from "next/link";
import React from "react";
import Departmentsbtn from "./Departmentsbtn";
import HoverSection from "./HoverSection";

export default function BottomPart() {
  return (
    <>
      <div className="w-full flex items-center justify-between gap-12 mt-8 relative max-xl:hidden">
        {/* All Departments */}
        <Departmentsbtn />

        {/* middle-links */}
        <div className="xl:flex-1/2 w-fit mx-auto " id="middle-links">
          <ul className="flex items-center  gap-3">
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
        <HoverSection />
      </div>
    </>
  );
}
