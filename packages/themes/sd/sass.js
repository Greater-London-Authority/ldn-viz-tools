/*===============================================
  SASS VALUE EXPORT (RFC 0003, workstream 5)
  Generates styles/tokens.scss from the same flat map as tokens.json, so it
  holds every custom property tokens.css declares, under the same name.

  Values are resolved, not var() references: the file is for stacks that
  can't read custom properties, and a reference would tie them back to
  tokens.css. Every variable and map is !default, so a consumer can override
  one before @use.

  Variables take the light value. The maps add what a flat variable can't:
    $modes        light and dark values of every token that has a dark value
    $breakpoints  min-widths, in px, for media queries
    $typography   typography tokens by breakpoint, without the breakpoint segment
    $grid         grid tokens by breakpoint, the same way
*/

const BY_BREAKPOINT = ['typography', 'grid'];

// A string is quoted so a multi-word family stays one value. A value with a
// comma (a shadow with layers) is wrapped so it stays one entry in a map.
const sassValue = ({ value, type }) => {
	if (type === 'string') return `"${value}"`;
	const text = String(value);
	return text.includes(',') ? `(${text})` : text;
};

const sassMap = (entries, indent = '\t') =>
	`(\n${entries.map(([key, value]) => `${indent}${key}: ${value}`).join(',\n')}\n${indent.slice(1)})`;

/**
 * Builds the Sass file from the tooling map (formatTooling in sd.build.js):
 * { '--name': { value, type, dark? } }, and the breakpoint names in order.
 */
export const formatSass = (tokens, breakpoints) => {
	const entries = Object.entries(tokens).map(([name, token]) => [name.slice(2), token]);

	const variables = entries
		.map(([name, token]) => `$${name}: ${sassValue(token)} !default;`)
		.join('\n');

	const withDark = entries.filter(([, token]) => token.dark);
	const mode = (pick) =>
		sassMap(
			withDark.map(([name, token]) => [name, sassValue({ ...token, ...pick(token) })]),
			'\t\t'
		);
	const modes = sassMap([
		['light', mode(() => ({}))],
		['dark', mode((token) => ({ value: token.dark.value }))]
	]);

	const screens = sassMap(
		breakpoints.map((bp) => [bp, tokens[`--primitive-breakpoint-${bp}`].value])
	);

	const byBreakpoint = (category) => {
		const groups = new Map();
		for (const [name, token] of entries) {
			const [head, bp, ...rest] = name.split('-');
			if (head !== category) continue;
			if (!groups.has(bp)) groups.set(bp, []);
			groups.get(bp).push([rest.join('-'), sassValue(token)]);
		}
		return sassMap(
			[...groups].map(([bp, group]) => [bp, sassMap(group, '\t\t')]),
			'\t'
		);
	};

	return [
		variables,
		`$modes: ${modes} !default;`,
		`$breakpoints: ${screens} !default;`,
		...BY_BREAKPOINT.map((category) => `$${category}: ${byBreakpoint(category)} !default;`)
	].join('\n\n');
};
