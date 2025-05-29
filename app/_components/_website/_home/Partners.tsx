import React from "react";
import Img from "../../_global/Img";
import { companysimages } from "@/constants/constantsDetails";

export default function Partners() {
  return (
    <>
      <div className="grid container px-4 grid-cols-[repeat(auto-fit,minmax(150px,1fr))]  justify-items-center  mx-auto justify-between py-6 gap-[32px]  border-b">
        {companysimages.map((img, index) => (
          <div key={index} className="p-8 max-sm:p-1">
            <Img
              className="opacity-50 object-contain  hover:opacity-100 duration-300 cursor-pointer w-[150px]"
              src={img}
              alt="image-company"
            />
          </div>
        ))}
      </div>
    </>
  );
}
