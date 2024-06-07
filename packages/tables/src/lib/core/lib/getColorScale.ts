import ldnColors from '@ldn-viz/themes/colors.json';
import chroma from 'chroma-js';

interface ColorScale {
	count: number;
	inverted?: boolean;
	colors?: [];
	even?: boolean;
}

export const getColorScale = function (
	{
		count = 5,
		inverted = false,
		colors = inverted
			? [ldnColors.core.red[50], ldnColors.core.red[500], ldnColors.core.red[700]]
			: [ldnColors.core.blue[50], ldnColors.core.blue[500], ldnColors.core.blue[700]],
		even = false
	} = {} as ColorScale
) {
	let colorArray = [];

	if (even) {
		// return perceptually even, bezier interpolated colours from chroma.js
		colorArray = chroma.bezier(colors).scale().correctLightness().colors(count);
	} else {
		// just return regular interpolated, unadjusted brightness colours from chroma.js
		colorArray = chroma.scale(colors).colors(count);
	}

	return colorArray;
};
