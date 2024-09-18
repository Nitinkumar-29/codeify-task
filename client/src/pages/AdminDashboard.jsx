import React, { useState } from "react";
import { RxHamburgerMenu } from "react-icons/rx";
import { Link, Outlet, useLocation } from "react-router-dom";

const AdminDashboard = () => {
  const location = useLocation();
  const [displayType, setDisplayType] = useState("hidden");

  // toggle function
  const toggleDisplay = () => {
    if (displayType === "hidden") {
      setDisplayType("flex");
    } else {
      setDisplayType("hidden");
    }
  };
  return (
    <div className="min-h-screen text-black">
      <div className="flex justify-start w-full mt-16 ">
        <button
          onClick={toggleDisplay}
          className="fixed top-16 backdrop-blur-3xl bg-opacity-60 bg-zinc-200 left-0 flex md:hidden m-4 p-1 border-[1px] border-black rounded-md w-fit h-fit"
        >
          <RxHamburgerMenu size={25} />
        </button>
        <div
          className={`fixed left-0 top-32 bg-zinc-200 backdrop-blur-3xl bg-opacity-60 p-3  md:static ${displayType} md:flex flex-col space-y-2 md:p-4 md:w-40 md:border-r-2 border-black h-fit md:min-h-screen`}
        >
          <Link
            onClick={() => {
              setDisplayType("hidden");
            }}
            className={`${
              location.pathname === "/admin/categories" ? "bg-zinc-300" : ""
            } hover:bg-zinc-200 px-2 py-1 rounded-md duration-200`}
            to="/admin/categories"
          >
            Categories
          </Link>
          <Link
            onClick={() => {
              setDisplayType("hidden");
            }}
            className={`${
              location.pathname === "/admin/products" ? "bg-zinc-300" : ""
            } hover:bg-zinc-200 px-2 py-1 rounded-md duration-200`}
            to="/admin/products"
          >
            Products
          </Link>
          <Link
            onClick={() => {
              setDisplayType("hidden");
            }}
            className={`${
              location.pathname === "/admin/services" ? "bg-zinc-300" : ""
            } hover:bg-zinc-200 px-2 py-1 rounded-md duration-200`}
            to="/admin/services"
          >
            Services
          </Link>
        </div>
        <Outlet />
      </div>
    </div>
  );
};

export default AdminDashboard;
