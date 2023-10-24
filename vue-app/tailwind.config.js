/** @type {import('tailwindcss').Config} */
export default {
  mode: 'jit',
  content: [
    "./index.html",
    "./src/**/*.{vue,js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      backgroundImage: {
        'registerBg': 'url("./src/assets/bg.jpg")',
        'loginBg': 'url("./src/assets/bg.jpg")'
      }
    },
  },
  plugins: [],
}

