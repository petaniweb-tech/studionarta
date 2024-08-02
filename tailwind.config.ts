import type { Config } from "tailwindcss";

const config = {
	mode: "jit",
	content: [
		"./pages/**/*.{js,ts,jsx,tsx,mdx}",
		"./components/**/*.{js,ts,jsx,tsx,mdx}",
		"./app/**/*.{js,ts,jsx,tsx,mdx}",
		"./src/**/*.{js,ts,jsx,tsx,mdx}",
	],
	prefix: "",
	theme: {
		extend: {
			fontFamily: {
				supportingfont: "var(--supporting-font)",
			},
			padding: {
				// sm //
				sectionpxsm: "22px",
				// md //
				// lg //
				sectionpxlg: "180px",
				// 2xl //
				sectionpx2xl: "180px",
			},

			colors: {
				bgbase: "#F1ECE9",
			},

			backgroundImage: {
				bgcontact: "url('../assets/images/img-dummy-14.jpg')",
			},

			transitionProperty: {
				aspectratio: "aspect-ratio",
			},
		},
	},
	plugins: [require("tailwindcss-animate")],
} satisfies Config;

export default config;
