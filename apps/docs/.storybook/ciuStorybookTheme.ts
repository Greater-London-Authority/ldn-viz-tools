import colors from '@ldn-viz/themes/styles/js/mode-tokens';
import { create } from 'storybook/theming/create';

export default create({
	base: 'dark',
	// Typography
	fontBase: '"Inter", sans-serif',
	fontCode: 'monospace',

	brandTitle: 'LDN viz-tools Storybook',
	brandUrl: 'https://greater-london-authority.github.io/ldn-viz-tools/',
	brandImage: './cilogo.svg',
	brandTarget: '_self',

	colorPrimary: colors.mode.dark['surface-accent'],
	colorSecondary: colors.mode.dark.palette.blue[700],

	// UI
	appBg: colors.mode.dark.container,
	appContentBg: colors.mode.dark['canvas-muted'],
	appPreviewBg: '#ffffff',
	appBorderColor: colors.mode.dark['border-muted'],
	appBorderRadius: 1,

	// Text colors
	textColor: colors.mode.dark.text,
	textInverseColor: colors.mode.dark['text-inverse'],
	textMutedColor: colors.mode.dark['text-muted'],

	// Toolbar default and active colors
	barTextColor: colors.mode.dark.text,
	barHoverColor: colors.mode.dark.interactive.primary,
	barSelectedColor: colors.mode.dark.interactive['primary-active'],
	barBg: colors.mode.dark['container-level-2'],

	// Form colors
	buttonBg: colors.mode.dark.interactive.primary,
	buttonBorder: colors.mode.dark.interactive.primary,
	booleanBg: colors.mode.dark.interactive.positive,
	booleanSelectedBg: colors.mode.dark.interactive.on,
	inputBg: colors.mode.dark.surface,
	inputBorder: colors.mode.dark['border-muted'],
	inputTextColor: colors.mode.dark['text-wash'],
	inputBorderRadius: 1
});

export const docs = create({
	base: 'light',
	// Typography
	fontBase: '"Inter", sans-serif',
	fontCode: 'monospace',

	colorPrimary: colors.mode.light['surface-accent'],
	colorSecondary: colors.mode.light.palette.blue[700],

	// Text colors
	textColor: colors.mode.light.text,
	textInverseColor: colors.mode.light['text-inverse'],
	textMutedColor: colors.mode.light['text-muted']
});
