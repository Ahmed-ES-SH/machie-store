"use client";
import React, { useEffect, useState } from "react";
import { ProductType } from "@/app/types/productType";
import ProductCard from "../_products/ProductCard";
import SelectedCategories from "./SelectedCategories";
import { useFetchData } from "@/app/hooks/useFetchData";
import { useVariables } from "@/app/context/VariablesContext";
import DummyPagination from "../../_global/DummyPagination";
import { useData } from "@/app/context/DataContext";

export default function LaptopsShop() {
  const { categoryData, categories: currentCats } = useData();
  const { categories, setCategories } = useVariables();
  const { data } = useFetchData<{ products: ProductType[] }>(
    `/products/category/Laptops`
  );

  const [page, setPage] = useState(1);
  const [totalPages, setTotalPages] = useState(0);
  const [showCategoryProducts, setShowCategoryProducts] = useState(false);
  const [products, setProducts] = useState<ProductType[]>([]);

  const limit = 16;

  useEffect(() => {
    if (data) setProducts(data.products);
  }, [data]);

  useEffect(() => {
    if (categories.length > 0) {
      setShowCategoryProducts(true);
      setPage(1);
    } else {
      setShowCategoryProducts(false);
      setPage(1);
    }
  }, [categories]);

  useEffect(() => {
    const totalItems = showCategoryProducts
      ? categoryData.length
      : products.length;
    setTotalPages(Math.ceil(totalItems / limit));
  }, [categoryData, products.length, showCategoryProducts]);

  const paginatedData = showCategoryProducts ? categoryData : products;
  const currentData = paginatedData.slice((page - 1) * limit, page * limit);

  useEffect(() => {
    if (currentCats) setCategories([currentCats[6]]);
  }, [currentCats, setCategories]);

  return (
    <>
      <div className="flex-1/2 h-full relative py-2">
        <SelectedCategories />

        <div className="grid grid-cols-[repeat(auto-fit,minmax(250px,1fr))] gap-4 justify-items-center">
          {currentData.map((product: ProductType, index: number) => (
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
