import type { Config } from "tailwindcss";

const config: Config = {
  darkMode: ["class"],
  content: [
    "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  prefix: "",
  theme: {
    container: {
      padding: "1.5rem",
      screens: {
        "2xl": "1400px",
      },
    },
    extend: {
      colors: {
        primary: {
          DEFAULT: "rgb(var(--primary) / <alpha-value>) /* #f44a24 */",
        },
        secondary: {
          DEFAULT: "rgb(var(--secondary) / <alpha-value>) /* #00235b */",
        },
        destructive: {
          DEFAULT: "rgb(var(--destructive) / <alpha-value>) /* #eb6e63 */",
        },
        background: "hsl(var(--background) / <alpha-value>) /* #fafafa */",
        heading: "hsl(var(--heading) / <alpha-value>) /* #1b2632 */",
        body: {
          DEFAULT: "hsl(var(--body) / <alpha-value>) /* #1a1c1e */",
          light: "hsl(var(--body-light) / <alpha-value>) /* #6d7378 */",
        },
      },
      fontFamily: {
        roboto: ["var(--font-roboto)"],
        mono: ["var(--font-roboto-mono)"],
      },
      backgroundImage: {
        "gradient-radial": "radial-gradient(var(--tw-gradient-stops))",
        "gradient-conic":
          "conic-gradient(from 180deg at 50% 50%, var(--tw-gradient-stops))",
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
};

export default config;
