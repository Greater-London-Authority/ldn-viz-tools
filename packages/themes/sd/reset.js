/*===============================================
  RESET (RFC 0003, workstream 3)
  Generates reset.css: the element defaults the system assumes, for a
  consumer without Tailwind's preflight. index.css imports it first.

  It is a port of Tailwind v3's preflight, rule for rule, so an app that loads
  both sees no difference. Where preflight reads the Tailwind theme, the reset
  reads a token instead. Browser defaults are removed, not restyled: lists
  lose their markers, headings their size, links their colour. A typeset
  restores what its content needs.

  Every element selector is wrapped in :where(), so the reset has zero
  specificity and any class, alias or utility wins over it. Pseudo-elements
  can't sit inside :where(); they follow it, and weigh no more than a single
  element selector.
*/

const HEADINGS = 'h1, h2, h3, h4, h5, h6';

const rules = (ref) => [
	// Padding and border don't add to an element's width, and a border shows
	// as soon as it has a width.
	[
		':where(*), ::before, ::after',
		{
			'box-sizing': 'border-box',
			'border-width': '0',
			'border-style': 'solid',
			'border-color': ref('color-border')
		}
	],
	[
		':where(html, :host)',
		{
			'line-height': '1.5',
			'-webkit-text-size-adjust': '100%',
			'-moz-tab-size': '4',
			'tab-size': '4',
			'font-family': ref('primitive-typography-font-family-default'),
			'font-feature-settings': 'normal',
			'font-variation-settings': 'normal',
			'-webkit-tap-highlight-color': 'transparent'
		}
	],
	[':where(body)', { margin: '0', 'line-height': 'inherit' }],
	[':where(hr)', { height: '0', color: 'inherit', 'border-top-width': '1px' }],
	[':where(abbr[title])', { 'text-decoration': 'underline dotted' }],
	// A heading takes its size and weight from a role, never from its level.
	[`:where(${HEADINGS})`, { 'font-size': 'inherit', 'font-weight': 'inherit' }],
	[':where(a)', { color: 'inherit', 'text-decoration': 'inherit' }],
	[':where(b, strong)', { 'font-weight': 'bolder' }],
	[
		':where(code, kbd, samp, pre)',
		{
			'font-family': ref('primitive-typography-font-family-code'),
			'font-feature-settings': 'normal',
			'font-variation-settings': 'normal',
			'font-size': '1em'
		}
	],
	[':where(small)', { 'font-size': '80%' }],
	[
		':where(sub, sup)',
		{
			'font-size': '75%',
			'line-height': '0',
			position: 'relative',
			'vertical-align': 'baseline'
		}
	],
	[':where(sub)', { bottom: '-0.25em' }],
	[':where(sup)', { top: '-0.5em' }],
	[
		':where(table)',
		{ 'text-indent': '0', 'border-color': 'inherit', 'border-collapse': 'collapse' }
	],
	[
		':where(button, input, optgroup, select, textarea)',
		{
			'font-family': 'inherit',
			'font-feature-settings': 'inherit',
			'font-variation-settings': 'inherit',
			'font-size': '100%',
			'font-weight': 'inherit',
			'line-height': 'inherit',
			'letter-spacing': 'inherit',
			color: 'inherit',
			margin: '0',
			padding: '0'
		}
	],
	[':where(button, select)', { 'text-transform': 'none' }],
	[
		":where(button, input[type='button'], input[type='reset'], input[type='submit'])",
		{
			'-webkit-appearance': 'button',
			'background-color': 'transparent',
			'background-image': 'none'
		}
	],
	[':where(:-moz-focusring)', { outline: 'auto' }],
	[':where(:-moz-ui-invalid)', { 'box-shadow': 'none' }],
	[':where(progress)', { 'vertical-align': 'baseline' }],
	['::-webkit-inner-spin-button, ::-webkit-outer-spin-button', { height: 'auto' }],
	[":where([type='search'])", { '-webkit-appearance': 'textfield', 'outline-offset': '-2px' }],
	['::-webkit-search-decoration', { '-webkit-appearance': 'none' }],
	['::-webkit-file-upload-button', { '-webkit-appearance': 'button', font: 'inherit' }],
	[':where(summary)', { display: 'list-item' }],
	// Flow sets the space between blocks; a browser margin would collapse with it.
	[`:where(blockquote, dl, dd, ${HEADINGS}, hr, figure, p, pre)`, { margin: '0' }],
	[':where(fieldset)', { margin: '0', padding: '0' }],
	[':where(legend)', { padding: '0' }],
	[':where(ol, ul, menu)', { 'list-style': 'none', margin: '0', padding: '0' }],
	[':where(dialog)', { padding: '0' }],
	[':where(textarea)', { resize: 'vertical' }],
	[':where(input, textarea)::placeholder', { opacity: '1', color: ref('color-text-wash') }],
	[':where(button, [role="button"])', { cursor: 'pointer' }],
	[':where(:disabled)', { cursor: 'default' }],
	[
		':where(img, svg, video, canvas, audio, iframe, embed, object)',
		{ display: 'block', 'vertical-align': 'middle' }
	],
	[':where(img, video)', { 'max-width': '100%', height: 'auto' }],
	[':where([hidden]:not([hidden="until-found"]))', { display: 'none' }]
];

/**
 * Builds the sheet from a Style Dictionary dictionary (names already
 * transformed). Every token it reads is checked, as in sd/system.js.
 */
export const formatReset = (dictionary) => {
	const names = new Set(dictionary.allTokens.map((token) => token.name));
	const ref = (name) => {
		if (!names.has(name)) throw new Error(`reset.css reads --${name}, which is not a token`);
		return `var(--${name})`;
	};

	return rules(ref)
		.map(([selector, declarations]) => {
			const body = Object.entries(declarations)
				.map(([property, value]) => `  ${property}: ${value};`)
				.join('\n');
			return `${selector} {\n${body}\n}`;
		})
		.join('\n\n');
};
