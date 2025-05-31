/* eslint-disable react/no-unescaped-entities */
"use client";
import React, { ChangeEvent, useEffect, useState, useRef } from "react";
import Categories from "./Categories";
import { CiSearch } from "react-icons/ci";
import { useData } from "@/app/context/DataContext";
import axios from "axios";
import { ProductType } from "@/app/types/productType";
import { AnimatePresence, motion } from "framer-motion";
import { MdClose, MdShoppingCart } from "react-icons/md";
import Img from "../../_global/Img";
import { FaStar } from "react-icons/fa";
import { AiOutlineLoading3Quarters } from "react-icons/ai";
import { BiNoEntry } from "react-icons/bi";

// Search result item component
function SearchResultItem({ product }: { product: ProductType }) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.3 }}
      whileHover={{
        scale: 1.02,
        boxShadow: "0 10px 25px rgba(0,0,0,0.15)",
      }}
      className="flex items-center gap-4 p-4 bg-white rounded-lg border border-gray-200 hover:border-blue-300 cursor-pointer"
    >
      <div className="w-16 h-16 bg-gray-100 rounded-lg overflow-hidden flex-shrink-0">
        <Img
          src={product.thumbnail}
          alt={product.title}
          className="w-full h-full object-cover"
        />
      </div>

      <div className="flex-1 min-w-0">
        <h3 className="font-semibold text-gray-900 text-sm mb-1 truncate">
          {product.title}
        </h3>
        <p className="text-xs text-gray-600 mb-2 line-clamp-2">
          {product.description}
        </p>

        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2">
            <span className="text-lg font-bold text-blue-600">
              ${product.price}
            </span>
            <div className="flex items-center gap-1">
              <FaStar className="w-3 h-3 text-yellow-400" />
              <span className="text-xs text-gray-600">{product.rating}</span>
            </div>
          </div>

          <motion.button
            whileHover={{ scale: 1.1 }}
            whileTap={{ scale: 0.95 }}
            className="p-2 bg-blue-100 hover:bg-blue-200 rounded-full transition-colors duration-200"
          >
            <MdShoppingCart className="w-4 h-4 text-blue-600" />
          </motion.button>
        </div>
      </div>
    </motion.div>
  );
}

export default function InputSearch() {
  const { categories } = useData();
  const [query, setQuery] = useState("");
  const [loading, setLoading] = useState(false);
  const [searchData, setSearchData] = useState<ProductType[]>([]);
  const inputRef = useRef<HTMLDivElement>(null);
  const [showResults, setShowResults] = useState(false);

  const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
    setQuery(e.target.value);
    setLoading(true);
  };

  useEffect(() => {
    const FetchSearchData = async () => {
      if (!query.trim()) return;
      try {
        const res = await axios.get(
          `https://dummyjson.com/products/search?q=${query}`
        );
        setSearchData(res.data.products);
        setShowResults(true);
      } catch (error) {
        console.log(error);
      } finally {
        setLoading(false);
      }
    };

    const timeout = setTimeout(() => {
      FetchSearchData();
    }, 500);

    if (query.length === 0) {
      setSearchData([]);
      setShowResults(false);
      setLoading(false);
    }

    return () => clearTimeout(timeout);
  }, [query]);

  const clearSearch = () => {
    setQuery("");
    setShowResults(false);
    setSearchData([]);
  };

  return (
    <div className="relative w-full max-xl:hidden" ref={inputRef}>
      {/* Input and Button */}
      <div className="flex items-center px-2 h-[50px]">
        <div className="border border-gray-300 w-full flex h-full rounded-l-lg">
          <Categories data={categories} />
          <div className="flex items-center gap-4 p-2 w-full relative">
            <CiSearch className="size-7 text-gray-500" />
            <input
              value={query}
              onChange={handleChange}
              placeholder="Search your favorite product..."
              type="text"
              name="search"
              className="w-full border-none outline-none pr-8"
            />

            {query && (
              <motion.button
                initial={{ opacity: 0, scale: 0.8 }}
                animate={{ opacity: 1, scale: 1 }}
                onClick={clearSearch}
                className="absolute right-2 p-1 hover:bg-gray-100 rounded-full transition-colors duration-200"
              >
                <MdClose className="w-4 h-4 text-gray-500" />
              </motion.button>
            )}
          </div>
        </div>

        <motion.button
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
          className="h-full px-6 bg-gradient-to-r from-blue-600 to-blue-700 hover:from-blue-700 hover:to-blue-800 rounded-r-lg text-white flex items-center justify-center font-medium transition-all duration-200 shadow-lg"
        >
          Search
        </motion.button>
      </div>

      {/* Search Results Dropdown */}
      <AnimatePresence>
        {showResults && (
          <motion.div
            initial={{ opacity: 0, y: -10, scale: 0.95 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: -10, scale: 0.95 }}
            transition={{ duration: 0.2 }}
            className="absolute top-full left-2 right-2 mt-2 bg-white rounded-xl shadow-2xl border border-gray-200 z-50 h-[450px] custom-scrollbar overflow-hidden"
          >
            {/* Header */}
            <div className="p-4 border-b border-gray-100 bg-gradient-to-r from-gray-50 to-white">
              <div className="flex items-center justify-between">
                <h3 className="font-semibold text-gray-900">
                  Search Results
                  {!loading && searchData.length > 0 && (
                    <span className="ml-2 text-sm text-gray-500">
                      ({searchData.length} found)
                    </span>
                  )}
                </h3>

                {loading && (
                  <motion.div
                    animate={{ rotate: 360 }}
                    transition={{
                      duration: 1,
                      repeat: Infinity,
                      ease: "linear",
                    }}
                  >
                    <AiOutlineLoading3Quarters className="w-5 h-5 text-blue-500" />
                  </motion.div>
                )}
              </div>
            </div>

            {/* Results Content */}
            <div className="max-h-96 custom-scrollbar overflow-y-auto">
              {loading ? (
                <div className="p-8 text-center">
                  <motion.div
                    animate={{ rotate: 360 }}
                    transition={{
                      duration: 1,
                      repeat: Infinity,
                      ease: "linear",
                    }}
                    className="inline-block mb-4"
                  >
                    <AiOutlineLoading3Quarters className="w-8 h-8 text-blue-500" />
                  </motion.div>
                  <p className="text-gray-600">Searching for products...</p>
                </div>
              ) : searchData.length > 0 ? (
                <div className="p-4 space-y-3">
                  {searchData.map((product) => (
                    <SearchResultItem key={product.id} product={product} />
                  ))}
                </div>
              ) : query.trim() ? (
                <motion.div
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  className="p-8 text-center"
                >
                  <BiNoEntry className="w-12 h-12 text-gray-400 mx-auto mb-4" />
                  <h4 className="font-medium text-gray-900 mb-2">
                    No results found
                  </h4>
                  <p className="text-gray-600 text-sm">
                    We couldn't find any products matching "{query}"
                  </p>
                </motion.div>
              ) : null}
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Backdrop */}
      <AnimatePresence>
        {showResults && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={() => setShowResults(false)}
            className="fixed inset-0  z-40"
          />
        )}
      </AnimatePresence>
    </div>
  );
}
