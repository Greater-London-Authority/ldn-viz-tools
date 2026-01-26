import StyleDictionary from 'style-dictionary';
import { transformTypes } from 'style-dictionary/enums';

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
				['primitive.sm.', 'primitive.'],
				['primitive.md.', 'primitive.'],
				['primitive.lg.', 'primitive.'],
				['primitive.xl.', 'primitive.']
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

const conditionsPrimitive = [{ category: 'primitive', subitem: { not: ['seed'] } }];

const conditionsColorModes = [{ category: 'mode' }];
const conditionsColorModeLight = [{ category: 'mode', type: 'light' }];
const conditionsColorModeDark = [{ category: 'mode', type: 'dark' }];
const conditionsSpacing = [{ category: 'semantic-spacing' }];
const conditionsTypography = [{ category: 'semantic-typography' }];
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

// REGISTER THE CUSTOM FILTERS USING OUR MATCHING CONDITIONS

StyleDictionary.registerFilter({
	name: 'cssPrimitiveFilter',
	filter: (token) => createFilter(conditionsPrimitive)(token)
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
	name: 'jsFilter',
	filter: (token) => createFilter(conditionsJs)(token)
});

/*=========================================================
  CUSTOM TRANSFORMS
*/

//remove 'light' or 'dark' mode key from name
const transformModeName = (path) => {
	return path.filter((_, i) => i !== 1).join('-');
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
		const unitlessDimensions = ['lineheight', 'font-weight', 'weight', 'letterspacing'];
		return unitlessDimensions.some((i) => token.path.includes(i));
	},
	transform: (token) => {
		return token.original.value;
	}
});

//Don't apply units to spacing when not needed in tailwind transform
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

StyleDictionary.registerTransform({
	name: 'docsName',
	type: transformTypes.name,
	filter: (token) => {
		return token.path[0] === 'mode';
	},
	transform: (token) => {
		return transformString(token.name, 'color', /.*(mode-(dark|light))/);
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

const formatTailwindSpacing = (token) => {
	return `  "spacing-${token.attributes.type}": "var(--${token.name}, ${token.value / 16}rem)", 
  "typography-spacing-${token.attributes.type}": "var(--${token.name}-em, ${token.value / 16}em)" `;
};

StyleDictionary.registerFormat({
	name: 'tw/css-spacing-variables',
	format({ dictionary }) {
		return `module.exports = {
        ${dictionary.allTokens.map(formatTailwindSpacing).join(',\n')}
      }`;
	}
});

console.log('Build started...');
console.log('\n==============================================');

// APPLY THE CONFIGURATION
// IMPORTANT: the registration of custom transforms
// needs to be done _before_ applying the configuration
const sd = new StyleDictionary('./sd.config.json', {
	// warnings: 'disabled'
});

// FINALLY, BUILD ALL THE PLATFORMS
await sd.buildAllPlatforms();

console.log('\n==============================================');
console.log('\nBuild completed!');
