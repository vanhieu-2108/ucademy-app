import type { Config } from "tailwindcss";
import { withUt } from "uploadthing/tw";

const config = {
  darkMode: ["class"],
  content: ["./src/**/*.{js,jsx,ts,tsx,mdx}"],
  prefix: "",
  theme: {
    extend: {
      screens: {
        "3xl": "1600px",
      },
      colors: {
        primary: "#050C9C",
        grayDarkest: "#131316",
        grayDarker: "#212126",
        grayDark: "#9394A1",
      },
      fontFamily: {
        primary: ["var(--font-manrope)"],
      },
      keyframes: {
        "accordion-down": {
          from: { height: "0" },
          to: { height: "var(--radix-accordion-content-height)" },
        },
        "accordion-up": {
          from: { height: "var(--radix-accordion-content-height)" },
          to: { height: "0" },
        },
      },
      animation: {
        "accordion-down": "accordion-down 0.2s ease-out",
        "accordion-up": "accordion-up 0.2s ease-out",
      },
    },
  },
  plugins: [require("tailwindcss-animate")],
} satisfies Config;

export default withUt(config);
