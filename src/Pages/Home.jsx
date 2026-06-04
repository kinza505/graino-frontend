import React, { useEffect, useRef } from "react";
import { motion } from "framer-motion";
import { gsap } from "gsap";
// import background from "../assets/bg.mov";
import background from "../assets/background-img.png";
import { useCart } from "../context/CartContext";
import { useNavigate } from "react-router-dom";

function Home() {
  const { addToCart } = useCart();
  const buttonRef = useRef(null);
  const navigate = useNavigate();

  const handleOrderNow = () => {
    const product = {
      id: "griano-001",
      name: "Griano Dough Maker",
      price: 120,
      image: "/machine.png",
    };
    // Add to cart logic if needed before navigation
    // addToCart(product); 
    navigate("/cart");
  };

  // ✅ GSAP Magnetic Effect
  useEffect(() => {
    const btn = buttonRef.current;
    if (!btn) return;

    const onMouseMove = (e) => {
      const { clientX, clientY } = e;
      const { left, top, width, height } = btn.getBoundingClientRect();
      const x = (clientX - (left + width / 2)) * 0.3;
      const y = (clientY - (top + height / 2)) * 0.3;

      gsap.to(btn, { x, y, duration: 0.3 });
    };

    const onMouseLeave = () => {
      gsap.to(btn, {
        x: 0,
        y: 0,
        duration: 0.6,
        ease: "elastic.out(1, 0.3)",
      });
    };

    btn.addEventListener("mousemove", onMouseMove);
    btn.addEventListener("mouseleave", onMouseLeave);

    return () => {
      btn.removeEventListener("mousemove", onMouseMove);
      btn.removeEventListener("mouseleave", onMouseLeave);
    };
  }, []);

  return (
    // font-sans class ensures modern sans-serif typography
    <section className="relative w-full h-screen overflow-hidden flex items-center justify-center font-sans">

      {/* VIDEO BACKGROUND */}
      {/* <video
        autoPlay
        loop
        muted
        playsInline
        className="absolute z-0 w-full h-full object-cover"
      >
        <source src={background} type="video/mp4" />
      </video> */}
      <img
        src={background}
        alt="Background"
     className="absolute z-0 w-full h-full object-cover object-center"
      />


      {/* OVERLAY */}
      <div className="absolute inset-0 z-10 bg-gradient-to-b from-[#163D68]/80 via-[#163D68]/40 to-[#163D68]/90" />

      {/* CONTENT */}
      <div className="absolute inset-0 flex items-center justify-center">
        <div className="relative z-20 container mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <motion.div
            initial={{ opacity: 0, y: 40 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.9 }}
            className="max-w-5xl mx-auto"
          >
            <h1 className=" mt-22 text-3xl sm:text-4xl md:text-5xl lg:text-6xl xl:text-7xl font-black text-white mb-4 md:mb-6 leading-[1.1] tracking-tight">
              Perfect Dough Maker
            </h1>

            <p className="text-sm sm:text-base md:text-lg lg:text-xl text-white/80 mb-8 md:mb-10 max-w-xs sm:max-w-md md:max-w-2xl mx-auto leading-relaxed">
              Crafted for perfection, our dough mixter delivers consistent mixing
              and kneading, allowing you to create flawless dough effortlessly
              with maximum efficiency.
            </p>

            <div className="flex justify-center">
              <div ref={buttonRef}>
                <motion.button
                  onClick={handleOrderNow}
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  className="bg-[#EA9E26] text-black px-8 py-3 md:px-12 md:py-4 rounded-full font-bold shadow-lg text-sm md:text-base transition-colors hover:bg-[#d88d1f]"
                >
                  ORDER NOW
                </motion.button>
              </div>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}

export default Home;  