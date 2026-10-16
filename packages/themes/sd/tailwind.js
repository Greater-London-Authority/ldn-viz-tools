/*===============================================
  TAILWIND PRESET (RFC 0003, workstream 4)
  Generates styles/tailwind.cjs: a preset that only maps Tailwind's theme onto
  the custom properties in tokens.css. It adds no classes and no plugins;
  every class the specification names, the form styles included, is in
  system.css, which a Tailwind app imports through index.css.

  Each value is var(--token, <resolved>), so a utility follows the token at
  runtime (dark mode included) and still renders if tokens.css is missing.
*/

const FONT_SANS = [
	'ui-sans-serif',
	'system-ui',
	'-apple-system',
	'BlinkMacSystemFont',
	'"Segoe UI"',
	'Roboto',
	'"Helvetica Neue"',
	'Arial',
	'"Noto Sans"',
	'sans-serif',
	'"Apple Color Emoji"',
	'"Segoe UI Emoji"',
	'"Segoe UI Symbol"',
	'"Noto Color Emoji"'
];

const FONT_MONO = [
	'ui-monospace',
	'SFMono-Regular',
	'Menlo',
	'Monaco',
	'Consolas',
	'"Liberation Mono"',
	'"Courier New"',
	'monospace'
];

const varOf = (token) => `var(--${token.name}, ${token.value})`;

// Utility keys keep their version 3 spelling, so class names don't change:
// bg-color-surface, text-color-static-white.
const colorKey = (token) =>
	token.path[0] === 'primitive'
		? token.name.replace(/.*-color-/, 'color-')
		: token.name.replace(/.*mode-/, 'color-');

// The Tailwind spacing key mirrors its numeric scale ('4', '2.5', 'px').
const spacingKey = (token) => String(token.path[1]).replace(/^(\d+)-(\d+)$/, '$1.$2');

// --shadow is Tailwind's DEFAULT; --shadow-sm is sm.
const shadowKey = (token) =>
	token.name === 'shadow' ? 'DEFAULT' : token.name.slice('shadow-'.length);

// A primitive and a semantic token can share a key (color-static-white). The
// semantic one comes last, so it wins, and the utility follows the mode.
const primitivesFirst = (tokens) =>
	[...tokens].sort((a, b) => (b.path[0] === 'primitive') - (a.path[0] === 'primitive'));

/**
 * Builds the preset from a Style Dictionary dictionary (names transformed)
 * and the token filters from sd.build.js.
 */
export const formatPreset = (dictionary, filters, breakpoints) => {
	const select = (filter) => dictionary.allTokens.filter(filter);
	const byName = new Map(dictionary.allTokens.map((token) => [token.name, token]));
	const token = (name) => {
		if (!byName.has(name)) throw new Error(`The preset reads --${name}, which is not a token`);
		return byName.get(name);
	};
	const entries = (tokens, key) => Object.fromEntries(tokens.map((t) => [key(t), varOf(t)]));

	// Media queries can't read var(), so screens take the resolved px value.
	const screens = Object.fromEntries(
		breakpoints.map((bp) => [bp, token(`primitive-breakpoint-${bp}`).value])
	);

	const containerPadding = Object.fromEntries(
		['base', ...breakpoints].map((bp) => [
			bp === 'base' ? 'DEFAULT' : bp,
			varOf(token(`grid-${bp}-contained-container-padding`))
		])
	);

	const preset = {
		darkMode: 'class',
		theme: {
			screens,
			container: { padding: containerPadding },
			extend: {
				colors: entries(primitivesFirst(select(filters.twFilter)), colorKey),
				spacing: entries(select(filters.twSpacingFilter), spacingKey),
				boxShadow: entries(
					select((t) => filters.shadowFilter(t) && /^shadow(-|$)/.test(t.name)),
					shadowKey
				),
				fontFamily: {
					sans: [varOf(token('primitive-typography-font-family-default')), ...FONT_SANS],
					mono: [varOf(token('primitive-typography-font-family-code')), ...FONT_MONO]
				}
			}
		},
		plugins: []
	};

	return `/** @type {import('tailwindcss').Config} */\nmodule.exports = ${JSON.stringify(preset, null, '\t')};\n`;
};
