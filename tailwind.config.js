/** @type {import('tailwindcss').Config} */
export default {
    content: [
        "./index.html",
        "./src/**/*.{js,ts,jsx,tsx}",
    ],
    theme: {
        extend: {
            colors: {
                primary: '#FFD700', // Gold
                secondary: '#FDB931', // Darker Gold
                dark: '#051040', // Deep Blue
                'glass-bg': 'rgba(255, 255, 255, 0.1)',
                'glass-border': 'rgba(255, 255, 255, 0.2)',
            },
            borderRadius: {
                '2xl': '1rem',
                '3xl': '1.5rem',
            },
            fontFamily: {
                sans: ['Inter', 'sans-serif'],
            },
        },
    },
    plugins: [],
}
