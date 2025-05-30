"use client";

import React, { Dispatch, SetStateAction, useEffect } from "react";
import { BsChevronLeft, BsChevronRight } from "react-icons/bs";

interface Props {
  page: number;
  totalPages: number;
  setPage: Dispatch<SetStateAction<number>>;
}

export default function DummyPagination({ page, setPage, totalPages }: Props) {
  const getPageNumbers = () => {
    const pages = [];

    if (totalPages <= 7) {
      for (let i = 1; i <= totalPages; i++) {
        pages.push(i);
      }
    } else {
      pages.push(1);

      if (page > 4) {
        pages.push("start-ellipsis");
      }

      const startPage = Math.max(2, page - 1);
      const endPage = Math.min(totalPages - 1, page + 1);

      for (let i = startPage; i <= endPage; i++) {
        pages.push(i);
      }

      if (page < totalPages - 3) {
        pages.push("end-ellipsis");
      }

      pages.push(totalPages);
    }

    return pages;
  };

  // استخدم useEffect للتمرير عند تغيير الصفحة
  useEffect(() => {
    window.scrollTo({
      top: 600,
      behavior: "smooth", // تمرير ناعم
    });
  }, [page]);

  const pages = getPageNumbers();

  return (
    <div className="max-w-4xl mx-auto p-4">
      <div className="flex justify-center items-center gap-2">
        <button
          onClick={() => setPage((p) => Math.max(p - 1, 1))}
          disabled={page === 1}
          className="p-2 rounded-md bg-blue-600 text-white disabled:bg-gray-400 flex items-center justify-center"
          aria-label="Previous Page"
        >
          <BsChevronLeft size={18} />
        </button>

        {pages.map((p, idx) => {
          if (typeof p === "string") {
            return (
              <span
                key={idx}
                className="px-3 py-1 select-none text-gray-500 cursor-default"
              >
                &hellip;
              </span>
            );
          }

          return (
            <button
              key={idx}
              onClick={() => setPage(p)}
              className={`px-3 py-1 rounded-md ${
                p === page
                  ? "bg-blue-600 text-white font-semibold"
                  : "hover:bg-blue-100"
              }`}
              aria-current={p === page ? "page" : undefined}
            >
              {p}
            </button>
          );
        })}

        <button
          onClick={() => setPage((p) => Math.min(p + 1, totalPages))}
          disabled={page === totalPages}
          className="p-2 rounded-md bg-blue-600 text-white disabled:bg-gray-400 flex items-center justify-center"
          aria-label="Next Page"
        >
          <BsChevronRight size={18} />
        </button>
      </div>
    </div>
  );
}
