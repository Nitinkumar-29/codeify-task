import { Navigate, Route, Routes, useLocation } from "react-router-dom";
import Home from "./pages/Home";
import AuthContext, { AuthProvider } from "./context/AuthContext";
import CreateAccount from "./authentication/CreateAccount";
import Navbar from "./components/Navbar";
import Footer from "./components/Footer";
import Product from "./pages/Product";
import Login from "./authentication/Login";
import { useContext } from "react";
import Profile from "./pages/Profile";
import AdminDashboard from "./pages/AdminDashboard";
import Category from "./pages/Category";
import { CategoryProvider } from "./context/CategoryContext";
import AdminProductPage from "./pages/AdminProductPage";
import { ProductProvider } from "./context/ProductContext";
import Services from "./pages/Services";

function AppContent() {
  const location = useLocation();
  const { isAuthenticated } = useContext(AuthContext);

  // Routes where we don't want to show the Navbar and Footer
  const noNavFooterRoutes = ["/login", "/createAccount"];

  // Check if the current location path matches one of the routes
  const shouldShowNavFooter = !noNavFooterRoutes.includes(location.pathname);

  return (
    <>
      {/* Conditionally render Navbar */}
      {shouldShowNavFooter && <Navbar />}

      <Routes>
        {/* Public Routes */}
        <Route path="/" element={<Home />} />
        <Route path="/products" element={<Product />} />

        {/* Redirect to home if user is logged in */}
        <Route
          path="/createAccount"
          element={isAuthenticated ? <Navigate to="/" /> : <CreateAccount />}
        />
        <Route
          path="/login"
          element={isAuthenticated ? <Navigate to="/" /> : <Login />}
        />

        {/* Protected Routes */}
        <Route
          path="/userProfile"
          element={isAuthenticated ? <Profile /> : <Navigate to="/login" />}
        />

        <Route path="/admin/*" element={<AdminDashboard />}>
          <Route path="categories" element={<Category />} />
          <Route path="products" element={<AdminProductPage />} />
          <Route path="services" element={<Services />} />
        </Route>
      </Routes>

      {/* Conditionally render Footer */}
      {shouldShowNavFooter && <Footer />}
    </>
  );
}

function App() {
  return (
    <AuthProvider>
      <ProductProvider>
        <CategoryProvider>
          <AppContent />
        </CategoryProvider>
      </ProductProvider>
    </AuthProvider>
  );
}

export default App;
