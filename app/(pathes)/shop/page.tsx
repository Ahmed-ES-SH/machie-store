import Breadcrumb from "@/app/_components/_global/Breadcrumb";
import FirstShopSection from "@/app/_components/_website/_shop/FirstShopSection";
import ProductsSection from "@/app/_components/_website/_shop/ProductsSection";
import { Metadata } from "next";
import React from "react";

export const metadata: Metadata = {
  title: "Machic – Electronics Store ECommerce - Shop",
  description:
    "Discover the latest in electronics with Machic – your trusted online store for smartphones, laptops, accessories, and more. Shop top brands and enjoy fast delivery and great prices.",
};

export default function ShopPage() {
  return (
    <div className="c-container mt-4">
      <FirstShopSection />
      <Breadcrumb />
      <ProductsSection />
    </div>
  );
}
