import { mode, type SystemModeValue } from 'mode-watcher';
import { colorToRGBArray } from '@ldn-viz/utils';
import tokens from '@ldn-viz/themes/styles/js/theme-tokens.js';

type ThemeObject<T> = {
	[key: string]: T | ThemeObject<T>;
};

class ThemeState {
	currentMode: SystemModeValue = $derived(mode.current);
	currentTheme: ThemeObject<any> = $derived.by(() => tokens.theme[mode.current ? mode.current : 'light']);

	tokenNameToValue = (colorName: string, theme: ThemeObject<any> = this.currentTheme) => {
		let val = theme.color;
		for (const part of colorName.split('.')) {
			val = val[part];
			if (!val) {
				console.error(`Color name "${colorName}" not defined in theme "${this.currentMode}"`);
			}
		}
		return val as unknown as string;
	};

	colorTokenNameToRGBArray = (colorName: string, theme: ThemeObject<any> = this.currentTheme) =>
		colorToRGBArray(this.tokenNameToValue(colorName, theme));
}

export const theme = new ThemeState();
