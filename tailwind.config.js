module.exports = {
  darkMode: "class",
  content: ["./src/**/*.{js,jsx,ts,tsx}"],
  theme: {
    extend: {
      colors: {
        free: {
          100: "#365200",
          200: "#558000",
        },
        reserved: {
          100: "#4a0000",
          200: "#6C0000",
        },
        arrived: {
          100: "#4a0000",
          200: "#2563EB",
        },
      },
    },
  },
  plugins: [require("daisyui")],
};
