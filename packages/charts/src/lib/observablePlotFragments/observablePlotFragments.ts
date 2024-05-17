import { theme } from '@ldn-viz/utils';

export const fontStack = "'Aktiv Grotesk', system-ui, sans-serif";

export const defaultStyle = {
	color: theme.light.labels,
	fontSize: '18px',
	fontFamily: fontStack,
	background: theme.light.background
};

export const defaultSize = {
	width: 1100,
	height: 600,
	marginRight: 20,
	marginLeft: 100,
	marginTop: 30,
	marginBottom: 50
};

export const defaultColor = {
	legend: true,
	swatchSize: 16,
	className: 'defaultCcolorLegendLabel',
	type: 'ordinal'
};

export const defaultXAxis = {
	label: '',
	grid: true,
	labelArrow: 'none',
	insetLeft: 80
};

export const defaultYAxis = {
	dy: -14
};

export const defaultLine = {
	stroke: theme.light.primary,
	strokeWidth: 2
};

export const defaultDashedLine = {
	...defaultLine,
	strokeDasharray: '5,5'
};

export const defaultDot = {
	stroke: theme.light.primary,
	strokeWidth: 2,
	r: 8,
	fill: 'white'
};

export const defaultArea = {
	stroke: theme.light.primary,
	strokeWidth: 0,
	fill: theme.light.primary,
	opacity: 0.2
};

export const defaultRule = {
	stroke: theme.light.axis
};

export const defaultAnnotationText = {
	fontSize: '25px',
	fill: theme.light.primary
};

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
		const options: Record<string, number | string> = {};

		for (const key of Object.keys(config.options || {})) {
			const val = config.options[key];

			if (typeof val === 'function' && optionsToConvert.includes(key)) {
				options[key] = val(entry);
			} else {
				options[key] = val;
			}
		}

		for (const key of Object.keys(config.optionsToEval || {})) {
			const val = config.optionsToEval[key];

			if (typeof val === 'function') {
				console.log('Setting', key, ' to ', val(entry));
				options[key] = val(entry);
			} else {
				options[key] = val;
			}
		}

		marks.push(config.type([entry], options));
	}

	return marks;
};
