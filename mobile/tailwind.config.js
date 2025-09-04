/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./App.{js,jsx,ts,tsx}",
    "./app/**/*.{js,jsx,ts,tsx}",      // Expo Router screens/layouts
    "./components/**/*.{js,jsx,ts,tsx}",
    // add shared packages if you render them in mobile:
    "../ui/**/*.{js,jsx,ts,tsx}",       // adjust to your monorepo path
  ],
  presets: [require("nativewind/preset")],
  theme: { extend: {} },
  plugins: [],
}

