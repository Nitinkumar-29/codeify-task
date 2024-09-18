import React from "react";
import { AiOutlineThunderbolt } from "react-icons/ai";
import { IoBatteryCharging, IoShieldCheckmarkOutline } from "react-icons/io5";
import { FaWifi } from "react-icons/fa";

const About = () => {
  return (
    <div className="flex flex-col space-y-20 items-center justify-start w-full h-full md:h-[130vh]">
      <div className="flex flex-col md:flex-row items-center md:justify-between md:items-start mt-10 bg-white w-[80%] mx-auto">
        <h1 className="text-xl font-semibold whitespace-nowrap">About us</h1>
        <div className="flex flex-col items-start w-[95%] mt-6 md:mt-0 md:w-[80%]">
          <p className="flex text-xl md:text-3xl flex-wrap w-full ">
            We specialize in delivering cutting-edge IoT devices and
            semiconductor equipment that empower businesses to optimize their
            operations and maximize efficiency.
          </p>
          <button className="underline underline-offset-2 text-black mt-4">
            Read More
          </button>
        </div>
      </div>
      <div className="relative flex flex-col w-[90%] md:w-[80%] items-center space-y-20">
        <div className="md:absolute top-6 left-0 flex flex-col md:flex-row space-y-6 md:space-y-0 md:space-x-6 w-full md:w-1/2">
          <span className="relative bottom-2 flex p-4 h-fit w-fit rounded-md bg-black text-white">
            <AiOutlineThunderbolt size={40} />
          </span>
          <div className="flex flex-col w-[95%] md:w-5/6 space-y-3">
            <span className="text-xl font-semibold">
              Advanced Battery Technology
            </span>
            <p>
              Lorem ipsum dolor sit amet consectetur, adipisicing elit. Quo
              officiis rem optio porro ad suscipit quod atque provident!
              Officiis, ipsum!
            </p>
          </div>
        </div>
        <div className="md:absolute top-24 right-0 flex flex-col md:flex-row space-y-6 md:space-y-0 md:space-x-6 w-full md:w-1/2">
          <span className="relative bottom-2 flex p-4 h-fit w-fit rounded-md bg-black text-white">
            <FaWifi size={40} />
          </span>
          <div className="flex flex-col w-[95%] md:w-5/6 space-y-3">
            <span className="text-xl font-semibold">Seemless Connectivity</span>
            <p>
              Lorem ipsum dolor sit amet consectetur, adipisicing elit. Quo
              officiis rem optio porro ad suscipit quod atque provident!
              Officiis, ipsum!
            </p>
          </div>
        </div>
        <div className="md:absolute top-56 left-0 flex flex-col md:flex-row space-y-6 md:space-y-0 space-x-6 w-full md:w-1/2">
          <span className="relative bottom-2 flex p-4 h-fit w-fit rounded-md bg-black text-white">
            <IoBatteryCharging size={40} />
          </span>
          <div className="flex flex-col w-[95%] md:w-5/6 space-y-3">
            <span className="text-xl font-semibold">
              Intelligence Charging Solutions
            </span>
            <p>
              Lorem ipsum dolor sit amet consectetur, adipisicing elit. Quo
              officiis rem optio porro ad suscipit quod atque provident!
              Officiis, ipsum!
            </p>
          </div>
        </div>
        <div className="md:absolute top-96 right-0 flex flex-col md:flex-row space-y-6 md:space-y-0 space-x-6 w-full md:w-1/2">
          <span className="relative bottom-2 flex p-4 h-fit w-fit rounded-md bg-black text-white">
            <IoShieldCheckmarkOutline size={40} />
          </span>
          <div className="flex flex-col w-[95%] md:w-5/6 space-y-3">
            <span className="text-xl font-semibold">
              Enhanced Safety Features
            </span>
            <p>
              Lorem ipsum dolor sit amet consectetur, adipisicing elit. Quo
              officiis rem optio porro ad suscipit quod atque provident!
              Officiis, ipsum!
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default About;
