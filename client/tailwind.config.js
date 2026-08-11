/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.{js,jsx}"],
  theme: {
    extend: {
      colors: {
        ink: {
          950: "#0D1319", 900: "#101820", 800: "#1B2530", 700: "#26323F",
          600: "#3A4856", 400: "#8A93A3", 200: "#C7CDD6", 50: "#F5F3EE",
        },
        amber: { DEFAULT: "#E8A33D", light: "#F4C77A", dark: "#B87F26" },
        coral: { DEFAULT: "#F45B69", dark: "#C43F4C" },
        sage: { DEFAULT: "#6FCF97", dark: "#3F9F68" },
      },
      fontFamily: {
        display: ["Fraunces", "Georgia", "serif"],
        body: ["Inter", "system-ui", "sans-serif"],
        mono: ["JetBrains Mono", "monospace"],
      },
      boxShadow: {
        card: "0 1px 0 rgba(255,255,255,0.04) inset, 0 8px 24px rgba(0,0,0,0.35)",
      },
    },
  },
  plugins: [],
};