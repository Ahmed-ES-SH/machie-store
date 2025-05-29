import React from "react";
import Img from "../../../_global/Img";
import { dualBannerDetails } from "@/constants/constantsDetails";

export default function DualBanner() {
  return (
    <div className="grid grid-cols-2 max-md:grid-cols-1 gap-2">
      {dualBannerDetails.map((item, index) => (
        <div key={index} className="relative h-[30vh] w-full">
          <Img
            src={item.img}
            alt="img-banner"
            className="border w-full h-full object-cover shadow-lg rounded-md"
          />
          <div className="content absolute left-14 top-1/2 -translate-y-1/2 max-md:left-2 max-md:top-[60%]">
            <p className="firstLine w-fit h-fit  text-primary-blue hover:bg-sky-500 duration-300 p-1 font-normal text-[14px]">
              WEEKEND DISCOUND
            </p>
            <p className="firstTitle font-medium py-1 text-3xl max-md:text-2xl">
              {item.title}
            </p>
            <p className=" py-4 text-[16px]">{item.desc}</p>
            <button className="btn-shop py-2 px-4 bg-primary-blue hover:bg-sky-500 duration-300 rounded-full text-white">
              Shop now
            </button>
          </div>
        </div>
      ))}
    </div>
  );
}
