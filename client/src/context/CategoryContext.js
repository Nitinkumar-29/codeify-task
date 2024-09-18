import { createContext, useEffect, useState } from "react";

const CategoryContext = createContext();

export const CategoryProvider = ({ children }) => {
  const [categories, setCategories] = useState([]);
  const host = "http://localhost:8000/api/category";
  const token = localStorage.getItem("token");
  const [categoryName, setCategoryName] = useState("");

  // add a category
  async function addCategory() {
    if (categoryName === "") {
      return console.error("Please fill all details");
    }
    try {
      const response = await fetch(`${host}/addCategory`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          "auth-token": token,
        },
        body: JSON.stringify({ name: categoryName }),
      });
      if (!response.ok) {
        return console.error(response);
      }
      const data = await response.json();
      console.log(data);
      setCategoryName("");
      await fetchCategories();
    } catch (error) {
      console.error(error);
    }
  }

  // Fetch categories
  async function fetchCategories() {
    try {
      const response = await fetch(`${host}/fetchCategories`, {
        method: "GET",
        headers: {
          "auth-token": token,
        },
      });
      if (!response.ok) {
        return console.error(response);
      }
      const data = await response.json();
      console.log(data);
      setCategories(data);
    } catch (error) {
      console.error(error);
    }
  }

  // delete a category and associated product
  async function deleteCategory(id) {
    try {
      const response = await fetch(`${host}/deleteCategory/${id}`, {
        method: "DELETE",
        headers: {
          "auth-token": token,
        },
      });
      if (!response.ok) {
        return console.error(response);
      }
      const data = await response.json();
      console.log(data);
      fetchCategories();
    } catch (error) {
      console.error(error);
    }
  }

  useEffect(() => {
    if (token) {
      fetchCategories();
    }
    // eslint-disable-next-line
  }, [token]);

  return (
    <CategoryContext.Provider
      value={{
        categories,
        fetchCategories,
        categoryName,
        setCategoryName,
        addCategory,
        deleteCategory,
      }}
    >
      {children}
    </CategoryContext.Provider>
  );
};

export default CategoryContext;
