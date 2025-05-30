"use client";
import Img from "@/app/_components/_global/Img";
import { useData } from "@/app/context/DataContext";
import { ProductType } from "@/app/types/productType";
import React, { useEffect, useState } from "react";

export default function TrendingProducts() {
  const { phones } = useData();
  const [trendingProducts, setTrendingProducts] = useState<ProductType[]>([]);

  useEffect(() => {
    const randomSixProducts = phones
      ?.slice()
      .sort(() => 0.5 - Math.random())
      .slice(0, 6);
    setTrendingProducts(randomSixProducts);
  }, [phones]);

  return (
    <div className=" xl:sticky top-0 left-0">
      <h1 className="px-4 border-b border-gray-200 text-xl font-normal whitespace-nowrap mt-1">
        Trending Products
      </h1>
      <div className=" h-fit py-6 px-2 shadow-md gap-8 grid grid-cols-[repeat(auto-fit,minmax(250px,1fr))] xl:grid-cols-1">
        {trendingProducts.map((item, index) => (
          <div
            className="w-full h-[20vh] cursor-pointer group px-3 gap-8 flex items-center justify-between  xl:not-last:border-b border-gray-200"
            key={index}
          >
            <Img
              className="w-[150px]  rounded-md"
              src={item.images[0] || ""}
              alt="image"
            />
            <div className="w-1/2">
              <h1 className="p-2 text-[13px] max-md:text-[15px] group-hover:text-primary-blue duration-300">
                {item.title}
              </h1>
              <div className="price flex items-center flex-wrap p-2 gap-3">
                <h1 className="py-2 text-red-500 text-[18px]">${item.price}</h1>
                <del className=" text-gray-300 text-[14px]">${item.price}</del>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
