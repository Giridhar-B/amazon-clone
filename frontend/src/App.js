import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";

import Navbar from "./components/Common/Navbar";
import SubNavbar from "./components/Common/SubNavbar";
import Home from "./pages/Home";

import ProductPage from "./pages/ProductPage";
import CartPage from "./pages/CartPage";

import LoginPage from "./pages/LoginPage";
import AccountDashboard from "./pages/AccountDashboard";
import AccountPage from "./pages/AccountPage";
import AddressPage from "./pages/AddressPage";

import CheckoutPage from "./pages/CheckoutPage";
import OrderSuccessPage from "./pages/OrderSuccessPage";
import OrdersPage from "./pages/OrdersPage";

import { AuthProvider } from "./context/AuthContext";

function App() {
  return (
    <AuthProvider>
      <Router>
        {/* Top navigation bars */}
        <Navbar />
        <SubNavbar />

        {/* App routes */}
        <Routes>
          {/* Home page */}
          <Route path="/" element={<Home />} />
          {/* Login page */}
          <Route path="/login" element={<LoginPage />} />
          {/* Account Page */}
          {/* <Route path="/account" element={<AccountPage />} /> */}
          <Route path="/account" element={<AccountDashboard />} />
          <Route path="/account/profile" element={<AccountPage />} />
          <Route path="/account/address" element={<AddressPage />} />
          {/* Product details page */}
          <Route path="/product/:productName/:asin" element={<ProductPage />} />
          {/* Future pages (uncomment when ready) */}
          <Route path="/cart" element={<CartPage />} />

          <Route path="/checkout" element={<CheckoutPage />} />
          <Route path="/order-success/:id" element={<OrderSuccessPage />} />
          <Route path="/orders" element={<OrdersPage />} />
          
        </Routes>
      </Router>
    </AuthProvider>
  );
}

export default App;
