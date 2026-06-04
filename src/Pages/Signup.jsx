import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Eye, EyeOff, ArrowLeft } from "lucide-react";
import axios from "axios";
import BASE_URL from "../config/api";

const Signup = () => {
  const navigate = useNavigate();

  const [formData, setFormData] = useState({
    firstName: "",
    lastName: "",
    email: "",
    phone: "",
    password: "",
  });

  const [errors, setErrors] = useState({});
  const [showPass, setShowPass] = useState(false);
  const [loading, setLoading] = useState(false);

  const setFieldError = (field, message) => {
    setErrors((prev) => ({ ...prev, [field]: message }));
  };

  const clearFieldError = (field) => {
    setErrors((prev) => ({ ...prev, [field]: "" }));
  };

  const handleNameChange = (e, field) => {
    const value = e.target.value;
    if (/^[A-Za-z\s]*$/.test(value)) {
      setFormData({ ...formData, [field]: value });
      clearFieldError(field);
    } else {
      setFieldError(field, "Only alphabets allowed");
    }
  };

  const handleEmailChange = (e) => {
    const value = e.target.value;
    if (/^[a-zA-Z0-9._@]*$/.test(value)) {
      setFormData({ ...formData, email: value });
      clearFieldError("email");
    } else {
      setFieldError("email", "Invalid email characters");
    }
  };

  const handlePhoneChange = (e) => {
    const value = e.target.value;
    if (/^\d*$/.test(value)) {
      setFormData({ ...formData, phone: value });
      clearFieldError("phone");
    } else {
      setFieldError("phone", "Only numbers allowed");
    }
  };

  const handleSignup = async (e) => {
  e.preventDefault();
  setLoading(true);

  try {
   await axios.post(`${BASE_URL}/api/auth/signup`, formData);;

    setLoading(false);
    navigate("/login1");

  } catch (err) {
    setLoading(false);
    setErrors({ email: err.response?.data?.message });
  }
};
  // UI Class Helper - Ab input background bhi white hai
  const inputClass = (field) =>
    `w-full p-3.5 sm:p-4 rounded-2xl bg-white border text-[#163D68] text-base outline-none transition-all duration-300 font-sans
    ${
      errors[field]
        ? "border-red-500 focus:ring-1 focus:ring-red-500"
        : "border-gray-300 focus:border-[#EA9E26] focus:ring-1 focus:ring-[#EA9E26]"
    }`;

  return (
    // Pure White Screen
    <div className="min-h-screen bg-white flex items-center justify-center p-4 mt-18 sm:p-8 font-sans ">
      
      {/* Card: White background with a subtle border to distinguish it */}
      <div className="w-full max-w-md bg-white rounded-[32px] sm:rounded-[40px] border border-gray-200 shadow-[0_15px_40px_rgba(0,0,0,0.04)] p-6 sm:p-10 relative">
        
        {/* Header */}
        <div className="text-center mb-8">
          <h2 className="text-2xl sm:text-4xl font-black text-[#163D68] tracking-tight">
            Join <span className="text-[#EA9E26]">Grano</span>
          </h2>
          <p className="text-gray-400 text-sm mt-2 font-medium">Create your account to continue</p>
        </div>

        <form onSubmit={handleSignup} className="space-y-4">
          
          {/* Responsive Name Grid */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div>
              <input
                className={inputClass("firstName")}
                placeholder="First Name"
                value={formData.firstName}
                onChange={(e) => handleNameChange(e, "firstName")}
              />
              {errors.firstName && (
                <p className="text-red-500 text-[11px] mt-1 ml-2 font-medium">{errors.firstName}</p>
              )}
            </div>

            <div>
              <input
                className={inputClass("lastName")}
                placeholder="Last Name"
                value={formData.lastName}
                onChange={(e) => handleNameChange(e, "lastName")}
              />
              {errors.lastName && (
                <p className="text-red-500 text-[11px] mt-1 ml-2 font-medium">{errors.lastName}</p>
              )}
            </div>
          </div>

          {/* Email */}
          <div>
            <input
              className={inputClass("email")}
              placeholder="Email (example@gmail.com)"
              value={formData.email}
              onChange={handleEmailChange}
            />
            {errors.email && (
              <p className="text-red-500 text-[11px] mt-1 ml-2 font-medium">{errors.email}</p>
            )}
          </div>

          {/* Phone */}
          <div>
            <input
              className={inputClass("phone")}
              placeholder="Phone Number (11 digits)"
              value={formData.phone}
              maxLength={11}
              onChange={handlePhoneChange}
            />
            {errors.phone && (
              <p className="text-red-500 text-[11px] mt-1 ml-2 font-medium">{errors.phone}</p>
            )}
          </div>

          {/* Password */}
          <div className="relative">
            <input
              className={inputClass("password")}
              type={showPass ? "text" : "password"}
              placeholder="Create Password"
              value={formData.password}
              onChange={(e) =>
                setFormData({ ...formData, password: e.target.value })
              }
            />
            <button
              type="button"
              onClick={() => setShowPass(!showPass)}
              className="absolute right-4 top-[18px] text-gray-400 hover:text-[#163D68]"
            >
              {showPass ? <EyeOff size={20} /> : <Eye size={20} />}
            </button>

            {errors.password && (
              <p className="text-red-500 text-[11px] mt-1 ml-2 font-medium">{errors.password}</p>
            )}
          </div>

          {/* Submit Button */}
          <button
            type="submit"
            disabled={loading}
            className="w-full bg-[#EA9E26] hover:bg-[#d48c1f] text-white h-[58px] rounded-2xl font-bold text-lg shadow-lg shadow-[#EA9E26]/30 transition-all active:scale-[0.97] mt-6 flex items-center justify-center gap-2"
          >
            {loading ? (
              <div className="w-6 h-6 border-2 border-white/30 border-t-white rounded-full animate-spin"></div>
            ) : (
              "Create Account"
            )}
          </button>
          
          {/* Footer Link */}
          <p className="text-center text-sm text-gray-500 mt-6">
            Already have an account?{" "}
            <button 
              type="button"
              onClick={() => navigate("/login1")}
              className="text-[#163D68] font-bold hover:text-[#EA9E26] transition-colors"
            >
              Log In
            </button>
          </p>
        </form>
      </div>
    </div>
  );
};

export default Signup;