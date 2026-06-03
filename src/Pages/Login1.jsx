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

  // ✅ EMAIL VALIDATION FUNCTION
  const isValidEmail = (email) => {
    return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
  };

const handleLogin1 = async (e) => {
  e.preventDefault();
  setLoading(true);
  setError("");

  try {
    const res = await axios.post(`${BASE_URL}/api/auth/login1`, {
      email: creds.email,
      password: creds.password,
    });

    // ✅ Sirf ye hissa dhyan se dekhein:
    // Hum ensure kar rahe hain ke 'id' har haal mein mile
    const userData = {
      id: res.data.user.id || res.data.user._id, // Agar backend 'id' bheje ya '_id', dono handle ho jayenge
      name: res.data.user.name,
      email: res.data.user.email
    };

    console.log("User ID saved for Checkout:", userData.id); // Console mein check karein ID aa rahi hai ya nahi

    login(userData); // Context mein store ho gaya

    setLoading(false);
    navigate("/");
  } catch (err) {
    setLoading(false);
    setError(err.response?.data?.message || "Login failed");
  }
};

  // ✅ Dynamic input style
  const inputClass = `w-full p-4 rounded-2xl bg-gray-50 border outline-none transition-all duration-200 placeholder:text-gray-400
  ${
    error
      ? "border-red-500 focus:border-red-500 focus:ring-red-200"
      : "border-gray-200 focus:border-[#EA9E26] focus:ring-[#EA9E26]/10"
  }`;

  return (
    <div className="min-h-screen bg-white flex flex-col items-center justify-center p-4 font-sans relative">

      {/* Back Button */}
      <button
        onClick={() => navigate("/")}
        className="absolute top-4 left-4 flex items-center gap-2 text-gray-600 hover:text-black bg-gray-100 hover:bg-gray-200 px-3 py-2 rounded-xl border text-sm font-medium"
      >
        <ArrowLeft size={18} />
        Back
      </button>

      {/* Login Card */}
      <div className="w-full max-w-[420px] bg-white p-6 sm:p-10 rounded-[2.5rem] border border-gray-100 shadow-[0_20px_60px_-15px_rgba(0,0,0,0.1)]">

        {/* Header */}
        <div className="text-center mb-8">
          <h2 className="text-3xl font-extrabold text-gray-900">
            Welcome <span className="text-[#EA9E26]">Back!</span>
          </h2>
          <p className="text-gray-500 mt-2 text-sm">
            Please enter your details to sign in
          </p>
        </div>

        <form onSubmit={handleLogin1} className="space-y-5">

          {/* Email */}
          <div>
            <label className="text-sm font-bold text-gray-700 ml-1">
              Email Address
            </label>
            <input
              type="email"
              placeholder="name@example.com"
              required
              className={inputClass}
              onChange={(e) =>
                setCreds({ ...creds, email: e.target.value })
              }
            />
          </div>

          {/* Password */}
          <div>
            <label className="text-sm font-bold text-gray-700 ml-1">
              Password
            </label>

            <div className="relative">
              <input
                type={showPass ? "text" : "password"}
                placeholder="••••••••"
                required
                className={inputClass}
                onChange={(e) =>
                  setCreds({ ...creds, password: e.target.value })
                }
              />

              <button
                type="button"
                onClick={() => setShowPass(!showPass)}
                className="absolute right-4 top-1/2 -translate-y-1/2 text-gray-400 hover:text-[#EA9E26]"
              >
                {showPass ? (
                  <EyeOff size={22} />
                ) : (
                  <Eye size={22} />
                )}
              </button>
            </div>
          </div>

          {/* Error Message */}
          {error && (
            <p className="text-red-500 text-sm font-semibold flex items-center gap-2 ml-1">
              <AlertCircle size={16} />
              {error}
            </p>
          )}

          {/* Button */}
          <button
            type="submit"
            disabled={loading}
            className="w-full bg-[#EA9E26] text-white h-[58px] rounded-2xl font-bold text-lg hover:bg-[#d88d1d] transition-all flex justify-center items-center"
          >
            {loading ? (
              <div className="flex gap-2">
                <span className="w-2.5 h-2.5 bg-white rounded-full animate-bounce"></span>
                <span className="w-2.5 h-2.5 bg-white rounded-full animate-bounce [animation-delay:0.2s]"></span>
                <span className="w-2.5 h-2.5 bg-white rounded-full animate-bounce [animation-delay:0.4s]"></span>
              </div>
            ) : (
              "Login Now"
            )}
          </button>
        </form>

        {/* Signup Link */}
        <p className="text-center text-gray-500 mt-8 text-sm font-medium">
          New here?{" "}
          <span
            onClick={() => navigate("/signup")}
            className="text-[#EA9E26] cursor-pointer font-bold hover:underline"
          >
            Create Account
          </span>
        </p>
      </div>
    </div>
  );
};

export default Login1;