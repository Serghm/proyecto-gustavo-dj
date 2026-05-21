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
      keyframes: {
        'pulse-glow': {
          '0%, 100%': { opacity: '1', filter: 'drop-shadow(0 0 4px rgba(212, 175, 55, 0.4))' },
          '50%': { opacity: '0.85', filter: 'drop-shadow(0 0 12px rgba(212, 175, 55, 0.7))' },
        },
        'shimmer-text': {
          '0%': { backgroundPosition: '-200% 50%' },
          '100%': { backgroundPosition: '200% 50%' },
        },
      },
      animation: {
        'logo-glow': 'pulse-glow 4s ease-in-out infinite',
        'text-shine': 'shimmer-text 6s linear infinite',
      },
    },
  },
  plugins: [],
};
export default config;