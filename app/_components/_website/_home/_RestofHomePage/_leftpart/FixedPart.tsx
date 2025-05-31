"use client";
import React from "react";
import { useVariables } from "@/app/context/VariablesContext";
import TrendingProducts from "./TrendingProducts";

export default function FixedPart() {
  const { phonesSectionHeight, oddBannerHeight, width } = useVariables();
  const currentHeight = phonesSectionHeight + oddBannerHeight;

  return (
    <>
      <div
        style={{
          height: width >= 1280 ? `${currentHeight + 310}px` : "fit-content",
        }}
        className="w-full relative"
      >
        <TrendingProducts />
      </div>
    </>
  );
}
