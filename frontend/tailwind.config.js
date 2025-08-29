/** @type {import('tailwindcss').Config} */
export default {
  content: [ "./index.html", "./src/**/*.{js,ts,jsx,tsx}", ],
  theme: {
    extend: {
      colors: {
        'brand-dark': '#000000',
        'brand-light': '#FFFFFF',
        'brand-gray': '#888888',
        'brand-accent': '#3B82F6',
        'brand-border': '#373737',
      }
    },
  },
  plugins: [],
}