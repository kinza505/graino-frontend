import React, { useState, useEffect, useRef } from "react";
import {
  X,
  ShoppingCart,
  User,
  Menu,
  Plus,
  Minus,
  Trash2,
  ShoppingBag,
  LogIn,
  LogOut,
  Mail,
  Phone,
  UserCircle,
  Package 
} from "lucide-react";
import gsap from "gsap";
import { useCart } from "../context/CartContext";
import { useAuth } from "../context/AuthContext";
import { useNavigate } from "react-router-dom";
import logo from "../assets/logo-2.png";

const Navbar = () => {
  const navigate = useNavigate();
  const { user, logout } = useAuth();
  const {
    cart,
    removeFromCart,
    increaseqty,
    decreaseqty,
    isCartOpen,
    setIsCartOpen,
    clearCart,
  } = useCart();

  const [scrolled, setScrolled] = useState(false);
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isProfileOpen, setIsProfileOpen] = useState(false);
  const [showLoginPopup, setShowLoginPopup] = useState(false);
  const [showLogoutConfirm, setShowLogoutConfirm] = useState(false);

  const cartDrawerRef = useRef(null);
  const profileDrawerRef = useRef(null);
  const mobileMenuRef = useRef(null);
  const overlayRef = useRef(null);

  const totalItems = cart?.reduce((sum, item) => sum + (item.quantity || 1), 0) || 0;
  const totalPrice = cart?.reduce((sum, item) => sum + item.price * (item.quantity || 1), 0) || 0;

  const navLinks = [
    { name: "Home", href: "/" },
    { name: "Features", href: "#features" },
    { name: "How It Works", href: "#how-to-work" },
    { name: "Machine Anatomy", href: "#machine-parts" }, 
    { name: "Reviews", href: "#reviews" },
    { name: "FAQ", href: "#faq" },
  ];

  // Function to handle tracking access control
  const handleTrackOrderClick = () => {
    if (user) {
      navigate("/track-order");
      setIsProfileOpen(false);
      setIsMenuOpen(false);
    } else {
      setShowLoginPopup(true);
      setIsProfileOpen(false);
      setIsMenuOpen(false);
    }
  };

  const handleLogout = () => {
    if (logout) logout();
    if (clearCart) clearCart();
    setShowLogoutConfirm(false);
    setIsProfileOpen(false);
    navigate("/");
  };

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 30);
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  useEffect(() => {
    if (cartDrawerRef.current) {
      gsap.to(cartDrawerRef.current, { x: isCartOpen ? "0%" : "100%", duration: 0.4, ease: "power2.out" });
    }
    if (profileDrawerRef.current) {
      gsap.to(profileDrawerRef.current, { x: isProfileOpen ? "0%" : "100%", duration: 0.4, ease: "power2.out" });
    }
    if (mobileMenuRef.current) {
      gsap.to(mobileMenuRef.current, { x: isMenuOpen ? "0%" : "-100%", duration: 0.4, ease: "power2.out" });
    }
    
    const anyOpen = isCartOpen || isMenuOpen || isProfileOpen || showLoginPopup || showLogoutConfirm;
    if (overlayRef.current) {
      gsap.to(overlayRef.current, { opacity: anyOpen ? 1 : 0, display: anyOpen ? "block" : "none", duration: 0.3 });
    }
  }, [isCartOpen, isMenuOpen, isProfileOpen, showLoginPopup, showLogoutConfirm]);

  const getInitial = () => {
    if (user?.name) return user.name[0];
    if (user?.email) return user.email[0];
    return "U";
  };

  return (
    <div className="font-sans antialiased text-slate-900">
      
      {/* --- NAVBAR --- */}
      <nav className={`fixed top-0 left-0 w-full z-[1100] transition-all duration-500 ${scrolled ? "bg-white shadow-md py-2" : "bg-white/90 backdrop-blur-md py-4"}`}>
        <div className="max-w-7xl mx-auto px-4 md:px-6 flex items-center justify-between">
          
          <div className="flex items-center gap-3">
            <div className="lg:hidden text-[#163D68] cursor-pointer" onClick={() => setIsMenuOpen(true)}>
              <Menu size={26} />
            </div>
            <div onClick={() => navigate("/")} className="cursor-pointer">
              <img src={logo} alt="Logo" className="w-24 md:w-32 lg:w-40 transition-all duration-300" />
            </div>
          </div>

          <div className="hidden lg:flex items-center gap-6">
            {navLinks.map((link) => (
              <a key={link.name} href={link.href} className="text-[#163D68] font-bold hover:text-[#EA9E26] transition-colors text-[12px] uppercase tracking-wider">
                {link.name}
              </a>
            ))}
          </div>

          <div className="flex items-center gap-3 md:gap-5">
            <div 
              onClick={handleTrackOrderClick} 
              className="text-[#163D68] hover:text-[#EA9E26] transition p-1 cursor-pointer flex flex-col items-center"
              title="Track Order"
            >
              <Package size={22} />
              <span className="text-[8px] font-bold uppercase hidden sm:block">Track</span>
            </div>

            <div onClick={() => user ? setIsProfileOpen(true) : navigate("/login1")} className="cursor-pointer">
              {user ? (
                <div className="w-9 h-9 bg-[#163D68] text-white flex items-center justify-center rounded-full font-bold border-2 border-[#EA9E26] uppercase text-sm shadow-sm">
                  {getInitial()}
                </div>
              ) : (
                <div className="text-[#163D68] hover:text-[#EA9E26] transition p-1">
                  <User size={22} />
                </div>
              )}
            </div>

            <div onClick={() => setIsCartOpen(true)} className="relative cursor-pointer text-[#163D68] hover:text-[#EA9E26] transition p-1">
              <ShoppingCart size={22} />
              {totalItems > 0 && (
                <span className="absolute -top-1 -right-1 bg-red-500 text-white text-[9px] font-bold w-4 h-4 flex items-center justify-center rounded-full shadow-sm">
                  {totalItems}
                </span>
              )}
            </div>

            <button onClick={() => user ? navigate("/cart") : setShowLoginPopup(true)} className="hidden sm:block bg-[#163D68] text-white px-5 py-2 rounded-full font-bold text-[11px] uppercase hover:bg-[#EA9E26] transition-all tracking-wider shadow-md">
              Order Now
            </button>
          </div>
        </div>
      </nav>

      {/* --- SHARED OVERLAY --- */}
      <div ref={overlayRef} onClick={() => { setIsCartOpen(false); setIsMenuOpen(false); setIsProfileOpen(false); setShowLoginPopup(false); setShowLogoutConfirm(false); }}
        className="fixed inset-0 bg-black/40 z-[1200] hidden opacity-0 backdrop-blur-[2px]" />

      {/* --- PROFILE DRAWER --- */}
      <div ref={profileDrawerRef} className="fixed top-0 right-0 h-full w-full max-w-[300px] bg-white z-[1500] shadow-2xl translate-x-full flex flex-col border-l">
        <div className="p-4 flex justify-between items-center bg-[#163D68] text-white">
          <div className="flex items-center gap-2">
            <UserCircle size={18} className="text-[#EA9E26]" />
            <h2 className="text-[12px] font-bold uppercase tracking-widest">Account</h2>
          </div>
          <X size={20} className="cursor-pointer hover:scale-110 transition-transform" onClick={() => setIsProfileOpen(false)} />
        </div>

        <div className="flex-1 p-6 flex flex-col items-center">
          <div className="w-16 h-16 bg-slate-50 rounded-full flex items-center justify-center text-[#163D68] text-2xl font-black border-2 border-[#EA9E26] mb-3 uppercase shadow-sm">
            {getInitial()}
          </div>
          <h3 className="text-sm font-bold text-[#163D68] text-center px-2 truncate w-full">{user?.name || "Member"}</h3>
          
          <div className="w-full space-y-3 mt-4">
            <button 
              onClick={handleTrackOrderClick}
              className="w-full flex items-center gap-3 p-3 bg-slate-50 hover:bg-slate-100 rounded-xl border border-slate-100 transition-colors"
            >
              <Package size={16} className="text-[#EA9E26]" />
              <span className="text-[11px] text-[#163D68] font-bold uppercase tracking-wider">Track My Order</span>
            </button>

            <div className="flex items-center gap-3 p-3 bg-slate-50 rounded-xl border border-slate-100 min-w-0">
              <Mail size={14} className="text-[#163D68] shrink-0" />
              <div className="min-w-0 flex-1">
                <p className="text-[8px] text-gray-400 font-bold uppercase tracking-tighter">Email</p>
                <p className="text-[11px] text-[#163D68] font-semibold truncate leading-tight">{user?.email}</p>
              </div>
            </div>
          </div>
        </div>

        <div className="p-4 border-t bg-slate-50">
          <button onClick={() => setShowLogoutConfirm(true)} className="w-full py-2.5 bg-white border border-red-100 text-red-500 rounded-lg font-bold text-[11px] hover:bg-red-500 hover:text-white transition-all flex items-center justify-center gap-2 uppercase tracking-widest shadow-sm">
            <LogOut size={14} /> Logout
          </button>
        </div>
      </div>

      {/* --- CART DRAWER --- */}
      <div ref={cartDrawerRef} className="fixed top-0 right-0 h-full w-full max-w-[340px] bg-white z-[1500] shadow-2xl translate-x-full flex flex-col border-l">
        <div className="p-4 flex justify-between items-center bg-[#163D68] text-white">
          <div className="flex items-center gap-2"><ShoppingBag size={18} className="text-[#EA9E26]" /><h2 className="text-[12px] font-bold uppercase tracking-widest">Cart</h2></div>
          <X size={20} className="cursor-pointer" onClick={() => setIsCartOpen(false)} />
        </div>
        <div className="flex-1 overflow-y-auto p-4 space-y-3">
          {!cart || cart.length === 0 ? (
            <div className="h-full flex flex-col items-center justify-center text-gray-300 opacity-50">
              <ShoppingCart size={40} className="mb-2" />
              <p className="text-[10px] font-bold uppercase">Your cart is empty</p>
            </div>
          ) : (
            cart.map((item) => (
              <div key={item._id || item.id}  className="flex gap-3 p-3 bg-slate-50 rounded-xl border border-slate-100 shadow-sm">
                <img src={item.image} className="w-12 h-12 object-contain bg-white rounded-lg p-1 border" alt="" />
                <div className="flex-grow min-w-0">
                  <h4 className="font-bold text-[11px] text-[#163D68] truncate uppercase">{item.name}</h4>
                  <p className="text-[10px] text-[#EA9E26] font-bold">Rs. {item.price}</p>
                  <div className="flex items-center gap-3 mt-1.5">
                   <button className="p-1 bg-white border rounded shadow-xs" onClick={() => decreaseqty(item._id || item.id)}><Minus size={10} /></button>
                   <span className="text-[11px] font-bold text-[#163D68]">{item.quantity || 1}</span>
                   <button className="p-1 bg-white border rounded shadow-xs" onClick={() => increaseqty(item._id || item.id)}><Plus size={10} /></button>
                  </div>
                </div>
                <Trash2 size={16} className="text-red-300 hover:text-red-500 cursor-pointer self-center" onClick={() => removeFromCart(item._id || item.id)}/>
              </div>
            ))
          )}
        </div>
        {cart?.length > 0 && (
          <div className="p-4 border-t bg-white shadow-inner">
            <div className="flex justify-between font-bold text-sm mb-4 px-1 text-[#163D68] uppercase tracking-tight"><span>Subtotal</span><span className="text-[#EA9E26]">Rs. {totalPrice.toLocaleString()}</span></div>
            <button onClick={() => { setIsCartOpen(false); user ? navigate("/checkout") : setShowLoginPopup(true); }} className="w-full py-3.5 bg-[#163D68] text-white rounded-xl font-bold text-[11px] uppercase tracking-[2px] hover:bg-[#EA9E26] transition-all shadow-lg">Checkout Now</button>
          </div>
        )}
      </div>

      {/* --- MOBILE MENU --- */}
      <div ref={mobileMenuRef} className="fixed top-0 left-0 h-full w-[250px] bg-white z-[1500] shadow-2xl -translate-x-full flex flex-col border-r">
        <div className="p-5 border-b flex justify-between items-center bg-slate-50">
          <img src={logo} className="w-24" alt="Logo" />
          <X size={20} className="text-gray-400 cursor-pointer" onClick={() => setIsMenuOpen(false)} />
        </div>
        <div className="flex-1 p-6 space-y-5">
          {navLinks.map((link) => (
            <a key={link.name} href={link.href} onClick={() => setIsMenuOpen(false)} className="block text-[11px] font-bold text-[#163D68] uppercase tracking-widest hover:text-[#EA9E26] transition-colors">{link.name}</a>
          ))}
          
          <div onClick={handleTrackOrderClick} className="flex items-center gap-2 text-[11px] font-bold text-[#163D68] uppercase tracking-widest cursor-pointer hover:text-[#EA9E26]">
            <Package size={16} /> Track Order
          </div>

          <button onClick={() => { setIsMenuOpen(false); user ? navigate("/checkout") : setShowLoginPopup(true); }} className="w-full py-3 bg-[#163D68] text-white rounded-lg font-bold text-[10px] uppercase tracking-widest shadow-md">Order Now</button>
        </div>
      </div>

      {/* --- LARGE LOGOUT POPUP --- */}
      {showLogoutConfirm && (
        <div className="fixed inset-0 z-[2000] flex items-center justify-center p-4">
          <div className="bg-white rounded-3xl p-10 max-w-[400px] w-full shadow-[0_20px_50px_rgba(0,0,0,0.2)] text-center border border-slate-100 animate-in fade-in zoom-in duration-300">
            <div className="w-20 h-20 bg-red-50 text-red-500 rounded-full flex items-center justify-center mx-auto mb-5">
              <LogOut size={40} />
            </div>
            <h3 className="text-xl font-black text-[#163D68] uppercase tracking-tight">Are you sure?</h3>
            <p className="text-gray-500 text-sm mt-3 mb-8 leading-relaxed">You will need to login again to access your account and track your orders.</p>
            <div className="flex flex-col gap-3">
              <button onClick={handleLogout} className="w-full py-4 bg-red-500 text-white rounded-xl font-bold text-sm uppercase tracking-widest hover:bg-red-600 transition-all shadow-lg shadow-red-100">Yes, Logout Now</button>
              <button onClick={() => setShowLogoutConfirm(false)} className="w-full py-3 text-gray-400 text-xs font-bold uppercase hover:text-[#163D68] transition-colors">No, Stay Logged In</button>
            </div>
          </div>
        </div>
      )}

      {/* --- LARGE LOGIN POPUP --- */}
      {showLoginPopup && (
        <div className="fixed inset-0 z-[2000] flex items-center justify-center p-4">
          <div className="bg-white rounded-3xl p-10 max-w-[400px] w-full shadow-[0_20px_50px_rgba(0,0,0,0.2)] text-center border border-slate-100 animate-in fade-in zoom-in duration-300">
            <div className="w-20 h-20 bg-amber-50 text-amber-500 rounded-full flex items-center justify-center mx-auto mb-5">
              <LogIn size={40} />
            </div>
            <h3 className="text-xl font-black text-[#163D68] uppercase tracking-tight">Login Required</h3>
            <p className="text-gray-500 text-sm mt-3 mb-8 leading-relaxed">Please login to your account to track your orders or complete your purchase.</p>
            <div className="flex flex-col gap-3">
              <button onClick={() => { setShowLoginPopup(false); navigate("/login1"); }} className="w-full py-4 bg-[#163D68] text-white rounded-xl font-bold text-sm uppercase tracking-widest hover:bg-[#EA9E26] transition-all shadow-lg shadow-blue-100">Go to Login Page</button>
              <button onClick={() => setShowLoginPopup(false)} className="w-full py-3 text-gray-400 text-xs font-bold uppercase hover:text-[#163D68] transition-colors">Maybe Later</button>
            </div>
          </div>
        </div>
      )}

    </div>
  );
};

export default Navbar;