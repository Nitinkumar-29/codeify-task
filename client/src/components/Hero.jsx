import React from "react";
import { Link } from "react-router-dom";

const Hero = () => {
  return (
    <div className="relative flex items-center justify-center w-full h-[80vh]">
      <img
        src="/images/hero.jpg"
        className="-z-10 absolute h-full w-full mx-auto object-cover object-center"
        alt=""
      />
      <div className="absolute bg-black bg-opacity-50 w-full h-full" />
      <div className="mx-auto z-10 text-white flex flex-col space-y-8">
        <div className="text-2xl sm:text-4xl md:text-5xl font-semibold text-center">
          <h1>Advanced Solutions for Smart</h1>
          <h1>Monitoring and Connectivity</h1>
        </div>
        <p className="w-3/4 sm:w-2/3 md:w-1/2 mx-auto text-center">
          Empowering businesses with cutting-edge IoT devices and semiconductor
          solutions. Enhance efficiency, reduce costs, and drive smarter
          operators.
        </p>
        <Link
          to="/products"
          className="bg-white text-black p-2 w-fit mx-auto text-sm"
        >
          Explore Products
        </Link>
      </div>
    </div>
  );
};

export default Hero;
