import React, { useContext, useState } from "react";
import CategoryContext from "../context/CategoryContext";
import AddCategoryModal from "../components/AddCategory"; // Import the modal component
import { FaEye, FaPencilAlt, FaTrash } from "react-icons/fa";

const Category = () => {
  const { categories, deleteCategory } = useContext(CategoryContext);
  const [isModalOpen, setIsModalOpen] = useState(false); // Modal state

  // Open the modal
  const openModal = () => {
    setIsModalOpen(true);
  };

  // Close the modal
  const closeModal = () => {
    setIsModalOpen(false);
  };

  return (
    <div className="flex w-full justify-center min-h-screen p-5">
      <div className="flex flex-col w-full max-w-5xl">
        {/* Add Category Button */}
        <div className="flex justify-end mb-4">
          <button
            onClick={openModal}
            className="bg-blue-500 text-white px-4 py-2 rounded-md hover:bg-blue-600"
          >
            Add Category
          </button>
        </div>

        {/* Category Table */}
        <table className="min-w-full table-auto border-collapse border border-gray-300">
          <thead>
            <tr className="bg-gray-200">
              <th className="border px-4 py-2">S. No</th>
              <th className="border px-4 py-2">Category Name</th>
              <th className="border px-4 py-2">Action</th>
            </tr>
          </thead>
          <tbody>
            {categories.map((category, index) => (
              <tr key={category._id}>
                <td className="border px-4 py-2">{index + 1}</td>
                <td className="border px-4 py-2">{category.name}</td>

                <td className="flex border px-4 py-2 text-center text-white">
                  <button className="text-green-600 md:text-white md:bg-green-500 px-2 py-1 rounded-md hover:bg-green-600">
                    <span className="hidden md:flex">Edit</span>
                    <FaPencilAlt className="flex md:hidden" />
                  </button>
                  <button
                    onClick={() => deleteCategory(category._id)}
                    className="text-red-600 md:text-white md:bg-red-500 px-2 py-1 rounded-md ml-2 hover:bg-red-600"
                  >
                    <span className="hidden md:flex">Delete</span>{" "}
                    <FaTrash className="flex md:hidden" />{" "}
                  </button>
                  <button className="text-black md:text-white md:bg-black px-2 py-1 rounded-md ml-2 hover:bg-gray-800">
                    <span className="hidden md:flex">View</span>{" "}
                    <FaEye className="flex md:hidden" />
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* Modal for adding category */}
      <AddCategoryModal isOpen={isModalOpen} onClose={closeModal} />
    </div>
  );
};

export default Category;
