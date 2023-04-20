const config = {
  presets: [require('../../packages/themes/ldn-theme')],
  content: ['./src/**/*.{html,js,svelte,ts}', '../../packages/ui/src/**/*.{html,js,svelte,ts}'],

  theme: {
    extend: {}
  },

  plugins: []
};

module.exports = config;
