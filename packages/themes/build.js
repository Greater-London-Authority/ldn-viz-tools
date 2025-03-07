// import StyleDictionary from 'style-dictionary'
import StyleDictionary from 'style-dictionary-utils';

// This function recursively traverses the `obj` object, replacing `oldStr` with `newStr` in any strings that it contains.
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

// This function replaces strings in the mode within the semantic key of the object
const replaceStringInMode = (obj, mode, oldStr, newStr) => {
  if (typeof obj !== 'object' || obj === null) {
    return obj;
  }

  // Replace strings in the specified mode within the semantic key
  if (obj.semantic && obj.semantic[mode]) {
    obj.semantic[mode] = traverseAndReplace(obj.semantic[mode], oldStr, newStr);
  }

  // Recursively apply the function to all keys of the object
  Object.keys(obj).forEach((key) => {
    obj[key] = replaceStringInMode(obj[key], mode, oldStr, newStr);
  });

  return obj;
};

// This function recursively renames keys in the `obj` object. The `keyMap` object is a mapping from old keys to their replacements; keys that are not in `keyMap` are not renamed.
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
  pattern: /\.json$/,
  parse: ({ contents }) => {
    try {
      const jsonObj = JSON.parse(contents);

      const replacements = [
        ['global.mode 1.', 'global.'],
        ['global.light-mode.', 'global.'],
        ['global.dark-mode.', 'global.'],
        ['typography.mode 1.', 'typography.'],
        ['global.sm.', 'global.'],
        ['global.md.', 'global.'],
        ['global.lg.', 'global.'],
        ['global.xl.', 'global.']
      ];

      const cleanedJson = replacements.reduce((result, [oldValue, newValue]) => {
        return traverseAndReplace(result, oldValue, newValue);
      }, jsonObj);

      // Replace the references to modes
      const lightParsed = replaceStringInMode(
        cleanedJson,
        'light-mode',
        'semantic.light-mode',
        'theme.light'
      );

      const darkParsed = replaceStringInMode(
        lightParsed,
        'dark-mode',
        'semantic.dark-mode',
        'theme.dark'
      );

      return renameKeysDeep(darkParsed, {
        semantic: 'theme',
        'light-mode': 'light',
        'dark-mode': 'dark'
      });
    } catch (error) {
      console.error(error);
    }
  }
});

console.log('Build started...');
console.log('\n==============================================');

/*
 THESE ARE CONTITIONS TO FILTER ON AND A HELPER FUNCTION TO CREATE MATCHING FILTERS
 These are a convenience to avoid long filter strings such as
 token.attributes.category === 'global' || token.attributes.category === 'spacing' || token....
 The objects defined here are allowed through - everything else is filtered out. Acts as a yes gate
 The not: array allows for partial filtering of object keys. Acts as a no gate
*/
const conditionsCssLightTheme = [{ category: 'theme', type: 'light' }];

const conditionsCssDarkTheme = [{ category: 'theme', type: 'dark' }];

const conditionsCssGlobal = [
  { category: 'global', subitem: { not: ['seed'] } },
  { category: 'spacing' },
  { category: 'typography' }
];

const conditionsTw = [
  { category: 'theme', type: 'light' },
  {
    category: 'global',
    type: { not: ['spacing', 'typography'] },
    subitem: { not: ['light', 'dark', 'seed', 'spacing', 'typography'] }
  }
];

const conditionsTwSpacing = [{ category: 'spacing' }];

const conditionsJs = [
  { category: 'theme' },
  {
    category: 'global',
    type: { not: ['spacing', 'typography'] },
    item: { not: ['mode'] },
    subitem: { not: ['seed'] }
  }
];

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

const createMatcher = (conditions) => (token) => tokenMatchesAnyCondition(token, conditions);

// REGISTER THE CUSTOM FILTERS USING OUR MATCHING CONDITIONS

StyleDictionary.registerFilter({
  name: 'cssGlobalFilter',
  matcher: (token) => createMatcher(conditionsCssGlobal)(token)
});

StyleDictionary.registerFilter({
  name: 'cssLightThemeFilter',
  matcher: (token) => createMatcher(conditionsCssLightTheme)(token)
});

StyleDictionary.registerFilter({
  name: 'cssDarkThemeFilter',
  matcher: (token) => createMatcher(conditionsCssDarkTheme)(token)
});

StyleDictionary.registerFilter({
  name: 'twFilter',
  matcher: (token) => createMatcher(conditionsTw)(token)
});

StyleDictionary.registerFilter({
  name: 'twSpacingFilter',
  matcher: (token) => createMatcher(conditionsTwSpacing)(token)
});

StyleDictionary.registerFilter({
  name: 'jsFilter',
  matcher: (token) => createMatcher(conditionsJs)(token)
});

/**
 * Custom format that handle reference in css variables
 */
const transformString = (str, replace = 'theme', regex = /.*-color/) => {
  // Use a regular expression to replace everything before regex with replace
  return str.replace(regex, replace);
};

const formatCSSVariable = (dictionary) => (token) => {
  let originalName = token.name;

  let themedName =
    token.path[0] === 'theme' ? transformString(originalName, 'theme-', /.*-color-/) : originalName;

  const isSpacing = token.path.includes('spacing');
  const isFontSize = token.path[0] === 'typography' && token.path.at(-1) === 'fontsize';
  const isLineHeight = token.path[0] === 'typography' && token.path.at(-1) === 'lineheight';

  const getNestedTokenValue = (path) => {
    return (
      path.reduce((obj, key) => (obj && obj[key] ? obj[key] : null), dictionary.properties)
        ?.value || null
    );
  };

  // Get the corresponding font size for a line-height token
  const getFontSizeForLineHeight = (token) => {
    if (!isLineHeight) return null;

    // Construct the correct font size path (replace 'lineheight' with 'fontsize')
    const fontSizePath = [...token.path.slice(0, -1), 'fontsize'];

    // Retrieve the font size token value
    return getNestedTokenValue(fontSizePath);
  };

  // Apply correct CSS variable transformation
  const applyCSSVariable = (value, referenceName = null) => {
    const varPrefix = referenceName ? `var(--${referenceName}, ` : '';
    const emReferencePrefix = referenceName ? `var(--${referenceName}-em, ` : '';
    const varSuffix = referenceName ? ')' : '';

    if (isSpacing) {
      return `  --${themedName}: ${varPrefix}${value / 16}rem${varSuffix}; /* ${value}px */
  --${themedName}-em: ${emReferencePrefix}${value / 16}em${varSuffix}; /* ${value}px */`;
    }

    if (isFontSize) {
      return `  --${themedName}: ${varPrefix}${value / 16}rem${varSuffix}; /* ${value}px */`;
    }

    if (isLineHeight) {
      const fontSize = getFontSizeForLineHeight(token);
      const unitlessLineHeight = fontSize ? value / fontSize : value / 16;
      return `  --${themedName}: ${varPrefix}${unitlessLineHeight.toFixed(4)}${varSuffix};`;
    }

    return `  --${themedName}: ${varPrefix}${value}${varSuffix};`;
  };

  // Handle tokens that reference other tokens
  if (dictionary.usesReference(token.original.value)) {
    const reference = dictionary.getReferences(token.original.value);
    const referenceName =
      reference[0].path[0] === 'global' ? reference[0].name : transformString(reference[0].name);

    return applyCSSVariable(token.value, referenceName);
  }

  // Handle standalone tokens
  return applyCSSVariable(token.value);
};

// const formatCSSVariable = (dictionary) => (token) => {
//   let originalName = token.name;

//   let themedName = ['theme'].includes(token.path[0])
//     ? transformString(originalName, 'theme-', /.*-color-/)
//     : originalName;

//   const isSpacing = token.path.includes('spacing');
//   const isFontSize = token.path[0] === 'typography' && ['fontsize'].includes(token.path.at(-1));
//   const isLineHeight = token.path[0] === 'typography' && ['lineheight'].includes(token.path.at(-1));

//   if (dictionary.usesReference(token.original.value)) {
//     const reference = dictionary.getReferences(token.original.value);
//     const referenceName =
//       reference[0].path[0] === 'global' ? reference[0].name : transformString(reference[0].name);

//     // Apply correct units to tokens with references
//     if (isSpacing) {
//       return `  --${themedName}: var(--${referenceName}, ${token.value / 16}rem); /* ${token.value}px */
//   --${themedName}-em: var(--${referenceName}-em, ${token.value / 16}em); /* ${token.value}px */`;
//     }

//     if (isFontSize) {
//       return `  --${themedName}: var(--${referenceName}, ${token.value / 16}rem); /* ${token.value}px */`;
//     }

//     if (isLineHeight) {
//       return `  --${themedName}: var(--${referenceName}, ${token.value / 16});`;
//     }

//     return `  --${themedName}: var(--${referenceName}, ${token.value});`;
//   }

//   // Apply correct units to tokens without references
//   if (isSpacing) {
//     return `  --${themedName}: ${token.value / 16}rem; /* ${token.value}px */
//   --${themedName}-em: ${token.value / 16}em; /* ${token.value}px */`;
//   }

//   if (isFontSize) {
//     return ` --${themedName}: ${token.value / 16}rem; /* ${token.value}px */`;
//   }

//   if (isLineHeight) {
//     return ` --${themedName}: ${token.value / 16};`;
//   }

//   return `  --${themedName}: ${token.value};`;
// };

StyleDictionary.registerFormat({
  name: 'css/variables',
  formatter({ dictionary }) {
    return `${this.options.selector} {
          ${dictionary.allTokens.map(formatCSSVariable(dictionary)).join('\n')}
        }`;
  }
});

/**
 * Custom format that generates tailwind color config based on css variables
 */

const formatTailwindColor = (token) => {
  let originalName = token.name;

  let themedName =
    token.path[0] === 'global'
      ? transformString(originalName, 'global-color')
      : transformString(originalName, 'theme-', /.*-color-/);

  let transformedName = transformString(originalName, 'color-', /.*-color-/);

  return `  "${transformedName}": "var(--${themedName}, ${token.value})"`;
};

StyleDictionary.registerFormat({
  name: 'tw/css-variables',
  formatter({ dictionary }) {
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
  formatter({ dictionary }) {
    return `module.exports = {
        ${dictionary.allTokens.map(formatTailwindSpacing).join(',\n')}
      }`;
  }
});

/**
 * Custom format that generates json object for export and documentation
 */

// format token name
const formatTokenName = (name) => {
  return transformString(name, 'color-', /.*-color-/);
};

// Format a single token object
const formatToken = ({ name, value, type, description = '' }) => ({
  name: formatTokenName(name),
  hex: value,
  value,
  type,
  description
});

const formatForDocumentation = (dictionary) => {
  const maxDepth = 5; // Set the maximum nesting depth
  const separator = '.'; // Separator for flattened keys

  // Check if a node is a token
  const isToken = (node) => Object.hasOwn(node, 'value');

  // Flatten keys starting from a certain depth
  const flattenKeys = (keyPath, separator) => keyPath.slice(maxDepth - 1).join(separator);

  // Recursively process tokens
  const processTokens = (tokens, currentDepth = 0, parentKeys = []) => {
    return Object.entries(tokens).reduce((acc, [key, node]) => {
      const currentPath = [...parentKeys, key];

      if (isToken(node)) {
        // Directly add tokens with flattened keys
        const flatKey = flattenKeys(currentPath, separator);
        acc[flatKey] = formatToken(node);
      } else if (currentDepth < maxDepth - 1) {
        // Recurse for nested nodes within allowed depth
        acc[key] = processTokens(node, currentDepth + 1, currentPath);
      } else {
        // Hoist deeper tokens into the current level
        Object.entries(node).forEach(([nestedKey, nestedNode]) => {
          const flatKey = [key, nestedKey].join(separator);
          if (isToken(nestedNode)) {
            acc[flatKey] = formatToken(nestedNode);
          } else {
            acc[flatKey] = processTokens(nestedNode, currentDepth + 1, currentPath);
          }
        });
      }
      return acc;
    }, {});
  };

  return processTokens(dictionary.tokens);
};

StyleDictionary.registerFormat({
  name: 'documentation',
  formatter({ dictionary }) {
    return JSON.stringify(formatForDocumentation(dictionary), null, 2);
  }
});

// APPLY THE CONFIGURATION
// IMPORTANT: the registration of custom transforms
// needs to be done _before_ applying the configuration
const StyleDictionaryExtended = StyleDictionary.extend('./config.json');

// FINALLY, BUILD ALL THE PLATFORMS
StyleDictionaryExtended.buildAllPlatforms();

console.log('\n==============================================');
console.log('\nBuild completed!');
