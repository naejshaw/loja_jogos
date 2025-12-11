/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        'brand-green': '#32CD32',
        'brand-gray': {
          '800': '#1a202c',
          '900': '#171923',
        },
        // Dynamic colors from settings
        primary: 'var(--primary-color)',
        secondary: 'var(--secondary-color)',
      }
    },
  },
  plugins: [require("tailwindcss-animate")],
}

