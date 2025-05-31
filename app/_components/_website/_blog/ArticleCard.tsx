import React from "react";
import { CiBookmark, CiClock2 } from "react-icons/ci";
import { LuTickets } from "react-icons/lu";
import Img from "../../_global/Img";

export default function ArticleCard({ Article }) {
  const ArticleDetails = [
    {
      text: "October 9, 2021",
      icon: CiClock2,
    },
    {
      text: "Smartphone",
      icon: CiBookmark,
    },
    {
      text: "phone,standard",
      icon: LuTickets,
    },
  ];
  return (
    <div className="not-last:border-b border-gray-200 pb-4">
      <h1
        id="title"
        className="xl:text-3xl md:text-2xl text-xl font-light pb-3 border-b border-gray-200"
      >
        On the other hand we provide denounce with righteous
      </h1>
      <div className="flex items-center gap-4 mt-2">
        {ArticleDetails.map((item, index) => (
          <div
            key={index}
            className="flex items-center gap-1 cursor-pointer not-last:border-r border-gray-300 pr-2"
          >
            <item.icon className="text-primary-blue size-4" />
            <p className="text-[12px]">{item.text}</p>
          </div>
        ))}
      </div>
      <Img
        src="/images/posts/post-1.webp"
        className="w-[90%] mt-4"
        alt="article-img"
      />

      <p className="mt-3 lg:w-3/4 w-full ">
        Donec rhoncus quis diam sit amet faucibus. Vivamus pellentesque, sem sed
        convallis ultricies, ante eros laoreet libero, vitae suscipit lorem
        turpis sit amet lectus. Quisque egestas lorem ut mauris ultrices, vitae
        sollicitudin quam facilisis. Vivamus rutrum urna non ligula tempor
        aliquet. Fusce tincidunt est magna, id malesuada massa imperdiet ut.
        Nunc non nisi urna. Nam
      </p>

      <button className="flex mt-4 items-center justify-center text-white rounded-md bg-primary-blue px-6 py-2 hover:bg-white hover:text-black hover:border-primary-blue hover:scale-110 border border-transparent duration-300">
        Read More
      </button>
    </div>
  );
}
