"use client";
import React from "react";
import Dropdown from "./Dropdown";
import { BsArrowDown } from "react-icons/bs";
import { LuLayoutDashboard } from "react-icons/lu";
import { LiaStackExchange } from "react-icons/lia";
import { useVariables } from "@/app/context/VariablesContext";

function toggleSortDropdown(
  openDropdown: string,
  setOpenDropdown: (val: string) => void
) {
  setOpenDropdown(openDropdown == "" ? "sort" : "");
}

function toggleShowingDropdown(
  openDropdown: string,
  setOpenDropdown: (val: string) => void
) {
  setOpenDropdown(openDropdown == "" ? "showing" : "");
}

export default function HeadPage() {
  const sortLines = [
    "Sort by popularity",
    "Sort by average rating",
    "Sort by latest",
    "Sort by price : low to high",
    "Sort by price : hight to low",
  ];

  const showing = ["16 items", "32 items", "48 items", "64 items"];

  const { openDropdown, setOpenDropdown } = useVariables();

  return (
    <>
      <div className="mt-4 flex items-center justify-between w-full border-b border-gray-200 pb-3">
        <p className="text-[13px] max-md:hidden">showing 1–16 of 17 results</p>
        <div className="flex items-center gap-3 text-[13px]">
          <div className="border-r relative">
            <div
              onClick={() => toggleSortDropdown(openDropdown, setOpenDropdown)}
              className="flex items-center gap-3 cursor-pointer hover:text-primary-blue duration-300"
            >
              <p className="whitespace-normal">Sort by Latest</p>
              <BsArrowDown className="text-icon-color mr-2" width={12} />
            </div>
            {openDropdown === "sort" && (
              <Dropdown
                lines={sortLines}
                isOpen={true}
                onClose={() => setOpenDropdown("")}
              />
            )}
          </div>

          <div className="border-r relative">
            <div
              onClick={() =>
                toggleShowingDropdown(openDropdown, setOpenDropdown)
              }
              className="flex items-center gap-3 cursor-pointer hover:text-primary-blue duration-300"
            >
              <p>Showing : </p>
              <span className="flex items-center gap-2">
                16 items{" "}
                <BsArrowDown className="text-gray-300 mr-2" width={12} />
              </span>
            </div>
            {openDropdown === "showing" && (
              <Dropdown
                lines={showing}
                isOpen={true}
                onClose={() => setOpenDropdown("")}
              />
            )}
          </div>

          <div className="flex items-center gap-3">
            <LuLayoutDashboard width={15} className="text-gray-300" />
            <LiaStackExchange width={15} className="text-gray-300" />
          </div>
        </div>
      </div>
    </>
  );
}
