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
import Profile from './pages/Profile';

import Login from "./pages/Login";
import OrderTracking from "./pages/OrderTracking";

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

  // 1. Check paths for Navbar hiding
  const isCheckout = !!matchPath("/checkout/*", location.pathname);
  const isAdminPath = !!matchPath("/admin/*", location.pathname);
  const isLoginPath = !!matchPath("/login1", location.pathname);
  const isSignupPath = !!matchPath("/signup", location.pathname);
  
  // Yahan se isCartPath ko hideNavbar logic se nikaal diya gaya hai
  const hideNavbar = isCheckout || isAdminPath || isLoginPath || isSignupPath;

  // Footer sirf Admin page par hide hoga
  const hideFooter = isAdminPath;

  // auth state
  const [isAuthenticated, setIsAuthenticated] = useState(false);

  // check login on refresh
  useEffect(() => {
    const auth = localStorage.getItem("isAdminLoggedIn");
    if (auth === "true") {
      setIsAuthenticated(true);
    }
  }, []);

  // login handler
  const handleLogin = () => {
    setIsAuthenticated(true);
    localStorage.setItem("isAdminLoggedIn", "true");
  };

  // logout handler
  const handleLogout = () => {
    setIsAuthenticated(false);
    localStorage.removeItem("isAdminLoggedIn");
  };

  return (
    <AuthProvider>
      <CartProvider>

        {/* Navbar ab Cart page par bhi dikhegi */}
        {!hideNavbar && <Navbar />}
        
        {/* WhatsApp Widget bhi Navbar ki tarah behaviour follow karega */}
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

        {/* Footer sirf Admin panel ke ilawa sab jagah dikhega */}
        {!hideFooter && <Footer />}

      </CartProvider>
    </AuthProvider>
  );
}

export default App;