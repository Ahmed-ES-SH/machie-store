/* eslint-disable @typescript-eslint/no-explicit-any */
import ArticleComponent from "@/app/_components/_website/_blog/ArticleComponent";
import { articles } from "@/constants/Articles";
import React from "react";

export async function generateMetadata({ searchParams }: any) {
  const articleId = searchParams.articleId;
  const article = articles.find(
    (article) => article.id.toString() === articleId
  );
  return {
    title: `Machic - Blog – ${article?.title ?? "Article"}`,
    description: `Machic - Blog – ${
      article?.description ?? "Read our latest articles and insights."
    }`,
  };
}

export default function ArticlePage() {
  return <ArticleComponent />;
}
