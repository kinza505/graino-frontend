import React, { useEffect, useRef, useState } from "react";
import { useCart } from "../context/CartContext";
import { gsap } from "gsap";
import { ShoppingCart, ArrowLeft, CheckCircle2, Truck, Timer, ShieldCheck } from "lucide-react"; 
import { useNavigate } from "react-router-dom"; 

// 1. Images Import Karein (Apne filenames ke mutabiq adjust karein)
import mainImg from "../assets/how-5.png";
import img2 from "../assets/how-1.png"; // Agar file ka naam how-1.png hai
import img3 from "../assets/how-2.png"; // Agar file ka naam how-2.png hai

function ProductPage() {
  const { addToCart, setIsCartOpen } = useCart();
  const navigate = useNavigate(); 
  
  const containerRef = useRef(null);
  const mainImageRef = useRef(null);
  const cartTextRef = useRef(null);

  // 2. Gallery Array mein imported variables use karein
  const gallery = [
    mainImg, 
    img2, 
    img3
  ]; 

  const [currentImage, setCurrentImage] = useState(gallery[0]);

  const product = {
    id: "graino-001",
    name: "Graino Automatic Dough Maker",
    price: 11999,
    image: currentImage, 
    description: "Transform your kitchen experience with the Graino Automatic Dough Maker. Effortlessly knead soft, consistent dough in under 3 minutes with our professional-grade planetary motor technology."
  };

  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.from(".animate-fade-up", {
        y: 30,
        opacity: 0,
        duration: 1,
        stagger: 0.1,
        ease: "power3.out"
      });

      gsap.to(mainImageRef.current, {
        y: -15,
        duration: 2.5,
        repeat: -1,
        yoyo: true,
        ease: "sine.inOut"
      });
    }, containerRef);
    return () => ctx.revert();
  }, []);

  const handleThumbClick = (img) => {
    if (currentImage === img) return;

    const tl = gsap.timeline();
    tl.to(mainImageRef.current, {
      opacity: 0,
      scale: 0.8,
      duration: 0.25,
      ease: "power2.in",
      onComplete: () => {
        setCurrentImage(img); 
      }
    });

    tl.to(mainImageRef.current, {
      opacity: 1,
      scale: 1,
      duration: 0.5,
      ease: "back.out(1.7)"
    });
  };

  const handleImageZoom = () => {
    gsap.to(mainImageRef.current, {
      scale: 1.15,
      duration: 0.4,
      ease: "power2.out",
      yoyo: true,
      repeat: 1
    });
  };

  const handleAddToCart = () => {
    gsap.to(cartTextRef.current, {
      y: -20, opacity: 0, duration: 0.2, onComplete: () => {
        addToCart(product);
        gsap.fromTo(cartTextRef.current, { y: 20, opacity: 0 }, { y: 0, opacity: 1, duration: 0.3 });
        setTimeout(() => setIsCartOpen(true), 400);
      }
    });
  };

  const features = ["3-Minute Quick Kneading", "600W Pure Copper Motor", "3.5L Stainless Steel Bowl", "Automatic Smart Timer", "Low Noise Design", "1-Year Motor Warranty"];

  return (
    <div className="min-h-screen bg-white font-sans text-slate-900 pt-20 overflow-x-hidden" ref={containerRef}>

      <nav className="max-w-7xl mx-auto px-8 py-8 relative z-[110]">
        <button 
          onClick={() => navigate("/")} 
          className="group flex items-center gap-3 text-slate-500 hover:text-[#EA9E26] transition-colors duration-300 cursor-pointer"
        >
          <ArrowLeft size={20} className="group-hover:-translate-x-2 transition-transform duration-300" />
          <span className="text-sm font-black uppercase tracking-widest">Back to Collection</span>
        </button>
      </nav>

      <main className="max-w-7xl mx-auto px-8 grid lg:grid-cols-2 gap-12 items-start">
        
        {/* LEFT: IMAGE & GALLERY */}
        <div className="flex flex-col items-center">
          <div 
            className="relative w-full aspect-square flex items-center justify-center cursor-zoom-in z-10"
            onClick={handleImageZoom}
          >
            <div className="absolute w-72 h-72 bg-[#EA9E26]/5 rounded-full blur-[100px] -z-10"></div>
            <img 
              ref={mainImageRef} 
              src={currentImage} 
              alt={product.name} 
              className="w-full max-w-[420px] h-[420px] object-contain drop-shadow-2xl" 
            />
          </div>

          {/* THUMBNAILS */}
          <div className="flex gap-4 mt-8 relative z-20">
            {gallery.map((img, index) => (
              <button 
                key={index} 
                onClick={() => handleThumbClick(img)} 
                className={`w-24 h-24 rounded-2xl border-2 transition-all duration-500 p-3 bg-white cursor-pointer overflow-hidden shadow-sm hover:shadow-md
                  ${currentImage === img ? "border-[#EA9E26] scale-110 shadow-[#EA9E26]/20" : "border-slate-100 hover:border-slate-300 opacity-60 hover:opacity-100"}`}
              >
                <img src={img} className="w-full h-full object-contain pointer-events-none" alt={`view-${index}`} />
              </button>
            ))}
          </div>
        </div>

        {/* RIGHT: CONTENT */}
        <div className="flex flex-col space-y-8">
          <div className="animate-fade-up">
            <span className="text-[#EA9E26] text-xs font-black uppercase tracking-[0.3em] mb-4 flex items-center gap-2">
              <ShieldCheck size={16} /> Premium Home Appliance
            </span>
            <h1 className="text-5xl font-black tracking-tight text-slate-900 leading-[1.1] mb-4">
              {product.name}
            </h1>
            <p className="text-slate-500 text-lg leading-relaxed max-w-xl">
              {product.description}
            </p>
          </div>

          <div className="animate-fade-up">
            <div className="flex items-center gap-3">
              <span className="text-4xl font-black text-[#163D68]">PKR {product.price.toLocaleString()}</span>
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-y-4 gap-x-8 py-6 border-y border-slate-50 animate-fade-up">
            {features.map((f, i) => (
              <div key={i} className="flex items-center gap-3">
                <CheckCircle2 size={18} className="text-green-500 flex-shrink-0" />
                <span className="text-sm text-slate-700 font-semibold">{f}</span>
              </div>
            ))}
          </div>

          <div className="space-y-6 animate-fade-up pt-4">
            <button 
              onClick={handleAddToCart} 
              className="group relative w-full lg:max-w-md bg-[#163D68] text-white py-5 rounded-2xl font-bold text-lg hover:bg-[#EA9E26] transition-all duration-500 shadow-xl flex items-center justify-center gap-4 active:scale-95 overflow-hidden"
            >
              <ShoppingCart size={22} className="group-hover:rotate-12 transition-transform" />
              <span ref={cartTextRef}>Add to Shopping Cart</span>
            </button>

            <div className="flex items-center gap-6 bg-slate-50 p-5 rounded-2xl lg:max-w-md border border-slate-100">
              <div className="flex items-center gap-3 pr-6 border-r border-slate-200">
                <Truck size={22} className="text-[#EA9E26]" />
                <div>
                  <p className="text-[10px] font-bold text-slate-400 uppercase tracking-tighter">Delivery</p>
                  <p className="text-sm font-bold text-slate-800">2-3 Days</p>
                </div>
              </div>
              <div className="flex items-center gap-3">
                <Timer size={22} className="text-[#EA9E26]" />
                <div>
                  <p className="text-[10px] font-bold text-slate-400 uppercase tracking-tighter">Warranty</p>
                  <p className="text-sm font-bold text-slate-800">2 Years</p>
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

export default ProductPage;