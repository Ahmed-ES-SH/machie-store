"use client";

import { useParams } from "next/navigation";
import React from "react";
import { articles } from "@/constants/Articles"; // assuming your articles array is here
import ArticleCard from "@/app/_components/_website/_blog/ArticleCard";

export default function ArticlesByTag() {
  const { tag } = useParams();

  // Normalize the tag parameter (convert to string if array, lowercase, replace hyphens)
  const rawTag = Array.isArray(tag) ? tag[0] : tag;
  const normalizedTag = rawTag?.toLowerCase().replace(/-/g, " ") || "";

  // Filter articles that include the normalizedTag in their tags array
  // Articles without the tag are placed at the end
  const sortedArticles = articles.sort((a, b) => {
    const aHasTag = a.tags.includes(normalizedTag);
    const bHasTag = b.tags.includes(normalizedTag);

    if (aHasTag && !bHasTag) return -1;
    if (!aHasTag && bHasTag) return 1;
    return 0;
  });

  return (
    <div className="xl:flex-1/2 w-full  p-6">
      {/* Display the tag name as the page heading */}
      <h1 className="text-3xl font-light mb-8">
        Articles tagged with:{" "}
        <span className="text-primary-blue underline">{normalizedTag}</span>
      </h1>

      <div className="flex flex-col gap-10">
        {sortedArticles.map((article, index) => (
          <ArticleCard key={index} Article={article} />
        ))}
      </div>
    </div>
  );
}
