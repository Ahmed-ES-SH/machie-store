import React from "react";
import Img from "../../_global/Img";
import { AiOutlineHeart, AiOutlineUser } from "react-icons/ai";
import Link from "next/link";
import { BsMinecart } from "react-icons/bs";
import Barsbtn from "./Barsbtn";
import InputSearch from "./InputSearch";

export default async function MiddleBart() {
  return (
    <>
      <div className="w-full flex items-center justify-between gap-4 mt-6">
        {/* Bars Icons */}
        <Barsbtn />
        {/* ////////////////// */}
        <div id="logo">
          <Img
            src="/logo.png"
            className="lg:w-40 w-32"
            alt="logo"
            loading="eager"
          />
        </div>
        <InputSearch />
        <div id="icons" className="flex items-center gap-4">
          {/* Signin Link */}
          <Link
            href={"/signin"}
            className="flex items-center gap-2 cursor-pointer max-xl:hidden"
            id="user"
          >
            <AiOutlineUser className="size-7 text-icon-color" />
            <div className="flex flex-col items-start">
              <p className="text-[11px] text-icon-color">Sign in</p>
              <p className="text-[13px] font-semibold">Account</p>
            </div>
          </Link>
          {/* Heart Icon && FavoriteList */}
          <div
            id="favoriteList"
            className="relative cursor-pointer max-xl:hidden"
          >
            <AiOutlineHeart className="size-7 text-icon-color" />
            <div className="min-w-fit w-4 h-4 absolute -top-1 -right-2 bg-primary-yellow flex items-center justify-center text-gray-950 text-[14px]  rounded-full p-1">
              3
            </div>
          </div>
          {/* Heart Icon && FavoriteList */}
          <div id="favoriteList" className="relative cursor-pointer">
            <div className="flex items-center gap-4">
              <div className="relative">
                <BsMinecart className="size-7 text-icon-color" />
                <div className="min-w-fit w-4 h-4 absolute -top-1 -right-2 bg-primary-yellow flex items-center justify-center text-gray-950 text-[14px]  rounded-full p-1">
                  3
                </div>
              </div>
              <div className="flex flex-col items-start">
                <p className="text-[11px] text-icon-color">Total</p>
                <p className="text-[15px] font-semibold">$0,00</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
