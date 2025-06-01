import React from "react";
import Img from "../../_global/Img";
import Link from "next/link";
import Barsbtn from "./Barsbtn";
import InputSearch from "./InputSearch";
import CartProducts from "./CartProducts";
import WishListProducts from "./WishListProducts";
import SignInBtn from "./Signinbtn";

export default async function MiddleBart() {
  return (
    <>
      <div className="w-full flex items-center justify-between gap-4 mt-6">
        {/* Bars Icons */}
        <Barsbtn />
        {/* ////////////////// */}
        <Link className="block" href={"/"} id="logo">
          <Img
            src="/logo.png"
            className="lg:w-40 w-32"
            alt="logo"
            loading="eager"
          />
        </Link>
        {/* InputSearch */}
        <InputSearch />
        {/* //////////// */}
        <div id="icons" className="flex items-center gap-4">
          {/* Signin Link */}
          <SignInBtn />
          {/* Heart Icon && FavoriteList */}
          <WishListProducts />
          {/* Cart Icon && Cart products */}
          <CartProducts />
        </div>
      </div>
    </>
  );
}
