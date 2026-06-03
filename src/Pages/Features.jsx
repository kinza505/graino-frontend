import React, { useEffect, useRef } from "react";
import { motion } from "framer-motion";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { Zap, Smile, ShieldCheck, Timer, Droplets, Sparkles } from "lucide-react";

// --- Image Assets ---
import img1 from "../assets/how-3.png"; 
import img2 from "../assets/how-7.png"; 
import img3 from "../assets/how-5.png"; 
import img4 from "../assets/how-4.png"; 
import img5 from "../assets/how-2.png"; 
import img6 from "../assets/how-8.png"; 

gsap.registerPlugin(ScrollTrigger);

const parts = [
  {
    id: 1,
    title: "performance",
    desc: "Experience powerful and efficient dough mixing with advanced motor technology designed to deliver smooth, soft, and perfectly mixed dough every time.",
    icon: <Zap className="text-[#EA9E26]" />, 
    image: img1, 
    tag: "High Efficiency"
  },
  {
    id: 2,
    title: "Ease of Use",
    desc: "Designed with a simple and user friendly control system, the machine allows anyone to prepare dough easily without complicated settings.",
    icon: <Smile className="text-[#EA9E26]" />, 
    image: img2, 
    tag: "Simple Controls"
  },
  {
    id: 3,
    title: "Hygine",
    desc: "Manufactured with food grade hygienic materials to ensure safe and healthy dough preparation. Its easy to clean design helps maintain cleanliness.",
    icon: <ShieldCheck className="text-[#EA9E26]" />, 
    image: img3, 
    tag: "304 Food Grade"
  },
  {
    id: 4,
    title: "Time Saving",
    desc: "The high speed mixing system prepares dough within minutes, reducing manual effort and saving valuable time in your kitchen.",
    icon: <Timer className="text-[#EA9E26]" />, 
    image: img4, 
    tag: "Fast Action"
  },
  {
    id: 5,
    title: "Precision Water Inlet",
    desc: "The specialized lid cover allows you to add water in small, controlled amounts while mixing. This ensures the dough achieves the perfect texture and consistency.",
    icon: <Droplets className="text-[#EA9E26]" />, 
    image: img5, 
    tag: "Smart Lid Design"
  },
  {
    id: 6,
    title: "Non-Stick Technology",
    desc: "Graino's premium steel grinder blade ensures the dough stays gathered in one place and doesn't stick to the bowl, making it mess-free and easy to remove.",
    icon: <Sparkles className="text-[#EA9E26]" />, 
    image: img6, 
    tag: "Zero Stick"
  },
];

const Features = () => {
  const containerRef = useRef(null);

  useEffect(() => {
    let ctx = gsap.context(() => {
      gsap.from(".parts-header", {
        opacity: 0,
        y: 30,
        duration: 1,
        scrollTrigger: {
          trigger: ".parts-header",
          start: "top 85%",
        },
      });
    }, containerRef);

    return () => ctx.revert();
  }, []);

  return (
    // font-sans class yahan add ki gayi hai (Inter, Roboto, ya System Sans-serif use hoga)
    <section ref={containerRef} className="bg-[#FDFDFD] py-12 md:py-20 px-4 sm:px-8 md:px-16 lg:px-24 font-sans overflow-hidden">
      
      {/* Header Section */}
      <div className="parts-header text-center mb-10 md:mb-16">
        <h2 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-black text-[#163D68] tracking-tight leading-tight">
          Premium Features<span className="text-[#EA9E26]">.</span>
        </h2>
        <p className="text-gray-500 mt-4 max-w-2xl mx-auto text-sm sm:text-base md:text-lg font-medium px-4">
          The Graino Doughmixer is engineered for efficiency, combining high-capacity performance with easy-to-use smart controls.
        </p>
      </div>

      {/* Parts Grid - Responsive across all screens */}
      <div className="max-w-[1400px] mx-auto grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 md:gap-8 lg:gap-10 justify-items-center">
        {parts.map((part, index) => (
          <motion.div
            key={part.id}
            initial={{ opacity: 0, y: 50 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-50px" }}
            transition={{ delay: index * 0.1, duration: 0.6, ease: "easeOut" }}
            className="group relative bg-white rounded-[2rem] md:rounded-[2.5rem] p-4 border border-gray-100 shadow-sm hover:shadow-xl transition-all duration-500 w-full max-w-[400px]"
          >
            {/* Image Wrapper */}
            <div className="relative h-48 sm:h-56 md:h-64 w-full overflow-hidden rounded-[2rem] md:rounded-[3rem] mb-6 bg-gray-50">
              <img 
                src={part.image} 
                alt={part.title} 
                className="w-full h-full object-contain rounded-[2rem] p-4 transition-transform duration-1000 group-hover:scale-105"
              />
              <div className="absolute top-4 left-4">
                <span className="bg-white/90 backdrop-blur-md text-[#163D68] text-[10px] md:text-xs font-bold px-3 py-1.5 rounded-full shadow-sm">
                  {part.tag}
                </span>
              </div>
            </div>

            {/* Info Section */}
            <div className="px-2 md:px-4 pb-4 md:pb-6">
              <div className="flex items-center gap-3 md:gap-4 mb-3 md:mb-4">
                <div className="w-10 h-10 md:w-12 md:h-12 min-w-[2.5rem] md:min-w-[3rem] rounded-xl md:rounded-2xl bg-[#EA9E26]/10 flex items-center justify-center group-hover:bg-[#EA9E26] transition-colors duration-300">
                  {React.cloneElement(part.icon, { 
                    className: "group-hover:text-white transition-colors duration-300 w-5 h-5 md:w-6 md:h-6" 
                  })}
                </div>
                <h3 className="text-lg md:text-xl font-bold text-[#163D68] capitalize leading-tight">
                  {part.title}
                </h3>
              </div>
              <p className="text-gray-600 text-sm md:text-base leading-relaxed">
                {part.desc}
              </p>
            </div>

            {/* Hover Decorator - Hide on small touch screens for better performance */}
            <div className="hidden md:block absolute top-0 right-0 p-8 opacity-0 group-hover:opacity-10 transition-opacity">
              <div className="w-24 h-24 bg-[#163D68] rounded-full blur-3xl" />
            </div>
          </motion.div>
        ))}
      </div>
    </section>
  );
};

export default Features;