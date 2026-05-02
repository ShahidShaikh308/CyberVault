/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        cyber: {
          cyan: '#00f3ff',
          pink: '#ff00ff',
          yellow: '#fdee06',
          dark: '#050505',
        }
      },
      boxShadow: {
        'neon-cyan': '0 0 10px #00f3ff, 0 0 20px #00f3ff',
        'neon-pink': '0 0 10px #ff00ff, 0 0 20px #ff00ff',
      }
    },
  },
  plugins: [],
}