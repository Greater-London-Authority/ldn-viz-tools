import { colorTokenNameToRGBArray } from '@ldn-viz/ui';

/**
 * Foo
 *
 * @component
 */

export const mapStyles = {
	border: {
		// was git s['800'] in some maps
		primary: (currentThemeVal) => ({
			stroked: true,
			getLineColor: colorTokenNameToRGBArray('container.inverse.level-0', currentThemeVal),
			lineWidthScale: 10,
			lineWidthMinPixels: 4
		}),

		// was colors.core.grey['600'] in some maps
		secondary: (currentThemeVal) => ({
			stroked: true,
			getLineColor: colorTokenNameToRGBArray('container.inverse.level-2', currentThemeVal),
			lineWidthScale: 5,
			lineWidthMinPixels: 2
		}),

		// was colors.core.grey['500'] in some maps
		tertiary: (currentThemeVal) => ({
			stroked: true,
			getLineColor: colorTokenNameToRGBArray('container.inverse.level-3', currentThemeVal),
			lineWidthScale: 2,
			lineWidthMinPixels: 1
		})
	},

	outlines: {
		thin: (currentThemeVal) => ({
			stroked: true,
			getLineColor: colorTokenNameToRGBArray('text.inverse.primary', currentThemeVal),
			lineWidthScale: 1,
			lineWidthMinPixels: 0
		}),

		thick: (currentThemeVal) => ({
			stroked: true,
			getLineColor: colorTokenNameToRGBArray('text.inverse.primary', currentThemeVal),
			lineWidthScale: 2,
			lineWidthMinPixels: 1
		})
	},

	fill: {
		transparent: {
			filled: true,
			getFillColor: [0, 0, 0, 0]
		}
	}
};
