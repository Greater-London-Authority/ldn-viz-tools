const config = {
	presets: [require('../themes/ldn-theme')],
	content: ['./src/**/*.{html,js,svelte,ts}'],

	theme: {
		extend: {}
	},

	plugins: []
};

module.exports = config;
