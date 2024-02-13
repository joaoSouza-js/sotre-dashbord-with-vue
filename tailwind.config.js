/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{vue,js,ts,jsx,tsx}",
  ],

  theme: {
   
    extend: {
      colors: {
        "gray": {
          200: "#F0F0F0",
          300: "#F2F0F1"
        }
      },
    },
  },
  plugins: [],
}

