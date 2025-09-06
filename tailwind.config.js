/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}", // عدل حسب مسار ملفاتك
  ],
  theme: {
    extend: {
      fontFamily: {
        arabic: ['Amiri', 'Cairo', 'sans-serif'],
      },
    },
  },
  plugins: [],
}
