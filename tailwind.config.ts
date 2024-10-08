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
          100: "#FEF3F2",
          200: "#FDE9E7",
          300: "#FBD0CD",
          400: "#F9B4AE",
          500: "#F79388",
          600: "#F44A24",
          700: "#E94722",
          800: "#D03F1F",
          900: "#B4371B",
          DEFAULT: "rgb(var(--primary) / <alpha-value>) /* #f44a24 */",
        },
        secondary: {
          100: "#F2F2F4",
          200: "#E7E7EA",
          300: "#CBCCD3",
          400: "#ACAEB9",
          500: "#85889A",
          600: "#00235B",
          700: "#002157",
          800: "#001E4E",
          900: "#001A43",
          DEFAULT: "rgb(var(--secondary) / <alpha-value>) /* #00235b */",
        },
        neutral: {
          100: "#F2F2F2",
          200: "#E7E7E8",
          300: "#CDCDCE",
          400: "#AEAFB0",
          500: "#8A8A8C",
          600: "#292C32",
          700: "#272A30",
          800: "#23262B",
          900: "#1E2125",
        },
        destructive: {
          DEFAULT: "rgb(var(--destructive) / <alpha-value>) /* #eb6e63 */",
        },
        success: {
          100: "#F4FAF2",
          200: "#EAF6E7",
          300: "#D2ECCD",
          400: "#B8E2AE",
          500: "#9AD789",
          600: "#5AC627",
          700: "#56BD25",
          800: "#4DA921",
          900: "#43921D",
        },
        warning: {
          100: "#FEFAF2",
          200: "#FDF5E7",
          300: "#FBEBCB",
          400: "#F9E0AC",
          500: "#F7D585",
          600: "#F4C300",
          700: "#E9BA00",
          800: "#E9BA00",
          900: "#B49000",
        },
        background: "hsl(var(--background) / <alpha-value>) /* #fafafa */",
        heading: "hsl(var(--heading) / <alpha-value>) /* #1b2632 */",
        body: {
          DEFAULT: "hsl(var(--body) / <alpha-value>) /* #1a1c1e */",
          light: "hsl(var(--body-light) / <alpha-value>) /* #6d7378 */",
        },
      },
      fontFamily: {
        poppins: ["var(--font-poppins)", "sans-serif"],
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
