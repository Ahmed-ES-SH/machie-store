"use client";
import { ProductType } from "@/app/types/productType";
import React, { useState } from "react";
import { BiHeart, BiStar } from "react-icons/bi";
import { BsEye } from "react-icons/bs";
import Img from "../../_global/Img";

interface props {
  product: ProductType;
}

export default function MiniProductCard({ product }: props) {
  const [isHovered, setIsHovered] = useState(false);
  const isTopProduct = product.rating >= 4.5;
  const discountedPrice =
    product.price * (1 - product.discountPercentage / 100);

  // Render stars
  const renderStars = () => {
    const fullStars = Math.floor(product.rating);
    const hasHalfStar = product.rating % 1 !== 0;
    const emptyStars = 5 - fullStars - (hasHalfStar ? 1 : 0);

    return (
      <div className="flex items-center gap-1">
        {[...Array(fullStars)].map((_, i) => (
          <BiStar
            key={i}
            size={12}
            className="fill-yellow-400 text-yellow-400"
          />
        ))}
        {hasHalfStar && (
          <BiStar
            size={12}
            className="fill-yellow-400 text-yellow-400"
            style={{ clipPath: "inset(0 50% 0 0)" }}
          />
        )}
        {[...Array(emptyStars)].map((_, i) => (
          <BiStar key={i} size={12} className="text-gray-300" />
        ))}
        <span className="text-gray-500 text-xs mr-1">
          ({product.reviews?.length || 0})
        </span>
      </div>
    );
  };

  return (
    <div
      key={product.id}
      className="relative bg-white rounded-lg cursor-pointer overflow-hidden transition-all duration-300 hover:shadow-xl group w-full hover:scale-110 h-fit z-[20]"
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      {/* TOP PRODUCT badge */}
      {isTopProduct && (
        <div className="absolute top-3 left-3 bg-green-500 text-white text-xs font-bold px-2 py-1 rounded-full z-10">
          TOP PRODUCT
        </div>
      )}

      {/* Discount badge */}
      {product.discountPercentage > 0 && (
        <div
          className="absolute left-3 bg-red-500 text-white text-xs font-bold px-2 py-1 rounded-full z-10"
          style={{ top: isTopProduct ? "2.5rem" : "0.75rem" }}
        >
          -{Math.round(product.discountPercentage)}%
        </div>
      )}

      {/* Product image */}
      <div className="relative overflow-hidden bg-gray-100">
        <Img
          src={
            product.thumbnail ||
            product.images?.[0] ||
            "https://via.placeholder.com/300x200?text=No+Image"
          }
          alt={product.title}
          className={`w-full object-cover transition-transform duration-300 ${
            isHovered ? "scale-105" : "scale-100"
          }`}
        />

        {/* Side icons on hover */}
        <div className="absolute right-3 top-16 transform -translate-y-1/2 flex flex-col items-center gap-2 transition-all duration-300">
          <button className="z-10 p-2 bg-white rounded-full shadow-md hover:bg-gray-100 transition-colors duration-200">
            <BiHeart
              size={18}
              className="text-gray-400 transition-colors duration-200"
            />
          </button>
          <button
            className={`p-2 bg-white rounded-full shadow-md hover:bg-gray-100 transition-all duration-300 ${
              isHovered
                ? "opacity-100 translate-x-0"
                : "opacity-0 translate-x-8"
            }`}
            title="Quick View"
          >
            <BsEye size={16} className="text-gray-600" />
          </button>
        </div>
      </div>

      {/* Card content */}
      <div className="p-4">
        {product.brand && (
          <div className="text-xs text-gray-500 uppercase tracking-wide mb-1">
            {product.brand}
          </div>
        )}
        <h3 className="text-blue-600 font-medium text-sm mb-2 line-clamp-2 hover:text-blue-800 transition-colors duration-200 min-h-[50px]">
          {product.title}
        </h3>
        <div className="mb-2">
          {renderStars()}
          <div className="text-xs text-gray-500 mt-1">
            {product.rating.toFixed(1)} out of 5
          </div>
        </div>
        <div className="flex items-center gap-2 mb-3">
          {product.discountPercentage > 0 && (
            <span className="text-gray-400 text-sm line-through">
              ${product.price.toFixed(2)}
            </span>
          )}
          <span className="text-red-500 font-bold text-lg">
            ${discountedPrice.toFixed(2)}
          </span>
        </div>
      </div>
    </div>
  );
}
