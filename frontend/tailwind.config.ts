import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        gustavo: {
          dorado: "#D4AF37",
          azul: "#0A192F",
          negro: "#050b14",
        },
      },
    },
  },
  plugins: [],
};
export default config;