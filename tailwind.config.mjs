/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./src/**/*.{astro,html,js,jsx,md,mdx,svelte,ts,tsx,vue}",
    "./node_modules/flowbite/**/*.js",
  ],
  theme: {
    extend: {
      colors: {
        primary: "#1DB954",
        secondary: "#121212",
        tertiary: "#212121",
      },
    },
  },
  plugins: [require("flowbite/plugin")],
};
