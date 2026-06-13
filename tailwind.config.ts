import type { Config } from "tailwindcss";

const config: Config = {
  darkMode: "class",
  content: ["./src/**/*.{ts,tsx}"],
  theme: {
    extend: {
      colors: {
        // emerald brand accent — single source of truth
        accent: {
          DEFAULT: "#00E5A0",
          soft: "#10b88a",
          glow: "rgba(0,229,160,0.35)",
        },
        ink: {
          // dark theme surfaces
          950: "#050505",
          900: "#0a0b0a",
          800: "#101311",
          700: "#171a18",
        },
        paper: {
          // light theme surfaces
          50: "#fbfcfb",
          100: "#f4f6f4",
          200: "#e8ebe9",
        },
      },
      fontFamily: {
        // Geist-like grotesk via Next font; serif display fallback handled in CSS
        sans: ["var(--font-sans)", "system-ui", "sans-serif"],
        display: ["var(--font-display)", "var(--font-sans)", "sans-serif"],
      },
      borderRadius: {
        squircle: "2rem",
        "squircle-inner": "calc(2rem - 0.375rem)",
      },
      transitionTimingFunction: {
        // physical spring-ish easing — banned: linear / ease-in-out
        smooth: "cubic-bezier(0.32, 0.72, 0, 1)",
        fluid: "cubic-bezier(0.16, 1, 0.3, 1)",
      },
      keyframes: {
        marquee: {
          "0%": { transform: "translateX(0)" },
          "100%": { transform: "translateX(-50%)" },
        },
        "pulse-glow": {
          "0%, 100%": { opacity: "0.4" },
          "50%": { opacity: "0.8" },
        },
        // slow breathing/drift for the hero dawn glow
        breathe: {
          "0%, 100%": { transform: "translate(-50%, 0) scale(1)", opacity: "0.9" },
          "50%": { transform: "translate(-50%, -3%) scale(1.08)", opacity: "1" },
        },
        "drift-a": {
          "0%, 100%": { transform: "translate(0, 0)" },
          "50%": { transform: "translate(24px, -18px)" },
        },
        "drift-b": {
          "0%, 100%": { transform: "translate(0, 0)" },
          "50%": { transform: "translate(-20px, 16px)" },
        },
        float: {
          "0%, 100%": { transform: "translateY(0) rotate(var(--r, 0deg))" },
          "50%": { transform: "translateY(-14px) rotate(var(--r, 0deg))" },
        },
      },
      animation: {
        marquee: "marquee 40s linear infinite",
        "pulse-glow": "pulse-glow 4s ease-in-out infinite",
        breathe: "breathe 11s ease-in-out infinite",
        "drift-a": "drift-a 14s ease-in-out infinite",
        "drift-b": "drift-b 17s ease-in-out infinite",
        float: "float 8s ease-in-out infinite",
      },
    },
  },
  plugins: [],
};

export default config;
