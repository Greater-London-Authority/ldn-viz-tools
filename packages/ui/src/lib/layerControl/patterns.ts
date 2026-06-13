export const patterns = {
	patternURL:
		'https://raw.githubusercontent.com/visgl/deck.gl/master/examples/layer-browser/data/pattern.png',

	// N.B. this can't be determined from the pattern atlas alone, as there may be blank/unused pixels
	// to the right or bottom of the pattern swatches. Ignoring these would cause incorrect scaling, and mis-alignment.
	patternImageWidth: 256,
	patternImageHeight: 256,

	atlas: {
		'hatch-1x': {
			x: 4,
			y: 4,
			width: 120,
			height: 120,
			mask: true
		},
		'hatch-2x': {
			x: 132,
			y: 4,
			width: 120,
			height: 120,
			mask: true
		},
		'hatch-cross': {
			x: 4,
			y: 132,
			width: 120,
			height: 120,
			mask: true
		},
		dots: {
			x: 132,
			y: 132,
			width: 120,
			height: 120,
			mask: true
		}
	}
};

export type PatternDefinitions = typeof patterns;
