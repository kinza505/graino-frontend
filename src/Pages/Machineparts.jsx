import React from "react";
import { motion } from "framer-motion";

// --- 1. SEPARATE IMPORTS ---
import SpiralHookImg from "../assets/m1.png";
import MixingBowlImg from "../assets/m5.png";
import CopperMotorImg from "../assets/m4.png";
import ControlDialImg from "../assets/m2.png";
import SplashGuardImg from "../assets/m3.png";

const machineParts = [
  { id: 1, name: "Top Cover Ring", image: SpiralHookImg },
  { id: 2, name: "Container Cup", image: MixingBowlImg },
  { id: 3, name: "Silver Grinding Blade", image: CopperMotorImg },
  { id: 4, name: "Cover Lid", image: ControlDialImg },
  { id: 5, name: "Plastic Grinding Blade", image: SplashGuardImg },
];

const dualParts = [...machineParts, ...machineParts];

const MachineParts = () => {
  return (
    // font-sans family and responsive padding
    <section className="py-10 md:py-16 lg:py-20 bg-white overflow-hidden font-sans">
      
      {/* --- RESPONSIVE HEADING --- */}
      <div className="container mx-auto px-4 mb-8 md:mb-14 text-center">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
        >
          <span className="text-[#EA9E26] font-bold tracking-[0.15em] md:tracking-[0.3em] uppercase text-[10px] md:text-xs mb-2 block">
            Technical Excellence
          </span>
          <h2 className="text-2xl sm:text-3xl md:text-4xl lg:text-6xl font-black text-[#163D68] tracking-tight leading-tight">
            Machine <span className="text-[#EA9E26]">Anatomy</span>
          </h2>
          <motion.div 
            initial={{ width: 0 }}
            whileInView={{ width: "50px" }}
            className="h-1 md:h-1.5 bg-[#163D68] mx-auto mt-4 rounded-full"
          />
        </motion.div>
      </div>

      {/* --- INFINITE RESPONSIVE SCROLLER --- */}
      <div className="relative flex items-center overflow-hidden">
        <motion.div
          className="flex whitespace-nowrap"
          animate={{ x: ["0%", "-50%"] }}
          transition={{
            x: {
              repeat: Infinity,
              repeatType: "loop",
              duration: 30, 
              ease: "linear",
            },
          }}
        >
          {dualParts.map((part, index) => (
            <div 
              key={index} 
              // IMAGE SIZE ADJUSTED HERE:
              // Mobile: 140px | Tablet: 180px | Laptop: 220px | Desktop: 260px
              className="inline-block w-[140px] sm:w-[180px] md:w-[220px] lg:w-[260px] px-3 md:px-4"
            >
              {/* IMAGE CARD */}
              <div className="relative group cursor-pointer">
                <div className="aspect-square rounded-xl md:rounded-[1.5rem] lg:rounded-[2rem] overflow-hidden bg-gray-50 border border-gray-100 group-hover:border-[#EA9E26] transition-all duration-500 shadow-sm hover:shadow-xl">
                  <img
                    src={part.image}
                    alt={part.name}
                    className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700 brightness-95 group-hover:brightness-100"
                  />
                  
                  {/* FLOATING ID BADGE (Smaller size) */}
                  <div className="absolute top-2 left-2 md:top-4 md:left-4 bg-[#163D68] text-[#EA9E26] text-[7px] md:text-[9px] font-bold px-1.5 py-0.5 md:px-2 md:py-1 rounded md:rounded-lg opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                    PART 0{part.id}
                  </div>
                </div>

                {/* RESPONSIVE NAME TAG */}
                <div className="mt-4 md:mt-6 text-center px-1">
                  <h3 className="text-[#163D68] font-extrabold text-[10px] sm:text-xs md:text-sm lg:text-base uppercase tracking-tight group-hover:text-[#EA9E26] transition-colors duration-300">
                    {part.name}
                  </h3>
                  {/* Animated underline */}
                  <div className="w-0 h-0.5 md:h-1 bg-[#EA9E26] mx-auto group-hover:w-10 transition-all duration-500 mt-1.5 rounded-full" />
                </div>
              </div>
            </div>
          ))}
        </motion.div>

        {/* EDGE FADES */}
        <div className="absolute inset-y-0 left-0 w-10 sm:w-20 md:w-32 bg-gradient-to-r from-white via-white/60 to-transparent z-10 pointer-events-none" />
        <div className="absolute inset-y-0 right-0 w-10 sm:w-20 md:w-32 bg-gradient-to-l from-white via-white/60 to-transparent z-10 pointer-events-none" />
      </div>
    </section>
  );
};

export default MachineParts;