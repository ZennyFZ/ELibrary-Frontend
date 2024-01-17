/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    extend: {
      fontFamily: {
        sans: ["Inter", "system-ui", "Avenir", "Helvetica", "Arial", "sans-serif"]
      },
      colors: {
        yellow: "#F1C40F",
        gray: "#95A5A6",
        blue: "#3A7EAC"
      },
      fontSize: {
        4: "4px",
        7: "7px",
        8: "8px",
        9: "9px",
        10: "10px",
        11: "11px",
        12: "12px",
        13: "13px",
        14: "14px",
        15: "15px",
        16: "16px",
        20: "20px",
        24: "24px",
        27: "27px",
        32: "32px",
        36: "36px",
        48: "48px"
      }
    }
  },
  plugins: [],
  corePlugins: {
    preflight: false
  }
};
