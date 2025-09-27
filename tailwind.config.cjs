/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      fontFamily: {
        serif: ['Playfair Display', 'serif'],
        sans: ['Inter', 'sans-serif'],
      },
      colors: {
        primary: {
          50: '#fdf4ff',
          100: '#fae8ff',
          300: '#c4b5fd',
          500: '#a855f7',
          600: '#9333ea',
          700: '#7c3aed',
        }
      }
    },
  },
  plugins: [],
}
