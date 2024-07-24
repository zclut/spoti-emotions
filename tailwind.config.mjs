/** @type {import('tailwindcss').Config} */
export default {
	content: ['./src/**/*.{astro,html,js,jsx,md,mdx,svelte,ts,tsx,vue}'],
	theme: {
		extend: {
			colors: {
				primary: "#1DB954",
				secondary: "#121212",
				tertiary: "#212121"
			}
		},
	},
	plugins: [],
}
