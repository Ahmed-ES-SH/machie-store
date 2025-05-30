/* eslint-disable react/no-unescaped-entities */
import React from "react";

export default function FirstShopSection() {
  return (
    <>
      <section className="f-banner relative h-[100px] max-md:h-fit mx-auto dual-center max-md:flex-col max-md:gap-y-4 max-md:items-start bg-normal ">
        <div className="w-full">
          <p className="font-light whitespace-normal ">
            Shop and
            <span className="px-2 bg-yellow-400 text-black rounded-full font-normal">
              Save Big on Hottest
            </span>
            Products
          </p>
        </div>
        <div className="center max-md:flex-col max-md:w-full w-1/2">
          <div>
            <p className="text-right max-md:text-left">
              from <span className="text-3xl text-red-500">$79.00</span>
            </p>
            <p className="font-light text-[15px] whitespace-nowrap">
              Don't miss this special opportunity today.
            </p>
          </div>
          <button className="btn-shop max-md:ml-auto">Shop now</button>
        </div>
      </section>
      <section className="s-banner relative grid grid-cols-3 max-lg:grid-cols-2 max-md:grid-cols-1  gap-4 mt-4 ">
        <div className="bg-[url('/images/cell-1.jpg')]  bg-same">
          <div className="content absolute top-8 left-4 flex items-start  flex-col  ">
            <div>
              <p>Maecenas non erat</p>
              <h1>Headphones</h1>
            </div>
          </div>
          <div className=" absolute bottom-8 left-4">
            <p className="font-light">Weekend Discount</p>
            <div>
              <span className="text-xl text-red-500">$299.00</span>
              <del className="text-gray-400/40 text-[14px] ml-2">$399.00</del>
            </div>
          </div>
        </div>
        <div className="bg-[url('/images/cell-2.jpg')]  bg-same">
          <div className="content absolute top-8 left-4 flex items-start  flex-col  ">
            <div>
              <p>Maecenas non erat</p>
              <h1>Cell phones</h1>
            </div>
          </div>
          <div className=" absolute bottom-8 left-4">
            <p className="font-light">Weekend Discount</p>
            <div>
              <span className="text-xl text-red-500">$299.00</span>
              <del className="text-gray-400/40 text-[14px] ml-2">$399.00</del>
            </div>
          </div>
        </div>
        <div className="bg-[url('/images/cell-3.jpg')]  bg-same">
          <div className="content absolute top-8 left-4 flex items-start  flex-col  ">
            <div>
              <p>Maecenas non erat</p>
              <h1>Accessories</h1>
            </div>
          </div>
          <div className=" absolute bottom-8 left-4">
            <p className="font-light">Weekend Discount</p>
            <div>
              <span className="text-xl text-red-500">$299.00</span>
              <del className="text-gray-400/40 text-[14px] ml-2">$399.00</del>
            </div>
          </div>
        </div>
      </section>
    </>
  );
}
