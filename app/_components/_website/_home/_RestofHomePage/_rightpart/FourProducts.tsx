"use client";
import { useData } from "@/app/context/DataContext";
import React from "react";
import ProductCard from "../../../_products/ProductCard";

export default function FourProducts() {
  const { phones } = useData();

  const fourCards = phones.slice(0, 4);
  return (
    <>
      <div className="mt-4 grid grid-cols-[repeat(auto-fit,minmax(250px,1fr))] gap-4">
        {fourCards &&
          fourCards.map((product, index) => (
            <ProductCard key={index} product={product} />
          ))}
      </div>
    </>
  );
}
