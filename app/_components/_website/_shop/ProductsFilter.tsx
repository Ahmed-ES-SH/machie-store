"use client";
import React, { useEffect, useState } from "react";
import Img from "../../_global/Img";
import { MdCheckCircleOutline } from "react-icons/md";
import { categoryType, useData } from "@/app/context/DataContext";
import { useVariables } from "@/app/context/VariablesContext";
import { AnimatePresence, motion } from "framer-motion";
import { FaTimes } from "react-icons/fa";
import { CiFilter } from "react-icons/ci";
import Loading from "../../_global/Loading";
import ErrorMessage from "../../_global/ErrorMessage";

export default function ProductsFilter() {
  const {
    categories: selectedCategories,
    setCategories: setSelectedCategories,
    width,
  } = useVariables();
  const { categories, loading } = useData();

  const colors = [
    { name: "black", color: "black" },
    { name: "Blue", color: "#1e73be" },
    { name: "Brown", color: "#49271d" },
    { name: "Gray", color: "#bfbfbf" },
    { name: "green", color: "#50b948" },
    { name: "Red", color: "#cb2028" },
  ];

  const [rangeValue, setRangeValue] = useState<string>("2500");
  const [showFilter, setShowFilter] = useState(false);
  const [showErrorMessage, setShowErrorMessage] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");

  const handleCheckboxChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const { value, checked } = event.target;
    const selectedCat = JSON.parse(value); // Ensure it's parsed as an object

    if (checked) {
      setSelectedCategories([...selectedCategories, selectedCat]);
    } else {
      setSelectedCategories(
        selectedCategories.filter(
          (category: categoryType) => category.name !== selectedCat.name
        )
      );
    }
  };

  const ToggleFilter = () => {
    setShowFilter((prev) => !prev);
  };

  useEffect(() => {
    if (width > 1280) {
      setShowFilter(true);
    }
  }, [width]);

  const variants = {
    initial: {
      x: -200,
      opacity: 0,
    },
    animate: {
      x: 0,
      opacity: 1,
    },
  };

  const apple = {
    name: "Apple",
    slug: "smartphones",
  };

  const samsung = {
    name: "Samsung",
    slug: "smartphones",
  };

  const CloseError = () => {
    setShowErrorMessage(false);
  };

  const handleShowError = (message: string) => {
    setShowErrorMessage(true);
    setErrorMessage(message);
  };

  if (loading) return <Loading />;

  return (
    <>
      <AnimatePresence>
        {showFilter ? (
          <motion.div
            variants={variants}
            initial="initial"
            animate="animate"
            exit={{ x: -200 }}
            transition={{ duration: 0.5 }}
            className="xl:flex-1 xl:sticky xl:h-full xl:w-full overflow-hidden w-[350px] h-screen overflow-y-auto custom-scrollbar fixed z-[999]   py-4 px-4  xl:top-0 -top-4 left-0 mt-4 border-r bg-white border-gray-200"
          >
            <FaTimes
              className="text-red-300 cursor-pointer absolute top-4 right-3  hover:text-red-500 hover:scale-125 duration-300 block xl:hidden"
              onClick={ToggleFilter}
            />
            <div>
              <h1 className="H-1 py-3 border-b border-gray-200">
                product Categories
              </h1>
              <div className="mt-4 px-4 py-2 rounded-md bg-white shadow-sm">
                {categories?.map((cat, index) => (
                  <div
                    key={index}
                    className="flex items-center gap-3 py-2 not-last:border-b border-gray-200"
                  >
                    <input
                      id={`cat-${index}`}
                      type="checkbox"
                      value={JSON.stringify(cat)}
                      onChange={handleCheckboxChange}
                      checked={
                        selectedCategories.some(
                          (selectedCat) => selectedCat.name === cat.name
                        ) || false
                      }
                      className="w-4 h-4 accent-blue-600"
                    />
                    <label
                      htmlFor={`cat-${index}`}
                      className="text-sm text-gray-800  cursor-pointer"
                    >
                      {cat.name}
                    </label>
                  </div>
                ))}
              </div>
            </div>
            <div className="mt-8">
              <h1 className="H-1 py-3 border-b  border-gray-200">
                Filter by Price
              </h1>
              <div className="w-[95%] m-auto mt-6 ">
                <div className="flex items-center justify-between ">
                  <p>price : $20 -- $ {rangeValue}</p>
                  <button
                    onClick={() =>
                      handleShowError(
                        "This feature is not available because the database does not allow filtering products by price. If you do it locally, it will have a negative impact on the application."
                      )
                    }
                    className="bg-primary-blue text-white hover:bg-white hover:text-black hover:border-primary-blue hover:scale-110 duration-300 border border-transparent  px-4 py-2 rounded-md"
                  >
                    Filter
                  </button>
                </div>
                <input
                  min={20}
                  max={6000}
                  onChange={(e) => setRangeValue(e.target.value)}
                  type="range"
                  className=" w-full mt-3 h-[10px]"
                />
              </div>
            </div>
            <div className="mt-8">
              <h1 className="H-1 py-3 border-b  border-gray-200">
                Filter by color
              </h1>
              <div className="w-[95%] m-auto mt-6">
                {colors.map((color, index) => (
                  <div
                    onClick={() =>
                      handleShowError(
                        "This feature is not available because the database does not allow filtering products by colors."
                      )
                    }
                    key={index}
                    className="flex cursor-pointer items-center justify-between gap-6 py-3 w-full group"
                  >
                    <div className="flex items-center justify-between  gap-6">
                      <span
                        style={{ background: color.color }}
                        className={`w-[25px] h-[25px] rounded-full flex items-center justify-center `}
                      >
                        <MdCheckCircleOutline
                          className="text-white duration-150 opacity-0 group-hover:opacity-100"
                          width={13}
                        />
                      </span>
                      <p className="">{color.name}</p>
                    </div>
                    <p className="text-gray-400">(2)</p>
                  </div>
                ))}
              </div>
            </div>
            <div className="mt-8">
              <h1 className="H-1 py-3 border-b  border-gray-200">Brands</h1>
              <div className="px-2 mt-3 w-[95%] m-auto ">
                <div className="flex items-center gap-4 py-3 w-full justify-between ">
                  <div className="flex items-center gap-4 ">
                    <input
                      onChange={handleCheckboxChange}
                      id="apple"
                      checked={
                        selectedCategories.some(
                          (selectedCat) => selectedCat.name === apple.name
                        ) || false
                      }
                      value={JSON.stringify(apple)}
                      type="checkbox"
                    />
                    <label htmlFor="apple" className="text-[15px] ">
                      Apple
                    </label>
                  </div>
                  <p className="">(5)</p>
                </div>
                <div className="flex items-center gap-4 py-3 w-full justify-between ">
                  <div className="flex items-center gap-4 ">
                    <input
                      onChange={handleCheckboxChange}
                      id="samsung"
                      checked={
                        selectedCategories.some(
                          (selectedCat) => selectedCat.name === samsung.name
                        ) || false
                      }
                      value={JSON.stringify(samsung)}
                      type="checkbox"
                    />
                    <label htmlFor="samsung" className="text-[15px] ">
                      Samsung
                    </label>
                  </div>
                  <p className="">(9)</p>
                </div>
              </div>
            </div>
            <div className="xl:block hidden mt-4  w-[95%] m-auto">
              <Img
                src={"/images/widget-banner.jpg"}
                alt="widget-banner"
                className="w-full h-[80vh]  "
              />
            </div>
          </motion.div>
        ) : (
          <div
            onClick={ToggleFilter}
            className="w-12 h-12 z-[999] rounded-full fixed bottom-6 right-4 flex items-center justify-center cursor-pointer bg-primary-blue hover:bg-sky-500 text-white duration-300"
          >
            <CiFilter className="size-8" />
          </div>
        )}
      </AnimatePresence>
      <ErrorMessage
        isOpen={showErrorMessage}
        onClose={CloseError}
        Message={errorMessage}
      />
    </>
  );
}
