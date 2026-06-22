import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}",
    "./data/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        primary: "#2E7D32",
        accent: "#FF9800",
        cream: "#FFF8E7",
        leaf: "#173F1C",
      },
      fontFamily: {
        heading: ["var(--font-playfair)", "serif"],
        body: ["var(--font-poppins)", "sans-serif"],
        tamil: ["var(--font-noto-tamil)", "serif"],
      },
      boxShadow: {
        premium: "0 24px 60px rgba(46, 125, 50, 0.14)",
        card: "0 16px 40px rgba(23, 63, 28, 0.10)",
      },
    },
  },
  plugins: [],
};

export default config;
