/** @type {import('tailwindcss').Config} */
export default {
    content: [
        "./index.html",
        "./src/**/*.{js,ts,jsx,tsx}",
    ],
    darkMode: "class",
    theme: {
        extend: {
            colors: {
                // Brand Accent
                sage: "#3F5D4D",

                // Backgrounds
                charcoal: "#0F1110",
                bone: "#F4F1EC",
                clay: "#D6C7B8",

                // Accents
                "golden-light": "#C89A5B",
                "golden-deep": "#8F6A3D",

                // Text colors
                "text-dark": "#1F2422",
                "text-muted": "#5E6A65",
                "text-tertiary": "#8C857A",

                // Legacy support
                primary: "#3F5D4D",
                secondary: "#8A9A85",
                "background-light": "#F4F1EC",
                "background-dark": "#0F1110",
                "surface-light": "#FFFFFF",
                "surface-dark": "#1C1917",
                "text-main-light": "#1F2422",
                "text-main-dark": "#F4F1EC",
                "text-muted-light": "#5E6A65",
                "text-muted-dark": "#A8A29E",
            },
            fontFamily: {
                display: ["Playfair Display", "serif"],
                body: ["Montserrat", "sans-serif"],
            },
            borderRadius: {
                DEFAULT: "0.5rem",
            },
        },
    },
    plugins: [],
}
