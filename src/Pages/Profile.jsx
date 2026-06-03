import React, { useState } from 'react';
import { useAuth } from '../context/AuthContext';
import { useNavigate } from 'react-router-dom';
import { LogOut, Mail, Phone, ShieldCheck, X, User } from 'lucide-react';

const ProfileSlider = ({ isOpen, onClose }) => {
  const { user, logout } = useAuth();
  const navigate = useNavigate();
  const [isLoggingOut, setIsLoggingOut] = useState(false);
  const [showConfirm, setShowConfirm] = useState(false);

  if (!user) return null;

  const handleLogoutClick = () => {
    setShowConfirm(true);
  };

  const confirmLogout = async () => {
    setShowConfirm(false);
    setIsLoggingOut(true);
    
    setTimeout(async () => {
      await logout();
      setIsLoggingOut(false);
      onClose();
      navigate("/");
    }, 1500);
  };

  return (
    // Apply modern sans-serif font stack to the entire component
    <div className="font-sans selection:bg-[#EA9E26]/30">
      {/* 1. Background Overlay */}
      <div 
        className={`fixed inset-0 bg-black/60 backdrop-blur-md z-[2000] transition-opacity duration-500 ${isOpen ? 'opacity-100 visible' : 'opacity-0 invisible'}`}
        onClick={onClose}
      />

      {/* 2. Profile Slider Sidebar */}
      {/* Responsive Width: Full on mobile, 380px on larger screens */}
      <div className={`fixed top-0 right-0 h-full w-full sm:max-w-[380px] bg-[#0F2744] border-l border-white/10 shadow-2xl z-[2001] transform transition-transform duration-500 ease-[cubic-bezier(0.23,1,0.32,1)] ${isOpen ? 'translate-x-0' : 'translate-x-full'}`}>
        
        {/* Decorative Background Element */}
        <div className="absolute top-0 right-0 w-48 h-48 sm:w-64 sm:h-64 bg-[#EA9E26]/5 rounded-full blur-[80px] sm:blur-[100px] -z-10" />

        <div className="p-6 sm:p-8 h-full flex flex-col overflow-y-auto">
          {/* Header */}
          <div className="flex justify-between items-center mb-6 sm:mb-8">
            <div>
              <h3 className="text-[#EA9E26] font-black text-xl tracking-tighter">GRANO</h3>
              <p className="text-white/40 text-[10px] uppercase tracking-[3px]">Premium Member</p>
            </div>
            <button onClick={onClose} className="p-2 hover:bg-white/5 rounded-full transition text-white/50 hover:text-white">
              <X size={22} />
            </button>
          </div>

          {/* User Profile Section */}
          <div className="flex flex-col items-center py-4 sm:py-6 border-b border-white/5">
            <div className="relative">
              <div className="w-20 h-20 sm:w-24 sm:h-24 bg-gradient-to-tr from-[#EA9E26] to-[#ffcc7a] rounded-full flex items-center justify-center text-3xl sm:text-4xl font-black text-[#0F2744] shadow-[0_0_30px_rgba(234,158,38,0.2)]">
                {user.firstName ? user.firstName[0].toUpperCase() : <User />}
              </div>
              <div className="absolute bottom-1 right-1 bg-green-500 w-4 h-4 sm:w-5 sm:h-5 rounded-full border-4 border-[#0F2744]"></div>
            </div>
            
            <h2 className="text-xl sm:text-2xl font-bold text-white mt-4 tracking-tight text-center">
                {user.firstName} {user.lastName}
            </h2>
            <p className="text-white/50 text-xs sm:text-sm italic font-light mt-1 text-center">"Experience the excellence of Grano"</p>
          </div>

          {/* Details Section */}
          <div className="mt-6 sm:mt-8 space-y-3 sm:space-y-4 flex-grow">
            <p className="text-white/30 text-[10px] sm:text-[11px] font-bold uppercase tracking-widest ml-1">Account Information</p>
            
            {/* Email Card */}
            <div className="bg-white/5 p-3 sm:p-4 rounded-2xl flex items-center gap-3 sm:gap-4 border border-white/5 hover:border-white/10 transition group">
              <div className="p-2.5 sm:p-3 bg-[#EA9E26]/10 rounded-xl group-hover:bg-[#EA9E26] transition-colors shrink-0">
                <Mail className="text-[#EA9E26] group-hover:text-black transition-colors" size={18} />
              </div>
              <div className="flex flex-col min-w-0">
                <span className="text-[9px] sm:text-[10px] text-white/40 uppercase font-bold tracking-wider">Email Address</span>
                <span className="text-white text-xs sm:text-sm font-medium truncate">{user.email}</span>
              </div>
            </div>

            {/* Phone Card */}
            <div className="bg-white/5 p-3 sm:p-4 rounded-2xl flex items-center gap-3 sm:gap-4 border border-white/5 hover:border-white/10 transition group">
              <div className="p-2.5 sm:p-3 bg-[#EA9E26]/10 rounded-xl group-hover:bg-[#EA9E26] transition-colors shrink-0">
                <Phone className="text-[#EA9E26] group-hover:text-black transition-colors" size={18} />
              </div>
              <div className="flex flex-col min-w-0">
                <span className="text-[9px] sm:text-[10px] text-white/40 uppercase font-bold tracking-wider">Phone Number</span>
                <span className="text-white text-xs sm:text-sm font-medium truncate">{user.phone || "Not Updated"}</span>
              </div>
            </div>

            {/* Verification Status */}
            <div className="flex items-center gap-2 text-green-400/80 text-[11px] sm:text-[12px] font-medium px-2">
              <ShieldCheck size={16} /> Verified Grano Customer
            </div>
          </div>

          {/* Logout Button */}
          <div className="mt-6">
            <button 
              onClick={handleLogoutClick}
              disabled={isLoggingOut}
              className="w-full bg-red-500/10 hover:bg-red-500 text-red-500 hover:text-white py-3.5 sm:py-4 rounded-2xl flex items-center justify-center gap-3 transition-all duration-300 font-bold border border-red-500/20"
            >
              {isLoggingOut ? (
                 <div className="flex gap-1">
                   <span className="w-2 h-2 bg-current rounded-full animate-bounce [animation-delay:-0.3s]"></span>
                   <span className="w-2 h-2 bg-current rounded-full animate-bounce [animation-delay:-0.15s]"></span>
                   <span className="w-2 h-2 bg-current rounded-full animate-bounce"></span>
                 </div>
              ) : (
                <>
                  <LogOut size={20} />
                  Logout Account
                </>
              )}
            </button>
          </div>
        </div>
      </div>

      {/* 3. LOGOUT CONFIRMATION POPUP (Custom Modal) */}
      {showConfirm && (
        <div className="fixed inset-0 z-[3000] flex items-center justify-center p-4">
          <div className="absolute inset-0 bg-black/80 backdrop-blur-sm" onClick={() => setShowConfirm(false)} />
          <div className="bg-[#1A365D] border border-white/10 p-6 sm:p-8 rounded-[24px] sm:rounded-[30px] shadow-2xl relative z-10 max-w-[340px] sm:max-w-sm w-full text-center animate-in zoom-in duration-300">
            <div className="w-16 h-16 sm:w-20 sm:h-20 bg-red-500/20 text-red-500 rounded-full flex items-center justify-center mx-auto mb-4 sm:mb-6">
              <LogOut size={32} />
            </div>
            <h3 className="text-xl sm:text-2xl font-bold text-white mb-2">Wait a Minute!</h3>
            <p className="text-white/60 text-sm sm:base mb-6 sm:mb-8">Are you sure you want to logout? You will need to login again to access your Grano dashboard.</p>
            
            <div className="flex flex-col gap-3">
              <button 
                onClick={confirmLogout}
                className="w-full bg-red-500 hover:bg-red-600 text-white py-3.5 sm:py-4 rounded-xl font-bold transition-all active:scale-95"
              >
                Yes, Logout Now
              </button>
              <button 
                onClick={() => setShowConfirm(false)}
                className="w-full bg-white/5 hover:bg-white/10 text-white py-3.5 sm:py-4 rounded-xl font-bold transition-all border border-white/10"
              >
                Stay Logged In
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default ProfileSlider;