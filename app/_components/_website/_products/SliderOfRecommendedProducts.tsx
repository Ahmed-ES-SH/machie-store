"use client";
import React from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import { Autoplay } from "swiper/modules";
import { useData } from "@/app/context/DataContext";
import ProductCard from "./ProductCard";

import "swiper/css";
import "swiper/css/effect-creative";

export default function SliderOfRecommendedProducts() {
  const { products } = useData();

  return (
    <div className="w-full mt-12 pt-2 border-t border-gray-300 px-4">
      <div className="text-start mb-8">
        <h2 className="text-3xl font-bold text-gray-800 mb-2">
          Recommended for You
        </h2>
        <p className="text-icon-color text-sm max-w-xl ">
          Discover a curated selection of products chosen just for you — based
          on popularity, user reviews, and your interests.
        </p>
      </div>

      <Swiper
        autoplay={{
          delay: 1500,
          disableOnInteraction: false,
        }}
        modules={[Autoplay]}
        slidesPerView={5}
        spaceBetween={30}
        breakpoints={{
          0: {
            slidesPerView: 1,
          },
          480: {
            slidesPerView: 2,
          },
          768: {
            slidesPerView: 3,
          },
          1024: {
            slidesPerView: 4,
          },
          1280: {
            slidesPerView: 5,
          },
        }}
        className="w-full"
      >
        {products.map((product) => (
          <SwiperSlide key={product?.id}>
            <ProductCard product={product} />
          </SwiperSlide>
        ))}
      </Swiper>
    </div>
  );
}
