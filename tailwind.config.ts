import type { Config } from "tailwindcss";

const config: Config = {
  darkMode: ["class"],
  content: [
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        background: "hsl(var(--background))",
        foreground: "hsl(var(--foreground))",
        card: "hsl(var(--card))",
        "card-foreground": "hsl(var(--card-foreground))",
        primary: "hsl(var(--primary))",
        "primary-foreground": "hsl(var(--primary-foreground))",
        secondary: "hsl(var(--secondary))",
        "secondary-foreground": "hsl(var(--secondary-foreground))",
        muted: "hsl(var(--muted))",
        "muted-foreground": "hsl(var(--muted-foreground))",
        accent: "hsl(var(--accent))",
        "accent-foreground": "hsl(var(--accent-foreground))",
        border: "hsl(var(--border))",
        brand: {
          DEFAULT: "#0099e5",
          dark: "#0077b6",
          light: "#33adf0",
          muted: "#e6f4fc",
        },
        navy: {
          DEFAULT: "#1a365d",
          dark: "#122640",
          light: "#2d4a73",
        },
        deep: "#0a1628",
      },
      fontFamily: {
        sans: ["var(--font-inter)", "Inter", "system-ui", "sans-serif"],
      },
      borderRadius: {
        lg: "var(--radius)",
        md: "calc(var(--radius) - 2px)",
        sm: "calc(var(--radius) - 4px)",
      },
      keyframes: {
        marquee: {
          from: { transform: "translateX(0)" },
          to: { transform: "translateX(-50%)" },
        },
        scrollPulse: {
          "0%, 100%": { opacity: "0.2", transform: "scaleY(0.6)" },
          "50%": { opacity: "1", transform: "scaleY(1)" },
        },
      },
      animation: {
        marquee: "marquee 40s linear infinite",
        "scroll-pulse": "scrollPulse 2.2s ease-in-out infinite",
      },
      boxShadow: {
        brand: "0 4px 24px rgba(0, 153, 229, 0.2)",
      },
    },
  },
  plugins: [],
};

export default config;
