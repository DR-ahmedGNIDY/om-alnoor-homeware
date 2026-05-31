import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}",
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/**/*.{js,ts,jsx,tsx,mdx}",
  ],

  theme: {
    extend: {
      colors: {
        primary: {
          DEFAULT: "#0F2D52",
          light: "#1B4375",
          dark: "#0A1F39",
        },

        gold: {
          DEFAULT: "#C9A227",
          light: "#DABD63",
          dark: "#A8861E",
          muted: "#8A7640",
        },

        cream: "#F8F6F2",

        navy: "#0F2D52",

        accent: "#D6B25E",

        text: {
          DEFAULT: "#1F2937",
          light: "#6B7280",
        },

        white: "#FFFFFF",
      },

      fontFamily: {
        arabic: ["Cairo", "sans-serif"],
        display: ["Cairo", "sans-serif"],
      },

      backgroundImage: {
        "gold-gradient":
          "linear-gradient(135deg,#C9A227 0%,#DABD63 50%,#C9A227 100%)",

        "hero-gradient":
          "linear-gradient(135deg,#0F2D52 0%,#1B4375 100%)",

        "light-gradient":
          "linear-gradient(180deg,#FFFFFF 0%,#F8F6F2 100%)",

        "gold-radial":
          "radial-gradient(circle, rgba(201,162,39,0.2) 0%, transparent 70%)",
      },

      boxShadow: {
        gold: "0 0 20px rgba(201,162,39,0.25)",
        "gold-lg": "0 0 40px rgba(201,162,39,0.35)",
        "gold-sm": "0 0 10px rgba(201,162,39,0.15)",

        primary: "0 10px 30px rgba(15,45,82,0.15)",

        soft: "0 8px 25px rgba(0,0,0,0.08)",
      },

      animation: {
        "gold-shimmer": "goldShimmer 3s ease-in-out infinite",
        "fade-in": "fadeIn 0.5s ease-out",
        "slide-up": "slideUp 0.6s ease-out",
        "scale-in": "scaleIn 0.3s ease-out",
        float: "float 6s ease-in-out infinite",
        "pulse-gold": "pulseGold 2s ease-in-out infinite",
      },

      keyframes: {
        goldShimmer: {
          "0%, 100%": {
            backgroundPosition: "0% 50%",
          },
          "50%": {
            backgroundPosition: "100% 50%",
          },
        },

        fadeIn: {
          "0%": {
            opacity: "0",
          },
          "100%": {
            opacity: "1",
          },
        },

        slideUp: {
          "0%": {
            opacity: "0",
            transform: "translateY(30px)",
          },
          "100%": {
            opacity: "1",
            transform: "translateY(0)",
          },
        },

        scaleIn: {
          "0%": {
            opacity: "0",
            transform: "scale(0.9)",
          },
          "100%": {
            opacity: "1",
            transform: "scale(1)",
          },
        },

        float: {
          "0%, 100%": {
            transform: "translateY(0)",
          },
          "50%": {
            transform: "translateY(-20px)",
          },
        },

        pulseGold: {
          "0%, 100%": {
            boxShadow: "0 0 20px rgba(201,162,39,0.25)",
          },
          "50%": {
            boxShadow: "0 0 40px rgba(201,162,39,0.45)",
          },
        },
      },
    },
  },

  plugins: [require("@tailwindcss/forms")],
};

export default config;