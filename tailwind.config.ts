import type { Config } from "tailwindcss";
import animate from "tailwindcss-animate";

export default {
  content: ["./index.html", "./src/**/*.{ts,tsx}"],
  theme: {
    extend: {
      fontFamily: {
        body: ["Inter", "-apple-system", "BlinkMacSystemFont", "sans-serif"],
        display: ["Instrument Serif", "Georgia", "serif"],
        mono: ["JetBrains Mono", "ui-monospace", "monospace"],
      },
      colors: {
        bg: "hsl(var(--bg))",
        surface: "hsl(var(--surface))",
        "surface-subtle": "hsl(var(--surface-subtle))",
        "text-primary": "hsl(var(--text))",
        muted: "hsl(var(--muted))",
        stroke: "hsl(var(--stroke))",
        "stroke-subtle": "hsl(var(--stroke-subtle))",
        accent: "hsl(var(--accent))",
      },
      animation: {
        "scroll-down": "scroll-down 1.8s ease-in-out infinite",
        "role-fade-in": "role-fade-in 0.4s ease-out",
        "gradient-shift": "gradient-shift 6s ease infinite",
        "pulse-subtle": "pulse-subtle 3s ease-in-out infinite",
      },
      keyframes: {
        "pulse-subtle": {
          "0%, 100%": { opacity: "1" },
          "50%": { opacity: "0.5" },
        },
      },
    },
  },
  plugins: [animate],
} satisfies Config;
