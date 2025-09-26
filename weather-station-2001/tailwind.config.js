/** @type {import('tailwindcss').Config} */
export default {
	content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
	theme: {
		extend: {
			// Add custom animations if needed
			keyframes: {
				marquee: {
					"0%": { transform: "translateX(100%)" },
					"100%": { transform: "translateX(-100%)" }
				}
			},
			animation: {
				marquee: "marquee 15s linear infinite"
			}
		}
	},
	plugins: []
}
