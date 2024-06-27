// import StyleDictionary from 'style-dictionary'
import StyleDictionary from 'style-dictionary-utils';

// This function traverses and replaces oldStr with newStr in the object
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

// This function renames keys in the object based on the keyMap
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

      // Replace the references to modes
      const lightParsed = replaceStringInMode(
        jsonObj['variables'],
        'light-mode',
        'semantic.dark-mode', // Reference to incorrect mode prior to replacement
        'theme.light'
      );

      const darkParsed = replaceStringInMode(
        lightParsed,
        'dark-mode',
        'semantic.dark-mode',
        'theme.dark'
      );

      const parsedJsonObj = renameKeysDeep(darkParsed, {
        semantic: 'theme',
        'light-mode': 'light',
        'dark-mode': 'dark'
      });

      return parsedJsonObj;
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
  // token.attributes.category === 'global' || token.attributes.category === 'spacing'
  { category: 'global', subitem: { not: ['seed'] } },
  { category: 'spacing' }
];

const conditionsTw = [
  { category: 'theme', type: 'light' },
  { category: 'global', subitem: { not: ['light', 'dark', 'seed'] } },
  { category: 'spacing' }
];

const conditionsJs = [
  { category: 'theme' },
  {
    category: 'global',
    type: { not: ['spacing'] },
    item: { not: ['mode'] },
    subitem: { not: ['seed'] }
  }
];

const matchesCondition = (token, condition) => {
  return Object.entries(condition).every(([key, value]) => {
    if (typeof value === 'object' && value.not) {
      return !value.not.includes(token.attributes[key]);
    }
    return token.attributes[key] === value;
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

StyleDictionary.registerFormat({
  name: 'css/variables',
  formatter({ dictionary }) {
    return `${this.options.selector} {
          ${dictionary.allTokens
            .map((token) => {
              let originalName = token.name;

              let themedName =
                token.path[0] === 'global'
                  ? originalName
                  : transformString(originalName, 'theme-', /.*-color-/);

              if (dictionary.usesReference(token.original.value)) {
                const reference = dictionary.getReferences(token.original.value);
                const referenceName =
                  reference[0].path[0] === 'global'
                    ? reference[0].name
                    : transformString(reference[0].name);
                return `  --${themedName}: var(--${referenceName}, ${token.value});`;
              }

              return `  --${themedName}: ${token.value};`;
            })
            .join('\n')}
        }`;
  }
});

/**
 * Custom format that generates tailwind color config based on css variables
 */

StyleDictionary.registerFormat({
  name: 'tw/css-variables',
  formatter({ dictionary }) {
    return (
      'module.exports = ' +
      `{\n${dictionary.allTokens
        .map((token) => {
          let originalName = token.name;

          let themedName =
            token.path[0] === 'global'
              ? transformString(originalName, 'global-color')
              : transformString(originalName, 'theme-', /.*-color-/);

          let transformedName = transformString(originalName, 'color-', /.*-color-/);

          return `  "${transformedName}": "var(--${themedName}, ${token.value})"`;
        })
        .join(',\n')}\n}`
    );
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
