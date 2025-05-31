import ArticleCard from "@/app/_components/_website/_blog/ArticleCard";
import BlogSidebar from "@/app/_components/_website/_blog/BlogSidebar";
import React from "react";

export default function BlogPage() {
  const article = {};
  return (
    <div className="c-container mt-12 flex items-start gap-4 ">
      <div className="flex-1/2 flex flex-col gap-12 items-start">
        {Array.from({ length: 3 }).map((_, index) => (
          <ArticleCard key={index} Article={article} />
        ))}
      </div>
      <BlogSidebar />
    </div>
  );
}
