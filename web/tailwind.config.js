/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    './app/**/*.{js,ts,jsx,tsx}',
    './pages/**/*.{js,ts,jsx,tsx}',
    './components/**/*.{js,ts,jsx,tsx}',
    '../ui/**/*.{js,ts,jsx,tsx}', // Include shared ui library
  ],
  theme: {
    extend: {},
  },
  plugins: [],
};
