import chroma from 'chroma-js';

import { bin, extent, min, max } from 'd3-array';
import { format } from 'd3-format';

import ldnColors from '@ldn-viz/themes/colors.json';

const d3 = {
	bin,
	extent,
	format,
	min,
	max
};

export { ldnColors };

export const theme = {
	light: {
		primary: ldnColors.core.blue[500],
		secondary: ldnColors.core.darkPink[500],
		axis: ldnColors.core.grey[500],
		grid: ldnColors.core.grey[200],
		labels: ldnColors.core.grey[500],
		body: ldnColors.core.grey[500],
		headlines: ldnColors.core.grey[600],
		subHeadlines: ldnColors.core.grey[500],
		background: '#FFFFFF',
		neutral: ldnColors.core.grey[200],
		neutralB: ldnColors.core.grey[300],
		empty: ldnColors.core.grey[100]
	},
	dark: {
		primary: ldnColors.core.blue[500],
		secondary: ldnColors.core.glaPink[500],
		axis: '#FFFFFF',
		grid: ldnColors.core.grey[500],
		labels: '#FFFFFF',
		body: '#FFFFFF',
		headlines: '#FFFFFF',
		subHeadlines: '#FFFFFF',
		background: ldnColors.core.grey[600],
		neutral: ldnColors.core.grey[500],
		neutralB: ldnColors.core.grey[400],
		empty: ldnColors.core.grey[700]
	}
};

// Leave swatch/swatches/swatchGrid/asRamp/ramp

export const getColorScale = ({
	count = 5,
	colors = [ldnColors.core.blue[500], ldnColors.core.blue[200]],
	even = false
} = {}) => {
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

export const getThresholdBreaksColorsLabels = ({
	breakCount = 5, // breakCount is total target breaks in pos or neg direction (5?), so a diverging break count will have double (breakCountx2) (10?)
	extent = [0, 1], // (default min & max values in data (any order)
	anchorToZero = true, // should a pos or neg scale be anchored back to zero? So, [19,35], becomes [0,19,35], and generates a scale starting from zero
	discreteZeroBin = true, // should we give 0 it's own discrete bin (because sometimes important to show as it's own cartegory)
	offsetZeroVal = 0.001, // value to use to create artificial breaks around 0. Like -0.001, 0.001 alows 0 to fall in bin between -/+ value (no need to really change this unless using exceptionally low values in data)
	labelFormat = '.0f', // d3 format syntax, like ".0f", ".2f", ".0%", ".2f", etc // see: https://observablehq.com/@d3/d3-format
	valueAppend = '', // if using d3.format doesn't work (usually because values are not suitable for % (already scaled by 100))
	valuePrepend = '', // if need to add char ahead of value like "~" or "x" etc
	colors = {
		pos: {
			low: ldnColors.core.blue[200],
			high: ldnColors.core.blue[800]
		},
		neg: {
			low: ldnColors.core.red[200],
			high: ldnColors.core.red[800]
		},
		neutral: ldnColors.core.grey[100]
	},
	even = true // chromas.js perceptually even scales
} = {}) => {
	const labelNumFormat = d3.format(labelFormat);
	const thresholdObj = { breaks: [], colors: [], labels: [] };
	let scaleType; // pos(1,2,3), neg(-3-2,-1), dvg(-3,-2,-1,0,1,2,3)
	const preVal = valuePrepend;
	const postVal = valueAppend;

	// anchor to zero (add zero val into data)
	if (anchorToZero) {
		extent.push(0); // drop a zero into extent array
	}

	const minVal = d3.min(extent);
	const maxVal = d3.max(extent);

	// establish if positive, negative or diverging scale type
	if (minVal < 0 && maxVal <= 0) {
		scaleType = 'neg';
	} else if (minVal < 0 && maxVal > 0) {
		scaleType = 'dvg';
	} else {
		scaleType = 'pos';
	}

	// adjust breakCount for unbalanced diverging scale
	if (scaleType == 'dvg') {
		// the more balanced the divergence, the closer to doubling the number of breaks (5+5)
		// the more unbalanced (pos or neg) the closer to original breaks (1+5), or (5+1)
		const absMinMaxExtent = d3.extent([Math.abs(minVal), Math.abs(maxVal)]);
		// calc pos/neg differnece ratio, but no lower than 0.5 (so granular enough to end up with some neg breaks)
		const minMaxRatio = Math.max(0.5, absMinMaxExtent[0] / absMinMaxExtent[1]);
		breakCount = Math.round(breakCount + breakCount * minMaxRatio);
	}

	// create breakCount x bins of values
	const bin = d3.bin().thresholds(breakCount);
	const binnedVals = bin(extent);
	let binXType = 'x0';
	let binLen = binnedVals.length;

	// simple
	binXType = 'x1'; // higher edge of bin
	binLen = binnedVals.length - 1;

	// prepend zeroBin if needed
	if (scaleType == 'pos' && discreteZeroBin) {
		thresholdObj.breaks.push(offsetZeroVal);
	}

	// loop through each bin
	for (let b = 0; b < binLen; b++) {
		let binX = binnedVals[b][binXType];
		// push in double offsetZeroVal in dvg+discreteZeroBin scale, or just regular push
		if (scaleType == 'dvg' && binX == 0 && discreteZeroBin) {
			// need to create slighlty offset (from 0) break(s)
			thresholdObj.breaks.push(-offsetZeroVal);
			thresholdObj.breaks.push(offsetZeroVal);
		} else {
			thresholdObj.breaks.push(binX);
		}
	}

	// append zeroBin if needed
	if (scaleType == 'neg' && discreteZeroBin && anchorToZero) {
		thresholdObj.breaks[thresholdObj.breaks.length - 1] = -offsetZeroVal;
	}

	// build up neg / 0 / pos color array
	let posNegVal = 0;
	if (discreteZeroBin) {
		posNegVal = offsetZeroVal;
	}
	const negBreaks = thresholdObj.breaks.filter(function (value) {
		return value < -posNegVal;
	});
	const posBreaks = thresholdObj.breaks.filter(function (value) {
		return value > posNegVal;
	});
	const posNegMaxBreaks = Math.max(negBreaks.length, posBreaks.length);
	const maxColorsNeeded = posNegMaxBreaks + 1;
	const negColorsNeeded = negBreaks.length + 1;
	const posColorsNeeded = posBreaks.length + 1;

	// generate reference colour ramps (at max length)
	const negRefRamp = getColorScale({
		colors: [colors.neg.low, colors.neg.high],
		count: maxColorsNeeded,
		even: even
	});
	const posRefRamp = getColorScale({
		colors: [colors.pos.low, colors.pos.high],
		count: maxColorsNeeded,
		even: even
	});

	const negRampSlice = negRefRamp.slice(0, negColorsNeeded).reverse();
	const posRampSlice = posRefRamp.slice(0, posColorsNeeded);

	// build up array of colors
	if (negRampSlice.length > 0 && (scaleType == 'dvg' || scaleType == 'neg')) {
		// bit hacky, but works (fixes issue of single neg break not appearing)
		thresholdObj.colors = thresholdObj.colors.concat(negRampSlice);
	}
	if (discreteZeroBin) {
		thresholdObj.colors = thresholdObj.colors.concat([colors.neutral]);
	}
	if (posRampSlice.length > 0 && (scaleType == 'dvg' || scaleType == 'pos')) {
		thresholdObj.colors = thresholdObj.colors.concat(posRampSlice);
	}

	// add labels
	for (let c = 0; c < thresholdObj.colors.length; c++) {
		const bandLower = c > 0 ? thresholdObj.breaks[c - 1] : null;
		const bandUpper = c < thresholdObj.breaks.length ? thresholdObj.breaks[c] : null;
		let newLabel = '';
		// reformat artificial "-0.001" or "0.001" bands as "0"
		if (discreteZeroBin) {
			if (bandLower == -offsetZeroVal && bandUpper != offsetZeroVal) {
				newLabel = '0' + postVal + ' to ' + preVal + labelNumFormat(bandUpper) + postVal;
			} else if (bandLower != -offsetZeroVal && bandUpper == offsetZeroVal) {
				newLabel = preVal + labelNumFormat(bandLower) + postVal + ' to ' + preVal + '0' + postVal;
			}
			if (bandLower == -offsetZeroVal && bandUpper == offsetZeroVal) {
				newLabel = preVal + '0' + postVal;
			} else {
				// standard "a to b" label
				newLabel =
					preVal +
					labelNumFormat(bandLower) +
					postVal +
					' to ' +
					preVal +
					labelNumFormat(bandUpper) +
					postVal;
			}
		} else {
			// standard "a to b" label
			newLabel =
				preVal +
				labelNumFormat(bandLower) +
				postVal +
				' to ' +
				preVal +
				labelNumFormat(bandUpper) +
				postVal;
		}

		if (scaleType == 'pos') {
			if (c == 0) {
				if (discreteZeroBin) {
					newLabel = preVal + '0' + postVal;
				} else {
					newLabel = '< ' + preVal + labelNumFormat(bandUpper) + postVal;
				}
			} else if (c == thresholdObj.colors.length - 1) {
				newLabel = preVal + labelNumFormat(bandLower) + postVal + '+';
			}
		} else if (scaleType == 'neg') {
			if (c == 0) {
				newLabel = '< ' + preVal + labelNumFormat(bandUpper) + postVal;
			} else if (c == thresholdObj.colors.length - 1) {
				// newLabel = bandLower;
				if (discreteZeroBin) {
					newLabel = preVal + '0' + postVal;
				} else {
					newLabel = preVal + labelNumFormat(bandLower) + postVal + '+';
				}
			}
		} else if (scaleType == 'dvg') {
			if (c == 0) {
				newLabel = '< ' + preVal + labelNumFormat(bandUpper) + postVal;
			} else if (c == thresholdObj.colors.length - 1) {
				newLabel = preVal + labelNumFormat(bandLower) + postVal + '+';
			}
		}

		// push in new label
		thresholdObj.labels.push(newLabel);
	}
	// return breaks
	return thresholdObj;
};

console.log(getColorScale());
