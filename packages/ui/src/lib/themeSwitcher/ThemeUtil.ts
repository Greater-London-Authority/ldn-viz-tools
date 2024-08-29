import { get } from 'svelte/store';
import { currentThemeMode, type ThemeMode } from './themeStore';
import tokens from '@ldn-viz/themes/styles/js/theme-tokens';

type MaybeThemeMode = null | ThemeMode;

/**
 * Returns a nested value within an object given an ordered array of member
 * names, e.g:
 *
 * object: {
 *   one: {
 *     two: {
 *       three: "value"
 *     }
 *   }
 * }
 *
 * objectLookup(object, ['one', 'two', 'three'])
 */
const objectLookup = (object: object, path: string[]) => {
	let result: any = object;

	for (let i = 0; i < path.length; i++) {
		if (typeof result !== 'object' || Array.isArray(result)) {
			throw new Error(`Invalid path to nested value within object: '${path}'`);
		}

		result = result[path[i]];
	}

	return result;
};

/**
 * ThemeUtil is a static class to ease theme and token lookup in the
 * current theme mode.
 *
 * The class subscribes to the currentThemeMode so lookup is always based
 * on the current theme.
 */
export default class ThemeUtil {
	static _mode = get(currentThemeMode);

	/**
	 * Returns current theme mode.
	 */
	static getMode() {
		return ThemeUtil._mode;
	}

	/**
	 * Returns true if in the specified mode.
	 */
	static isMode(mode: ThemeMode) {
		return ThemeUtil._mode === mode;
	}

	/**
	 * Returns the theme object for the specified mode. If no mode is provided
	 * then the current theme is returned.
	 */
	static getTheme(mode: MaybeThemeMode = null) {
		mode = mode ? mode : ThemeUtil._mode;
		return tokens.theme[mode];
	}

	/**
	 * Convenience for lookupTheme where the current theme mode should be used.
	 */
	static lookup(...tokenSegments: string[]) {
		return ThemeUtil.lookupTheme(ThemeUtil._mode, ...tokenSegments);
	}

	/**
	 * Looks up a token value given a mode and then a sequence of token path
	 * segments.
	 *
	 * The segments may be provided as separate arguments, as a dot separated
	 * string, or a mixture of both.
	 *
	 * E.g. all these are valid and return the same token value:
	 * - lookupTheme('color', 'data', 'primary')
	 * - lookupTheme('color.data.primary')
	 * - lookupTheme('color', 'data.primary')
	 */
	static lookupTheme(mode: MaybeThemeMode, ...tokenSegments: string[]) {
		const splitSegments = (tk: string) => tk.split('.');
		const path = tokenSegments.map(splitSegments).flat();
		const theme = ThemeUtil.getTheme(mode);
		return objectLookup(theme, path);
	}

	/**
	 * Creates a generator function that returns categorical data tokens.
	 *
	 * The generator initialises with the current theme mode unless a specific
	 * mode is passed. If the mode needs to change a new generator must be
	 * created, including if the current theme mode store updates.
	 */
	static createCategoricalDataColorNameGenerator = (mode: MaybeThemeMode = null) => {
		const theme = ThemeUtil.getTheme(mode);
		const tokens = Object.keys(theme.color.data.categorical);

		function* generateColorName() {
			for (const name of tokens) {
				yield name;
			}
		}

		return generateColorName();
	};

	/**
	 * Creates a generator function that returns categorical data colors.
	 *
	 * The generator initialises with the current theme mode unless a specific
	 * mode is passed. If the mode needs to change a new generator must be
	 * created, including if the current theme mode store updates.
	 */
	static createCategoricalDataColorGenerator = (mode: MaybeThemeMode = null) => {
		const nameGenerator = ThemeUtil.createCategoricalDataColorNameGenerator(mode);

		function* generateColor() {
			for (const name of nameGenerator) {
				yield ThemeUtil.lookupTheme(mode, 'color.data.categorical', name);
			}
		}

		return generateColor();
	};

	constructor() {
		throw new Error('ThemeUtil is a static class, use its static functions instead');
	}
}

currentThemeMode.subscribe((mode) => {
	ThemeUtil._mode = mode;
});
