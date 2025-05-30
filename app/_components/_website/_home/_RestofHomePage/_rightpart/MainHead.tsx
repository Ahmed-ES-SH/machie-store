import LinkAnimate from "@/app/_components/_global/LinkAnimate";
import React from "react";
interface props {
  title: string;
}

export default function MainHead({ title }: props) {
  return (
    <div className="main-head px-2 pt-8 border-b border-gray-200 flex items-center justify-between">
      <h1 className="block whitespace-nowrap text-2xl max-sm:text-lg font-normal">
        {title}
      </h1>
      <LinkAnimate title={"View all"} />
    </div>
  );
}
