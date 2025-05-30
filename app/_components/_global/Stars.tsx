import React from "react";
import { FaStar } from "react-icons/fa";

interface StarsProps {
  goldStars: number;
  grayStars: number;
}

export default function Stars({ goldStars, grayStars }: StarsProps) {
  return (
    <div className="stars flex items-center gap-1 ml-2 ">
      {Array.from({ length: goldStars }, (_, index) => (
        <FaStar
          className="opacity-50 dark:opacity-100"
          width={17}
          color="gold"
          key={index}
        />
      ))}
      {Array.from({ length: grayStars }, (_, index) => (
        <FaStar className="opacity-50" width={17} color="gray" key={index} />
      ))}
    </div>
  );
}
