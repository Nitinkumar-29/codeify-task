import React, { useContext, useState } from "react";
import { FaUserAlt } from "react-icons/fa";
import { RxHamburgerMenu } from "react-icons/rx";

import { Link, useLocation, useNavigate } from "react-router-dom";
import AuthContext from "../context/AuthContext";

const Navbar = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const [displayType, setDisplayType] = useState("hidden");
  const { userData, setIsAuthenticated } = useContext(AuthContext);

  // toggle display
  const toggleDisplayType = () => {
    if (displayType === "hidden") {
      setDisplayType("flex");
    } else {
      setDisplayType("hidden");
    }
  };
  return (
    <>
      <div
        className={`z-20 fixed top-0 bg-black text-white flex w-full h-16 items-center justify-center ${
          location.pathname === "/" ? "bg-opacity-40" : "bg-opacity-100"
        }`}
      >
        <div className="flex items-center h-full w-[90%] lg:w-[70%] justify-between">
          <div className="flex w-full md:w-fit justify-between">
            <span>LOGO</span>
            <button onClick={toggleDisplayType} className="flex md:hidden">
              <RxHamburgerMenu size={25} />
            </button>
          </div>
          <div className="hidden md:flex space-x-12">
            <Link
              to="/"
              onClick={() => {
                window.scrollTo(0, 0);
              }}
            >
              Home
            </Link>
            <Link to="/">About us</Link>
            <Link
              to="/products"
              onClick={() => {
                window.scrollTo(0, 0);
              }}
            >
              Products
            </Link>
            <Link to="/">Services</Link>
            <Link to="/">Contact us</Link>
          </div>
          {localStorage.getItem("token") && (
            <div className="hidden md:flex items-center space-x-4">
              <Link
                to={`${userData.role === "admin" ? "/admin" : "/userProfile"}`}
              >
                <FaUserAlt size={25} />
              </Link>
              <button
                className="px-2 py-1 rounded-md text-white border-[1px] border-white"
                onClick={() => {
                  localStorage.removeItem("token");
                  setIsAuthenticated(false);
                  navigate("/login");
                }}
              >
                LogOut
              </button>
            </div>
          )}

          {/* mobile responsive */}
          <div
            className={`absolute top-16 left-0 ${
              displayType === "flex" ? "bg-black bg-opacity-40" : ""
            } flex flex-col space-y-4 w-full p-4`}
          >
            <div className={`${displayType} flex-col space-y-4 w-full`}>
              <Link
                to="/"
                onClick={() => {
                  window.scrollTo(0, 0);
                  setDisplayType("hidden");
                }}
              >
                Home
              </Link>
              <Link
                onClick={() => {
                  setDisplayType("hidden");
                }}
                to="/"
              >
                About us
              </Link>
              <Link
                to="/products"
                onClick={() => {
                  window.scrollTo(0, 0);
                  setDisplayType("hidden");
                }}
              >
                Products
              </Link>
              <Link
                onClick={() => {
                  setDisplayType("hidden");
                }}
                to="/"
              >
                Services
              </Link>
              <Link
                onClick={() => {
                  setDisplayType("hidden");
                }}
                to="/"
              >
                Contact us
              </Link>
            </div>
            {localStorage.getItem("token") && (
              <div className={`${displayType} flex-col space-y-4 pt-3`}>
                <Link
                  onClick={() => {
                    setDisplayType("hidden");
                  }}
                  to={`${
                    userData.role === "admin" ? "/admin" : "/userProfile"
                  }`}
                >
                  <FaUserAlt size={25} />
                </Link>
                <button
                  className="w-fit px-2 py-1 rounded-md text-white border-[1px] border-white"
                  onClick={() => {
                    localStorage.removeItem("token");
                    setIsAuthenticated(false);
                    navigate("/login");
                    setDisplayType("hidden");
                  }}
                >
                  LogOut
                </button>
              </div>
            )}
          </div>
        </div>
      </div>
    </>
  );
};

export default Navbar;
