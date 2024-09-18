import { createContext, useEffect, useState } from "react";
import { redirect, useLocation, useNavigate } from "react-router-dom";

const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [userData, setUserData] = useState([]);
  const [isLoading, setisLoading] = useState(false);
  const location = useLocation();
  const [credentials, setCredentials] = useState({
    name: "",
    email: "",
    password: "",
  });
  const [error, setError] = useState("");
  const [loginCredentials, setLoginCredentials] = useState({
    email: "",
    password: "",
  });
  const navigate = useNavigate();
  const host = "http://localhost:8000/api/auth";

  //   create account function
  async function createAccount() {
    const { name, email, password } = credentials;
    if (name === "" || email === "" || password === "") {
      return console.error("Please fill all details");
    }
    try {
      setisLoading(true);
      const response = await fetch(`${host}/createUser`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ name, email, password }),
      });
      if (!response.ok) {
        switch (response.status) {
          case 400:
            setError("Invalid Data");
            break;
          case 403:
            setError("account already exists with this email");
            break;
          case 500:
            setError("Internal server error");
            break;
          default:
            break;
        }
        setisLoading(false)
        return console.error(response);
      }
      const data = await response.json();
      localStorage.setItem("token", data.token);
      console.log(data);
      setCredentials({ email: "", name: "", password: "" });
      navigate("/");
      setIsAuthenticated(true);
      setisLoading(false);
    } catch (error) {
      setisLoading(false);
      console.error(error);
    }
  }

  //   login
  async function login() {
    const { email, password } = loginCredentials;
    if (email === "" || password === "") {
      return console.error("Please fill all details");
    }

    try {
      setisLoading(true);
      const response = await fetch(`${host}/login`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ email, password }),
      });
      if (!response.ok) {
        setisLoading(false);
        switch (response.status) {
          case 500:
            setError("Internal server error");
            setInterval(() => {
              setError("");
            }, 2000);
            break;
          case 403:
            setError("unauthorized access blocked");
            setInterval(() => {
              setError("");
            }, 2000);
            break;
          case 400:
            setError("Please fill all fields");
            setInterval(() => {
              setError("");
            }, 2000);
            break;
          case 401:
            setError("Invalid Credentials");
            setInterval(() => {
              setError("");
            }, 2000);
            break;
          case 404:
            setError("No account exists with these credentials");
            setInterval(() => {
              setError("");
            }, 2000);
            break;
          default:
            break;
        }
        return console.error(response);
      }
      const data = await response.json();
      localStorage.setItem("token", data.token);
      console.log(data);
      setLoginCredentials({ email: "", password: "" });
      navigate("/");
      setIsAuthenticated(true);
      setisLoading(false);
    } catch (error) {
      console.error(error);
      setisLoading(false);
    }
  }

  // get user data
  async function handleGetUser() {
    try {
      const response = await fetch(`${host}/getUser`, {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
          "auth-token": localStorage.getItem("token"),
        },
      });
      if (!response.ok) {
        // If the token is invalid, we should log the user out
        setIsAuthenticated(false);
        localStorage.removeItem("token");
        return console.error("Failed to fetch user");
      }
      const data = await response.json();
      console.log(data);
      setUserData(data);
      setIsAuthenticated(true); // Add this line to mark the user as authenticated
    } catch (error) {
      console.error(error);
    }
  }

  useEffect(() => {
    const token = localStorage.getItem("token");
    if (token) {
      handleGetUser(); // Fetch user data and authenticate
    } else {
      setIsAuthenticated(false); // Ensure state is updated if no token is found
    }
  }, []);

  // Check if the user is authenticated (for example, by checking localStorage for a token)
  useEffect(() => {
    const token = localStorage.getItem("token");
    if (token) {
      setIsAuthenticated(true);
    }
  }, []);

  useEffect(() => {
    const token = localStorage.getItem("token");

    // Redirect to login if token is not available and the user is trying to access admin routes
    if (
      !token &&
      (location.pathname === "/admin" ||
        location.pathname === "/admin/categories" ||
        location.pathname === "/admin/products")
    ) {
      navigate("/login");
    }

    // If the user is logged in and accessing "/admin", redirect based on their role
    if (token && location.pathname === "/admin") {
      if (userData?.role === "admin") {
        navigate("/admin/categories"); // Redirect admin users to admin section
      } else {
        navigate("/userProfile"); // Redirect non-admin users to user profile page
      }
    }
    // eslint-disable-next-line
  }, [location, navigate, userData]);

  return (
    <AuthContext.Provider
      value={{
        credentials,
        setCredentials,
        loginCredentials,
        setLoginCredentials,
        createAccount,
        login,
        error,
        isAuthenticated,
        setIsAuthenticated,
        userData,
        handleGetUser,
        isLoading,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};

export default AuthContext;
