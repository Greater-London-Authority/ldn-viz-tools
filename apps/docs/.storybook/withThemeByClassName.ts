import type { DecoratorFunction, Renderer } from 'storybook/internal/types';
import { useEffect } from 'storybook/preview-api';
import { DecoratorHelpers } from '@storybook/addon-themes';
import { mode, setMode } from 'mode-watcher';

const { initializeThemeState, pluckThemeFromContext } = DecoratorHelpers;

export interface ClassNameStrategyConfiguration {
	themes: Record<string, string>;
	defaultTheme: string;
	parentSelector?: string;
}

const DEFAULT_ELEMENT_SELECTOR = 'html';

const classStringToArray = (classString: string) => classString.split(' ').filter(Boolean);

export const withThemeByClassName = <TRenderer extends Renderer = Renderer>({
	themes,
	defaultTheme,
	parentSelector = DEFAULT_ELEMENT_SELECTOR
}: ClassNameStrategyConfiguration): DecoratorFunction<TRenderer> => {
	initializeThemeState(Object.keys(themes), defaultTheme);

	return (storyFn, context) => {
		const { themeOverride } = context.parameters['themes'] ?? {};
		const selected = pluckThemeFromContext(context);

		useEffect(() => {
			const selectedThemeName = themeOverride || selected || defaultTheme;
			const parentElement = document.querySelector(parentSelector);

			if (!parentElement) {
				return;
			}

			Object.entries(themes)
				.filter(([themeName]) => themeName !== selectedThemeName)
				.forEach(([themeName, className]) => {
					const classes = classStringToArray(className);
					if (classes.length > 0) {
						parentElement.classList.remove(...classes);
					}
				});

			const newThemeClasses = classStringToArray(themes[selectedThemeName]);
			setMode(selectedThemeName);

			if (newThemeClasses.length > 0) {
				parentElement.classList.add(...newThemeClasses);
			}
		}, [themeOverride, selected]);

		return storyFn();
	};
};
