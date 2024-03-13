import { create } from '@storybook/theming/create';

export default create({
	base: 'light',
	// Typography
	fontBase: '"Inter", sans-serif',
	fontCode: 'monospace',

	brandTitle: 'LDN viz-tools Storybook',
	brandUrl: 'https://data.london.gov.uk/blog/gla-intelligence-and-analysis-unit/',
	brandImage: '/cilogo.svg',
	brandTarget: '_self',

	colorPrimary: '#3787D2',
	colorSecondary: '#3787D2'
});
