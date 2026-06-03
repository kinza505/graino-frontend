// tailwind.config.js
module.exports = {
  content: ["./src/**/*.{js,jsx,ts,tsx}"],
  safelist: [
    "border-red-500",
    "bg-red-50", 
    "text-red-900",
    "border-gray-200",
    "bg-gray-50",
    "text-gray-900",
  ],
  theme: {
    extend: {},
  },
  plugins: [],
};