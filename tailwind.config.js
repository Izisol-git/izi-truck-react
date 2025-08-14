/** @type {import('tailwindcss').Config} */
import daisyui from 'daisyui';
import scrollbarHide from 'tailwind-scrollbar-hide';

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
              blue$400 : 'rgb(79, 70, 229)',
              bacWhite: '#F2F6F9',
            },
            fontFamily: {
                sans: ['Open Sans', 'sans-serif'],
            }
        },
    },
    plugins: [daisyui , scrollbarHide],
    daisyui: {
        themes: false,
    },
}