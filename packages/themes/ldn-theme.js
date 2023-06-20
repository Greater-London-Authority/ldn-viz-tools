/** @type {import('tailwindcss').Config} */

// core-grey-600: LDN grey
// core-grey-700: BTN
// core-grey-800: Dark Panel
// core-grey-900: Dark App

const ldnColors = require("./colors.json");

const config = {
  content: ['./src/**/*.{html,js,svelte,ts}'],
  darkMode: 'class',
  theme: {
    extend: {
      colors: ldnColors
    }
  },

  plugins: [require('@tailwindcss/typography'), require('@tailwindcss/forms')]
};

module.exports = config;
