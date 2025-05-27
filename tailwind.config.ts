import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}",
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        MainBg: "#151515",
        DarkGrey: "#212121",
      },
    
    },
  },
  plugins: [require("tailwind-scrollbar")],
};

export default config;
