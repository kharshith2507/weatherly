import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}",
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      fontFamily: {
        sans: ['"Plus Jakarta Sans"', "system-ui", "sans-serif"],
      },
      fontSize: {
        "2xs": ["0.625rem", { lineHeight: "1rem" }],
      },
      animation: {
        aurora:      "aurora 12s ease-in-out infinite",
        drift:       "drift 7s ease-in-out infinite",
        "spin-slow": "spin-slow 8s linear infinite",
        shimmer:     "shimmer 1.8s linear infinite",
        "pulse-glow":"pulse-glow 2s ease-in-out infinite",
        snowfall:    "snowfall var(--duration,8s) linear infinite",
        rainfall:    "rainfall var(--duration,1.2s) linear infinite",
        lightning:   "lightning 8s ease-in-out infinite",
        float:       "drift 5s ease-in-out infinite",
      },
      keyframes: {
        aurora: {
          "0%,100%": { transform:"translate(0,0) scale(1) rotate(0deg)" },
          "25%":     { transform:"translate(60px,-80px) scale(1.15) rotate(5deg)" },
          "50%":     { transform:"translate(-40px,40px) scale(0.9) rotate(-3deg)" },
          "75%":     { transform:"translate(30px,60px) scale(1.08) rotate(2deg)" },
        },
        drift: {
          "0%,100%": { transform:"translateY(0) translateX(0)" },
          "33%":     { transform:"translateY(-18px) translateX(12px)" },
          "66%":     { transform:"translateY(8px) translateX(-8px)" },
        },
        "spin-slow": { to:{ transform:"rotate(360deg)" } },
        shimmer: {
          "0%":   { backgroundPosition:"-600px 0" },
          "100%": { backgroundPosition: "600px 0" },
        },
        "pulse-glow": {
          "0%,100%": { boxShadow:"0 0 0 0 var(--accent-glow)" },
          "50%":     { boxShadow:"0 0 0 8px transparent" },
        },
        snowfall: { to:{ transform:"translateY(110vh) translateX(40px) rotate(360deg)", opacity:"0" } },
        rainfall: { to:{ transform:"translateY(110vh) translateX(20px)", opacity:"0" } },
        lightning:{
          "0%,90%,95%,100%": { opacity:"0" },
          "91%,94%":          { opacity:"0.07" },
        },
      },
      backdropBlur: {
        "4xl": "80px",
      },
      borderRadius: {
        "4xl": "2rem",
        "5xl": "2.5rem",
      },
      boxShadow: {
        glass:    "0 2px 8px rgba(0,0,0,0.04), 0 8px 32px rgba(0,0,0,0.06)",
        "glass-md":"0 4px 16px rgba(0,0,0,0.06), 0 16px 48px rgba(0,0,0,0.10)",
        "glass-lg":"0 8px 32px rgba(0,0,0,0.10), 0 24px 64px rgba(0,0,0,0.14)",
      },
    },
  },
  plugins: [],
};

export default config;
