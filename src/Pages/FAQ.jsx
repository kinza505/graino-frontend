import React, { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { ChevronDown, Sparkles, ShieldCheck, Clock, Settings, Droplets, Zap } from "lucide-react";

const faqData = [
  {
    id: 1,
    icon: <Settings />,
    question: "Can it handle heavy doughs like whole wheat or pizza?",
    answer: "Absolutely. The Griano Dough Maker features a high torque 800W motor specifically engineered to knead dense, heavy doughs including 100% whole wheat, sourdough, and pizza bases without overheating or slowing down.",
  },
  {
    id: 2,
    icon: <Droplets />,
    question: "How difficult is it to clean after kneading?",
    answer: "Cleaning takes less than 60 seconds. The mixing bowl and blades are coated with premium non-stick food grade material. They are also 'Quick Release' and dishwasher safe, ensuring no dough sticks to the corners.",
  },
  {
    id: 3,
    icon: <Clock />,
    question: "How fast can it knead a standard batch of dough?",
    answer: "While hand-kneading takes 15-20 minutes, Griano achieves perfect elasticity and gluten development in just 3 to 5 minutes, giving you professional bakery quality results in a fraction of the time.",
  },
  {
    id: 4,
    icon: <Zap />,
    question: "Does the machine stay stable on the counter during use?",
    answer: "Yes. It is equipped with industrial strength vacuum suction feet and an internal balancing system that prevents the machine from 'walking' or vibrating across your countertop, even at maximum capacity.",
  },
  {
    id: 5,
    icon: <ShieldCheck />,
    question: "What is the warranty and motor life expectancy?",
    answer: "We offer a 2 year comprehensive warranty and a 5 year guarantee on the motor. Griano is built with all-metal gears (not plastic), designed to last for over 10 years of daily kitchen use.",
  },
  {
    id: 6,
    icon: <Sparkles />,
    question: "Is it suitable for small quantities like 2 3 rotis?",
    answer: "Griano is designed for versatility. Its unique bottom-scraping blade technology allows it to knead as little as 250g of flour or as much as 2kg with equal efficiency and consistency.",
  },
];

const FAQ = () => {
  const [activeIndex, setActiveIndex] = useState(null);

  return (
    <section className="py-12 md:py-20 bg-white font-sans overflow-hidden">
      <div className="max-w-4xl mx-auto px-4 md:px-6">
        {/* Header Section */}
        <div className="text-center mb-10 md:mb-14">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="flex items-center justify-center gap-2 mb-3"
          >
            <span className="h-px w-6 md:w-8 bg-[#EA9E26]"></span>
            <span className="text-[#EA9E26] font-bold uppercase tracking-[0.2em] text-[10px] md:text-xs">
              Common Inquiries
            </span>
            <span className="h-px w-6 md:w-8 bg-[#EA9E26]"></span>
          </motion.div>

          <div className="text-center">
            {/* FAQ Heading: Changed to Medium Size (text-3xl to text-5xl) */}
            <motion.h2
              initial={{ scale: 0.9, opacity: 0 }}
              whileInView={{ scale: 1, opacity: 1 }}
              transition={{ type: "spring", stiffness: 200, damping: 15 }}
              className="text-5xl sm:text-6xl md:text-8xl font-black text-[#163D68] tracking-tight leading-tight"
            >
              F<span className="text-[#EA9E26] inline-block hover:rotate-12 transition-transform cursor-pointer">A</span>Q
            </motion.h2>
            
            <motion.div 
              initial={{ scaleX: 0 }}
              whileInView={{ scaleX: 1 }}
              transition={{ duration: 0.8, delay: 0.3 }}
              className="h-1 w-10 md:w-12 bg-[#EA9E26] mx-auto mt-2 rounded-full"
            />
          </div>
        </div>

        {/* Accordion List */}
        <div className="space-y-4">
          {faqData.map((item, index) => (
            <motion.div
              key={item.id}
              initial={{ opacity: 0, x: -20 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ delay: index * 0.1 }}
              className={`group rounded-2xl md:rounded-[2rem] border-2 transition-all duration-300 ${
                activeIndex === index 
                ? "border-[#163D68] bg-[#163D68] shadow-xl shadow-[#163D68]/20" 
                : "border-gray-100 bg-gray-50 hover:border-[#EA9E26]/50"
              }`}
            >
              <button
                onClick={() => setActiveIndex(activeIndex === index ? null : index)}
                className="w-full flex items-center justify-between p-5 md:p-7 text-left"
              >
                <div className="flex items-center gap-4 md:gap-5">
                  <div className={`p-2.5 md:p-3 rounded-xl md:rounded-2xl transition-colors duration-300 shrink-0 ${
                    activeIndex === index ? "bg-white/10" : "bg-white shadow-sm"
                  }`}>
                    {React.cloneElement(item.icon, { 
                      size: 20, 
                      className: `md:w-6 md:h-6 ${activeIndex === index ? "text-[#EA9E26]" : "text-[#EA9E26]"}` 
                    })}
                  </div>
                  <span className={`text-base md:text-lg font-bold transition-colors duration-300 pr-2 ${
                    activeIndex === index ? "text-white" : "text-[#163D68]"
                  }`}>
                    {item.question}
                  </span>
                </div>
                <motion.div
                  animate={{ rotate: activeIndex === index ? 180 : 0 }}
                  className={`shrink-0 ${activeIndex === index ? "text-[#EA9E26]" : "text-[#163D68]/30"}`}
                >
                  <ChevronDown size={22} className="md:w-6 md:h-6" />
                </motion.div>
              </button>

              <AnimatePresence>
                {activeIndex === index && (
                  <motion.div
                    initial={{ height: 0, opacity: 0 }}
                    animate={{ height: "auto", opacity: 1 }}
                    exit={{ height: 0, opacity: 0 }}
                    transition={{ duration: 0.4, ease: [0.04, 0.62, 0.23, 0.98] }}
                  >
                    <div className="px-5 md:px-7 pb-6 md:pb-8 pt-0 ml-12 md:ml-16 text-sm md:text-base leading-relaxed text-white/70">
                      <div className="h-px bg-white/10 mb-4 md:mb-5 w-full"></div>
                      {item.answer}
                    </div>
                  </motion.div>
                )}
              </AnimatePresence>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default FAQ;