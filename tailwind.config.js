/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./App.{js,jsx,ts,tsx}", "./screens/**/*.{js,jsx,ts,tsx}","./components/**/*.{js,jsx,ts,tsx}"],
  theme: {
    extend: {
      keyframes:{
        shake:{
          "0%":{
            transform:'translate(4px,0)',
          },
          "50%":{
            transform:'translate(-4px,0px)'
          },
          '100%':{
            transform:'translate(0,0)'
          }
        }
      },
    animation:{
      shake:'shake 150ms 2 linear'
    }
    },
  },
  plugins: [],
}

