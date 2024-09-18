import React, { useContext, useEffect, useState } from "react";
import AddProductModal from "../components/AddProduct"; // Import the AddProductModal component
import ViewProductModal from "../components/ViewProductModal"; // Import the ViewProductModal component
import ProductContext from "../context/ProductContext";
import { FaEye, FaPencilAlt, FaTrash } from "react-icons/fa";

const AdminProductPage = () => {
  const {
    products,
    fetchProducts,
    deleteProduct,
    fetchProductById,
    productData,
  } = useContext(ProductContext);
  const [isAddModalOpen, setIsAddModalOpen] = useState(false); // Add product modal state
  const [isViewModalOpen, setIsViewModalOpen] = useState(false); // View product modal state
  const [selectedProduct, setSelectedProduct] = useState(null); // Selected product for viewing

  // Open Add Product Modal
  const openAddModal = () => {
    setIsAddModalOpen(true);
  };

  // Close Add Product Modal
  const closeAddModal = () => {
    setIsAddModalOpen(false);
  };

  // Open View Product Modal
  const openViewModal = async (productId) => {
    fetchProductById(productId);
    setSelectedProduct(productData); // Set the selected product
    setIsViewModalOpen(true); // Open the view modal
  };

  // Close View Product Modal
  const closeViewModal = () => {
    setIsViewModalOpen(false);
    setSelectedProduct(null); // Reset the selected product
  };

  useEffect(() => {
    fetchProducts();
    // eslint-disable-next-line
  }, []);

  return (
    <div className="flex w-full justify-center min-h-screen p-5">
      <div className="flex flex-col w-full max-w-5xl">
        {/* Add Product Button */}
        <div className="flex justify-end mb-4">
          <button
            onClick={openAddModal}
            className="bg-blue-500 text-white px-4 py-2 rounded-md hover:bg-blue-600"
          >
            Add Product
          </button>
        </div>

        {/* Product Table */}
        {products?.length > 0 ? (
          <table className="min-w-full table-auto border-collapse border border-gray-300 overflow-x-scroll">
            <thead>
              <tr className="bg-gray-200">
                <th className="border px-4 py-2">S. No</th>
                <th className="border px-4 py-2">Name</th>
                <th className="border px-4 py-2">Category</th>
                <th className="hidden md:flex border px-4 py-2">Media</th>
                <th className="border px-4 py-2">Action</th>
              </tr>
            </thead>
            <tbody>
              {products?.map((product, index) => (
                <tr key={product._id}>
                  <td className="border px-4 py-2">{index + 1}</td>
                  <td className="border px-4 py-2">{product.name}</td>
                  <td className="border px-4 py-2">
                    {product.productCategory || "Data not available"}
                  </td>
                  <td className="hidden md:flex space-x-3 px-4 py-2">
                    {product.media?.map((file, index) => (
                      <img
                        key={index}
                        src={file}
                        className="h-16 w-16"
                        alt={`Product media ${index}`}
                      />
                    ))}
                  </td>
                  <td className=" border px-4 py-2 text-center text-white">
                    <button className="bg-green-500 px-2 py-1 rounded-md hover:bg-green-600">
                      <span className="hidden md:flex">Edit</span>
                      <FaPencilAlt className="flex md:hidden" />
                    </button>
                    <button
                      onClick={() => deleteProduct(product._id)}
                      className="bg-red-500 px-2 py-1 rounded-md ml-2 hover:bg-red-600"
                    >
                      <span className="hidden md:flex">Delete</span>
                      <FaTrash className="flex md:hidden" />
                    </button>
                    <button
                      onClick={() => openViewModal(product._id)}
                      className="bg-black px-2 py-1 rounded-md ml-2 hover:bg-gray-800"
                    >
                      <span className="hidden md:flex">View</span>
                      <FaEye className="flex md:hidden" />
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        ) : (
          "No data available"
        )}
      </div>

      {/* Modal for adding product */}
      <AddProductModal isOpen={isAddModalOpen} onClose={closeAddModal} />

      {/* Modal for viewing product */}
      {selectedProduct && (
        <ViewProductModal
          product={selectedProduct}
          isOpen={isViewModalOpen}
          onClose={closeViewModal}
        />
      )}
    </div>
  );
};

export default AdminProductPage;
