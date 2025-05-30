/* eslint-disable react/no-unescaped-entities */
import Img from "@/app/_components/_global/Img";

export default function PhoneCard() {
  return (
    <>
      <div className="relative overflow-hidden w-full  border border-gray-200 shadow-lg rounded-lg flex flex-col items-start max-md:items-center max-md:justify-center h-[50vh] xl:h-[50vh] ">
        <div className="content px-4 w-full mt-6 m-auto  z-[5]">
          <p className="firstLine w-fit h-fit text-sky-500 p-1 font-normal text-[14px]">
            Super DISCOUND
          </p>
          <p className="firstTitle font-medium py-1 text-[22px] max-md:text-[17px]">
            New Phone 11
          </p>
          <p className=" font-bold py-1 text-[12px] max-md:text-[12px]">
            Dont't miss the last opportunity
          </p>
          <button className="btn-shop my-3 py-2 px-3 bg-sky-400 rounded-full  text-white">
            Shop now
          </button>
        </div>

        <Img
          className="w-[450px] absolute left-1/2 -translate-x-1/2 -bottom-32 object-cover z-[2]"
          src={"/images/category-1.jpg"}
          alt="phone-image"
        />
      </div>
    </>
  );
}
