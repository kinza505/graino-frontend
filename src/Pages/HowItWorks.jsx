import React, { useLayoutEffect, useRef, useState } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { useNavigate } from "react-router-dom";
import { motion } from "framer-motion";

import STEP_1 from "../assets/how-to-work-1.png";
import STEP_2 from "../assets/how-to-work-2.png";
import STEP_3 from "../assets/how-to-work-3.png";
import STEP_4 from "../assets/how-to-work-4.png";

gsap.registerPlugin(ScrollTrigger);

const content = {
  en: {
    heading: "How It Works",
    subHeading: "Fresh dough in 4 simple steps",
    description: "The Graino Dough Mixer Machine is designed to make your kitchen tasks easier. Now you can knead perfect dough for roti, pizza, or bread within minutes without any effort.",
    buttonLabel: "اردو میں دیکھیں",
    orderBtn: "ORDER NOW",
    steps: [
      { id: 1, title: "Add Ingredients", desc: "First, remove the lid cover and add dry flour into it.", color: "#EA9E26", image: STEP_1 },
      { id: 2, title: "Set Time & Speed", desc: "Now place the lid cover back on top, start the machine, set the timer, and then gradually add water as required.", color: "#163D68", image: STEP_2 },
      { id: 3, title: "Mixing Dough", desc: "Now the machine will start kneading the dough, and continue adding water as needed.", color: "#EA9E26", image: STEP_3 },
      { id: 4, title: "Perfect Dough Ready", desc: "Now the dough is ready.", color: "#163D68", image: STEP_4 }
    ]
  },
  ur: {
    heading: "یہ کیسے کام کرتا ہے",
    subHeading: "صرف 4 آسان مراحل میں تازہ آٹا تیار کریں",
    description: " گرینو ڈو مکسر مشین آپ کے کچن کے کاموں کو آسان بنانے کے لیے ڈیزائن کی گئی ہے۔ اب آپ بغیر کسی محنت کے محض چند منٹوں میں روٹی، پیزا یا بریڈ کے لیے بہترین آٹا گوندھ سکتے ہیں۔",
    buttonLabel: "Switch to English",
    orderBtn: "ابھی آرڈر کریں",
    steps: [
      { id: 1, title: "اجزاء شامل کریں", desc: "سب سے پہلے ڈھکن اتاریں اور اس میں خشک آٹا ڈالیں", color: "#EA9E26", image: STEP_1 },
      { id: 2, title: "وقت اور رفتار سیٹ کریں", desc: " اب ڈھکن واپس اوپر لگا دیں، مشین اسٹارٹ کریں، ٹائمر سیٹ کریں اور پھر ضرورت کے مطابق آہستہ آہستہ پانی ڈالیں۔", color: "#163D68", image: STEP_2 },
      { id: 3, title: "ون ٹچ اسٹارٹ", desc: "اب مشین آٹا گوندھنا شروع کر دے گی، ضرورت کے مطابق پانی ڈالنا جاری رکھیں۔", color: "#EA9E26", image: STEP_3 },
      { id: 4, title: "بہترین آٹا تیار ہے", desc: "اب آپ کا آٹا بالکل تیار ہے۔", color: "#163D68", image: STEP_4 }
    ]
  }
};

const HowItWorks = () => {
  const [lang, setLang] = useState("en");
  const containerRef = useRef(null);
  const lineRef = useRef(null);
  const buttonRef = useRef(null);
  
  const navigate = useNavigate();
  const currentContent = content[lang];
const isUrdu = lang === 'ur';
  const handleOrderNow = () => {
    navigate("/cart");
  };

  useLayoutEffect(() => {
    let ctx = gsap.context(() => {
      gsap.fromTo(
        lineRef.current,
        { height: 0 },
        {
          height: "100%",
          ease: "none",
          scrollTrigger: {
            trigger: containerRef.current,
            start: "top 20%",
            end: "bottom 80%",
            scrub: 1,
          },
        }
      );

      currentContent.steps.forEach((_, i) => {
        gsap.from(`.step-card-${i}`, {
          y: 50,
          opacity: 0,
          duration: 0.8,
          scrollTrigger: {
            trigger: `.step-card-${i}`,
            start: "top 90%",
            toggleActions: "play none none reverse"
          },
        });
      });
    }, containerRef);

    return () => ctx.revert();
  }, [lang]);

  return (
<section
  ref={containerRef}
  style={{
    fontFamily: "'Inter', 'Segoe UI', Roboto, Helvetica, Arial, sans-serif"
  }}
  className={`relative bg-[#F8FAFC] py-16 md:py-24 px-4 sm:px-8 md:px-20 overflow-hidden ${
    isUrdu ? 'text-right' : 'text-left'
  }`}
  dir={isUrdu ? 'rtl' : 'ltr'}
>
      
      {/* Background Heading - Responsive Text Size */}
      <div className="absolute top-0 left-1/2 -translate-x-1/2 opacity-[0.03] select-none pointer-events-none">
        <h1 className="text-[18vw] md:text-[12vw] font-black text-[#163D68] whitespace-nowrap leading-none">
          {lang === 'en' ? 'EASY STEPS' : 'آسان مراحل'}
        </h1>
      </div>

      {/* Header */}
      <div className="text-center mb-12 md:mb-20 relative z-10 max-w-4xl mx-auto">
        <h2 className="text-3xl sm:text-4xl md:text-6xl font-black text-[#163D68] mb-4">
          {currentContent.heading}
        </h2>
        <p className="text-[#EA9E26] font-bold text-lg md:text-xl mb-4">{currentContent.subHeading}</p>
        <p className="text-gray-600 text-base md:text-lg leading-relaxed mb-8 px-4">
          {currentContent.description}
        </p>
        
        <button 
          onClick={() => setLang(lang === 'en' ? 'ur' : 'en')}
          className="bg-[#163D68] text-white px-6 md:px-8 py-2 md:py-3 rounded-full font-bold hover:bg-[#EA9E26] transition-colors duration-300 shadow-lg text-sm md:text-base"
        >
          {currentContent.buttonLabel}
        </button>
      </div>

      <div className="relative max-w-6xl mx-auto mb-16 md:mb-24">
        {/* Vertical Timeline Line - Only visible on desktop */}
        <div className={`absolute top-0 w-1 h-full bg-gray-200 hidden md:block ${lang === 'ur' ? 'right-1/2 translate-x-1/2' : 'left-1/2 -translate-x-1/2'}`}>
          <div ref={lineRef} className="w-full bg-[#EA9E26] origin-top" />
        </div>

        <div className="space-y-16 md:space-y-32">
          {currentContent.steps.map((step, index) => (
            <div 
              key={step.id} 
              className={`flex flex-col md:flex-row items-center justify-between gap-8 md:gap-0 ${
                index % 2 !== 0 ? "md:flex-row-reverse" : ""
              }`}
            >
              {/* Text Card */}
              <div className={`step-card-${index} w-full md:w-[44%] lg:w-[42%] bg-white p-6 sm:p-8 md:p-10 rounded-[2rem] md:rounded-[2.5rem] shadow-xl shadow-gray-200/50 border border-white relative`}>
                <div 
                  className={`absolute -top-5 md:-top-6 w-12 h-12 md:w-16 md:h-16 rounded-xl md:rounded-2xl flex items-center justify-center text-white font-black text-xl md:text-2xl shadow-lg ${lang === 'ur' ? '-right-4 md:-right-6' : '-left-4 md:-left-6'}`}
                  style={{ backgroundColor: step.color }}
                >
                  0{step.id}
                </div>
                <h3 className="text-xl md:text-2xl font-bold text-[#163D68] mb-3 md:mb-4">{step.title}</h3>
                <p className="text-gray-500 text-base md:text-lg leading-relaxed">{step.desc}</p>
              </div>

              {/* Central Dot - Only visible on desktop */}
              <div className={`hidden md:flex absolute top-1/2 -translate-y-1/2 w-8 h-8 lg:w-10 lg:h-10 rounded-full bg-white border-4 border-[#EA9E26] z-10 items-center justify-center shadow-lg ${lang === 'ur' ? 'right-1/2 translate-x-1/2' : 'left-1/2 -translate-x-1/2'}`}>
                <div className="w-2 h-2 lg:w-3 lg:h-3 bg-[#163D68] rounded-full" />
              </div>

              {/* Image Card */}
              <div className={`step-card-${index} w-full md:w-[44%] lg:w-[42%] rounded-[2rem] md:rounded-[2.5rem] overflow-hidden shadow-2xl h-56 sm:h-72 md:h-80`}>
                <img 
                  src={step.image} 
                  alt={step.title} 
                  className="w-full h-full object-cover hover:scale-110 transition-transform duration-700" 
                />
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Order Now Button */}
      <div className="flex justify-center mt-8 md:mt-12 relative z-20">
        <div ref={buttonRef}>
          <motion.button
            onClick={handleOrderNow}
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            className="bg-[#EA9E26] text-white px-8 md:px-12 py-4 md:py-5 rounded-full font-extrabold text-lg md:text-xl shadow-2xl hover:bg-[#163D68] transition-colors duration-300"
          >
            {currentContent.orderBtn}
          </motion.button>
        </div>
      </div>

    </section>
  );
};

export default HowItWorks;