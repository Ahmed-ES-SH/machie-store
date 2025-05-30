"use client";
import React, { useState } from "react";
import HeadPage from "./HeadPage";
import ProductsFilter from "./ProductsFilter";
import ShopProducts from "./ShopProducts";

export default function ProductsSection() {
  const [categories, setCategories] = useState<string[]>([]);
  return (
    <>
      <HeadPage />
      <div className="flex items-start gap-2 relative">
        <ProductsFilter setCategories={setCategories} />
        <ShopProducts categories={categories} setCategories={setCategories} />
      </div>
    </>
  );
}
