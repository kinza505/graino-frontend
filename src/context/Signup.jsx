import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Eye, EyeOff, AlertCircle } from "lucide-react";

const Signup = () => {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({ firstName: "", lastName: "", email: "", phone: "", password: "" });
  const [showPass, setShowPass] = useState(false);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const showError = (msg) => {
    setError(msg);
    setTimeout(() => setError(""), 2000);
  };

  const handleSignup = (e) => {
    e.preventDefault();
    const { firstName, lastName, email, phone, password } = formData;

    // VALIDATIONS
    if (!/^[A-Za-z]+$/.test(firstName)) return showError("First Name: Only alphabets allowed");
    if (!/^[A-Za-z]+$/.test(lastName)) return showError("Last Name: Only alphabets allowed");
    if (!/^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/.test(email)) return showError("Invalid Email Format");
    if (!/^\d{11}$/.test(phone)) return showError("Phone Number must be exactly 11 digits");
    if (password.length < 6) return showError("Password must be at least 6 characters");

    setLoading(true);
    
    // Simulate Backend Save
    setTimeout(() => {
      const users = JSON.parse(localStorage.getItem("users") || "[]");
      users.push(formData);
      localStorage.setItem("users", JSON.stringify(users));
      setLoading(false);
      navigate("/login");
    }, 2500); // 3 dots loader for 2.5s
  };

  return (
    <div className="min-h-screen bg-[#0F2744] flex items-center justify-center p-6 font-sans">
      {error && (
        <div className="fixed top-10 left-1/2 -translate-x-1/2 bg-red-500 text-white px-6 py-3 rounded-full shadow-2xl flex items-center gap-2 z-[3000] animate-in fade-in zoom-in duration-300">
          <AlertCircle size={20} /> {error}
        </div>
      )}

      <div className="bg-white/5 backdrop-blur-xl p-8 rounded-[30px] border border-white/10 w-full max-w-md shadow-2xl">
        <h2 className="text-3xl font-bold text-white mb-2 text-center">Join <span className="text-[#EA9E26]">Grano</span></h2>
        <p className="text-white/50 text-center mb-8 text-sm">Create your account to start shopping</p>
        
        <form onSubmit={handleSignup} className="space-y-4">
          <div className="flex gap-3">
            <input type="text" placeholder="First Name" className="w-1/2 p-3.5 rounded-2xl bg-white/5 border border-white/10 text-white focus:border-[#EA9E26] outline-none transition" onChange={(e) => setFormData({...formData, firstName: e.target.value})} />
            <input type="text" placeholder="Last Name" className="w-1/2 p-3.5 rounded-2xl bg-white/5 border border-white/10 text-white focus:border-[#EA9E26] outline-none transition" onChange={(e) => setFormData({...formData, lastName: e.target.value})} />
          </div>
          <input type="email" placeholder="Email Address" className="w-full p-3.5 rounded-2xl bg-white/5 border border-white/10 text-white focus:border-[#EA9E26] outline-none transition" onChange={(e) => setFormData({...formData, email: e.target.value})} />
          <input type="text" placeholder="Phone Number (11 digits)" className="w-full p-3.5 rounded-2xl bg-white/5 border border-white/10 text-white focus:border-[#EA9E26] outline-none transition" onChange={(e) => setFormData({...formData, phone: e.target.value})} />
          
          <div className="relative">
            <input type={showPass ? "text" : "password"} placeholder="Password" title="At least 6 chars" className="w-full p-3.5 rounded-2xl bg-white/5 border border-white/10 text-white focus:border-[#EA9E26] outline-none transition" onChange={(e) => setFormData({...formData, password: e.target.value})} />
            <button type="button" onClick={() => setShowPass(!showPass)} className="absolute right-4 top-1/2 -translate-y-1/2 text-white/40 hover:text-[#EA9E26]">
              {showPass ? <EyeOff size={20} /> : <Eye size={20} />}
            </button>
          </div>

          <button type="submit" disabled={loading} className="w-full bg-[#EA9E26] text-black h-[55px] rounded-2xl font-black text-lg hover:scale-[1.02] active:scale-95 transition-all flex justify-center items-center">
            {loading ? (
              <div className="flex gap-1.5">
                <span className="w-2 h-2 bg-black rounded-full animate-bounce"></span>
                <span className="w-2 h-2 bg-black rounded-full animate-bounce [animation-delay:0.2s]"></span>
                <span className="w-2 h-2 bg-black rounded-full animate-bounce [animation-delay:0.4s]"></span>
              </div>
            ) : "Create Account"}
          </button>
        </form>
        <p className="text-center text-white/60 mt-6 text-sm">Already have an account? <span onClick={() => navigate("/login")} className="text-[#EA9E26] cursor-pointer font-bold hover:underline">Login</span></p>
      </div>
    </div>
  );
};
export default Signup;