import { createContext, useEffect, useState } from "react";

const ProductContext = createContext();

export const ProductProvider = ({ children }) => {
  const [products, setProducts] = useState([]);
  const [productData, setProductData] = useState([]);
  const [isProcessing, setIsProcessing] = useState(false);
  const [addProduct, setAddProduct] = useState({
    name: "",
    productCategory: "",
    files: null, // Initialize files as null or empty array
  });
  // const host = "http://localhost:8000/api/product";
  const host = "https://codeify-task-backend00.vercel.app/api/product";
  const token = localStorage.getItem("token");

  // Add a product
  async function handleAddProduct() {
    const { name, productCategory, files } = addProduct;
    if (name === "" || productCategory === "") {
      return console.error("Please enter all details");
    }

    try {
      // Create FormData object to handle file uploads
      const formData = new FormData();
      formData.append("name", name);
      formData.append("productCategory", productCategory);

      // Append each file to the FormData object
      if (files) {
        for (let i = 0; i < files.length; i++) {
          formData.append("files", files[i]);
        }
      }

      const response = await fetch(`${host}/addProduct`, {
        method: "POST",
        headers: {
          "auth-token": token, // Do not set 'Content-Type', it will be automatically set for FormData
        },
        body: formData, // Send the FormData object containing the fields and files
      });

      if (!response.ok) {
        return console.error(response);
      }

      const data = await response.json();
      console.log(data);

      // Reset the form after submission
      setAddProduct({ name: "", productCategory: "", files: null });
      await fetchProducts(); // Refresh product list after adding a new product
    } catch (error) {
      console.error(error);
    }
  }

  // Fetch products
  async function fetchProducts() {
    try {
      const response = await fetch(`${host}/fetchProducts`, {
        method: "GET",
        headers: {
          "auth-token": token,
        },
      });
      if (!response.ok) {
        return console.error(response);
      }
      const data = await response.json();
      setProducts(data);
    } catch (error) {
      console.error(error);
    }
  }

  // Delete a product
  async function deleteProduct(id) {
    try {
      setIsProcessing(true);
      const response = await fetch(`${host}/deleteProduct/${id}`, {
        method: "DELETE",
        headers: {
          "auth-token": token,
        },
      });
      if (!response.ok) {
        setIsProcessing(false);
        return console.error(response);
      }
      console.log(response);
      await fetchProducts();
      setIsProcessing(false);
    } catch (error) {
      setIsProcessing(false);
      console.error(error);
    }
  }

  // fetch product by id
  async function fetchProductById(id) {
    try {
      const response = await fetch(`${host}/fetchProduct/${id}`, {
        method: "GET",
        headers: {
          "auth-token": token,
        },
      });
      if (!response.ok) {
        return console.error(response);
      }
      const data = await response.json();
      setProductData(data);
    } catch (error) {
      console.error(error);
    }
  }

  useEffect(() => {
    token && fetchProducts();
    // eslint-disable-next-line
  }, [token]);

  return (
    <ProductContext.Provider
      value={{
        handleAddProduct,
        addProduct,
        setAddProduct,
        fetchProducts,
        products,
        deleteProduct,
        fetchProductById,
        productData,
        isProcessing,
      }}
    >
      {children}
    </ProductContext.Provider>
  );
};

export default ProductContext;
