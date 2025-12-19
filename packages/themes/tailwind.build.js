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
