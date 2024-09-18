import React from "react";
import { CiCircleCheck } from "react-icons/ci";
import { FaArrowRight } from "react-icons/fa";

const Products = () => {
  return (
    <>
      <div className="flex flex-col items-center my-20">
        <span className="my-6 text-lg font-medium">Our Products</span>
        <div className="flex justify-center space-x-2 border-b-[1px] border-zinc-300 w-full">
          <span className="px-4 py-2 border-b-2 border-black font-semibold">
            Solar
          </span>
          <span className="px-4 py-2 ">Metering</span>
        </div>
        <div className="flex items-center justify-center w-full mt-10">
          <div className="flex flex-col md:flex-row items-center justify-between w-full md:w-2/3 max-auto">
            <div>
              <div className="z-10 relative top-10">
                <img
                  src="/images/hero.jpg"
                  className="w-40 h-40 rounded-full p-2 border-2 border-black"
                  alt=""
                />
              </div>
              <div className="relative -top-6 left-6 w-full">
                <img
                  src="/images/bg.jpg"
                  className=" w-60 h-60 rounded-full p-2 border-2 border-black"
                  alt=""
                />
              </div>
            </div>
            <div className="flex flex-col justify-between w-[90%] md:w-1/2 mt-4">
              <div className="flex items-center space-x-6">
                <div className="p-1 rounded-full border-[1px]">
                  <img src="/images/semi.jpg" className="h-8 w-8" alt="" />
                </div>
                <div className="flex items-center space-x-6">
                  <span className="font-medium text-lg">01</span>
                  <hr className="h-[1px] w-16 border-black bg-black border-2" />
                  <span>Lorem ipsum dolor</span>
                </div>
              </div>
              <div className="flex flex-col space-y-6 mt-8">
                <span className="text-3xl font-medium">
                  Solar Metering System
                </span>
                <p className="text-sm">
                  Choose us as your partner in progress for our commitment to
                  delivering top-tier technology that propels your business
                  forward. Our highperformance products are designed with
                  precision and backed by unparalleled{" "}
                </p>
                <div className="flex flex-col space-y-6">
                  <div className="flex space-x-4 items-start">
                    <span>
                      <CiCircleCheck size={25} className="font-medium" />
                    </span>
                    <p className="text-sm">
                      Choose us as your partner in progress for our commitment
                      to delivering top-tier technology{" "}
                    </p>
                  </div>
                  <div className="flex space-x-4 items-start">
                    <span>
                      <CiCircleCheck size={25} className="font-medium" />
                    </span>
                    <p className="text-sm">
                      Choose us as your partner in progress for our commitment
                      to delivering top-tier technology{" "}
                    </p>
                  </div>
                  <div className="flex space-x-4 items-start">
                    <span>
                      <CiCircleCheck size={25} className="font-medium" />
                    </span>
                    <p className="text-sm">
                      Choose us as your partner in progress for our commitment
                      to delivering top-tier technology{" "}
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
      <div className="flex flex-col space-y-6 items-center">
        <div className="flex flex-col items-center">
          <span>Why Choose ABCD</span>
          <div className="flex flex-col items-center w-[95%] md:w-1/2 space-y-3 md:space-y-6 mt-4">
            <span className="text-2xl md:text-3xl font-semibold">
              Your Power, Our Innovation
            </span>
            <span className="text-2xl md:text-3xl font-semibold">
              Leading the Future Together!
            </span>
            <p className="text-sm text-center">
              Choose us as your partner in progress for our commitment to
              delivering top-tier technology that propels your business forward.
              Our high-performance products are designed with precision and
              backed by unparalleled expertise, ensuring you have the most
              reliable and advanced solutions available.
            </p>
          </div>
        </div>
        <div className="grid grid-cols-1 sm:grid-cols-2 w-full py-6 md:grid-cols-3 gap-8 p-5 md:w-[90%] lg:w-[60%]">
          <div className="flex flex-col justify-between bg-zinc-200 text-sm h-80 p-6 rounded-md">
            <div className="flex justify-between items-center">
              <span className="text-xl font-semibold">Driving License</span>
              <FaArrowRight />
            </div>
            <p>
              Our high-performance products are designed with precision and
              backed by unparalleled expertise, ensuring
            </p>
          </div>
          <div className="relative flex flex-col justify-between bg-opacity-10 bg-zinc-200 text-sm h-80 rounded-md">
            <div className="absolute h-full w-full rounded-md -z-10 ">
              <img src="/images/bg.jpg" className="h-full w-full top-0 left-0 object-cover rounded-md" alt="" />
            </div>
            <div className="flex justify-between items-center p-6 text-white">
              <span className="text-xl font-semibold">Exceptional Quality</span>
              <FaArrowRight />
            </div>
            <p className="p-6 text-white">
              Our high-performance products are designed with precision and
              backed by unparalleled expertise, ensuring
            </p>
          </div>
          <div className="flex flex-col justify-between bg-zinc-200 text-sm h-80 p-6 rounded-md">
            <div className="flex justify-between items-center">
              <span className="text-xl font-semibold">
                Commitment To sustainability
              </span>
              <FaArrowRight />
            </div>
            <p>
              Our high-performance products are designed with precision and
              backed by unparalleled expertise, ensuring
            </p>
          </div>
        </div>
      </div>
    </>
  );
};

export default Products;
