/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.{js,jsx,ts,tsx}"],
  theme: {
    extend: {
      fontFamily: {
        sans: ["Inter", "ui-sans-serif", "system-ui", "sans-serif"],
      },
      boxShadow: {
        card: "0 20px 60px rgba(15, 23, 42, 0.08)",
      },
      colors: {
        ink: {
          950: "#020617",
          900: "#0f172a",
        },
      },
    },
  },
  plugins: [],
};
