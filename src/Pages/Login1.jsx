import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../context/AuthContext";
import { Eye, EyeOff, AlertCircle, ArrowLeft } from "lucide-react";
import axios from "axios";
import BASE_URL from "../config/api";

const Login1 = () => {
  const navigate = useNavigate();
  const { login } = useAuth();

  const [creds, setCreds] = useState({ email: "", password: "" });
  const [showPass, setShowPass] = useState(false);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const handleLogin1 = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError("");

    try {
      const res = await axios.post(`${BASE_URL}/api/auth/login1`, {
        email: creds.email,
        password: creds.password,
      });

      const userData = {
        id: res.data.user.id || res.data.user._id,
        name: res.data.user.name,
        email: res.data.user.email
      };

      login(userData);
      setLoading(false);
      navigate("/");
    } catch (err) {
      setLoading(false);
      setError(err.response?.data?.message || "Login failed");
    }
  };

  const inputClass = `w-full p-4 rounded-2xl bg-gray-50 border outline-none transition-all duration-200 placeholder:text-gray-400
  ${error ? "border-red-500 focus:border-red-500" : "border-gray-200 focus:border-[#EA9E26]"}`;

  return (
    // pt-28 add kia hai taake content Navbar ke neeche se start ho
    <div className="min-h-screen bg-white flex flex-col items-center justify-center p-4 font-sans relative pt-28 pb-10">

      {/* Back Button */}

      <div className="w-full max-w-[420px] bg-white p-6 sm:p-10 rounded-[2.5rem] border border-gray-100 shadow-[0_20px_60px_-15px_rgba(0,0,0,0.1)]">
        <div className="text-center mb-8">
          <h2 className="text-3xl font-extrabold text-gray-900">
            Welcome <span className="text-[#EA9E26]">Back!</span>
          </h2>
          <p className="text-gray-500 mt-2 text-sm">Please enter your details to sign in</p>
        </div>

        <form onSubmit={handleLogin1} className="space-y-5">
          <div>
            <label className="text-sm font-bold text-gray-700 ml-1">Email Address</label>
            <input type="email" placeholder="name@example.com" required className={inputClass} onChange={(e) => setCreds({ ...creds, email: e.target.value })} />
          </div>

          <div>
            <label className="text-sm font-bold text-gray-700 ml-1">Password</label>
            <div className="relative">
              <input type={showPass ? "text" : "password"} placeholder="••••••••" required className={inputClass} onChange={(e) => setCreds({ ...creds, password: e.target.value })} />
              <button type="button" onClick={() => setShowPass(!showPass)} className="absolute right-4 top-1/2 -translate-y-1/2 text-gray-400">
                {showPass ? <EyeOff size={22} /> : <Eye size={22} />}
              </button>
            </div>
          </div>

          {error && <p className="text-red-500 text-sm font-semibold flex items-center gap-2"><AlertCircle size={16} />{error}</p>}

          <button type="submit" disabled={loading} className="w-full bg-[#EA9E26] text-white h-[58px] rounded-2xl font-bold text-lg hover:bg-[#d88d1d] transition-all flex justify-center items-center">
            {loading ? "Loading..." : "Login Now"}
          </button>
        </form>

        <p className="text-center text-gray-500 mt-8 text-sm font-medium">
          New here? <span onClick={() => navigate("/signup")} className="text-[#EA9E26] cursor-pointer font-bold hover:underline">Create Account</span>
        </p>
      </div>
    </div>
  );
};

export default Login1;