/** @type {import('tailwindcss').Config} */

const ldnColors = require('./colors.json');

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
