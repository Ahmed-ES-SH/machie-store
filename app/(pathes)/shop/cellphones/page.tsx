import PhonesShop from "@/app/_components/_website/_shop/PhonesShop";
import { Metadata } from "next";
import React from "react";

export const metadata: Metadata = {
  title: "Machic – Electronics Store ECommerce - Cell-Phones",
  description:
    "Discover the latest in electronics with Machic – your trusted online store for smartphones, laptops, accessories, and more. Shop top brands and enjoy fast delivery and great prices.",
};

export default function ShopPage() {
  return <PhonesShop />;
}
