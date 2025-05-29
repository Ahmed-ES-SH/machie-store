import React from "react";
import TopPart from "../_website/_navbar/TopPart";
import MiddleBart from "../_website/_navbar/MiddleBart";
import BottomPart from "../_website/_navbar/BottomPart";

export default function Navbar() {
  return (
    <div className="relative max-2xl:pb-2">
      <div className="w-full h-[.5px] absolute bottom-0 left-0 bg-gray-300 opacity-65"></div>
      <div className="c-container pt-2">
        {/* Top Part From Navbar */}
        <TopPart />
        {/* MiddlePart From Navbar */}
        <MiddleBart />
        {/* BottomPart From Navbar */}
        <BottomPart />
      </div>
    </div>
  );
}
