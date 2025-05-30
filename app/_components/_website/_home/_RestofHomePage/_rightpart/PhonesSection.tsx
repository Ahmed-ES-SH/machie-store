/* eslint-disable react/no-unescaped-entities */
"use client";
import Img from "@/app/_components/_global/Img";
import { DetailsMobail } from "@/constants/constantsDetails";
import React, { useEffect, useRef, useState } from "react";
import MainHead from "./MainHead";
import { useData } from "@/app/context/DataContext";
import ProductCard from "../../../_products/ProductCard";
import { useVariables } from "@/app/context/VariablesContext";

export default function PhonesSection() {
  const { phones } = useData();
  const { width, setPhonesSectionHeight } = useVariables();
  const currentData = phones.slice(0, 6);
  const elementRef = useRef<HTMLDivElement>(null);
  const [height, setHeight] = useState(0);

  useEffect(() => {
    if (elementRef.current) {
      const newHeight = elementRef.current.clientHeight;
      setHeight(newHeight);
      setPhonesSectionHeight(newHeight);

      const section = document.getElementById("section-test");
      if (section) {
        section.style.setProperty("--dynamic-height", `${newHeight}px`);
      }
    }
  }, [width, phones, setPhonesSectionHeight]);

  return (
    <>
      <div>
        <MainHead title={"Smartphones & Accessories"} />
        <section
          style={{
            height: width >= 1280 ? `${height}px` : "fit-content",
          }}
          id="section-test"
          className={`max-xl:flex-col flex items-start justify-between gap-4 py-3 w-full my-4 `}
        >
          <div className="phone-card max-xl:w-full  xl:h-full h-[80vh]  w-[30%] relative   rounded-md shadow-lg self-start">
            <div className="IMAGE-CARD relative h-full">
              <Img
                className="shadow-lg object-cover xl:h-[70%] h-1/2 w-full "
                src={"/images/category-banner.jpg"}
                alt="phone-banner"
              />
              <div className="content absolute left-14 top-6  max-md:left-2">
                <p className="firstLine w-fit h-fit  text-sky-500 p-1 font-normal text-[14px]">
                  SAMSUNG PHONE
                </p>
                <p className="firstTitle font-medium py-1 text-3xl max-md:text-2xl">
                  Galaxy A46
                </p>
                <p className=" py-4 text-[16px]">
                  Don't miss the last opportunity.
                </p>
                <button className="btn-shop py-2 px-4 bg-sky-400 rounded-full text-white">
                  Shop now
                </button>
              </div>
            </div>
            <div className="details w-full absolute bottom-12 z-[10]">
              <h1 className="title px-3 py-4">Cell Phones</h1>
              {DetailsMobail.map((detail, index) => (
                <div
                  key={index}
                  className="font-normal text-[14px] flex items-center justify-between w-full text-gray-400 py-1 px-3"
                >
                  <p>{detail.title}</p>
                  <p>({detail.number})</p>
                </div>
              ))}
            </div>
          </div>
          <div
            ref={elementRef}
            className="phones max-xl:pt-[10px] w-[68%] max-xl:w-full relative "
          >
            <div className="h-full grid xl:grid-cols-[repeat(auto-fit,minmax(200px,1fr))] grid-cols-[repeat(auto-fit,minmax(300px,1fr))] gap-4 gap-y-11 max-md:justify-items-center">
              {currentData.map((product, index) => (
                <ProductCard key={index} product={product} />
              ))}
            </div>
          </div>
        </section>
      </div>
    </>
  );
}
