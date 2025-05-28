import { create } from '@storybook/theming/create';
// import colors from '../../../packages/themes/colors.json';
import colors from '@ldn-viz/themes/styles/js/theme-tokens';

export default create({
	base: 'dark',
	// Typography
	fontBase: '"Inter", sans-serif',
	fontCode: 'monospace',

	brandTitle: 'LDN viz-tools Storybook',
	brandUrl: 'https://greater-london-authority.github.io/ldn-viz-tools/',
	brandImage: './cilogo.svg',
	brandTarget: '_self',

	colorPrimary: colors.theme.dark.color.ui.primary,
	colorSecondary: colors.theme.dark.color.palette.blue[700],

	// UI
	appBg: colors.theme.dark.color.container['level-1'],
	appContentBg: colors.theme.dark.color.container['level-0'],
	appPreviewBg: '#ffffff',
	appBorderColor: colors.theme.dark.color.ui.border.secondary,
	appBorderRadius: 1,

	// Text colors
	textColor: colors.theme.dark.color.text.primary,
	textInverseColor: colors.theme.dark.color.text.inverse.primary,
	textMutedColor: colors.theme.dark.color.text.secondary,

	// Toolbar default and active colors
	barTextColor: colors.theme.dark.color.text.primary,
	barHoverColor: colors.theme.dark.color.action.primary,
	barSelectedColor: colors.theme.dark.color.action['primary-active'],
	barBg: colors.theme.dark.color.container['level-2'],

	// Form colors
	buttonBg: colors.theme.dark.color.action.background.primary,
	buttonBorder: colors.theme.dark.color.action.border.primary,
	booleanBg: colors.theme.dark.color.action.background.positive,
	booleanSelectedBg: colors.theme.dark.color.input['background-selected'],
	inputBg: colors.theme.dark.color.input.background,
	inputBorder: colors.theme.dark.color.input.border,
	inputTextColor: colors.theme.dark.color.input.valuetext,
	inputBorderRadius: 1
});

export const docs = create({
	base: 'light',
	// Typography
	fontBase: '"Inter", sans-serif',
	fontCode: 'monospace',

	colorPrimary: colors.theme.light.color.ui.primary,
	colorSecondary: colors.theme.light.color.palette.blue[700],

	// Text colors
	textColor: colors.theme.light.color.text.primary,
	textInverseColor: colors.theme.light.color.text.inverse.primary,
	textMutedColor: colors.theme.light.color.text.secondary
});
