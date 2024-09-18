import React, { useContext, useEffect } from "react";
import CategoryContext from "../context/CategoryContext";
import ProductContext from "../context/ProductContext";

const AddProduct = ({ isOpen, onClose }) => {
  const { categories, fetchCategories } = useContext(CategoryContext);
  const { addProduct, setAddProduct, handleAddProduct } = useContext(ProductContext);

  // On change for form inputs
  const handleOnChange = (e) => {
    setAddProduct({ ...addProduct, [e.target.name]: e.target.value });
  };

  // Handle file selection and store files directly in addProduct state
  const handleFileChange = (e) => {
    setAddProduct({ ...addProduct, files: e.target.files });
  };

  // Handle form submission
  const handleSubmit = (e) => {
    e.preventDefault();

    const formData = new FormData();
    formData.append("name", addProduct.name);
    formData.append("productCategory", addProduct.productCategory);

    // Append all files stored in addProduct state
    if (addProduct.files) {
      for (let i = 0; i < addProduct.files.length; i++) {
        formData.append("files", addProduct.files[i]);
      }
    }

    handleAddProduct(formData); // Send FormData object to handleAddProduct
    onClose();
  };

  useEffect(() => {
    fetchCategories();
    // eslint-disable-next-line
  }, []);

  if (!isOpen) return null; // Don't render the modal if it's not open

  return (
    <div className="fixed inset-0 flex items-center justify-center bg-gray-500 bg-opacity-50">
      <div className="bg-white p-6 rounded-lg shadow-lg w-96">
        <h2 className="text-lg font-semibold mb-4">Add New Product</h2>
        <form onSubmit={handleSubmit}>
          {/* Product Name */}
          <label className="block mb-2 text-sm font-medium">Product Name</label>
          <input
            type="text"
            value={addProduct.name}
            name="name"
            onChange={handleOnChange}
            className="w-full p-2 border border-gray-300 rounded mb-4"
            placeholder="Enter product name"
          />

          {/* Product Category */}
          <label className="block mb-2 text-sm font-medium">Select Category</label>
          <select
            name="productCategory"
            value={addProduct.productCategory}
            onChange={handleOnChange}
            className="w-full p-2 border border-gray-300 rounded mb-4"
          >
            <option value="">Select Category</option>
            {categories?.map((category) => (
              <option key={category._id} value={category.name}>
                {category.name}
              </option>
            ))}
          </select>

          {/* Media Upload */}
          <label htmlFor="Media" className="block mb-2 text-sm font-medium">
            Media
          </label>
          <input
            type="file"
            multiple
            accept="*"
            name="files"
            onChange={handleFileChange}
          />

          <div className="flex justify-end space-x-2 mt-4">
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
              Add Product
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default AddProduct;
