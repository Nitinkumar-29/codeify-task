import React, { useContext } from "react";
import { FaTimes } from "react-icons/fa";
import ProductContext from "../context/ProductContext";

const ViewProductModal = ({ isOpen, onClose }) => {
  const { productData } = useContext(ProductContext);
  if (!isOpen || !productData) return null;
  return (
    <div className="fixed inset-0 bg-black bg-opacity-75 flex justify-center items-center z-50">
      <div className="bg-white p-6 rounded-lg shadow-lg max-w-lg w-full relative">
        <button
          className="absolute top-2 right-2 text-red-500"
          onClick={onClose}
        >
          <FaTimes />
        </button>
        <h2 className="text-2xl font-semibold mb-4">{productData.name}</h2>
        <p className="mb-4">Category: {productData.productCategory}</p>
        <div className="flex space-x-4 overflow-x-auto">
          {productData.media?.map((file, index) => (
            <img
              key={index}
              src={file}
              alt={`Product media ${index + 1}`}
              className="w-24 h-24 object-cover rounded-md"
            />
          ))}
        </div>
      </div>
    </div>
  );
};

export default ViewProductModal;
