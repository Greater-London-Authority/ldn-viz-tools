import { useEffect } from '@storybook/preview-api';
import type { DecoratorFunction, Renderer } from '@storybook/types';

import { userThemeSelectionStore } from '@ldn-viz/themes/themeStore';
import { DecoratorHelpers } from '@storybook/addon-themes';

const { initializeThemeState, pluckThemeFromContext, useThemeParameters } = DecoratorHelpers;

export interface ClassNameStrategyConfiguration {
	themes: Record<string, string>;
	defaultTheme: string;
	parentSelector?: string;
}

const DEFAULT_ELEMENT_SELECTOR = 'html';

const classStringToArray = (classString: string) => classString.split(' ').filter(Boolean);

// TODO check with @kasperpeulen: change the types so they can be correctly inferred from context e.g. <Story extends (...args: any[]) => any>
export const withThemeByClassNameStore = <TRenderer extends Renderer = any>({
	themes,
	defaultTheme,
	parentSelector = DEFAULT_ELEMENT_SELECTOR
}: ClassNameStrategyConfiguration): DecoratorFunction<TRenderer> => {
	initializeThemeState(Object.keys(themes), defaultTheme);

	return (storyFn, context) => {
		const { themeOverride } = useThemeParameters();
		const selected = pluckThemeFromContext(context);

		useEffect(() => {
			const selectedThemeName = themeOverride || selected || defaultTheme;
			const parentElement = document.querySelector(parentSelector);

			if (!parentElement) {
				return;
			}

			Object.entries(themes)
				.filter(([themeName]) => themeName !== selectedThemeName)
				.forEach(([_themeName, className]) => {
					const classes = classStringToArray(className);
					if (classes.length > 0) {
						parentElement.classList.remove(...classes);
					}
				});

			const newThemeClasses = classStringToArray(themes[selectedThemeName]);
			userThemeSelectionStore.set(themes[selectedThemeName]);

			if (newThemeClasses.length > 0) {
				parentElement.classList.add(...newThemeClasses);
			}
		}, [themeOverride, selected, parentSelector]);

		return storyFn();
	};
};
