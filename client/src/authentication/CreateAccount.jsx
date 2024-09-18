import React, { useContext } from "react";
import AuthContext from "../context/AuthContext";
import { Link } from "react-router-dom";
import { FaSpinner } from "react-icons/fa";

const CreateAccount = () => {
  const { createAccount, credentials, setCredentials, error, isLoading } =
    useContext(AuthContext);

  //   handle onchange
  const handleOnChange = (e) => {
    setCredentials({ ...credentials, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    createAccount();
  };
  return (
    <div className="max-w-md mx-auto mt-10 p-5 bg-white rounded-lg">
      <h2 className="text-2xl font-bold mb-5 mx-auto w-fit mt-40">
        Create Account
      </h2>

      <form onSubmit={handleSubmit}>
        {/* Name Input */}
        <div className="mb-4">
          <label htmlFor="name" className="block font-medium">
            Name
          </label>
          <input
            type="text"
            name="name"
            value={credentials.name}
            onChange={handleOnChange}
            className="w-full p-2 border border-gray-300 rounded"
            placeholder="Enter your name"
          />
        </div>

        {/* Email Input */}
        <div className="mb-4">
          <label htmlFor="email" className="block font-medium">
            Email
          </label>
          <input
            type="email"
            name="email"
            value={credentials.email}
            onChange={handleOnChange}
            className="w-full p-2 border border-gray-300 rounded"
            placeholder="Enter your email"
          />
        </div>

        {/* Password Input */}
        <div className="mb-4">
          <label htmlFor="password" className="block font-medium">
            Password
          </label>
          <input
            type="password"
            name="password"
            value={credentials.password}
            onChange={handleOnChange}
            className="w-full p-2 border border-gray-300 rounded"
            placeholder="Enter your password"
          />
        </div>

        <p className="text-red-500 font-medium text-sm my-4 h-4 mx-auto w-fit">
          {error.length > 0 && error}
        </p>

        {/* Submit Button */}
        <button
          disabled={
            credentials.password.length === 0 || credentials.email.length === 0
          }
          type="submit"
          className={`w-full bg-blue-500 text-white p-2 rounded ${
            credentials.password.length === 0 ||
            credentials.email.length === 0 ||
            credentials.name.length === 0 ||
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
            Already have an account ? &nbsp;{" "}
            <Link to="/login" className="text-blue-600 font-semibold">
              Login
            </Link>
          </span>
        </div>
      </form>
    </div>
  );
};

export default CreateAccount;
