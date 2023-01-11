/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./src/**/*.{js,jsx,ts,tsx}",
  ],
  darkMode: 'class',
  theme: {
    extend: {
      fontSize: {
        exs: '14px'
      },
      fontFamily: {
        Chakra: ['Chakra Petch'],
      },
      animation: {
        shine: "shine 1s",
        enter: 'enter 0.1s ease-out',
      },
      keyframes: {
        shine: {
          "100%": { left: "25%" },
        },
        enter: {
          "0%": {
            transform: "scale(0.9)",
            opacity: 0,
          },

          "100%": {
            transform: "scale(1)",
            opacity: 1,
          }
        },
      },
      colors: {
        blue: {
          450: '#0F172A',
        },
        gray: {
          1000: '#242424',
        },
        "dark-charcoal": "#313131",
        "tangerine-yellow": "#FFCC01",
        "granite-gray": "#666666",
        "smoky-black": "#0D0D0D",
        "raisin-black": "#242424",
        "plochere": "#D5351E",
        "pineapple": "#554609"
      },
      boxShadow: {
        '4xl': 'rgb(255, 255, 255, 0.5) 0px 0px 10px 10px',
      }
    },
  },
  plugins: [],
}