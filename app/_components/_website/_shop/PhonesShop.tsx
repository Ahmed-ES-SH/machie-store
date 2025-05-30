"use client";
import React from "react";
import { ProductType } from "@/app/types/productType";
import ProductCard from "../_products/ProductCard";
import SelectedCategories from "./SelectedCategories";
import { useData } from "@/app/context/DataContext";

export default function PhonesShop() {
  const { phones } = useData();

  return (
    <>
      <div className="flex-1/2 h-full relative py-2">
        {/* SelectedCategories */}
        <SelectedCategories />
        {/* /////////////// */}
        <div className="grid grid-cols-[repeat(auto-fit,minmax(250px,1fr))] gap-4 justify-items-center">
          {phones.map((product: ProductType, index: number) => (
            <ProductCard key={index} product={product} />
          ))}
        </div>
      </div>
    </>
  );
}
