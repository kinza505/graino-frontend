import React, { useState, useEffect, useRef } from "react";
import { LogIn, Lock, User } from "lucide-react";
import gsap from "gsap";

const Login = ({ onLogin }) => {
  const [credentials, setCredentials] = useState({
    username: "",
    password: "",
  });

  const [error, setError] = useState("");
  const [isLoading, setIsLoading] = useState(false);

  const cardRef = useRef(null);

  useEffect(() => {
    gsap.fromTo(
      cardRef.current,
      { opacity: 0, y: 40 },
      { opacity: 1, y: 0, duration: 0.6 }
    );
  }, []);

  const handleChange = (e) => {
    setCredentials({ ...credentials, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    setError("");

    if (
      credentials.username === "admin" &&
      credentials.password === "admin123"
    ) {
      setIsLoading(true);

      setTimeout(() => {
        onLogin();
      }, 1200);
    } else {
      setError("Invalid username or password!");

      gsap.to(cardRef.current, {
        x: 8,
        duration: 0.1,
        repeat: 5,
        yoyo: true,
      });
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-[#F1F5F9] p-4">
      <div
        ref={cardRef}
        className="w-full max-w-md bg-white rounded-3xl shadow-xl overflow-hidden"
      >
        {/* Header */}
        <div className="bg-[#163D68] p-8 text-center text-white">
          <h1 className="text-3xl font-bold">
            Graino <span className="text-[#EA9E26]">Admin</span>
          </h1>
          <p className="text-sm mt-2 opacity-80">Login to continue</p>
        </div>

        <form onSubmit={handleSubmit} className="p-8 space-y-5">
          {error && (
            <div className="bg-red-100 text-red-600 p-3 rounded-xl text-sm font-semibold text-center">
              {error}
            </div>
          )}

          {/* Username */}
          <div>
            <label className="text-xs font-bold text-[#163D68] uppercase">
              Username
            </label>
            <div className="relative mt-2">
              <User className="absolute left-3 top-3 text-[#163D68]" />
              <input
                type="text"
                name="username"
                onChange={handleChange}
                disabled={isLoading}
                className="w-full pl-10 pr-4 py-3 bg-white border-2 border-slate-300 rounded-xl 
                focus:border-[#EA9E26] outline-none"
                placeholder="Enter username"
              />
            </div>
          </div>

          {/* Password */}
          <div>
            <label className="text-xs font-bold text-[#163D68] uppercase">
              Password
            </label>
            <div className="relative mt-2">
              <Lock className="absolute left-3 top-3 text-[#163D68]" />
              <input
                type="password"
                name="password"
                onChange={handleChange}
                disabled={isLoading}
                className="w-full pl-10 pr-4 py-3 bg-white border-2 border-slate-300 rounded-xl 
                focus:border-[#EA9E26] outline-none"
                placeholder="Enter password"
              />
            </div>
          </div>

          {/* Button */}
          <button
            type="submit"
            disabled={isLoading}
            className="w-full bg-[#163D68] text-white py-3 rounded-xl font-bold flex justify-center items-center gap-2 hover:bg-[#EA9E26] hover:text-[#163D68]"
          >
            {isLoading ? "Loading..." : <><LogIn size={18} /> Login</>}
          </button>
        </form>
      </div>
    </div>
  );
};

export default Login;