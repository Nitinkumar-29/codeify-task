import React from "react";
import Hero from "../components/Hero";
import About from "../components/About";
import Products from "../components/Products";

const Home = () => {
  return (
    <div className="flex flex-col w-full h-full">
      <Hero />
      <About />
      <Products />
    </div>
  );
};

export default Home;
