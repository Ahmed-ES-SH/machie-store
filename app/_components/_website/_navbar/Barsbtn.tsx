"use client";
import { useVariables } from "@/app/context/VariablesContext";
import React from "react";
import { HiOutlineBars3 } from "react-icons/hi2";

export default function Barsbtn() {
  const { mobailMenu, setMobailMenu } = useVariables();

  const handleToggle = () => {
    setMobailMenu((prev) => !prev);
  };
  return (
    <>
      {!mobailMenu && (
        <div onClick={handleToggle} className="hidden max-xl:block">
          <HiOutlineBars3 className="size-7 cursor-pointer" />
        </div>
      )}
    </>
  );
}
