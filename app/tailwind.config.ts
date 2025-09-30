import type { Config } from "tailwindcss";

const config = {
  theme: {
    extend: {
      colors: {
        "brand-teal": "#2F6F6A", // primary accent
        "brand-blue": "#51B7C7", // progress / glow
        "brand-coral": "#F08E7D", // secondary accent
        "neutral-bg": "#FBF6EE", // warm off-white background
        "neutral-text": "#0F172A", // neutral-900 depth
      },
      keyframes: {
        glow: {
          "0%, 100%": { transform: "scale(1)", opacity: "0.6" },
          "50%": { transform: "scale(1.08)", opacity: "0.85" },
        },
      },
      animation: {
        glow: "glow 3s ease-in-out infinite",
      },
      borderRadius: {
        xl: "20px",
        "2xl": "28px",
        full: "9999px",
      },
      boxShadow: {
        // Soft elevation with large blur and ~12–16% opacity (RoadHome)
        "soft-sm": "0 4px 12px rgba(15,23,42,0.12)",
        soft: "0 8px 24px rgba(15,23,42,0.12)",
        "soft-lg": "0 16px 40px rgba(15,23,42,0.16)",
        "inner-soft": "inset 0 1px 2px rgba(15,23,42,0.08)",
      },
      fontFamily: {
        display: ["var(--font-display)"],
        sans: ["var(--font-body)"],
      },
    },
  },
} satisfies Config;

export default config;
