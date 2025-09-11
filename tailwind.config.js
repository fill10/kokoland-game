/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}", 
  ],
  theme: {
    extend: {
      fontFamily: {
        arabic: ["Cairo", "Amiri", "sans-serif"],
      },
    },
  },
  plugins: [],
}
