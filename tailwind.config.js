const flowbite = require("flowbite-react/tailwind");

/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
    flowbite.content(),
  ],
  theme: {
    extend: {
      container: {
        center:true,
        padding: {
          DEFAULT: '1rem',
          sm: '2rem',
          lg: '4rem',
          xl: '5rem',
          // '2xl': '6rem',
        },
      },
      colors: {
        neutral: {
          100: '#E9EAEC',
          200: '#D1D4DB',
          300: '#9096A2',
          400: '#4D566B',
          500: '#202C46',
          600: '#1B253C'
        },
        red: {
          100: '#FCE9EC ',
          200: '#F9D2D9',
          300: '#F2A6B4',
          400: '#E9677F',
          500: '#DF2648',
          600: '#B71F3B',
        },
      },
      borderRadius: {
        'sm': '0.25rem',
      }
    },
  },
  plugins: [
    flowbite.plugin(),
  ],
}

