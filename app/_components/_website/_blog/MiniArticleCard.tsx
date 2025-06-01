import React from "react";
import Img from "../../_global/Img";
import { ArticleType } from "./ArticleCard";
import Link from "next/link";
import { formatTitle } from "@/app/helpers/helpers";

interface Props {
  Article: ArticleType;
}

export default function MiniArticleCard({ Article }: Props) {
  return (
    <Link
      href={`/blog/${formatTitle(Article.title)}?articleId=${Article?.id}`}
      className="flex gap-4 border-b border-gray-200 pb-4 mb-4 w-full cursor-pointer group"
    >
      {/* Thumbnail */}
      <div className="w-24 h-24 flex-shrink-0 overflow-hidden rounded-sm border">
        <Img
          src={Article.image}
          alt={Article.title}
          className="w-full h-full object-cover"
        />
      </div>

      {/* Content */}
      <div className="flex flex-col justify-between">
        <h3 className="text-sm font-semibold line-clamp-2 group-hover:text-primary-blue duration-300">
          {Article.title}
        </h3>
        <p className="text-xs text-gray-600 mt-1 line-clamp-3">
          {Article.description.slice(0, 100)}...
        </p>
      </div>
    </Link>
  );
}
