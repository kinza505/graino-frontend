import React, { useState, useEffect } from "react";
import "./App.css";
import { Routes, Route, useLocation, matchPath } from "react-router-dom";

import Navbar from "./layout/Navbar";
import Footer from "./layout/Footer";
import WhatsAppWidget from "./Components/WhatsAppWidget";

import Home from "./Pages/Home";
import Faq from "./Pages/FAQ";
import MachineParts from "./Pages/Machineparts";
import Reviews from "./Pages/Review";
import Features from "./Pages/Features";
import HowItWorks from "./Pages/HowItWorks";
import Checkout from "./Pages/Checkout";
import Admin from "./Pages/Admin.jsx";
import Cart from "./Pages/Cart";
import { CartProvider } from "./context/CartContext";
import { AuthProvider } from './context/AuthContext';
import Login1 from "./Pages/Login1";
import Signup from "./Pages/Signup";
import Profile from './Pages/Profile';

import Login from "./Pages/Login";
import OrderTracking from "./Pages/OrderTracking";

function HomePage() {
  return (
    <>
      <div id="home"><Home /></div>
      <div id="features"><Features /></div>
      <div id="how-to-work"><HowItWorks /></div>
      <div id="machine-parts"><MachineParts /></div>
      <div id="reviews"><Reviews /></div>
      <div id="faq"><Faq /></div>
    </>
  );
}

function App() {
  const location = useLocation();

  // Yahan logic update kia hai: Ab sirf Checkout aur Admin par Navbar hide hoga
  const isCheckout = !!matchPath("/checkout/*", location.pathname);
  const isAdminPath = !!matchPath("/admin/*", location.pathname);
  
  // Login1 aur Signup ko yahan se hata diya taake Navbar dikhe
  const hideNavbar = isCheckout || isAdminPath;

  const hideFooter = isAdminPath;

  const [isAuthenticated, setIsAuthenticated] = useState(false);

  useEffect(() => {
    const auth = localStorage.getItem("isAdminLoggedIn");
    if (auth === "true") {
      setIsAuthenticated(true);
    }
  }, []);

  const handleLogin = () => {
    setIsAuthenticated(true);
    localStorage.setItem("isAdminLoggedIn", "true");
  };

  const handleLogout = () => {
    setIsAuthenticated(false);
    localStorage.removeItem("isAdminLoggedIn");
  };

  return (
    <AuthProvider>
      <CartProvider>

        {/* Navbar aur WhatsApp ab login/signup par bhi dikhenge */}
        {!hideNavbar && <Navbar />}
        {!hideNavbar && <WhatsAppWidget />}

        <Routes>
          <Route path="/" element={<HomePage />} />
          <Route path="/checkout/*" element={<Checkout />} />
          <Route path="/cart" element={<Cart />} />
          <Route path="/track-order" element={<OrderTracking />} />
          <Route path="/login" element={<Login/>} />
          <Route path="/login1" element={<Login1 />} />
          <Route path="/signup" element={<Signup />} /> 
          <Route path="/profile" element={<Profile />} />

          <Route
            path="/admin/*"
            element={
              isAuthenticated ? (
                <Admin onLogout={handleLogout} />
              ) : (
                <Login onLogin={handleLogin} />
              )
            }
          />
        </Routes>

        {!hideFooter && <Footer />}

      </CartProvider>
    </AuthProvider>
  );
}

export default App;