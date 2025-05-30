import React from "react";
import DualBanner from "./_rightpart/DualBanner";
import FourProducts from "./_rightpart/FourProducts";
import OddBanner from "./_rightpart/OddBanner";
import LatestDeals from "./_rightpart/LatestDeals";
import DiscountBanner from "./_rightpart/DiscountBanner";
import PhonesSection from "./_rightpart/PhonesSection";

export default function RightPart() {
  return (
    <div className="xl:flex-1/2 w-full">
      <DualBanner />
      <FourProducts />
      <OddBanner imgsrc="/images/banner-4.jpg" />
      <LatestDeals />
      <DiscountBanner />
      <PhonesSection />
      <OddBanner imgsrc={"/images/cell-3.jpg"} />
    </div>
  );
}
