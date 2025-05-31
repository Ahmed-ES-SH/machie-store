"use client";
import React, { useState } from "react";
import { FiSearch } from "react-icons/fi";
import Img from "../../_global/Img";

export default function BlogSidebar() {
  const [searchQuery, setSearchQuery] = useState("");

  const categories = [
    { name: "Camera", count: 5 },
    { name: "Smartphone", count: 8 },
    { name: "Tablet", count: 3 },
    { name: "Watches", count: 12 },
  ];

  const tags = [
    "android",
    "Pixel",
    "australia",
    "iphone",
    "photo",
    "pro",
    "standard",
    "thumbnailpost",
  ];

  const popularPosts = [
    {
      id: 1,
      category: "WATCHES",
      title: "But I must explain to you how all this mistaken idea",
      image:
        "https://images.unsplash.com/photo-1523275335684-37898b6baf30?w=150&h=100&fit=crop&crop=entropy&auto=format",
    },
    {
      id: 2,
      category: "CAMERA",
      title: "The Problem With Typefaces on the Web",
      image:
        "https://images.unsplash.com/photo-1606983340126-99ab4feaa64a?w=150&h=100&fit=crop&crop=entropy&auto=format",
    },
    {
      id: 3,
      category: "TABLET",
      title: "English Breakfast Tea With Tasty Donut Desserts",
      image:
        "https://images.unsplash.com/photo-1551698618-1dfe5d97d256?w=150&h=100&fit=crop&crop=entropy&auto=format",
    },
  ];

  return (
    <div className="xl:flex-1 sticky top-2 right-0 bg-white">
      {/* Search Section */}
      <div className="mb-8">
        <div className="relative">
          <input
            type="text"
            placeholder="Search..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="w-full px-4 py-3 pr-10 border border-gray-300 rounded-none text-sm focus:outline-none focus:border-gray-400"
          />
          <button className="absolute right-0 top-0 h-full px-3 bg-gray-100 border-l border-gray-300 hover:bg-gray-200 transition-colors">
            <FiSearch className="w-4 h-4 text-gray-500" />
          </button>
        </div>
      </div>

      {/* Categories Section */}
      <div className="mb-8">
        <h3 className="text-lg font-semibold text-gray-900 mb-4 pb-2 border-b border-gray-200">
          Categories
        </h3>
        <div className="space-y-3">
          {categories.map((category, index) => (
            <div key={index} className="flex items-center justify-between py-1">
              <a
                href="#"
                className="text-gray-700 hover:text-gray-900 transition-colors text-sm"
              >
                {category.name}
              </a>
              <span className="text-gray-500 text-sm">({category.count})</span>
            </div>
          ))}
        </div>
      </div>

      {/* Tags Section */}
      <div className="mb-8">
        <h3 className="text-lg font-semibold text-gray-900 mb-4 pb-2 border-b border-gray-200">
          Tags
        </h3>
        <div className="flex flex-wrap gap-2">
          {tags.map((tag, index) => (
            <a
              key={index}
              href="#"
              className="px-3 py-1 bg-gray-100 text-gray-700 text-sm hover:bg-gray-200 transition-colors border border-gray-200"
            >
              {tag}
            </a>
          ))}
        </div>
      </div>

      {/* Popular Posts Section */}
      <div className="mb-8">
        <h3 className="text-lg font-semibold text-gray-900 mb-4 pb-2 border-b border-gray-200">
          Popular Posts
        </h3>
        <div className="space-y-4">
          {popularPosts.map((post) => (
            <div key={post.id} className="flex gap-3">
              <div className="w-16 h-12 flex-shrink-0 overflow-hidden">
                <Img
                  src={post.image}
                  alt={post.title}
                  className="w-full h-full object-cover"
                />
              </div>
              <div className="flex-1 min-w-0">
                <div className="text-xs font-medium text-blue-600 mb-1 uppercase tracking-wide">
                  {post.category}
                </div>
                <h4 className="text-sm text-gray-900 leading-tight hover:text-gray-700 cursor-pointer">
                  {post.title}
                </h4>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Samsung Advertisement */}
      <div className="bg-gray-50 text-center py-8 px-6">
        <div className="relative">
          <Img
            src="/images/widget-banner.jpg"
            alt="Samsung Galaxy S24 5G"
            className="w-full  object-cover"
          />
        </div>
      </div>
    </div>
  );
}
