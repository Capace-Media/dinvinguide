import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      width: {
        "calc-minus-80": "calc(100% - 80px)",
        "calc-minus-44": "calc(100% - 44px)",
        "calc-minus-16": "calc(100% - 16px)",
      },
      height: {
        "calc-minus-80": "calc(100% - 80px)",
        "calc-minus-44": "calc(100% - 44px)",
        "calc-minus-16": "calc(100% - 16px)",
      },
      colors: {
        brand: {
          primary: "#400D12",
          secondary: "#7B2E11",
          dark: "#333333",
          gray: "#666666",
        },
      },
      fontFamily: {
        main: ["var(--font-poppins)"],
        sub: ["var(--font-abrilFatface)"],
      },
      backgroundImage: {
        "gradient-radial": "radial-gradient(var(--tw-gradient-stops))",
        "gradient-conic":
          "conic-gradient(from 180deg at 50% 50%, var(--tw-gradient-stops))",
      },
    },
  },
  plugins: [],
};
export default config;
