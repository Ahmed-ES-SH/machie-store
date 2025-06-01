"use client";
import { useParams } from "next/navigation";
import React from "react";
import { articles } from "@/constants/Articles";
import ArticleCard from "@/app/_components/_website/_blog/ArticleCard";

export default function ArticlesByCategory() {
  const { category } = useParams();

  // Normalize category param by replacing hyphens with spaces and lowering case
  const rawCategory = Array.isArray(category) ? category[0] : category;
  const normalizedCategory =
    rawCategory?.toLowerCase().replace(/-/g, " ") || "";

  // Filter articles that match the normalized category
  const matchingArticles = articles.filter(
    (article) => article.category.toLowerCase() === normalizedCategory
  );

  // Filter articles that do NOT match the normalized category
  const otherArticles = articles.filter(
    (article) => article.category.toLowerCase() !== normalizedCategory
  );

  // Combine matching articles first, then the rest
  const sortedArticles = [...matchingArticles, ...otherArticles];

  return (
    <div className="w-full min-h-screen px-4 py-8 xl:flex-1/2">
      {/* Display category name, replace hyphens with spaces and capitalize each word */}
      <h1 className="text-2xl  mb-8">
        Category:{" "}
        <span className="text-primary-blue font-light underline">
          {normalizedCategory
            .split(" ")
            .map((word: string) => word.charAt(0).toUpperCase() + word.slice(1))
            .join(" ")}
        </span>
      </h1>

      {/* Render sorted articles or fallback message */}
      <div className="flex flex-col gap-12">
        {sortedArticles.length > 0 ? (
          sortedArticles.map((article, index) => (
            <ArticleCard key={index} Article={article} />
          ))
        ) : (
          <p className="text-gray-500 text-center mt-20">
            No articles found in this category.
          </p>
        )}
      </div>
    </div>
  );
}
