import StyleDictionary from 'style-dictionary';
import { transformTypes } from 'style-dictionary/enums';
import { fileHeader, getReferences, usesReferences } from 'style-dictionary/utils';
import { normaliseTokens, tokenName } from './sd/normalise.js';

/*===============================================
  CUSTOM PARSER
  The Figma export is normalised in one step (see sd/normalise.js) before any
  filtering, so filters and formats only ever see the specification's grammar.
*/

StyleDictionary.registerParser({
	name: 'json-parser',
	pattern: /\.json$/,
	parser: ({ contents }) => normaliseTokens(JSON.parse(contents))
});

/*=========================================================
  CUSTOM FILTERS
  Filters select by token type and path, not by excluding every other category.
*/

const isPrimitive = (token) => token.path[0] === 'primitive';
const isShadow = (token) => token.type === 'shadow';
const isColor = (token) => token.type === 'color';
const isSeed = (token) => token.path.includes('seed');

// The two dimension scales: spacing, and the type scale with its line heights.
const isPrimitiveScale = (token) =>
	isPrimitive(token) &&
	(token.path[1] === 'spacing' ||
		(token.path[1] === 'typography' && ['scale', 'line-height'].includes(token.path[2])));

const isMode = (mode) => (token) => token.path[0] === 'color' && token.path[1] === `${mode}-mode`;
const isCategory = (category) => (token) => token.path[0] === category;

const filters = {
	cssPrimitiveFilter: (token) =>
		isPrimitive(token) && !isShadow(token) && !isPrimitiveScale(token) && !isSeed(token),
	cssPrimitiveScaleFilter: isPrimitiveScale,
	cssLightModeFilter: isMode('light'),
	cssDarkModeFilter: isMode('dark'),
	cssSpacingFilter: isCategory('spacing'),
	cssGridFilter: isCategory('grid'),
	cssFlowFilter: isCategory('flow'),
	cssTypographyFilter: isCategory('typography'),
	shadowFilter: isShadow,
	twFilter: (token) => isColor(token) && (isMode('light')(token) || isPrimitive(token)),
	twSpacingFilter: isCategory('spacing'),
	twFlowFilter: isCategory('flow'),
	twGridFilter: isCategory('grid'),
	jsFilter: (token) =>
		isColor(token) &&
		(token.path[0] === 'color' ||
			(isPrimitive(token) && token.path[2] !== 'mode' && !isSeed(token)))
};

Object.entries(filters).forEach(([name, filter]) =>
	StyleDictionary.registerFilter({ name, filter })
);

/*=========================================================
  CUSTOM TRANSFORMS
*/

const transformString = (str, replace = 'mode', regex = /.*-color/) => {
	// Use a regular expression to replace everything before regex with replace
	return str.replace(regex, replace);
};

StyleDictionary.registerTransform({
	name: 'name/grammar',
	type: transformTypes.name,
	transform: tokenName
});

/**
 * Units, keyed on path. Dimensions arrive from Figma as unitless px.
 *  - font weights stay unitless
 *  - breakpoints become px (media queries can't use rem from custom properties)
 *  - everything else becomes rem
 * Only literal values are transformed; tokens that reference them inherit the
 * converted value, so no format divides by 16 itself.
 */
StyleDictionary.registerTransform({
	name: 'dimension/grammar',
	type: transformTypes.value,
	filter: (token) => token.type === 'dimension' && typeof token.value === 'number',
	transform: (token) => {
		if (token.path.includes('font-weight')) return token.value;
		if (token.path[1] === 'breakpoint') return `${token.value}px`;
		return token.value === 0 ? '0' : `${token.value / 16}rem`;
	}
});

/*=========================================================
  CUSTOM FORMATS
*/

// var(--<referenced>, <resolved>) when a token is authored as an alias, so the
// semantic layer references the primitive rather than restating it.
const cssValue = (token, dictionary) => {
	if (usesReferences(token.original.value)) {
		const [ref] = getReferences(token.original.value, dictionary.unfilteredTokens);
		if (ref) return `var(--${ref.name}, ${token.value})`;
	}
	return token.value;
};

/**
 * Custom format that generates tailwind color config based on css variables
 */

const formatTailwindColor = (token) => {
	let originalName = token.name;

	let transformedName =
		token.path[0] === 'primitive'
			? transformString(originalName, 'color-', /.*-color-/)
			: transformString(originalName, 'color-', /.*mode-/);

	return `  "${transformedName}": "var(--${token.name}, ${token.value})"`;
};

StyleDictionary.registerFormat({
	name: 'tw/css-variables',
	format({ dictionary }) {
		return `module.exports = {
        ${dictionary.allTokens.map(formatTailwindColor).join(',\n')}
      }`;
	}
});

/**
 * Custom format that exposes the numbered spacing scale to Tailwind.
 * The Tailwind key mirrors the native numeric scale ('4', '2.5', 'px') so it can
 * drop in as theme.extend.spacing; the CSS var uses the CSS-safe emitted name
 * ('--spacing-4', '--spacing-2-5', '--spacing-px').
 */
const formatTailwindSpacing = (token) => {
	const key = String(token.path[1]).replace(/^(\d+)-(\d+)$/, '$1.$2');
	return `"${key}": "var(--${token.name}, ${token.value})"`;
};

StyleDictionary.registerFormat({
	name: 'tw/css-spacing-variables',
	format({ dictionary }) {
		return `module.exports = {
        ${dictionary.allTokens.map(formatTailwindSpacing).join(',\n')}
      }`;
	}
});

/**
 * Custom format that generates tailwind flow config based on css variables
 *
 * Emits FOUR context-agnostic rung keys, not one per context and step. A
 * `mt-flow-standard-section` utility would resolve the flat
 * --flow-standard-section var directly, making it context-INdependent by
 * construction: dropped inside a .flow-spacious container it pins that one gap,
 * i.e. `mt-6` wearing a flow badge, and it opts the element out of the rhythm it
 * sits in. A component that must hold its density wherever it lands declares its
 * own context class instead (Toast does this), which gives the whole subtree one
 * density rather than pinning gaps individually.
 *
 * So rung utilities carry a RELATIONSHIP, never a density; density comes from the
 * context class in scope at runtime. The four rung names are the contract, hence
 * this format does not read tokens. The flat --flow-{context}[-{step}] vars are
 * untouched — they remain the value source the context blocks reference; they
 * simply stop being reachable from a utility.
 */

const FLOW_STEPS = ['tight', 'default', 'loose', 'section'];

StyleDictionary.registerFormat({
	name: 'tw/css-flow-variables',
	format() {
		const entries = FLOW_STEPS.map((step) => `  "flow-${step}": "var(--flow-${step})"`).join(',\n');
		return `module.exports = {\n${entries}\n}`;
	}
});

/**
 * Custom format that generates tailwind grid config based on css variables
 */

const formatTailwindGrid = (token) => `  "${token.name}": "var(--${token.name}, ${token.value})"`;

StyleDictionary.registerFormat({
	name: 'tw/css-grid-variables',
	format({ dictionary }) {
		return `module.exports = {
        ${dictionary.allTokens.map(formatTailwindGrid).join(',\n')}
      }`;
	}
});

/**
 * Custom format for typography
 *
 * Line height is emitted as a unitless ratio (line-height / font-size of the
 * same role), not as a reference to the line-height primitive, so that it
 * scales with the font size it sits beside. Every other property references the
 * primitive it is authored against.
 */
const formatTypography = (dictionary) => {
	const byPath = new Map(dictionary.allTokens.map((token) => [token.path.join('.'), token]));

	const lineHeightRatio = (token) => {
		const fontSize = byPath.get([...token.path.slice(0, -1), 'font-size'].join('.'));
		const ratio = parseFloat(token.value) / parseFloat(fontSize ? fontSize.value : '1rem');
		return Number(ratio.toFixed(4));
	};

	return dictionary.allTokens
		.map((token) => {
			const value =
				token.path.at(-1) === 'line-height' ? lineHeightRatio(token) : cssValue(token, dictionary);
			return `  --${token.name}: ${value};`;
		})
		.join('\n');
};

StyleDictionary.registerFormat({
	name: 'custom/typography',
	format({ dictionary }) {
		return `:root {\n${formatTypography(dictionary)}\n}\n`;
	}
});

/**
 * Custom format for flow
 *
 * Flow tokens are keyed [context][step] (e.g. spacious.tight, standard.section):
 * a context class carrying a 4-step ramp. The flat --flow-{context}[-{step}]
 * vars are the single value source; each context class maps them onto the bare
 * --flow-{step} vars that the owl rules and utilities read.
 */
const formatFlow = (dictionary) => {
	const contexts = [...new Set(dictionary.allTokens.map((token) => token.path[1]))];
	const flowVar = (context, step) =>
		step === 'default' ? `--flow-${context}` : `--flow-${context}-${step}`;

	const flat = dictionary.allTokens
		.map((token) => `  --${token.name}: ${cssValue(token, dictionary)};`)
		.join('\n');

	const ramp = (context) =>
		FLOW_STEPS.map((step) => `--flow-${step}: var(${flowVar(context, step)});`).join(' ');

	const blocks = contexts.map((context) => `.flow-${context} { ${ramp(context)} }`).join('\n');

	// Content outside any declared context takes standard, so its ramp is also
	// set on :root. Without it, a `mt-flow-section` with no ancestor context
	// class resolves an undefined custom property and margin-top falls back to
	// 0, a silent no-op. `.flow-standard` stays meaningful: it arms the owl,
	// which :root cannot do.
	const defaultRamp = FLOW_STEPS.map(
		(step) => `  --flow-${step}: var(${flowVar('standard', step)});`
	).join('\n');

	return `:root {\n${flat}\n${defaultRamp}\n}\n\n${blocks}\n`;
};

StyleDictionary.registerFormat({
	name: 'custom/flow',
	format({ dictionary }) {
		return formatFlow(dictionary);
	}
});

/**
 * Custom format functions for documentation and js variables - where heiracical grouping with the addition of a 'default' key
 * makes the structure easier to step though
 */

// Format a single token object for documentation style
const formatTokenForDocs = ({ name, value, type, description = '' }) => ({
	name: transformString(name, 'color', /.*(mode-(dark|light))/),
	value,
	type,
	description
});

// Format a single token object for javascript retuning only the value
const formatTokenForJs = ({ value }) => value;

// Helper: Check if a node is a token
const isToken = (node) => Object.hasOwn(node, 'value');

// Helper: split key into base/variant
const splitKey = (key) => {
	const index = key.indexOf('-');

	if (index === -1) {
		return { base: key, variant: null };
	}

	return {
		base: key.slice(0, index),
		variant: key.slice(index + 1)
	};
};

function makeHierarchical(input, formatter = (x) => x) {
	// Stop at a token and apply the formatter function
	if (isToken(input)) {
		return formatter(input);
	}

	// Group entries by base key
	const groups = {};

	for (const [key, value] of Object.entries(input)) {
		const { base, variant } = splitKey(key);

		if (!groups[base]) {
			groups[base] = { base: null, variants: {} };
		}

		if (variant) {
			groups[base].variants[variant] = value;
		} else {
			groups[base].base = value;
		}
	}

	// Build result with sibling awareness
	const result = {};

	for (const [base, { base: baseValue, variants }] of Object.entries(groups)) {
		const hasVariants = Object.keys(variants).length > 0;

		if (!hasVariants) {
			// No siblings → keep structure
			result[base] = makeHierarchical(baseValue, formatter);
			continue;
		}

		// Siblings detected → introduce default
		result[base] = {};

		if (baseValue !== null) {
			result[base].default = makeHierarchical(baseValue, formatter);
		}

		for (const [variant, value] of Object.entries(variants, formatter)) {
			result[base][variant] = makeHierarchical(value, formatter);
		}
	}

	return result;
}

// Importers of the docs and JS modules read semantic colours as
// `mode.{light,dark}`, so the color.{light-mode,dark-mode} groups are re-keyed
// to keep that shape until these exports are reworked (RFC 0003, workstream 5).
const withModeShape = ({ color, ...tokens }) =>
	color ? { ...tokens, mode: { light: color['light-mode'], dark: color['dark-mode'] } } : tokens;

// (FOR DOCS) -> Make Heirachical(add defaults to structure), then Format Token meta for docs
const formatForDocumentation = (dictionary) => {
	return makeHierarchical(withModeShape(dictionary.tokens), (token) => formatTokenForDocs(token));
};

// (FOR JS) -> Make Heirachical(add defaults to structure), then Format Token meta for js
const formatForJs = (dictionary) => {
	return makeHierarchical(withModeShape(dictionary.tokens), (token) => formatTokenForJs(token));
};

// Register custom docs formatter
StyleDictionary.registerFormat({
	name: 'custom/docs',
	format: async ({ dictionary, file }) => {
		const header = await fileHeader({ file });
		return `${header} 
			export default 
				${JSON.stringify(formatForDocumentation(dictionary), null, 2)}
			`;
	}
});

// Register custom js formatter
StyleDictionary.registerFormat({
	name: 'custom/js',
	format: async ({ dictionary, file }) => {
		const header = await fileHeader({ file });
		return `${header} 
			export default 
				${JSON.stringify(formatForJs(dictionary), null, 2)}
			`;
	}
});

console.log('Build started...');
console.log('\n==============================================');

// APPLY THE CONFIGURATION
// IMPORTANT: the registration of custom transforms
// needs to be done _before_ applying the configuration
// N.B. we supress warnings because warnings about
// "filtered out token references were found;"
// are expected due to how we split output across multiple files.
const sd = new StyleDictionary('./sd.config.json', {
	warnings: 'disabled'
});

// FINALLY, BUILD ALL THE PLATFORMS
await sd.buildAllPlatforms();

console.log('\n==============================================');
console.log('\nBuild completed!');
