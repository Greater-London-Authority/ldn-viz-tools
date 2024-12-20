import tokens from '@ldn-viz/themes/styles/js/theme-tokens';
import type { AxisOptions } from '@observablehq/plot';

export const fontStack = "'Inter', system-ui, sans-serif"; // TODO: swap for inter

export type ThemeMode = 'light' | 'dark';

export const getDefaultPlotStyles = (mode: ThemeMode = 'light') => ({
	defaultStyle: defaultStyle(mode),
	defaultSize,
	defaultSizeFacet,
	defaultColor,
	defaultXScale,
	defaultYScale,
	defaultGridX: defaultGridX(mode),
	defaultGridY: defaultGridY(mode),
	defaultXAxis,
	defaultYAxis,
	defaultLine: defaultLine(mode),
	defaultDashedLine,
	defaultDot: defaultDot(mode),
	defaultPoint: defaultPoint(mode),
	defaultArea: defaultArea(mode),
	defaultRule: defaultRule(mode),
	defaultTip: defaultTip(mode),
	defaultAnnotationTip: defaultAnnotationTip(mode),
	defaultAnnotationText: defaultAnnotationText(mode),
	defaultAnnotationRange: defaultAnnotationRange(mode)
});

const theme = (mode: ThemeMode = 'light') => {
	return tokens.theme[mode];
};

export const plotTheme = theme;

const defaultStyle = (mode: ThemeMode) => ({
	color: theme(mode).color.chart.label,
	fontSize: '0.875rem',
	fontFamily: fontStack,
	background: theme(mode).color.chart.background
});

const defaultSize = {
	height: 440, // opinionated approx half of full page width. 2:1 ratio
	marginLeft: 0,
	marginRight: 8,
	marginTop: 24,
	marginBottom: 52
};

const defaultSizeFacet = {
	height: 660, // opinionated normal chart height * 1.5 for additional fy height & spacing
	marginLeft: 0,
	marginBottom: 52,
	marginRight: 96, // faceted chart specific sizing
	marginTop: 40,
	fx: { padding: 0.15 },
	fy: { padding: 0.15 }
};

const defaultColor = {
	legend: true,
	swatchSize: 16,
	className: 'defaultColorLegendLabel',
	type: 'ordinal'
};

const defaultXScale = {
	grid: false,
	insetLeft: 32,
	labelAnchor: 'center',
	labelArrow: 'none'
};

const defaultYScale = {
	grid: false,
	ticks: 4,
	labelAnchor: 'top',
	labelArrow: 'none'
};

const defaultGridX = (mode: ThemeMode) => ({
	stroke: theme(mode).color.chart.grid, // this reactive var not updating reactively in chart itself (unless variable included in chart)
	strokeOpacity: 1
});

const defaultGridY = (mode: ThemeMode) => ({
	stroke: theme(mode).color.chart.grid, // this reactive var not updating reactively in chart itself (unless variable included in chart)
	strokeOpacity: 1,
	ticks: 4 // reasonable level to push nice breaks toward 3, 4 or 5
});

const defaultXAxis = <AxisOptions>{
	labelAnchor: 'center',
	labelArrow: 'none'
};

const defaultYAxis = <AxisOptions>{
	textAnchor: 'start',
	textPadding: 0,
	tickSize: 0,
	label: null, // no y label by default
	labelAnchor: 'top',
	labelArrow: 'none',
	labelOffset: 0,
	lineAnchor: 'bottom',
	dy: -8,
	dx: 8,
	ticks: 4 // this should match the ticks property passed to yScale
};

const defaultLine = (mode: ThemeMode) => ({
	stroke: theme(mode).color.data.primary,
	strokeWidth: 2
});

const defaultDashedLine = {
	...defaultLine,
	strokeDasharray: '5,5'
};

const defaultDot = (mode: ThemeMode) => ({
	// simplest mark for dense scatterplots
	stroke: null,
	fill: theme(mode).color.data.primary,
	fillOpacity: 0.7,
	strokeWidth: 0,
	r: 2
});

const defaultPoint = (mode: ThemeMode) => ({
	// larger data point mark, for highlighting a point on line etc.
	stroke: theme(mode).color.data.primary,
	fill: theme(mode).color.chart.background,
	strokeWidth: 2,
	r: 4
});

const defaultArea = (mode: ThemeMode) => ({
	stroke: theme(mode).color.data.primary,
	strokeWidth: 0,
	fill: theme(mode).color.data.primary,
	opacity: 0.2
});

const defaultRule = (mode: ThemeMode) => ({
	stroke: theme(mode).color.chart.axis
});

const defaultTip = (mode: ThemeMode) => ({
	stroke: theme(mode).color.chart.label,
	fill: theme(mode).color.chart.background,
	fillOpacity: 1,
	strokeOpacity: 1,
	fontSize: 14,
	textPadding: 6,
	pointerSize: 12
});

const defaultAnnotationTip = (mode: ThemeMode) => ({
	stroke: theme(mode).color.chart.label,
	fill: theme(mode).color.chart.background,
	fillOpacity: 0.8,
	strokeOpacity: 1,
	fontSize: 14,
	textPadding: 6,
	pointerSize: 12,
	pathFilter: '',
	dy: 0
});

const defaultAnnotationText = (mode: ThemeMode) => ({
	fontSize: 14,
	fill: theme(mode).color.chart.label,
	dx: 8,
	dy: 0
});

const defaultAnnotationRange = (mode: ThemeMode) => ({
	fill: theme(mode).color.chart.label, // this reactive var not updating reactively in chart itself (unless variable included in chart)
	opacity: 0.1
});

/**
 * One limitation of Observable Plot is that  things that we would like to be channels are options.
 * The documentation states:
 * > Not all mark options can be expressed as channels. For example, stroke can be a channel but strokeDasharray cannot.
 * > This is mostly a pragmatic limitation — it would be harder to implement Plot if every option were expressible as a channel —
 * > but it also serves to guide you towards options that are intended for encoding data.
 *
 * This is a pain when trying to do something like creating a set of text marks as annotations, and applying a different `dx`/`dy` offset to each.
 *
 * Our `preprocessOptions(data, config)` function aims to addresses the problem by creating a separate mark for each individual datum object in the data array.
 **/
type generateAnnotationsConfig = {
	/**
	 * @param val An optional filter/predicate function that can be used to ignore some data points.
	 */ filter?: (val: any) => boolean;

	/**
	 *
	 * @param data Function for the correpsonding Plot mark (e.g., `Plot.dot`)
	 */
	type: (data: any[], options: any) => any;

	/**
	 * An object of options, as accepted by the corresponding Plot mark.
	 * However, if a mark is an `option` rather than `channel`, but the specified value is a function, then the function will be evaluated for the datum.
	 * This means that you can specify `dx` as a function, without worrying about the fact the Observable Plot doesn't (currently) support this.
	 */
	options?: Record<string, number | string | ((x: any) => any)>; // any; // object with ket

	/**
	 * Additional objects, expressed as functions that will be evaluated before Plot's mark function is called.
	 * This lets you do things like `fill: (d) => (d.QuarterRev === '2019 Q4' ? 'black' : 'GDPType')`:
	 * this will be pre-processed so that plot sees either `fill: 'black'` (specifying a color constant) or `fill: 'GDPType` (speficying a field to be encoded using a color scale).
	 * If this was not pre-processed, Observable Plot would apply a color encoding to the string literatal `'GDPType'` rather than the value of the field with that name.
	 */
	optionsToEval?: Record<string, (x: any) => any>;
};

export const preprocessOptions = (data: any[], config: generateAnnotationsConfig) => {
	const marks = [];

	const optionsToConvert = ['dy', 'textAnchor'];

	for (const entry of data.filter(config.filter || (() => true))) {
		const options: Record<string, number | string | ((x: any) => any)> = {};

		for (const key of Object.keys(config.options || {})) {
			const val = config.options![key];

			if (typeof val === 'function' && optionsToConvert.includes(key)) {
				options[key] = val(entry);
			} else {
				options[key] = val;
			}
		}

		if (config.optionsToEval) {
			for (const key of Object.keys(config.optionsToEval || {})) {
				const val = config.optionsToEval[key];

				if (typeof val === 'function') {
					options[key] = val(entry);
				} else {
					options[key] = val;
				}
			}
		}

		marks.push(config.type([entry], options));
	}

	return marks;
};
