/** @type {import('tailwindcss').Config} */
import scrollbarHide from 'tailwind-scrollbar-hide';
import colors from 'tailwindcss/colors'
export default {
    darkMode: "class",
    content: [
        "./index.html",
        "./src/**/*.{js,ts,jsx,tsx}",
    ],
    theme: {
        extend: {
            screens: {
                '3xl': '2000px',
             },
            colors: {
                brandBlue: colors.blue,
                blue: '#1D2D5B',
                blueTo: '#213f8c',
                blue$400: 'rgb(79, 70, 229)',
                bacWhite: '#F2F6F9',
                darkBg: '#212121',
                darkBgTwo: '#303030',
                navBgHover: '#374151',
                btnBgDark: '#2B4764',
                darkText: '#BBBABA',
                darkTextTwo: '#00a77e',
            },
            fontFamily: {
                sans: ['Open Sans', 'sans-serif'],
            }
        },
    },
    plugins: [ scrollbarHide],


}