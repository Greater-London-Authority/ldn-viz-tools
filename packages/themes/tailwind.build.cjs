// TODO Experimental: run with npx tailwindcss -c tailwind.build.js -o dist/typography.css
// to build external css stylesheet containing typography classes
module.exports = {
	content: [],
	safelist: [
		'prose',
		'prose-responsive',
		'responsive',
		'product',

		// roles
		'display',
		'headline',
		'subhead',
		'body',
		'caption',
		'format',
		'not-prose'
	],
	plugins: [require('./tailwind-custom/typography/typography')],
	corePlugins: false
};
