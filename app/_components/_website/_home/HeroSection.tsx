import React from "react";
import HeroSlider from "./HeroSlider";
import HeroList from "./HeroList";

export default function HeroSection() {
  return (
    <>
      <div className="c-container flex items-start overflow-hidden gap-4">
        <HeroList />
        <HeroSlider />
      </div>
    </>
  );
}
