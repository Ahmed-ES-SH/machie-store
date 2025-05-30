import Img from "@/app/_components/_global/Img";
import React from "react";
import { FaCodeBranch } from "react-icons/fa";

export default function DiscountBanner() {
  return (
    <>
      <>
        <div className="bg-[#021523] relative w-full rounded-md h-[20vh] flex items-center  text-white py-3">
          <Img
            className="w-full h-full object-cover absolute top-0 left-0 opacity-70 z-[2]"
            src="/images/discount.webp"
            alt="discount-bg"
          />
          <div className="content  px-4 flex items-center justify-between w-full z-[5]">
            <div className="text px-4">
              <h1 className="p-2 text-[15px] font-normal text-white">
                Super discount for your first purchase
              </h1>
              <p className="p-2 text-[13px] font-normal text-gray-200">
                Use discount code in checkout page.
              </p>
            </div>
            <div className="flex items-center gap-3">
              <FaCodeBranch className="text-white" />
              <p>FREE256MAC</p>
            </div>
          </div>
        </div>
      </>
    </>
  );
}
