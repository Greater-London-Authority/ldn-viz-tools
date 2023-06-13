const tailwindcss = require('tailwindcss');
const autoprefixer = require('autoprefixer');
const discardcomments = require('postcss-discard-comments')
const config = {
	plugins: [
		//Some plugins, like tailwindcss/nesting, need to run before Tailwind,
		tailwindcss(),
		//But others, like autoprefixer, need to run after,
		autoprefixer,
		discardcomments
	]
};

module.exports = config;
