import tokens from '@ldn-viz/themes/styles/js/color-tokens.js';
import { colorToRGBArray, tokenNameToValue } from '@ldn-viz/utils';
import { mode, type SystemModeValue } from 'mode-watcher';

type ThemeObject<T> = {
	[key: string]: T | ThemeObject<T>;
};

class ThemeState {
	currentMode: SystemModeValue = $derived(mode.current);
	currentTheme: ThemeObject<any> = $derived.by(
		() => tokens.mode[mode.current ? mode.current : 'light']
	);

	tokenNameToValue = (colorName: string, theme: ThemeObject<any> = this.currentTheme) => {
		return tokenNameToValue(colorName, theme);
	};

	colorTokenNameToRGBArray = (colorName: string, theme: ThemeObject<any> = this.currentTheme) =>
		colorToRGBArray(this.tokenNameToValue(colorName, theme));
}

export const theme = new ThemeState();
