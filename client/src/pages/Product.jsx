import React from "react";
import { FaArrowRight } from "react-icons/fa";

const Product = () => {
  return (
    <>
      <div className="flex flex-col justify-center items-center my-16 w-full">
        <div className="flex flex-col items-center space-y-12 w-[90%]">
          <div className="flex flex-col md:flex-row w-[90%] space-y-6 md:space-y-0 justify-between mt-10">
            <div className="flex flex-col space-y-3 w-full h-full md:w-[300px] lg:w-[400px] xl:w-[500px] md:h-[200px] lg:h-[400px]">
              <img src="/images/hero.jpg" className="w-full h-full" alt="" />
              <div className="grid grid-cols-4 gap-4">
                <img src="/images/hero.jpg" alt="" />
                <img src="/images/hero.jpg" alt="" />
                <img src="/images/hero.jpg" alt="" />
                <img src="/images/hero.jpg" alt="" />
              </div>
            </div>
            <div className="flex flex-col space-y-4 w-full md:w-1/2 ">
              <span className="text-2xl font-semibold">
                Solar Lightning System
              </span>
              <p className="text-lg text-zinc-800">
                Design and developed a PWM based solar charging controller that
                regulates the charging of batteries from solar panels. It
                ensures efficient battery charging by preventing overcharging
                and deep discharging, thereby protecting battery life and
                optimizing performance.Design and developed a PWM based solar
                charging controller that regulates the charging of batteries
                from solar panels.
              </p>
              <button className="flex w-fit space-x-2 items-center p-3 bg-red-600 text-white rounded">
                <span>Request Quote</span> <FaArrowRight />
              </button>
            </div>
          </div>
          <div className="flex flex-col md:flex-row space-y-6 md:space-y-0 justify-between w-[90%] mt-6">
            <div className="flex flex-col space-y-2 md:space-y-4">
              <span className="font-semibold text-2xl">Features</span>
              <div className="flex flex-col space-y-4 text-lg">
                <li>Real-Time Monitoring Real-Time Monitoring.</li>
                <li>Prevention from exccessive load.</li>
                <li>Fault Detection and Safety.</li>
                <li>Copact size and cost effective.</li>
              </div>
            </div>
            <div className="flex flex-col space-y-2 md:space-y-4">
              <span className="font-semibold text-2xl">Technical Details</span>
              <div className="flex flex-col space-y-4 text-lg">
                <li>Capable to charge a battery upto 120W (12V/10A)</li>
                <li>8 bit Microcontroller</li>
                <li> 1.7 Inch Mono-Chrome Display</li>
              </div>
            </div>{" "}
          </div>
          <div className="flex flex-col space-y-4 w-[90%]">
            <span className="text-3xl font-semibold">Specifications</span>
            <p className="text-lg text-zinc-600">
              Design and developed a PWM based solar charging controller that
              regulates the charging of batteries from solar panels. It ensures
              efficient battery charging by preventing overcharging and deep
              discharging, thereby protecting battery life and optimizing
              performance.Design and developed a PWM based solar charging
              controller that regulates the charging of batteries from solar
              panels
            </p>
          </div>
          <div className="flex flex-col space-y-4 justify-between w-[90%]">
            <span className="text-2xl font-semibold">Photos</span>
            <div className="grid grid-cols-4 gap-6">
              <img src="/images/hero.jpg" alt="" className="w-full h-200px]" />
              <img src="/images/hero.jpg" alt="" className="w-full h-200px]" />
              <img src="/images/hero.jpg" alt="" className="w-full h-200px]" />
              <img src="/images/hero.jpg" alt="" className="w-full h-200px]" />
              <img src="/images/hero.jpg" alt="" className="w-full h-200px]" />
              <img src="/images/hero.jpg" alt="" className="w-full h-200px]" />
              <img src="/images/hero.jpg" alt="" className="w-full h-200px]" />
              <img src="/images/hero.jpg" alt="" className="w-full h-200px]" />
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default Product;
