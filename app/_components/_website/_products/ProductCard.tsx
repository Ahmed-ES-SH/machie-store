"use client";
import { BsEye } from "react-icons/bs";
import { CgShoppingCart } from "react-icons/cg";
import Img from "../../_global/Img";
import { BiHeart, BiStar } from "react-icons/bi";
import { useState } from "react";
import { ProductType } from "@/app/types/productType";
import Link from "next/link";
import { formatTitle } from "@/app/helpers/helpers";
import { useCartStore } from "@/app/store/CartStore";
import { useWishlistStore } from "@/app/store/WishlistStoreStore";
import { IoHeartDislikeOutline } from "react-icons/io5";

interface props {
  product: ProductType;
}

export default function ProductCard({ product }: props) {
  const { addToCart, cartItems } = useCartStore();
  const { addToWishlist, wishlistItems, removeFromWishlist } =
    useWishlistStore();

  const [isHovered, setIsHovered] = useState(false);

  const isInCart =
    !!product && cartItems.some((item) => item.id === product.id);
  const isInWishList =
    !!product && wishlistItems.some((item) => item.id === product.id);

  // Calculate discounted price
  const discountedPrice =
    product.price * (1 - product.discountPercentage / 100);

  // Determine if product is top rated (rating above 4.5)
  const isTopProduct = product.rating >= 4.5;

  // Determine stock status
  const getStockStatus = () => {
    if (product.stock === 0)
      return { text: "Out of Stock", color: "text-red-600" };
    if (product.stock <= 5)
      return {
        text: `Only ${product.stock} left in stock`,
        color: "text-red-500",
      };
    if (product.stock <= 10)
      return {
        text: `${product.stock} left in stock`,
        color: "text-orange-500",
      };
    return { text: "In Stock", color: "text-green-500" };
  };

  const stockStatus = getStockStatus();

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
      className="relative bg-white rounded-lg cursor-pointer overflow-hidden transition-all duration-300 hover:shadow-xl group w-full hover:scale-110 h-fit  z-[20]"
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
          className="absolute top-3 left-3 bg-red-500 text-white text-xs font-bold px-2 py-1 rounded-full z-10"
          style={{ top: isTopProduct ? "2.5rem" : "0.75rem" }}
        >
          -{Math.round(product.discountPercentage)}%
        </div>
      )}

      {/* Product image */}
      <div className="relative overflow-hidden bg-gray-100">
        <Img
          src={
            product.images?.[0] ||
            "https://via.placeholder.com/300x200?text=No+Image"
          }
          alt={product.title}
          className={`w-full h-1/2 object-cover transition-transform duration-300 ${
            isHovered ? "scale-105" : "scale-100"
          }`}
        />

        {/* Side icons on hover */}
        <div
          className={`absolute right-3 top-16 transform -translate-y-1/2 flex flex-col items-center gap-2 transition-all duration-300 `}
        >
          {/* Heart icon */}
          <button
            onClick={
              isInWishList
                ? () => removeFromWishlist(product.id)
                : () => addToWishlist(product)
            }
            className={`z-10 p-2  rounded-full shadow-md  transition-colors duration-200 ${
              isInWishList
                ? "bg-red-300 hover:bg-red-400 text-white"
                : "hover:bg-gray-100 bg-white text-gray-400"
            }`}
          >
            {isInWishList ? (
              <IoHeartDislikeOutline size={18} />
            ) : (
              <BiHeart size={18} />
            )}
          </button>
          <Link
            href={`/products/${formatTitle(product.title)}?productId=${
              product.id
            }`}
            className={`p-2 block bg-white rounded-full shadow-md hover:bg-gray-100 transition-all duration-300 ${
              isHovered
                ? "opacity-100 translate-x-0"
                : "opacity-0 translate-x-8"
            }`}
          >
            <BsEye size={16} className="text-gray-600" />
          </Link>
        </div>
      </div>

      {/* Card content */}
      <div className="p-4">
        {/* Brand */}
        {product.brand && (
          <div className="text-xs text-gray-500 uppercase tracking-wide mb-1">
            {product.brand}
          </div>
        )}

        {/* Product title */}
        <Link
          href={`/products/${formatTitle(product.title)}?productId=${
            product.id
          }`}
          className="text-blue-600 font-medium hover:underline text-sm mb-2 line-clamp-2 hover:text-blue-800 transition-colors duration-200 min-h-[50px]"
        >
          {product.title}
        </Link>

        {/* Rating */}
        <div className="mb-2">
          {renderStars()}
          <div className="text-xs text-gray-500 mt-1">
            {product.rating.toFixed(1)} out of 5
          </div>
        </div>

        {/* Prices */}
        <div className="flex items-center gap-2 mb-3">
          {product.discountPercentage > 0 && (
            <span className="text-gray-400 text-sm line-through">
              ${product.price.toFixed(2)}
            </span>
          )}
          <span className="text-red-500 font-bold text-lg">
            $
            {product.discountPercentage > 0
              ? discountedPrice.toFixed(2)
              : product.price.toFixed(2)}
          </span>
        </div>

        {/* Shipping information */}
        <div className="text-gray-500 text-xs mb-2">
          {product.shippingInformation || "Shipping info not available"}
        </div>

        {/* Stock status */}
        <div className={`text-xs mb-3 ${stockStatus.color}`}>
          {stockStatus.text}
        </div>

        {/* Category and tags */}
        <div className="mb-3 min-h-[40px]">
          <div className="flex flex-wrap gap-1">
            <span className="bg-blue-100 text-blue-800 text-xs px-2 py-1 rounded-full">
              {product.category}
            </span>
            {product.tags?.slice(0, 2).map((tag, index) => (
              <span
                key={index}
                className="bg-gray-100 text-gray-600 text-xs px-2 py-1 rounded-full"
              >
                {tag}
              </span>
            ))}
          </div>
        </div>

        {/* Additional info on hover */}
        <div
          className={`transition-all duration-300 overflow-hidden h-[100px]`}
        >
          <div className="border-t border-gray-200 pt-3 mt-3">
            <div className="text-xs text-gray-600 space-y-1">
              {product.warrantyInformation && (
                <div className="flex items-center">
                  <span className="w-2 h-2 bg-sky-400 rounded-full mr-2 flex-shrink-0"></span>
                  Warranty: {product.warrantyInformation}
                </div>
              )}
              {product.returnPolicy && (
                <div className="flex items-center">
                  <span className="w-2 h-2 bg-sky-400 rounded-full mr-2 flex-shrink-0"></span>
                  Return Policy: {product.returnPolicy}
                </div>
              )}
              {product.sku && (
                <div className="flex items-center">
                  <span className="w-2 h-2 bg-sky-400 rounded-full mr-2 flex-shrink-0"></span>
                  SKU: {product.sku}
                </div>
              )}
              {product.minimumOrderQuantity > 1 && (
                <div className="flex items-center">
                  <span className="w-2 h-2 bg-sky-400 rounded-full mr-2 flex-shrink-0"></span>
                  Min Order: {product.minimumOrderQuantity} pieces
                </div>
              )}
            </div>
          </div>
        </div>

        {/* Add to cart button */}
        <button
          onClick={() => addToCart(product)}
          disabled={product.stock === 0}
          className={`w-full flex items-center justify-center gap-2 py-2 px-4 rounded-lg font-medium transition-all duration-300 my-3
    ${
      product.stock === 0
        ? "bg-gray-300 text-gray-500 cursor-not-allowed"
        : isInCart
        ? "bg-green-100 text-green-700 border border-green-500"
        : isHovered
        ? "bg-blue-600 text-white hover:bg-blue-700"
        : "bg-gray-100 text-gray-600 hover:bg-gray-200"
    }
  `}
        >
          <CgShoppingCart size={16} />
          {product.stock === 0
            ? "Out of Stock"
            : isInCart
            ? "✓ In Cart"
            : "Add to Cart"}
        </button>
      </div>
    </div>
  );
}
