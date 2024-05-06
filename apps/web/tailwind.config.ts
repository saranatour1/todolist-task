import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors:{
        "blue-0":"#00939F",
        "white-0":"#F7FAFC",
        "white-1":"#FAFAFA",
        "gray-0":"#E9EDF5",
        "gray-1":"#212121",
        "gray-2":"#67728A",
        "black-0":"#171C26",
        "black-1":"#171923", // for headings
        "green-0":"#14804A",
        "green-1":"#E1FCEF",
        "red-0":"#E00909",
        "purple-0":"#6C63FF",
        "blue-1":"#CBD5E0",
      },
      backgroundImage: {
        "gradient-radial": "radial-gradient(var(--tw-gradient-stops))",
        "gradient-conic":
          "conic-gradient(from 180deg at 50% 50%, var(--tw-gradient-stops))",
      },
      fontFamily:{
        "inter":['Inter Variable',"sans-serif"]
      },
      boxShadow:{
        "inner-shadow":"0px 2px 0px 0px rgba(231, 235, 238, 0.20) inset"
      }
    },
  },
  plugins: [],
};
export default config;
