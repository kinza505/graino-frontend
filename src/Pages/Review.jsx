import React, { useRef } from "react";
import { motion } from "framer-motion";
import { Star, Quote, CheckCircle2, ChevronLeft, ChevronRight } from "lucide-react";

const reviews = [
  { id: 1, name: "Ayesha Khan", role: "Home Baker", text: "The Griano Dough Maker has completely transformed my kitchen routine. Dough is always smooth.", rating: 5, image: "https://randomuser.me/api/portraits/women/12.jpg" },
  { id: 2, name: "Ahmed Raza", role: "Owner", text: "Very powerful machine. Handles heavy dough effortlessly every day. Highly recommended.", rating: 5, image: "https://randomuser.me/api/portraits/men/32.jpg" },
  { id: 3, name: "Fatima Ali", role: "Homemaker", text: "It saves so much time. Dough making is now fast and easy. Best investment.", rating: 4, image: "https://randomuser.me/api/portraits/women/68.jpg" },
  { id: 4, name: "Usman Tariq", role: "Chef", text: "Professional-level results every time. Excellent performance and build.", rating: 5, image: "https://randomuser.me/api/portraits/men/45.jpg" },
  { id: 5, name: "Zainab Malik", role: "Enthusiast", text: "Build quality is premium and cleaning is very easy. My kids love the rotis.", rating: 5, image: "https://randomuser.me/api/portraits/women/25.jpg" },
  { id: 6, name: "Ali Hassan", role: "Blogger", text: "Best dough machine I’ve used. Fast and reliable results. Five stars!", rating: 5, image: "https://randomuser.me/api/portraits/men/11.jpg" },
];

const Reviews = () => {
  const scrollRef = useRef(null);

  // Manual Scroll Function
  const scroll = (direction) => {
    if (scrollRef.current) {
      const scrollAmount = 300; // Ek click par kitna move kare
      scrollRef.current.scrollBy({
        left: direction === "left" ? -scrollAmount : scrollAmount,
        behavior: "smooth",
      });
    }
  };

  return (
    <section className="relative bg-[#F8FAFC] py-16 px-4 md:px-10 overflow-hidden">
      
      {/* Background Text */}
      <h1 className="absolute top-10 left-5 text-[4rem] md:text-[8rem] font-black text-[#163D68] opacity-[0.03] select-none whitespace-nowrap pointer-events-none uppercase tracking-tighter">
        HAPPY CUSTOMERS
      </h1>

      {/* Header */}
      <div className="text-center mb-10 relative z-10">
        <h2 className="text-4xl md:text-6xl font-black text-[#163D68]">
          Customer Feedback<span className="text-[#EA9E26]">.</span>
        </h2>
        <p className="text-gray-500 mt-2 text-sm md:text-base">Join thousands of happy families using Griano</p>
      </div>

      {/* Slider Container */}
      <div className="relative max-w-7xl mx-auto flex items-center">
        
        {/* Left Arrow */}
        <button 
          onClick={() => scroll("left")}
          className="absolute -left-2 md:-left-5 z-20 p-2 md:p-3 rounded-full bg-white shadow-xl border border-gray-100 text-[#163D68] hover:bg-[#EA9E26] hover:text-white transition-all active:scale-90"
        >
          <ChevronLeft size={24} />
        </button>

        {/* Scrollable Area */}
        <div 
          ref={scrollRef}
          className="flex gap-4 overflow-x-auto no-scrollbar scroll-smooth px-4 py-6"
          style={{ scrollbarWidth: 'none', msOverflowStyle: 'none' }} // Hide scrollbar for Firefox/IE
        >
          {reviews.map((r) => (
            <motion.div
              key={r.id}
              className="flex-shrink-0 w-[240px] sm:w-[260px] md:w-[280px] p-5 rounded-[1.2rem] bg-white border border-gray-50 shadow-md flex flex-col justify-between"
              whileHover={{ y: -5 }}
            >
              <div>
                <div className="flex justify-between items-center mb-3">
                  <div className="flex gap-0.5">
                    {[...Array(5)].map((_, i) => (
                      <Star 
                        key={i} 
                        size={12} 
                        fill={i < r.rating ? "#EA9E26" : "none"} 
                        color={i < r.rating ? "#EA9E26" : "#CBD5E1"} 
                      />
                    ))}
                  </div>
                  <Quote size={20} className="text-[#EA9E26] opacity-10" />
                </div>
                <p className="text-[#163D68] text-xs sm:text-sm font-medium leading-relaxed mb-6 italic">
                  "{r.text}"
                </p>
              </div>

              <div className="flex items-center gap-3 border-t border-gray-50 pt-4">
                <img 
                  src={r.image} 
                  alt={r.name} 
                  className="w-8 h-8 rounded-full object-cover grayscale-[30%]" 
                />
                <div className="overflow-hidden">
                  <h4 className="font-bold text-[#163D68] text-[11px] sm:text-xs truncate">{r.name}</h4>
                  <p className="text-gray-400 text-[10px] truncate">{r.role}</p>
                </div>
                <CheckCircle2 size={14} className="text-green-500 ml-auto" />
              </div>
            </motion.div>
          ))}
        </div>

        {/* Right Arrow */}
        <button 
          onClick={() => scroll("right")}
          className="absolute -right-2 md:-right-5 z-20 p-2 md:p-3 rounded-full bg-white shadow-xl border border-gray-100 text-[#163D68] hover:bg-[#EA9E26] hover:text-white transition-all active:scale-90"
        >
          <ChevronRight size={24} />
        </button>
      </div>

      {/* CSS to hide scrollbar (Tailwind doesn't have it by default) */}
      <style jsx>{`
        .no-scrollbar::-webkit-scrollbar {
          display: none;
        }
      `}</style>
    </section>
  );
};

export default Reviews;