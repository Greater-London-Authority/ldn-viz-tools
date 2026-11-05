/*===============================================
  FONT STACKS
  Figma holds only the family name (Inter, Source Code Pro). The build appends
  a fallback stack to each font-family primitive (ADR 0003), so every role,
  the reset and the preset fall back the same way if the font doesn't load.
  The sans stack is Tailwind v3's font-sans; the mono stack its font-mono.
*/

export const FONT_SANS = [
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

export const FONT_MONO = [
	'ui-monospace',
	'SFMono-Regular',
	'Menlo',
	'Monaco',
	'Consolas',
	'"Liberation Mono"',
	'"Courier New"',
	'monospace'
];

export const isFontFamilyPrimitive = (token) =>
	token.path[0] === 'primitive' &&
	token.path[1] === 'typography' &&
	token.path[2] === 'font-family';

// The code primitive takes the mono stack; default and display take sans.
export const withStack = (token) =>
	[token.value, ...(token.path[3] === 'code' ? FONT_MONO : FONT_SANS)].join(', ');
