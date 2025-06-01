"use client";
import React, { useState, useEffect } from "react";
import { FiSearch } from "react-icons/fi";
import { articles } from "@/constants/Articles";
import MiniArticleCard from "./MiniArticleCard";
import { motion, AnimatePresence } from "framer-motion";

export default function InputSearchArticles() {
  const [searchQuery, setSearchQuery] = useState("");
  const [filteredArticles, setFilteredArticles] = useState<typeof articles>([]);
  const [loading, setLoading] = useState(false);
  const [hasSearched, setHasSearched] = useState(false);

  useEffect(() => {
    const delayDebounce = setTimeout(() => {
      const query = searchQuery.trim().toLowerCase();

      if (query === "") {
        setFilteredArticles([]);
        setHasSearched(false);
        return;
      }

      setLoading(true);
      setHasSearched(true);

      // تأخير عرض النتائج 1 ثانية
      setTimeout(() => {
        const results = articles.filter(
          (article) =>
            article.title.toLowerCase().includes(query) ||
            article.description.toLowerCase().includes(query)
        );
        setFilteredArticles(results);
        setLoading(false);
      }, 1000);
    }, 500);

    return () => clearTimeout(delayDebounce);
  }, [searchQuery]);

  return (
    <div className="w-full max-w-3xl mx-auto">
      {/* Search Input */}
      <div className="mb-8">
        <div className="relative">
          <input
            type="text"
            placeholder="Search articles..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="w-full px-4 py-3 pr-10 border border-gray-300 rounded-md text-sm outline-none focus:border-yellow-400 focus:shadow-sm focus:shadow-yellow-100 transition duration-300"
          />
          <button className="absolute right-0 top-0 h-full px-3 bg-gray-100 border-l border-gray-300 hover:bg-gray-200 transition-colors rounded-r-md">
            <FiSearch className="w-4 h-4 text-gray-500" />
          </button>
        </div>
      </div>

      {/* Loading Spinner */}
      {loading && (
        <div className="flex justify-center items-center py-10">
          <motion.div
            className="w-10 h-10 border-4 border-yellow-400 border-t-transparent rounded-full"
            animate={{ rotate: 360 }}
            transition={{ repeat: Infinity, duration: 1, ease: "linear" }}
          />
        </div>
      )}

      {/* Results */}
      <AnimatePresence>
        {!loading && hasSearched && filteredArticles.length > 0 && (
          <motion.div
            className="flex flex-col h-[50vh] hidden-scrollbar overflow-y-auto gap-4"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
          >
            {filteredArticles.map((article, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.05 }}
              >
                <MiniArticleCard Article={article} />
              </motion.div>
            ))}
          </motion.div>
        )}

        {!loading && hasSearched && filteredArticles.length === 0 && (
          <motion.div
            className="text-center text-gray-500 py-10 w-full"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
          >
            <p className="text-lg font-light">
              <FiSearch className="inline mr-2" />
              No articles found matching your search.
            </p>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
