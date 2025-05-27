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
      // screens: {
      //   "max-1400": "1400px",
      //   "max-1350": "1350px",
      //   "max-1300": "1300px",
      //   "max-1250": "1250px",
      //   "max-1200": "1200px",
      //   "max-1150": "1150px",
      //   "max-1100": "1100px",
      //   "max-1050": "1050px",
      //   "max-1000": "1000px",
      //   "max-950": "950px",
      //   "max-900": "900px",
      //   "max-850": "850px",
      //   "max-800": "800px",
      //   "max-750": "750px",
      //   "max-700": "700px",
      //   "max-650": "650px",
      //   "max-600": "600px",
      //   "max-550": "550px",
      //   "max-500": "500px",
      //   "max-450": "450px",
      //   "max-400": "400px",
      //   "max-350": "350px",
      //   "max-302": "302px",
      //   "max-300": "300px",
      // },
    },
  },
  plugins: [require("tailwind-scrollbar")],
};

export default config;
