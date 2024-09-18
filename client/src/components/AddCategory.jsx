import React, { useContext } from "react";
import CategoryContext from "../context/CategoryContext";

const AddCategory = ({ isOpen, onClose,  }) => {
  const { categoryName, setCategoryName, addCategory } =
    useContext(CategoryContext);

  // Handle form submission
  const handleSubmit = (e) => {
    e.preventDefault();
    if (categoryName.trim()) {
      addCategory();
      setCategoryName(""); // Clear the input
      onClose(); // Close the modal after submission
    }
  };

  if (!isOpen) return null; // Don't render the modal if it's not open

  return (
    <div className="fixed inset-0 flex items-center justify-center bg-gray-500 bg-opacity-50">
      <div className="bg-white p-6 rounded-lg shadow-lg w-96">
        <h2 className="text-lg font-semibold mb-4">Add New Category</h2>
        <form onSubmit={handleSubmit}>
          <label className="block mb-2 text-sm font-medium">
            Category Name
          </label>
          <input
            type="text"
            value={categoryName}
            name="categoryName"
            onChange={(e) => setCategoryName(e.target.value)}
            className="w-full p-2 border border-gray-300 rounded mb-4"
            placeholder="Enter category name"
          />
          <div className="flex justify-end space-x-2">
            <button
              type="button"
              onClick={onClose}
              className="bg-gray-300 text-gray-700 px-4 py-2 rounded"
            >
              Cancel
            </button>
            <button
              type="submit"
              className="bg-blue-500 text-white px-4 py-2 rounded"
            >
              Add
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default AddCategory;
