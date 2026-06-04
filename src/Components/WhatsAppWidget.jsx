import React, { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { MessageCircle, X } from "lucide-react";

const WhatsAppWidget = () => {
  const [showTooltip, setShowTooltip] = useState(false);
  const phoneNumber = "923111122144"; 
  const companyName = "Griano";

  useEffect(() => {
    const showTimer = setTimeout(() => {
      setShowTooltip(true);
      const hideTimer = setTimeout(() => {
        setShowTooltip(false);
      }, 2000); 

      return () => clearTimeout(hideTimer);
    }, 3000); 

    return () => clearTimeout(showTimer);
  }, []);

  const handleWhatsAppClick = () => {
    const message = `Hi ${companyName}, I'm interested in your Dough Maker. Can you provide more details?`;
    const url = `https://wa.me/${phoneNumber}?text=${encodeURIComponent(message)}`;
    window.open(url, "_blank");
  };

  return (
    <div className="fixed bottom-6 right-6 z-[9999] flex flex-col items-end">
      
      {/* Chat Tooltip */}
      <AnimatePresence>
        {showTooltip && (
          <motion.div
            initial={{ opacity: 0, scale: 0.8, y: 20, x: 20 }}
            animate={{ opacity: 1, scale: 1, y: 0, x: 0 }}
            exit={{ opacity: 0, scale: 0.8, y: 20, x: 20 }}
            className="mb-4 bg-white shadow-2xl rounded-2xl p-4 border border-gray-100 max-w-[240px] relative"
          >
            <button 
              onClick={() => setShowTooltip(false)}
              className="absolute -top-2 -right-2 bg-red-500 text-white rounded-full p-1 hover:bg-red-600 transition-colors shadow-lg"
            >
              <X size={12} strokeWidth={3} />
            </button>

            <div className="flex items-center gap-3 mb-2">
              <div className="w-7 h-7 bg-[#25D366] rounded-full flex items-center justify-center text-white">
                <MessageCircle size={16} />
              </div>
              <span className="font-bold text-[#163D68] text-sm">{companyName} Support</span>
            </div>
            <p className="text-gray-600 text-[11px] leading-relaxed">
              Hi there! 👋 How can we help you with your Dough Maker today?
            </p>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Main WhatsApp Button (Chota Size) */}
      <motion.button
        onClick={handleWhatsAppClick}
        initial={{ scale: 0 }}
        animate={{ scale: 1 }}
        whileHover={{ scale: 1.05 }}
        whileTap={{ scale: 0.95 }}
        className="relative flex items-center justify-center w-14 h-14 bg-[#25D366] text-white rounded-full shadow-lg hover:shadow-[#25D366]/40 transition-shadow"
      >
        {/* Pulsing Ring */}
        <motion.span
          animate={{ scale: [1, 1.3, 1], opacity: [0.5, 0, 0.5] }}
          transition={{ duration: 2, repeat: Infinity }}
          className="absolute inset-0 bg-[#25D366] rounded-full -z-10"
        />
        
        {/* WhatsApp Icon (Size reduced to 28) */}
        <svg 
          viewBox="0 0 24 24" 
          width="28" 
          height="28" 
          stroke="currentColor" 
          strokeWidth="2" 
          fill="none" 
          strokeLinecap="round" 
          strokeLinejoin="round" 
        >
          <path d="M21 11.5a8.38 8.38 0 0 1-.9 3.8 8.5 8.5 0 0 1-7.6 4.7 8.38 8.38 0 0 1-3.8-.9L3 21l1.9-5.7a8.38 8.38 0 0 1-.9-3.8 8.5 8.5 0 0 1 4.7-7.6 8.38 8.38 0 0 1 3.8-.9h.5a8.48 8.48 0 0 1 8 8v.5z"></path>
        </svg>

        {/* Online Status Dot (Thoda chota kiya) */}
        <span className="absolute top-1 right-1 w-3.5 h-3.5 bg-green-500 border-2 border-white rounded-full">
           <span className="absolute inset-0 rounded-full bg-green-500 animate-ping"></span>
        </span>
      </motion.button>

    </div>
  );
};

export default WhatsAppWidget;