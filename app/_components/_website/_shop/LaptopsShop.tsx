import React from "react";
import { ProductType } from "@/app/types/productType";
import ProductCard from "../_products/ProductCard";
import SelectedCategories from "./SelectedCategories";
import FetchData from "@/app/hooks/FetchData";

export default async function LaptopsShop() {
  const { products } = await FetchData(`/products/category/Laptops`, false);

  return (
    <>
      <div className="flex-1/2 h-full relative py-2">
        <SelectedCategories />

        <div className="grid grid-cols-[repeat(auto-fit,minmax(250px,1fr))] gap-4 justify-items-center">
          {products.map((product: ProductType, index: number) => (
            <ProductCard key={index} product={product} />
          ))}
        </div>
      </div>
    </>
  );
}
