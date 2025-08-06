/** @type {import('tailwindcss').Config} */
import daisyui from 'daisyui';

export default {
    darkMode: 'class',
    content: [
        "./index.html",
        "./src/**/*.{js,ts,jsx,tsx}",
    ],
    theme: {
        extend: {
            colors: {
              blue : '#1D2D5B',
              bacWhite: '#F2F6F9',
            },
            fontFamily: {
                sans: ['Open Sans', 'sans-serif'],
            }
        },
    },
    plugins: [daisyui],
    daisyui: {
        themes: false,
    },
}