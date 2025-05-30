import React from "react";
import RightPart from "./_RestofHomePage/RightPart";
import LeftPart from "./_RestofHomePage/LeftPart";

export default function RestHomePage() {
  return (
    <>
      <div className="max-xl:flex-col  flex items-start gap-3 c-container my-4">
        {/* Right Part */}
        <LeftPart />
        {/* //////////////////////// */}
        {/* Left Part */}
        <RightPart />
        {/* //////////////////////// */}
      </div>
    </>
  );
}
