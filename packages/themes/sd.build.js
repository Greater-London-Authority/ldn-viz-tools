import StyleDictionary from 'style-dictionary';
import { transformTypes } from 'style-dictionary/enums';
import { fileHeader } from 'style-dictionary/utils';

/*===============================================
  CUSTOM PARSER 
  First we need to parse the tokens file to sanitise ready for processing.
*/

const traverseAndReplace = (obj, oldStr, newStr) => {
	if (typeof obj === 'string') {
		return obj.replace(oldStr, newStr);
	} else if (Array.isArray(obj)) {
		return obj.map((item) => traverseAndReplace(item, oldStr, newStr));
	} else if (typeof obj === 'object' && obj !== null) {
		const result = {};
		Object.keys(obj).forEach((key) => {
			result[key] = traverseAndReplace(obj[key], oldStr, newStr);
		});
		return result;
	} else {
		return obj;
	}
};

const replaceStringInMode = (obj, mode, oldStr, newStr) => {
	if (typeof obj !== 'object' || obj === null) {
		return obj;
	}

	// Replace strings in the specified mode within the semantic key
	if (obj['semantic-color'] && obj['semantic-color'][mode]) {
		obj['semantic-color'][mode] = traverseAndReplace(obj['semantic-color'][mode], oldStr, newStr);
	}

	// Recursively apply the function to all keys of the object
	Object.keys(obj).forEach((key) => {
		obj[key] = replaceStringInMode(obj[key], mode, oldStr, newStr);
	});

	return obj;
};

// Recursively rename keys in the `obj` object. The `keyMap` object is a mapping from old keys to their replacements; keys that are not in `keyMap` are not renamed.
const renameKeysDeep = (obj, keyMap) => {
	if (typeof obj !== 'object' || obj === null) {
		return obj;
	}

	if (Array.isArray(obj)) {
		return obj.map((item) => renameKeysDeep(item, keyMap));
	}

	const renamedObj = {};
	Object.keys(obj).forEach((key) => {
		const newKey = keyMap[key] || key;
		renamedObj[newKey] = renameKeysDeep(obj[key], keyMap);
	});
	return renamedObj;
};

StyleDictionary.registerParser({
	name: 'json-parser',
	pattern: /\.json$/,
	parser: ({ contents }) => {
		try {
			const jsonObj = JSON.parse(contents);

			const replacements = [
				['primitive.mode 1.', 'primitive.'],
				['primitive.light-mode.', 'primitive.'],
				['primitive.dark-mode.', 'primitive.'],
				['primitive.base.', 'primitive.'],
				['primitive.sm.', 'primitive.'],
				['primitive.md.', 'primitive.'],
				['primitive.lg.', 'primitive.'],
				['primitive.xl.', 'primitive.'],
				['primitive.2xl.', 'primitive.'],
				['focus ring', 'focus-ring']
			];

			const cleanedJson = replacements.reduce((result, [oldValue, newValue]) => {
				return traverseAndReplace(result, oldValue, newValue);
			}, jsonObj);

			// Replace the references to modes
			const lightParsed = replaceStringInMode(
				cleanedJson,
				'light-mode',
				'semantic-color.light-mode',
				'mode.light'
			);

			const darkParsed = replaceStringInMode(
				lightParsed,
				'dark-mode',
				'semantic-color.dark-mode',
				'mode.dark'
			);

			const output = renameKeysDeep(darkParsed, {
				'semantic-color': 'mode',
				'semantic-spacing': 'spacing',
				'semantic-typography': 'typography',
				'semantic-flow': 'flow',
				'custom-shadow': 'shadow',
				'light-mode': 'light',
				'dark-mode': 'dark'
			});

			// console.log(output);

			return output;
		} catch (error) {
			console.log(error);
		}
	}
});

/*=========================================================
  CUSTOM FILTERS
*/

const transformString = (str, replace = 'mode', regex = /.*-color/) => {
	// Use a regular expression to replace everything before regex with replace
	return str.replace(regex, replace);
};

/*
 THESE ARE CONTITIONS TO FILTER ON AND A HELPER FUNCTION TO CREATE MATCHING FILTERS
 These are a convenience to avoid long filter strings such as
 token.attributes.category === 'primitive' || token.attributes.category === 'spacing' || token....
 The objects defined here are allowed through - everything else is filtered out. Acts as a yes gate
 The not: array allows for partial filtering of object keys. Acts as a no gate
*/

const matchesCondition = (token, condition) => {
	return Object.entries(condition).every(([field, filter]) => {
		const val = token.attributes[field];

		if (typeof filter === 'object' && filter.not) {
			return !filter.not.includes(val);
		}
		return filter === val;
	});
};
const tokenMatchesAnyCondition = (token, conditions) => {
	return conditions.some((condition) => matchesCondition(token, condition));
};

const createFilter = (conditions) => (token) => tokenMatchesAnyCondition(token, conditions);

/*------------------------------------------*/

// Generic primitives.css carries the NON-scale primitives (colour, font-family,
// font-weight, breakpoint) via css/variables, which emits raw values. The two
// dimension SCALES - spacing (type 'spacing') and font-size (subitem 'size') -
// are excluded here and emitted by custom/primitive-scale instead, because they
// need px->rem conversion at emit time while their token-graph value stays px
// (so tokens that reference them - flow, t-shirt spacing, grid - resolve correctly).
const conditionsPrimitive = [
	{ category: 'primitive', type: { not: ['spacing'] }, subitem: { not: ['seed', 'size'] } }
];
const conditionsPrimitiveScale = [
	{ category: 'primitive', type: 'spacing' },
	{ category: 'primitive', subitem: 'size' }
];

const conditionsColorModes = [{ category: 'mode' }];
const conditionsColorModeLight = [{ category: 'mode', type: 'light' }];
const conditionsColorModeDark = [{ category: 'mode', type: 'dark' }];
const conditionsSpacing = [{ category: 'spacing' }];
const conditionsTypography = [
	{ category: 'typography' },
	{ category: 'primitive', subitem: 'size' }
];
const conditionsFlow = [{ category: 'flow' }];
const conditionsGridSpacing = [{ category: 'grid-spacing' }];
const conditionsTw = [
	...conditionsColorModeLight,
	{
		category: 'primitive',
		type: { not: ['spacing', 'typography'] },
		subitem: { not: ['light', 'dark', 'seed', 'spacing', 'typography'] }
	}
];
const conditionsJs = [
	...conditionsColorModes,
	{
		category: 'primitive',
		type: { not: ['spacing', 'typography'] },
		item: { not: ['mode'] },
		subitem: { not: ['seed'] }
	}
];
const conditionsShadow = [
	{
		category: {
			not: ['focus ring', 'spacing', 'primitive', 'mode', 'typography', 'flow', 'grid-spacing']
		}
	}
];

// REGISTER THE CUSTOM FILTERS USING OUR MATCHING CONDITIONS

StyleDictionary.registerFilter({
	name: 'cssPrimitiveFilter',
	filter: (token) => createFilter(conditionsPrimitive)(token)
});

StyleDictionary.registerFilter({
	name: 'cssPrimitiveScaleFilter',
	filter: (token) => createFilter(conditionsPrimitiveScale)(token)
});

StyleDictionary.registerFilter({
	name: 'cssLightModeFilter',
	filter: (token) => createFilter(conditionsColorModeLight)(token)
});

StyleDictionary.registerFilter({
	name: 'cssDarkModeFilter',
	filter: (token) => createFilter(conditionsColorModeDark)(token)
});

StyleDictionary.registerFilter({
	name: 'cssSpacingFilter',
	filter: (token) => createFilter(conditionsSpacing)(token)
});

StyleDictionary.registerFilter({
	name: 'cssGridSpacingFilter',
	filter: (token) => createFilter(conditionsGridSpacing)(token)
});

StyleDictionary.registerFilter({
	name: 'cssFlowFilter',
	filter: (token) => createFilter(conditionsFlow)(token)
});

StyleDictionary.registerFilter({
	name: 'cssTypographyFilter',
	filter: (token) => createFilter(conditionsTypography)(token)
});

StyleDictionary.registerFilter({
	name: 'twFilter',
	filter: (token) => createFilter(conditionsTw)(token)
});

StyleDictionary.registerFilter({
	name: 'twSpacingFilter',
	filter: (token) => createFilter(conditionsSpacing)(token)
});

StyleDictionary.registerFilter({
	name: 'twFlowFilter',
	filter: (token) => createFilter(conditionsFlow)(token)
});

StyleDictionary.registerFilter({
	name: 'twGridSpacingFilter',
	filter: (token) => createFilter(conditionsGridSpacing)(token)
});

StyleDictionary.registerFilter({
	name: 'jsFilter',
	filter: (token) => createFilter(conditionsJs)(token)
});

StyleDictionary.registerFilter({
	name: 'shadowFilter',
	filter: (token) => createFilter(conditionsShadow)(token)
});

/*=========================================================
  CUSTOM TRANSFORMS
*/

//remove 'light' or 'dark' mode key from name and swicth mode to color
// Before: mode-dark-text-muted - not humarn readable token name for css
// After: color-text-muted - correct token naming schema for consumption

const transformModeName = (path) => {
	return transformString(path.join('-'), 'color', /.*(mode-(dark|light))/);
};

StyleDictionary.registerTransform({
	name: 'modeName',
	type: transformTypes.name,
	filter: (token) => {
		return token.path[0] === 'mode';
	},
	transform: (token) => {
		return transformModeName(token.path);
	}
});

//Don't apply units to typography where not needed
StyleDictionary.registerTransform({
	name: 'typography/unitless',
	type: transformTypes.value,
	filter: (token) => {
		const unitlessDimensions = [
			'lineheight',
			'line-height',
			'font-weight',
			'weight',
			'letterspacing',
			'letter-spacing'
		];
		return unitlessDimensions.some((i) => token.path.includes(i));
	},
	transform: (token) => {
		return token.original.value;
	}
});

//Don't apply units to spacing when not needed.
// Keeps ALL dimension tokens as raw px in the resolved value, so the custom
// formats (spacing, grid-spacing, flow, primitive-scale) can do their own /16
// rem/em conversion. This matters for the shared primitive-spacing scale, which
// semantic-flow / semantic-spacing / grid-spacing all REFERENCE - they divide
// the resolved px by 16, so the primitive must stay px in the token graph and
// be converted to rem only at emit time (see custom/primitive-scale).
StyleDictionary.registerTransform({
	name: 'spacing/unitless',
	type: transformTypes.value,
	filter: (token) => {
		return token.type === 'dimension';
	},
	transform: (token) => {
		return token.original.value;
	}
});

/*=========================================================
  CUSTOM FORMATS
*/

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
 * Custom format that generates tailwind spacing config based on css variables
 */

/**
 * Custom format that exposes the numbered spacing scale to Tailwind.
 * The Tailwind key mirrors the native numeric scale ('4', '2.5', 'px') so it can
 * drop in as theme.extend.spacing; the CSS var uses the CSS-safe emitted name
 * ('--spacing-4', '---spacing-2-5', '---spacing-px').
 */
const formatTailwindSpacing = (token) => {
	const key = String(token.attributes.type).replace(/^(\d+)-(\d+)$/, '$1.$2');
	return `"${key}": "var(--${token.name}, ${token.value / 16}rem)"`;
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
 */

const formatTailwindFlow = (token) => {
	return `  "flow-${token.attributes.type}": "var(--${token.name}, ${token.value / 16}rem)"`;
};

StyleDictionary.registerFormat({
	name: 'tw/css-flow-variables',
	format({ dictionary }) {
		return `module.exports = {
        ${dictionary.allTokens.map(formatTailwindFlow).join(',\n')}
      }`;
	}
});

/**
 * Custom format that generates tailwind gridSpacing config based on css variables
 */

const formatTailwindGridSpacing = (token) => {
	return `  "${token.name}": "var(--${token.name}, ${token.value / 16}rem)"`;
};

StyleDictionary.registerFormat({
	name: 'tw/css-grid-spacing-variables',
	format({ dictionary }) {
		return `module.exports = {
        ${dictionary.allTokens.map(formatTailwindGridSpacing).join(',\n')}
      }`;
	}
});

// If a token's authored value is an alias (e.g. font-weight -> a primitive),
// emit it as var(--<primitive>, <resolved fallback>) so the semantic layer
// REFERENCES the primitive rather than restating it - matching the colour
// tokens. Returns the kebab primitive var name, or null for literals.
// (Honours the platform's outputReferences intent for this custom format.)
const referencedVarName = (token) => {
	const authored = token.original && token.original.value;
	if (typeof authored === 'string' && authored.trim().startsWith('{')) {
		return authored.trim().replace(/[{}]/g, '').split('.').join('-');
	}
	return null;
};

/**
 * Custom format for typography
 */

const formatTypography = (dictionary) => (token) => {
	// Token field names vary between the no-hyphen ('fontsize') and hyphenated ('font-size')
	// naming conventions used across different breakpoints/sets in the tokens file.
	const lastSegment = token.path.at(-1);
	const isFontSize =
		token.path[0] === 'typography' && (lastSegment === 'fontsize' || lastSegment === 'font-size');
	const isLineHeight =
		token.path[0] === 'typography' &&
		(lastSegment === 'lineheight' || lastSegment === 'line-height');
	const isReadableWidth = token.path[0] === 'typography' && lastSegment === 'readable-width';

	const getNestedTokenValue = (path) => {
		return (
			path.reduce((obj, key) => (obj && obj[key] ? obj[key] : null), dictionary.tokens)?.original
				.value || null
		);
	};

	// Get the corresponding font size for a line-height token
	const getFontSizeForLineHeight = (token) => {
		if (!isLineHeight) return null;

		// Construct the correct font size path (matching the same naming convention as lastSegment)
		const fontSizeKey = lastSegment === 'line-height' ? 'font-size' : 'fontsize';
		const fontSizePath = [...token.path.slice(0, -1), fontSizeKey];

		// Retrieve the font size token value
		return getNestedTokenValue(fontSizePath);
	};

	const applyCSSVariable = (token) => {
		if (isFontSize) {
			const ref = referencedVarName(token);
			// Literal today; when a primitive font-size scale is authored and the
			// role aliases it, `original.value` becomes a reference and this emits
			// var(--primitive-typography-font-size-<px>, <rem>).
			const px = typeof token.original.value === 'number' ? token.original.value : token.value;
			const rem = px / 16;
			return ref ? ` --${token.name}: var(--${ref}, ${rem}rem)` : ` --${token.name}: ${rem}rem`;
		}

		if (isLineHeight) {
			// Always computed unitless (ratio). Line-height is deliberately NOT a
			// primitive reference: the emitted value is lh/fs, not a px alias.

			const ref = referencedVarName(token);

			const fontSize = getFontSizeForLineHeight(token);
			const match = fontSize
				.trim()
				.replace(/[{}]/g, '')
				.match(/size\.(\d+)/);
			const result = match ? match[1] : null;

			const unitlessLineHeight = result ? token.value / result : token.value / 16;
			return `  --${token.name}: ${unitlessLineHeight.toFixed(4)}`;
		}

		if (isReadableWidth) {
			return ` --${token.name}: ${token.original.value / 16}rem`;
		}

		// font-family, font-weight, letter-spacing, space-before: reference the
		// primitive when authored as an alias (family, weight), else literal.
		const ref = referencedVarName(token);
		return ref
			? ` --${token.name}: var(--${ref}, ${token.value})`
			: ` --${token.name}: ${token.value}`;
	};

	return applyCSSVariable(token);
};

StyleDictionary.registerFormat({
	name: 'custom/typography',
	format({ dictionary }) {
		return `:root {
		${dictionary.allTokens
			.filter((token) => token.path[0] !== 'primitive')
			.map(formatTypography(dictionary))
			.join(';\n')}
      }`;
	}
});

/**
 * Custom format for spacing
 */
const formatSpacing = (token) => {
	const ref = referencedVarName(token);
	return ` --${token.name}: var(--${ref}, ${token.value / 16}rem)`;
};

StyleDictionary.registerFormat({
	name: 'custom/spacing',
	format({ dictionary }) {
		return `:root {
        ${dictionary.allTokens.map(formatSpacing).join(';\n')}
      }`;
	}
});

/**
 * Custom format for the dimension PRIMITIVE scales (spacing + font-size).
 *
 * These live in the token graph as raw px (see spacing/unitless) so that tokens
 * which reference them resolve to px for their own /16 maths. Here - at emit
 * time only - we convert px -> rem. token.name is already CSS-safe kebab
 * (name/kebab maps the authored U+2024 in fractional keys to '-', e.g.
 * '0.5' -> primitive-spacing-0-5, 'px' -> primitive-spacing-px), so we emit it
 * verbatim. Produces e.g.:
 *   --primitive-spacing-4: 1rem;
 *   --primitive-typography-font-size-40: 2.5rem;
 */
const formatPrimitiveScale = (token) => ` --${token.name}: ${token.value / 16}rem;`;

StyleDictionary.registerFormat({
	name: 'custom/primitive-scale',
	format({ dictionary }) {
		return `:root {
        ${dictionary.allTokens.map(formatPrimitiveScale).join('\n')}
      }`;
	}
});

/**
 * Custom format for flow
 *
 * Flow tokens are keyed [context][step] (e.g. prose.tight, product.section) - a
 * context class carrying a 4-step ramp, not one flat var per context. Group by
 * context and key the var on the step, so tight/default/loose/section don't
 * collapse onto a single `--flow-${context}` var (last-token-wins).
 */
const FLOW_STEP_ORDER = ['tight', 'default', 'loose', 'section'];

const formatFlow = (dictionary) => {
	const byContext = {};

	dictionary.allTokens.forEach((token) => {
		const [, context, step] = token.path;
		byContext[context] = byContext[context] || {};
		byContext[context][step] = `${token.value / 16}rem`;
	});

	return Object.keys(byContext)
		.map((context) => {
			const steps = byContext[context];
			const vars = FLOW_STEP_ORDER.filter((step) => steps[step] !== undefined)
				.map((step) => `--flow-${step}: ${steps[step]};`)
				.join(' ');
			return `.flow-${context} { ${vars} }`;
		})
		.join('\n');
};

StyleDictionary.registerFormat({
	name: 'custom/flow',
	format({ dictionary }) {
		return formatFlow(dictionary);
	}
});

/**
 * Custom format for grid-spacing
 */
const formatGridSpacing = (token) => `--${token.name}: ${token.value / 16}rem`;

StyleDictionary.registerFormat({
	name: 'custom/grid-spacing',
	format({ dictionary }) {
		return `:root {
        ${dictionary.allTokens.map(formatGridSpacing).join(';\n')}
      }`;
	}
});

/**
 * Custom format for shadows
 */

const groupShadows = (tokens) =>
	Object.values(
		tokens.reduce((acc, token) => {
			const { category } = token.attributes;

			if (!acc[category]) {
				acc[category] = {
					category,
					values: []
				};
			}

			acc[category].values.push(token.original.value);
			return acc;
		}, {})
	);

const formatShadows = (dictionary) => {
	const grouped = groupShadows(dictionary.allTokens);

	return grouped
		.map(({ category, values }) => {
			return `--${category}: ${values.map(
				({ radius, color, offsetX, offsetY, spread }) =>
					`${offsetX}px ${offsetY}px ${radius}px ${spread}px ${color}`
			)}`;
		})
		.join(';\n');
};

StyleDictionary.registerFormat({
	name: 'custom/shadows',
	format({ dictionary }) {
		return `:root {
			${formatShadows(dictionary)};
		}`;
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

// (FOR DOCS) -> Make Heirachical(add defaults to structure), then Format Token meta for docs
const formatForDocumentation = (dictionary) => {
	return makeHierarchical(dictionary.tokens, (token) => formatTokenForDocs(token));
};

// (FOR JS) -> Make Heirachical(add defaults to structure), then Format Token meta for js
const formatForJs = (dictionary) => {
	return makeHierarchical(dictionary.tokens, (token) => formatTokenForJs(token));
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
const sd = new StyleDictionary('./sd.config.json', {
	warnings: 'disabled'
});

// FINALLY, BUILD ALL THE PLATFORMS
await sd.buildAllPlatforms();

console.log('\n==============================================');
console.log('\nBuild completed!');
