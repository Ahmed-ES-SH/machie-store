import ArticlesComponent from "@/app/_components/_website/_blog/ArticlesComponent";
import { Metadata } from "next";
import React from "react";

export const metadata: Metadata = {
  title: "Machic – Electronics Store ECommerce - Blog",
  description:
    "Explore the latest articles, reviews, and news about cutting-edge electronics, gadgets, and tech trends at Machic's blog. Stay updated with expert insights and buying guides for your next electronic purchase.",
};

export default function BlogPage() {
  return <ArticlesComponent />;
}
