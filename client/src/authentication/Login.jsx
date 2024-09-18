import React, { useContext, useState } from "react";
import AuthContext from "../context/AuthContext";
import { Link } from "react-router-dom";
import { FaEye, FaEyeSlash, FaSpinner } from "react-icons/fa";

const Login = () => {
  const { login, loginCredentials, setLoginCredentials, error, isLoading } =
    useContext(AuthContext);
  const [passwordType, setPasswordType] = useState("password");

  // toggle password type
  const togglePasswordType = () => {
    if (passwordType === "password") {
      setPasswordType("text");
      setInterval(() => {
        setPasswordType("password");
      }, 2000);
    } else {
      setPasswordType("password");
    }
  };

  // Handle input changes
  const handleOnChange = (e) => {
    setLoginCredentials({
      ...loginCredentials,
      [e.target.name]: e.target.value,
    });
  };

  // Handle form submission
  const handleSubmit = (e) => {
    e.preventDefault();
    login(); // This will be the login function from AuthContext
  };

  return (
    <>
      <div className="max-w-md mx-auto mt-10 p-5 bg-white rounded-lg">
        <h2 className="text-2xl font-bold mb-5 mx-auto w-fit mt-40">Login</h2>

        <form onSubmit={handleSubmit}>
          {/* Email Input */}
          <div className="mb-4">
            <label htmlFor="email" className="block font-medium">
              Email
            </label>
            <input
              type="email"
              name="email"
              value={loginCredentials.email}
              onChange={handleOnChange}
              className="w-full p-2 border border-gray-300 rounded outline-none"
              placeholder="Enter your email"
            />
          </div>

          {/* Password Input */}
          <div className="mb-4">
            <label htmlFor="password" className="block font-medium">
              Password
            </label>
            <div className="flex justify-between border border-gray-300 rounded">
              <input
                type={passwordType}
                name="password"
                value={loginCredentials.password}
                onChange={handleOnChange}
                className="w-full p-2 rounded outline-none"
                placeholder="Enter your password"
              />
              <span onClick={togglePasswordType} className="p-2">
                {passwordType === "password" ? <FaEye /> : <FaEyeSlash />}
              </span>
            </div>
          </div>

          <p className="text-red-500 font-medium mx-auto text-sm my-3 h-4">
            {error}
          </p>

          {/* Submit Button */}
          <button
            disabled={
              loginCredentials.password.length === 0 ||
              loginCredentials.email.length === 0
            }
            type="submit"
            className={`w-full bg-blue-500 text-white p-2 rounded ${
              loginCredentials.password.length === 0 ||
              loginCredentials.email.length === 0 ||
              isLoading === true
                ? "cursor-not-allowed bg-opacity-40"
                : "cursor-pointer hover:bg-blue-600 "
            }`}
          >
            {isLoading === true ? (
              <FaSpinner className="animate-spin mx-auto w-fit" size={20} />
            ) : (
              "Submit"
            )}
          </button>

          <div className="flex space-x-2 text-sm w-fit mx-auto mt-4">
            <span>
              Don't have an account ? &nbsp;{" "}
              <Link to="/createAccount" className="text-blue-600 font-semibold">
                Create Account
              </Link>
            </span>
          </div>
        </form>
      </div>
    </>
  );
};

export default Login;
