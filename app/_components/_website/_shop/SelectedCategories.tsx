"use client";
import { categoryType } from "@/app/context/DataContext";
import { useVariables } from "@/app/context/VariablesContext";
import React from "react";
import { FaTimes } from "react-icons/fa";

export default function SelectedCategories() {
  const { categories, setCategories } = useVariables();
  return (
    <>
      {categories.length > 0 && (
        <div className="w-[97%] m-auto h-fit py-4 px-2">
          <ul className="flex items-center gap-2 flex-wrap">
            {categories.map((cat: categoryType, index) => (
              <li
                key={index}
                onClick={() =>
                  setCategories((prev) =>
                    prev.filter((_, ine) => ine !== index)
                  )
                }
                className="cursor-pointer whitespace-nowrap text-[14px] font-light flex items-center gap-2 rounded-md px-2 py-1 border border-gray-200 hover:bg-gray-200 duration-300"
              >
                <FaTimes className="text-red-200" />
                <p>{cat.name}</p>
              </li>
            ))}
          </ul>
        </div>
      )}
    </>
  );
}
