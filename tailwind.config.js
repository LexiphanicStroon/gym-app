/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ['./App.{js,jsx,ts,tsx}'],
  theme: {
    extend: {
      fontFamily: {
        inter: ['Inter']
      }
    },
  },
  plugins: [
    require('@tailwindcss/forms')
  ],
}

