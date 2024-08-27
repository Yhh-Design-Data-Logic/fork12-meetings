/** @type {import('prettier').Config & import('prettier-plugin-tailwindcss').PluginOptions} */
const config = {
  printWidth: 80,
  tabWidth: 2,
  useTabs: false,
  singleQuote: false,
  semi: true,
  trailingComma: "es5",
  jsxSingleQuote: false,
  endOfLine: "lf",
  plugins: ["prettier-plugin-tailwindcss"],
  tailwindFunctions: ["cva", "clsx"],
};

export default config;
