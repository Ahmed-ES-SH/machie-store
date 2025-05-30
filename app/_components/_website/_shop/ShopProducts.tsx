"use client";
import React, { useEffect, useState } from "react";
import { FaTimes } from "react-icons/fa";
import ProductCard from "../_products/ProductCard";
import { ProductType } from "@/app/types/productType";
import DummyPagination from "../../_global/DummyPagination";
import { AiOutlineLoading } from "react-icons/ai";
import { motion } from "framer-motion";

interface Props {
  categories: string[];
  setCategories: React.Dispatch<React.SetStateAction<string[]>>;
}

export default function ShopProducts({ categories, setCategories }: Props) {
  const [products, setProducts] = useState<ProductType[]>([]);
  const [loading, setLoading] = useState(false);
  const [total, setTotal] = useState(0);
  const [page, setPage] = useState(1);

  const limit = 16;

  useEffect(() => {
    const fetchProducts = async () => {
      setLoading(true);
      try {
        const skip = (page - 1) * limit;
        const res = await fetch(
          `https://dummyjson.com/products?limit=${limit}&skip=${skip}`
        );
        const data = await res.json();
        setProducts(data.products);
        setTotal(data.total);
      } catch (error) {
        console.error("Error fetching products:", error);
      }
      setLoading(false);
    };

    fetchProducts();
  }, [page]);

  const totalPages = Math.ceil(total / limit);

  if (loading)
    return (
      <div className="flex-1/2 h-screen flex items-center justify-center">
        <motion.div
          animate={{ rotate: "360deg" }}
          transition={{ duration: 0.5, repeat: Infinity, ease: "linear" }}
        >
          <AiOutlineLoading className="size-32 text-primary-yellow" />
        </motion.div>
      </div>
    );

  return (
    <>
      <div className="flex-1/2 h-full relative py-2">
        {categories.length > 0 && (
          <div className="w-[97%] m-auto h-fit py-4 px-2">
            <ul className="flex items-center gap-2 flex-wrap">
              {categories.map((cat, index) => (
                <li
                  key={index}
                  onClick={() =>
                    setCategories((prev) =>
                      prev.filter((_, ine) => ine !== index)
                    )
                  }
                  className="cursor-pointer whitespace-nowrap text-[14px] font-light flex items-center gap-2 rounded-md px-2 py-1 border"
                >
                  <FaTimes width={16} />
                  <p>{cat}</p>
                </li>
              ))}
            </ul>
          </div>
        )}

        <div className="grid grid-cols-[repeat(auto-fit,minmax(250px,1fr))] gap-4 justify-items-center">
          {products.map((product: ProductType, index: number) => (
            <ProductCard key={index} product={product} />
          ))}
        </div>

        <DummyPagination
          page={page}
          totalPages={totalPages}
          setPage={setPage}
        />
      </div>
    </>
  );
}
