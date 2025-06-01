"use client";
import React, { useState } from "react";
import ArticleCard from "./ArticleCard";
import { articles } from "@/constants/Articles";
import DummyPagination from "../../_global/DummyPagination";

export default function ArticlesComponent() {
  const [currentPage, setCurrentPage] = useState(1);
  const articlesPerPage = 5;

  const totalPages = Math.ceil(articles.length / articlesPerPage);
  const startIndex = (currentPage - 1) * articlesPerPage;
  const endIndex = startIndex + articlesPerPage;
  const currentArticles = articles.slice(startIndex, endIndex);

  return (
    <>
      <div className="xl:flex-1/2 w-full flex flex-col gap-12 items-start">
        {currentArticles.map((article, index) => (
          <ArticleCard key={index} Article={article} />
        ))}
        <DummyPagination
          totalPages={totalPages}
          page={currentPage}
          setPage={setCurrentPage}
        />
      </div>
    </>
  );
}
