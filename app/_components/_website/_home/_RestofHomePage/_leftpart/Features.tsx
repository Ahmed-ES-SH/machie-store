import { leftCornerFirst } from "@/constants/constantsDetails";
import React from "react";

export default function Features() {
  return (
    <>
      <div className="h-full w-full rounded-md shadow-lg  bg-[#fff] ">
        {leftCornerFirst.map((line, index) => (
          <div
            key={index}
            className="flex w-full text-[30px] items-center justify-between max-xl:justify-start gap-8 p-3 not-last:border-b border-gray-300 "
          >
            <line.icon className="text-icon-color size-8" />
            <div className="content leading-8 ">
              <h1 className=" font-[300] py-2 text-[18px] whitespace-nowrap ">
                {line.title}
              </h1>
              <p className="text-[14px] font-thin">{line.desc}</p>
            </div>
          </div>
        ))}
      </div>
    </>
  );
}
