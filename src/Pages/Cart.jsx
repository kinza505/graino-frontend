import React, { useEffect, useRef, useState } from "react";
import { useCart } from "../context/CartContext";
import { gsap } from "gsap";
import { ShoppingCart, ArrowLeft, CheckCircle2, Truck, Timer, ShieldCheck } from "lucide-react"; 
import { useNavigate } from "react-router-dom"; 
import { BadgeCheck } from "lucide-react";
// Images
import mainImg from "../assets/how-to-work-5.png";
import img2 from "../assets/how-to-work-1.png"; 
import img3 from "../assets/how-to-work-2.png"; 

function Cart() {
  const { addToCart, setIsCartOpen } = useCart();
  const navigate = useNavigate(); 
  
  const containerRef = useRef(null);
  const mainImageRef = useRef(null);
  const cartTextRef = useRef(null);
  const contentRef = useRef(null);

  const gallery = [mainImg, img2, img3]; 
  const [currentImage, setCurrentImage] = useState(gallery[0]);

  const product = {
    id: "graino-001",
    name: "Graino Automatic Dough Mixer",
    price: 11999,
    image: currentImage, 
    description: "Transform your kitchen experience with the Graino Automatic Dough Mixer. Effortlessly knead soft, consistent dough in under 3 minutes with our professional grade planetary motor technology."
  };

  useEffect(() => {
    let ctx = gsap.context(() => {
      const tl = gsap.timeline({ defaults: { ease: "power4.out" } });

      // 1. Initial Entrance Animation
      tl.from(".product-image-container", {
        x: -100,
        opacity: 0,
        duration: 1.2,
      })
      .from(".animate-text", {
        y: 40,
        opacity: 0,
        duration: 1,
        stagger: 0.15,
      }, "-=0.8")
      .from(".feature-item", {
        scale: 0.8,
        opacity: 0,
        duration: 0.6,
        stagger: 0.1,
      }, "-=0.5");

      // 2. Continuous Floating Animation (More Natural)
      gsap.to(mainImageRef.current, {
        y: -20,
        rotation: 2,
        duration: 3,
        repeat: -1,
        yoyo: true,
        ease: "sine.inOut"
      });
    }, containerRef);

    return () => ctx.revert();
  }, []);

  // Smooth Image Switching
  const handleThumbClick = (img) => {
    if (currentImage === img) return;

    gsap.to(mainImageRef.current, {
      opacity: 0,
      x: -20,
      scale: 0.95,
      duration: 0.3,
      ease: "power2.in",
      onComplete: () => {
        setCurrentImage(img);
        gsap.fromTo(mainImageRef.current, 
          { opacity: 0, x: 20, scale: 0.9 },
          { opacity: 1, x: 0, scale: 1, duration: 0.6, ease: "back.out(1.7)" }
        );
      }
    });
  };

  const handleAddToCart = () => {
    const tl = gsap.timeline();
    
    tl.to(cartTextRef.current, {
      y: -10,
      opacity: 0,
      duration: 0.2,
      onComplete: () => {
        addToCart(product);
      }
    })
    .set(cartTextRef.current, { y: 10 })
    .to(cartTextRef.current, {
      y: 0,
      opacity: 1,
      duration: 0.4,
      ease: "back.out"
    });

    // Button Feedback
    gsap.to(".cart-btn", {
      scale: 0.95,
      duration: 0.1,
      yoyo: true,
      repeat: 1
    });

    setTimeout(() => setIsCartOpen(true), 600);
  };

  const features = ["3-Minute Quick Kneading", "600W Pure Copper Motor", "3.5L Stainless Steel Bowl", "Automatic Smart Timer", "Low Noise Design", "1-Year Motor Warranty"];

  return (
    <div className="min-h-screen bg-white font-sans text-slate-900 pt-20 overflow-x-hidden" ref={containerRef}>
      
      <nav className="max-w-7xl mx-auto px-8 py-8">
        <button 
          onClick={() => navigate("/")} 
          className="group flex items-center gap-3 text-slate-500 hover:text-[#EA9E26] transition-all duration-300"
        >
          <ArrowLeft size={20} className="group-hover:-translate-x-2 transition-transform" />
          <span className="text-sm font-black uppercase tracking-widest">Back to Collection</span>
        </button>
      </nav>

      <main className="max-w-7xl mx-auto px-8 grid lg:grid-cols-2 gap-16 items-center">
        
        {/* LEFT: IMAGE SECTION */}
        <div className="product-image-container flex flex-col items-center">
          <div className="relative w-full aspect-square flex items-center justify-center">
            {/* Soft Glow Background */}
            <div className="absolute w-[80%] h-[80%] bg-[#EA9E26]/10 rounded-full blur-[120px] animate-pulse"></div>
            
            <img 
              ref={mainImageRef} 
              src={currentImage} 
              alt={product.name} 
              className="w-full max-w-[450px] h-auto object-contain drop-shadow-[0_35px_35px_rgba(0,0,0,0.15)] z-10" 
            />
          </div>

          {/* THUMBNAILS */}
          <div className="flex gap-5 mt-12 z-20">
            {gallery.map((img, index) => (
              <button 
                key={index} 
                onClick={() => handleThumbClick(img)} 
                className={`w-20 h-20 rounded-2xl border-2 transition-all duration-500 p-2 bg-white shadow-sm overflow-hidden
                  ${currentImage === img 
                    ? "border-[#EA9E26] scale-110 shadow-lg shadow-[#EA9E26]/20" 
                    : "border-slate-100 opacity-50 hover:opacity-100 hover:scale-105"}`}
              >
                <img src={img} className="w-full h-full object-contain" alt="thumbnail" />
              </button>
            ))}
          </div>
        </div>

        {/* RIGHT: CONTENT SECTION */}
        <div className="flex flex-col space-y-8" ref={contentRef}>
          <div>
            <span className="animate-text block text-[#EA9E26] text-xs font-black uppercase tracking-[0.3em] mb-4">
             Premium Kitchen Series
            </span>
            <h1 className="animate-text text-6xl font-black tracking-tight text-slate-900 leading-[1.05] mb-6">
              {product.name}
            </h1>
            <p className="animate-text text-slate-500 text-lg leading-relaxed max-w-xl">
              {product.description}
            </p>
          </div>

          <div className="animate-text">
            <div className="flex items-baseline gap-2">
              <span className="text-4xl font-black text-[#163D68]">PKR {product.price.toLocaleString()}</span>
            </div>
          </div>

          {/* FEATURES GRID */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 py-8 border-y border-slate-100">
            {features.map((f, i) => (
              <div key={i} className="feature-item flex items-center gap-3">
                <div className="bg-green-50 p-1 rounded-full">
                  <CheckCircle2 size={16} className="text-green-600" />
                </div>
                <span className="text-sm text-slate-700 font-medium">{f}</span>
              </div>
            ))}
          </div>

          <div className="space-y-6 pt-4">
            <button 
              onClick={handleAddToCart} 
              className="cart-btn group relative w-full lg:max-w-md bg-[#163D68] text-white py-5 rounded-2xl font-bold text-lg hover:bg-[#EA9E26] transition-colors duration-300 shadow-2xl shadow-blue-900/20 flex items-center justify-center gap-4 active:scale-95"
            >
              <ShoppingCart size={22} className="group-hover:translate-x-1 transition-transform" />
              <span ref={cartTextRef} className="inline-block">Add to Shopping Cart</span>
            </button>

            {/* Trust Badges */}
            <div className="animate-text flex items-center gap-8 bg-slate-50/50 p-6 rounded-3xl lg:max-w-md border border-slate-100">
              <div className="flex items-center gap-3">
  <BadgeCheck size={24} className="text-[#EA9E26]" />
  <div>
    <p className="text-[10px] font-bold text-slate-400 uppercase tracking-widest">
      100%
    </p>
    <p className="text-xs font-bold text-slate-800">
      Customer Satisfaction
    </p>
  </div>
</div>
              <div className="w-[1px] h-8 bg-slate-200"></div>
              <div className="flex items-center gap-3">
                <Timer size={24} className="text-[#EA9E26]" />
                <div>
                  <p className="text-[10px] font-bold text-slate-400 uppercase tracking-widest">Warranty</p>
                  <p className="text-xs font-bold text-slate-800">1 Year Motor</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </main>
      <div className="h-20"></div>
    </div>
  );
}

export default Cart;