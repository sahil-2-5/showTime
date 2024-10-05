/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      scale: {
        '50': '50',
      },
      fontFamily: {
        'londrina': ['Londrina Solid', 'cursive'], // Add the font here
      },
      boxShadow: {
        'red-lg': '4px 4px 0px rgba(255, 0, 0, 1)', // Customize the shadow as needed
      },
    },
  },
  plugins: [],
}