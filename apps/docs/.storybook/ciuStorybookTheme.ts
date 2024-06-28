import { create } from '@storybook/theming/create';
import colors from '../../../packages/themes/colors.json';

export default create({
	base: 'dark',
	// Typography
	fontBase: '"Inter", sans-serif',
	fontCode: 'monospace',

	brandTitle: 'LDN viz-tools Storybook',
	brandUrl: 'https://greater-london-authority.github.io/ldn-viz-tools/',
	brandImage: './cilogo.svg',
	brandTarget: '_self',

	colorPrimary: colors.core.blue[600],
	colorSecondary: colors.core.blue[600],

	// UI
	appBg: colors.core.grey[800],
	appContentBg: colors.core.grey[900],
	appPreviewBg: '#ffffff',
	appBorderColor: colors.core.grey[600],
	appBorderRadius: 1,

	// Text colors
	textColor: colors.core.grey[50],
	textInverseColor: colors.core.grey[700],
	textMutedColor: colors.core.grey[100],

	// Toolbar default and active colors
	barTextColor: colors.core.grey[50],
	barHoverColor: colors.core.blue[600],
	barSelectedColor: colors.core.blue[600],
	barBg: colors.core.grey[600],

	// Form colors
	buttonBg: colors.core.blue[600],
	buttonBorder: colors.core.blue[600],
	booleanBg: colors.core.blue[600],
	booleanSelectedBg: colors.core.blue[500],
	inputBg: colors.core.grey[600],
	inputBorder: colors.core.grey[400],
	inputTextColor: colors.core.grey[50],
	inputBorderRadius: 1
});

export const docs = create({
	base: 'light',
	// Typography
	fontBase: '"Inter", sans-serif',
	fontCode: 'monospace',

	colorPrimary: colors.core.blue[600],
	colorSecondary: colors.core.blue[600],

	// Text colors
	textColor: colors.core.grey[700],
	textInverseColor: colors.core.grey[50],
	textMutedColor: colors.core.grey[200]
});
