import React from "react";
import { BrowserRouter as Router, Routes, Route, Navigate } from "react-router-dom";
import Home from "./pages/home/Home.jsx";
import Order from "./pages/order/Order.jsx";
import Cart from "./pages/cart/Cart.jsx";
import Dashboard from "./pages/admin/dashboard/Dashboard.jsx";
import NoPage from "./pages/nopage/NoPage.jsx";
import MyState from "./context/data/myState.jsx";
import Login from "./pages/registration/Login.jsx";
import Signup from "./pages/registration/Signup.jsx";
import ProductInfo from "./pages/productInfo/ProductInfo.jsx";
import AddProduct from "./pages/admin/dashboard/page/AddProduct.jsx";
import UpdateProduct from "./pages/admin/dashboard/page/UpdateProduct.jsx";
import { ToastContainer } from "react-toastify";
import AllProduct from "./pages/allproducts/Allproduct.jsx";

function App() {
  return (
    <MyState>
      <Router>
        <Routes>
          {/* Redirect "/" to Login if user not logged in */}
          <Route
            path="/"
            element={
              localStorage.getItem("user") ? <Home /> : <Navigate to="/login" />
            }
          />

          {/* Normal & Admin protected routes */}
          <Route
            path="/order"
            element={
              <ProtectedRoutes>
                <Order />
              </ProtectedRoutes>
            }
          />
         
          <Route
            path="/cart"
            element={
              <ProtectedRoutes>
                <Cart />
              </ProtectedRoutes>
            }
          />
          <Route path="/allproducts" element={<AllProduct />} />

          {/* Admin protected */}
          <Route
            path="/dashboard"
            element={
              <ProtectedRoutesForAdmin>
                <Dashboard />
              </ProtectedRoutesForAdmin>
            }
          />
          <Route
            path="/addproduct"
            element={
              <ProtectedRoutesForAdmin>
                <AddProduct />
              </ProtectedRoutesForAdmin>
            }
          />
          <Route
            path="/updateproduct"
            element={
              <ProtectedRoutesForAdmin>
                <UpdateProduct />
              </ProtectedRoutesForAdmin>
            }
          />

          {/* Login / Signup */}
          <Route
            path="/login"
            element={
              localStorage.getItem("user") ? <Navigate to="/" /> : <Login />
            }
          />
          <Route
            path="/signup"
            element={
              localStorage.getItem("user") ? <Navigate to="/" /> : <Signup />
            }
          />

          {/* Product info and fallback */}
          <Route path="/productinfo/:id" element={<ProductInfo />} />
          <Route path="*" element={<NoPage />} />
        </Routes>
        <ToastContainer />
      </Router>
    </MyState>
  );
}

export default App;

// Normal user protection
export const ProtectedRoutes = ({ children }) => {
  const user = JSON.parse(localStorage.getItem("user"));

  if (!user) return <Navigate to="/login" />;

  // Admin can access all pages
  return children;
};

// Admin route protection
export const ProtectedRoutesForAdmin = ({ children }) => {
  const admin = JSON.parse(localStorage.getItem("user"));
  if (admin && admin.user?.email === "vitthal2004@gmail.com") return children;

  return <Navigate to="/login" />;
};
