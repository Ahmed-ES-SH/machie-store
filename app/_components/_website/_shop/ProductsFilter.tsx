import React, { Dispatch, SetStateAction, useState } from "react";
import Img from "../../_global/Img";
import { MdCheckCircleOutline } from "react-icons/md";

interface props {
  setCategories: Dispatch<SetStateAction<string[]>>;
}

export default function ProductsFilter({ setCategories }: props) {
  const categories = [
    "iphone",
    "phone Accesserios",
    "Phone Cases",
    "Postpaid Phones",
    "Prepaid Phones",
    "Prepaid Plans",
    "Refurbished Phones",
    "Samsung Galaxy",
    "Straight Talk",
    "Unlocked Phones",
  ];

  const colors = [
    { name: "black", color: "black" },
    { name: "Blue", color: "#1e73be" },
    { name: "Brown", color: "#49271d" },
    { name: "Gray", color: "#bfbfbf" },
    { name: "green", color: "#50b948" },
    { name: "Red", color: "#cb2028" },
  ];

  const [selectedCategories, setSelectedCategories] = useState<string[]>([]);
  const [rangeValue, setRangeValue] = useState<string>("2500");

  setCategories(selectedCategories);

  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const handleCheckboxChange = (event: any) => {
    const { value, checked } = event.target;
    if (checked) {
      setSelectedCategories([...selectedCategories, value]);
    } else {
      setSelectedCategories(
        selectedCategories.filter((category: string) => category !== value)
      );
    }
  };
  return (
    <>
      <div className="xl:flex-1 w-full h-full sticky top-0 left-0 mt-4 border-r border-gray-200">
        <div>
          <h1 className="H-1 py-3 border-b border-gray-200">
            product Categories
          </h1>
          <div className="mt-3  px-2 dark:bg-main_dash">
            {categories.map((cat, index) => (
              <div key={index} className="flex items-center gap-4 py-3 ">
                <input
                  id={cat}
                  className=""
                  value={cat}
                  type="checkbox"
                  onChange={handleCheckboxChange}
                />
                <label htmlFor={cat} className="text-[15px] ">
                  {cat}
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
              <button className="bg-gray-400   px-4 py-2 rounded-md">
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
          <h1 className="H-1 py-3 border-b  border-gray-200">Product Status</h1>
          <div className="px-2 mt-3 w-[95%] m-auto ">
            <div className="flex items-center gap-4 py-3 ">
              <input
                id="in-stock"
                className=""
                value="in-stock"
                type="checkbox"
                onChange={handleCheckboxChange}
              />
              <label htmlFor="in-stock" className="text-[15px] ">
                in stock
              </label>
            </div>
            <div className="flex items-center gap-4 py-3 ">
              <input
                id="on-sale"
                className=""
                value="on-sale"
                type="checkbox"
                onChange={handleCheckboxChange}
              />
              <label htmlFor="on-sale" className="text-[15px] ">
                on sale
              </label>
            </div>
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
                  className=""
                  value="Apple"
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
                  className=""
                  value="samsung"
                  type="checkbox"
                />
                <label htmlFor="samsung" className="text-[15px] ">
                  samsung
                </label>
              </div>
              <p className="">(9)</p>
            </div>
          </div>
        </div>
        <div className="mt-4  w-[95%] m-auto">
          <Img
            src={"/images/widget-banner.jpg"}
            alt="widget-banner"
            className="w-full h-[80vh]  "
          />
        </div>
      </div>
    </>
  );
}
