import { theme } from '@ldn-viz/ui';
import { getColorRamp } from '@ldn-viz/utils';
import type { PlotOptions, ScaleType } from '@observablehq/plot';

// Fields common to all chart types.
interface BaseChartOptions {
	/********************************************/
	/* Definitions of the structure of the data */
	/********************************************/
	/**
	 * Type of the `xd` variable.
	 */
	type: 'character' | 'date' | 'integer';

	/**
	 * Specific type of date that `xd` is (if it is a date).
	 */
	timeperiod_type:
		| 'Monthly' /* e.g., 2019-06-30  - all last day of a month*/
		| 'monthly' /* e.g. 2024-09-09 - these all have a day of week = month of year */
		| 'Quarter' /* e.g. 2024-07-01 - all first day of a quarter (the month is 01/04/07/10)*/
		| 'Annual' /* e.g., 2011-01-01 - first of jan*/
		| 'Bi-annual' /* e.g., 2002-07-01 1st of Jan or July */
		| 'Academic Year' /* e.g. 2021-09-01  all 1st September*/
		| 'Financial Year' /* e.g. 2020-04-01 - 1st of April */
		| 'Three Year Average' /* e.g. 2019-01-01 - all 1st of Jan*/
		| '12-month period' /* assorted dates, depending on dataset */
		| 'TfL Period' /* monthly, but on irregular dates? */
		| 'year' /* e.g., 2014  */
		| 'Multi-year period' /* xd is not actually a date */
		| null;

	/*************************************************/
	/* Definitions of how the data should be plotted */
	/*************************************************/
	/**
	 * If `true`, force 0 to be included in the domain of the y-axis.
	 */
	includeZero?: boolean;

	/**
	 * Indicates that scale doesn't start at 0, but crosses 0, so that we need to draw a rule at y=0.
	 * In principle, we could determine this automatically.
	 */
	includeZeroLine?: boolean;

	/**
	 * Value of insetRight to override default (e.g., to increase space for line labels to the right of the chart).
	 */
	insetRight?: number;

	/**
	 * Value of insetLeft to override default (to tweak amount of space for x-axis labels).
	 * This is awkward to set automatically, because the amount of space present when insetLeft=0 depends on whether or not the first axis tick is labelled.
	 */
	insetLeft?: number;

	/**
	 * Value of insetTop to override default.
	 */
	insetTop?: number;

	/**
	 * Format string used for labelling ticks on the y-axis.
	 */
	ytickformat: string | null;

	/**
	 * Overrides for the extent of the y-axis as [min, max].
	 */
	yDomain?: [number | undefined, number | undefined];

	/**
	 * Overrides for the ordering of bars.
	 */
	x_order: string | null;

	/**
	 * Override for x-axis. This is used mostly to ensure that there is always an x-axis tick and gridline to the left of the first datapoint.
	 * (doing this automatically by finding the extent and then adjusting by a scale interval is more awkward for this axis as we are working with dates rounded to different resolutions)
	 */
	xDomain?: [Date, Date] | [number, number];

	indexLine?: number;

	/**
	 * Override d3-format string for data values in tooltips.
	 * If unset, tooltips inherit `ytickformat` so axis and tooltip match.
	 * Set this when you need tooltip precision to differ from the axis
	 * (e.g. axis uses `.2s` but tooltip should show the full `",.0f"`).
	 */
	tooltipFormatValue?: string;

	/**
	 * Override d3-time-format string for dates in tooltips.
	 */
	tooltipFormatDate?: string;

	/**
	 * If `true`, then chart is faceted.
	 */
	faceted?: boolean;

	facetOrder?: string[];

	/**
	 * Sets the `type` of the x scale. Can be set to `'band'` to silence warnings when ObservablePlot thinks a date or numeric scale should be applied to the x-axis.
	 */
	xScaleType?: ScaleType;

	/**
	 * This is not the number of ticks that *should* be drawn, but rather an indication of how many ObservablePlot chooses to draw, used to determine the y-axis overhangs.
	 */
	numTicks?: number;

	/**
	 * Can be used to override color scale.
	 */
	colorScale?: {
		domain: (number | string)[];
		range: string[];
	};

	height?: number;

	/**
	 * If `true`, force the display of color legend even if there is only one color; useful for faceted charts.
	 * (if no color legend present, charts aren't in a <figure> element and aren't combined into a single SVG when exported)
	 */
	showColorLegend?: boolean;

	/**
	 * Function that returns extra marks to be rendered as annotations for this specific chart.
	 * N.B. Currently only supported by `lineChart` and `lineChartWithLineStyles`, but should be supported by all.
	 */
	extraMarks?: (args: ExtraMarksArgs) => any;
}

export interface LineChartOptions extends BaseChartOptions {
	chartType: 'line';

	/**
	 * Horizontal reference lines/rules to draw.
	 */
	reference_lines?: { label: string; y: number; strokeDasharray?: string }[];

	/**
	 * List values of `b` for which rows of data should be hidden.
	 */
	hide?: string[];

	/**
	 * Per-series pixel offsets for end-of-line labels, keyed by series name (`b`).
	 * Use to nudge labels apart when two lines end at similar y-values.
	 * Example: { "London": { dy: -6 }, "England": { dy: 6 } }
	 */
	labelNudges?: Record<string, { dx?: number; dy?: number }>;

	/**
	 * Max width for end-of-line labels, in approximate em units (characters per line).
	 * When set, labels wrap onto multiple lines instead of overflowing.
	 * Prefer raising `insetRight` first; use this when horizontal space is tight.
	 * Example: 10  -> wraps "3-month moving average" to two lines.
	 */
	labelLineWidth?: number;

	/**
	 * If `true`, end-of-line labels on line charts are auto-spaced using
	 * Observable Plot's `dodgeY` transform instead of the manual `labelNudges`
	 * branch. Opt-in per chart so we can A/B the two approaches.
	 */
	autoDodgeLabels?: boolean;
}

export interface LineChartWithLineStylesOptions extends BaseChartOptions {
	chartType: 'lineChartWithLineStyles';

	/**
	 * Horizontal reference lines/rules to draw.
	 */
	reference_lines?: { label: string; y: number; strokeDasharray?: string }[];
}

export interface BarChartHorizontalOptions extends BaseChartOptions {
	chartType: 'barChartHorizontal';

	/**
	 * Value of marginLeft to override default (e.g., to give long y-axis category labels more room).
	 */
	marginLeft?: number;
}

export interface BarChartHorizontalGroupedOptions extends BaseChartOptions {
	chartType: 'barChartHorizontalGrouped';

	/**
	 * Value of marginLeft to override default (e.g., to give long y-axis category labels more room).
	 */
	marginLeft?: number;

	/**
	 * Pipe-delimited order for the **inner** bar category (the `b` series) on
	 * grouped horizontal bar charts. Useful when `x_order` is already taken by
	 * the facet axis and a non-alphabetical inner order is needed.
	 * Example: "in remediation programme|remediation underway|remediation complete"
	 */
	y_order?: string;
}

export interface BarChartStackedTimeseriesOptions extends BaseChartOptions {
	chartType: 'barChartStackedTimeseries';

	/**
	 * Time interval of bars in `barChartStackedTimeseries` plot.
	 */
	xInterval?: string;
}

export interface PairedDotplotOptions extends BaseChartOptions {
	chartType: 'pairedDotPlot';

	/**
	 * The pair of values being compared by the paired dot-plot chart.
	 */
	compareValues?: [string, string];
}

// Chart types that need no fields beyond BaseChartOptions.
export interface CoreChartOptions extends BaseChartOptions {
	chartType:
		| 'barChartVertical'
		| 'barChartVerticalGrouped'
		| 'barChartStacked'
		| 'histogram'
		| 'incomeSlope'
		| 'slopeChart'
		| 'boroughChoropleth';
}

export type ChartOptions =
	| LineChartOptions
	| LineChartWithLineStylesOptions
	| BarChartHorizontalOptions
	| BarChartHorizontalGroupedOptions
	| BarChartStackedTimeseriesOptions
	| PairedDotplotOptions
	| CoreChartOptions;

export type ChartDataRow = {
	/**
	 * The name of the dataset (a short name used as an identifier, rather than longer display name).
	 */
	dataset?: string;

	/**
	 * The primary variable (usually a date, but sometimes a categorical variable if dataset is not a time-series)
	 */
	xd: string | number | Date;

	/*
	 * First categorical variable.
	 */
	b: string;

	/**
	 * Numerical value.
	 */
	y: number;

	/**
	 * Secondary categorical value.
	 */
	z2?: string;
	[key: string]: unknown;
};

export type ColorChoice = {
	type?: ScaleType;
	domain?: string[];
	range?: string[];
};

export type ChartGenerator = (
	options: ChartOptions,
	data: ChartDataRow[],
	colorChoice: ColorChoice,
	width: number
) => PlotOptions;

type ExtraMarksArgs = {
	Plot: typeof import('@ldn-viz/charts').Plot;
	options: ChartOptions;
	colorChoice: ColorChoice;
	data: ChartDataRow[];
	makeTooltip: (
		options: Pick<ChartOptions, 'tooltipFormatValue' | 'ytickformat' | 'tooltipFormatDate'>
	) => (d: ChartDataRow) => string;
};

export const chartOptions: Record<string, ChartOptions> = {
	/** Demography **/
	total_population_year: {
		chartType: 'line',
		type: 'date',
		ytickformat: '.2s',
		x_order: null,
		timeperiod_type: 'Annual'
	},

	population_age_structure: {
		chartType: 'line',
		type: 'integer',
		ytickformat: '.0f',
		x_order: null,
		timeperiod_type: 'Annual',
		insetRight: 160,
		includeZero: true
	},

	annual_change_component: {
		chartType: 'line',
		type: 'date',
		ytickformat: '.1s',
		x_order: null,
		timeperiod_type: 'Annual',
		includeZeroLine: true,
		numTicks: 3
	},

	annual_births: {
		chartType: 'line',
		type: 'date',
		ytickformat: '.1s',
		x_order: null,
		timeperiod_type: 'Bi-annual',
		includeZero: true,
		numTicks: 3
	},

	births_age_mother: {
		chartType: 'line',
		type: 'date',
		ytickformat: '.1s',
		x_order: null,
		timeperiod_type: 'Annual',
		includeZeroLine: true,
		numTicks: 4
	},

	births_mothers_cob: {
		chartType: 'line',
		type: 'date',

		ytickformat: '.1s',
		x_order: null,
		timeperiod_type: 'Annual',
		includeZero: true
	},

	total_fertility_rate: {
		chartType: 'line',
		type: 'date',
		ytickformat: '.1f',
		x_order: null,
		timeperiod_type: 'Annual',
		includeZeroLine: true
	},

	/** Economy ***/
	annual_gva_growth: {
		chartType: 'line',
		type: 'date',
		ytickformat: '.0%',
		tooltipFormatValue: '.1%',
		x_order: null,
		timeperiod_type: 'Annual',
		includeZeroLine: true,
		labelNudges: {
			London: { dy: -6 },
			UK: { dy: 6 }
		},
		insetLeft: 50,
		insetRight: 60,
		xDomain: [new Date('1995-01-01'), new Date('2025-01-01')],

		extraMarks: ({ Plot, options, colorChoice, data, makeTooltip }) =>
			Plot.dot(
				data.filter((d) => d.z2 === 'GLAE'),
				{
					x: 'xd',
					y: 'y',

					fx: options.faceted ? 'z2' : undefined,

					stroke: 'none',
					strokeWidth: 2,
					fill: 'b',
					fillOpacity: 1,
					r: 5,

					title: makeTooltip(options),
					tip: 'xy',
					sort: (d: ChartDataRow) => -(colorChoice.domain ?? []).indexOf(d.b), // N.B. by default "lines are drawn in input order"
					strokeDasharray: '3,3'
				}
			)
	},

	gva_per_hour_worked_rhc: {
		chartType: 'line',
		type: 'date',
		ytickformat: '.0f',
		tooltipFormatValue: '.1f',
		x_order: null,
		timeperiod_type: 'Annual',
		insetRight: 60,
		insetLeft: 35,
		numTicks: 3
	},

	gva_composition: {
		chartType: 'barChartHorizontal',
		type: 'character',
		ytickformat: '.0%',
		tooltipFormatValue: '.1%',

		x_order:
			'Transport and storage|Human health and \nsocial work|Construction|Accommodation \nand food services|Arts and \nentertainment|Real estate \nactivities|Wholesale and retail|Financial and \ninsurance activities|Manufacturing|Administrative and \nsupport service activities|Professional and \ntechnical activities|Education|Information and \ncommunication',
		timeperiod_type: 'Annual',
		includeZero: true,
		insetRight: 5,
		marginLeft: 180
	},

	bbc: {
		chartType: 'line',
		type: 'date',
		ytickformat: '.0s',
		tooltipFormatValue: '.3s',
		x_order: null,
		timeperiod_type: 'Quarter',
		includeZero: true,
		insetRight: 60,
		insetLeft: 40,
		xDomain: [new Date('2017-01-01'), new Date('2026-01-01')]
	},

	bus_con: {
		chartType: 'line',
		type: 'date',
		ytickformat: '.0f',
		tooltipFormatValue: '.1f',

		x_order: null,
		timeperiod_type: 'Monthly',
		includeZeroLine: true,
		insetRight: 160,
		labelNudges: {
			London: { dy: -10 },
			'Business Activity': { dy: -8 },
			'New Business': { dy: +8 }
		},
		insetLeft: 40,
		yDomain: [-40, 40]
	},

	income_inequality: {
		chartType: 'incomeSlope',
		type: 'character',
		ytickformat: ',.2r',
		tooltipFormatValue: '$,.0f',
		x_order: null,
		timeperiod_type: 'Quarter',
		includeZero: true,
		yDomain: [0, 2000]
	},

	emp: {
		chartType: 'line',
		type: 'date',
		ytickformat: '.0%',
		tooltipFormatValue: '.1%',

		x_order: null,
		timeperiod_type: 'Quarter',
		insetLeft: 40,
		numTicks: 2
	},

	extended_unemployment: {
		chartType: 'barChartStackedTimeseries',
		type: 'date',
		ytickformat: '.0%',
		tooltipFormatValue: '.1%',

		x_order: null,
		timeperiod_type: '12-month period',
		includeZero: true,
		xInterval: 'quarter',
		insetRight: 20,
		insetLeft: 40,
		yDomain: [0, 0.12]
	},

	jq_score: {
		chartType: 'barChartHorizontalGrouped',
		type: 'character',
		ytickformat: '.0%',
		tooltipFormatValue: '.1%',

		yDomain: [0, 1],
		x_order:
			'Average job quality indicator|Desired contract|Not on zero hours contract|Satisfactory hours|No unpaid overtime|Not in low pay|Positive employee involvement|Positive career progression',
		timeperiod_type: 'Multi-year period',
		includeZero: true
	},

	increased_footfall: {
		chartType: 'barChartVerticalGrouped',
		type: 'character',
		ytickformat: '.0%',
		tooltipFormatValue: '.1%',

		yDomain: [0, 0.6],
		x_order: null,
		timeperiod_type: 'Annual',
		includeZero: true
	},

	hs_spend: {
		chartType: 'barChartVerticalGrouped',
		type: 'character',
		ytickformat: '.0%',
		tooltipFormatValue: '.1%',

		yDomain: [0, 0.6],
		x_order: null,
		timeperiod_type: 'Annual',
		includeZero: true
	},

	hs_increased_purchases: {
		chartType: 'barChartVerticalGrouped',
		type: 'character',
		ytickformat: '.0%',
		tooltipFormatValue: '.1%',

		yDomain: [0, 0.6],
		x_order: null,
		timeperiod_type: 'Annual',
		includeZero: true
	},

	vacancy_rate: {
		chartType: 'histogram',
		faceted: true,
		type: 'date',
		ytickformat: null,
		x_order: null,
		timeperiod_type: 'Annual',
		insetLeft: 40,
		yDomain: [0, 120],
		xDomain: [0, 0.5555555820465088]
	},

	/**  global city and culture **/
	gc_fdi_capex: {
		chartType: 'line',
		type: 'date',
		ytickformat: ',.0f',
		x_order: null,
		timeperiod_type: 'Quarter',
		includeZero: true,
		facetOrder: ['Projects', 'Capex'],
		insetRight: 60,
		insetLeft: 60,
		showColorLegend: true
	},

	gc_int_visitor_nights: {
		chartType: 'barChartStacked',
		type: 'character',
		ytickformat: '.0f',
		tooltipFormatValue: '.1f',

		yDomain: [0, 200],
		x_order: null,
		timeperiod_type: 'Annual',
		includeZero: true,
		xScaleType: 'band'

		// /insetLeft: 40
	},

	gc_visitor_spend: {
		chartType: 'barChartStacked',
		type: 'character',
		ytickformat: ',.0f',
		x_order: null,
		timeperiod_type: 'Annual',
		xScaleType: 'band',
		includeZero: true,
		yDomain: [0, 25000]
	},

	gc_int_vist_ldn: {
		chartType: 'line',
		type: 'date',
		ytickformat: '.0f',
		tooltipFormatValue: '.1f',

		x_order: null,
		timeperiod_type: 'Annual',
		includeZero: true,
		insetRight: 55,
		insetLeft: 40
	},

	gc_physical_engagement_arts: {
		chartType: 'line',
		type: 'character',
		ytickformat: '.0%',
		tooltipFormatValue: '.1%',

		x_order: null,
		timeperiod_type: 'Financial Year',
		includeZero: true,
		labelNudges: {
			London: { dy: +8 },
			England: { dy: -8 }
		},

		insetLeft: -50,
		insetRight: 45
	},

	gc_digital_engagement_arts: {
		chartType: 'line',
		type: 'character',
		ytickformat: '.0%',
		tooltipFormatValue: '.1%',
		x_order: null,
		timeperiod_type: 'Financial Year',
		includeZero: true,
		labelNudges: {
			London: { dy: -2 },
			England: { dy: +2 }
		},
		insetLeft: -50,
		insetRight: 45
	},

	/** Skills */
	neets: {
		chartType: 'line',
		type: 'date',
		ytickformat: '.0%',
		x_order: null,
		timeperiod_type: 'Annual',
		includeZero: true,
		tooltipFormatDate: '%Y',
		tooltipFormatValue: '.1%',
		insetRight: 60,
		insetLeft: 40
	},

	level3: {
		chartType: 'line',
		type: 'date',
		ytickformat: '.0%',
		yDomain: [0, 1],
		x_order: null,
		timeperiod_type: 'Annual',
		includeZero: true,
		tooltipFormatDate: '%Y',
		tooltipFormatValue: '.1%',
		insetRight: 60,
		insetLeft: 40
	},

	grad_outcomes: {
		chartType: 'line',
		type: 'character',
		ytickformat: '.0%',
		yDomain: [0, 1],
		x_order: null,
		timeperiod_type: 'Academic Year',
		includeZero: true,
		insetRight: 15
	},

	fe_skills: {
		chartType: 'barChartStacked',
		type: 'character',
		ytickformat: '.0%',
		x_order: null,
		timeperiod_type: 'Academic Year',
		includeZero: true,
		insetRight: 30,
		yDomain: [0, 0.8]
	},

	emp_prof: {
		chartType: 'line',
		type: 'date',
		ytickformat: '.0%',
		x_order: null,
		timeperiod_type: 'Annual',
		includeZero: true,
		tooltipFormatDate: '%Y',
		tooltipFormatValue: '.1%',
		insetRight: 60,
		insetLeft: 40
	},

	skills_short: {
		chartType: 'line',
		type: 'date',
		ytickformat: '.0%',
		x_order: null,
		timeperiod_type: 'Annual',
		includeZero: true,
		tooltipFormatDate: '%Y',
		tooltipFormatValue: '.0%',
		insetRight: 60,
		insetLeft: 45
	},

	bus_train: {
		chartType: 'line',
		type: 'date',
		ytickformat: '.0%',
		yDomain: [0, 0.82],
		x_order: null,
		timeperiod_type: 'Annual',
		includeZero: true,
		labelNudges: {
			London: { dy: 10 },
			England: { dy: -10 }
		},
		tooltipFormatDate: '%Y',
		tooltipFormatValue: '.0%',
		insetRight: 60,
		insetLeft: 50
	},

	job_posts: {
		chartType: 'line',
		type: 'date',
		ytickformat: '.0s',
		tooltipFormatValue: '.3s',

		x_order: null,
		timeperiod_type: 'Monthly',
		includeZero: true,
		labelLineWidth: 10,
		labelNudges: {
			'Raw count': { dy: -8 },
			'3-month moving average': { dy: 8 }
		},
		colorScale: {
			range: [theme.tokenNameToValue('data.primary'), theme.tokenNameToValue('data.context')],
			domain: ['3-month moving average', 'Raw count']
		},
		insetRight: 120,
		insetLeft: 50,
		xDomain: [new Date('2019-01-01'), new Date('2026-03-01')]
	},

	top_skills_common: {
		type: 'character',
		ytickformat: '.0%',
		tooltipFormatValue: '.1%',
		x_order: '<keep>',
		timeperiod_type: 'Annual',
		includeZero: true,

		chartType: 'pairedDotPlot',
		insetLeft: 150,
		insetRight: 10,
		compareValues: ['Jan-Mar 2019', 'Jan-Mar 2026']
	},

	top_skills_technical: {
		type: 'character',
		ytickformat: '.0%',
		tooltipFormatValue: '.1%',
		x_order: '<keep>',
		timeperiod_type: 'Annual',

		chartType: 'pairedDotPlot',
		insetLeft: 235,
		insetRight: 10,

		includeZero: true,
		xDomain: [0, 0.1],
		compareValues: ['Jan-Mar 2019', 'Jan-Mar 2026']
	},

	/* Social justice */
	strugg: {
		chartType: 'line',
		type: 'date',
		ytickformat: '.0%',
		tooltipFormatValue: '.1%',
		x_order: null,
		timeperiod_type: 'monthly',
		includeZero: true,
		insetRight: 60,
		insetLeft: 50
	},

	med_hhi: {
		chartType: 'line',
		type: 'date',
		ytickformat: '.0%',
		tooltipFormatValue: '.1%',
		x_order: null,
		timeperiod_type: 'Financial Year',
		includeZero: true,
		insetRight: 35,
		insetLeft: 20
	},

	bills_arrears: {
		chartType: 'line',
		type: 'character',
		ytickformat: '.0%',
		tooltipFormatValue: '.1%',
		x_order: null,
		timeperiod_type: 'Financial Year',
		includeZero: true,
		insetRight: 20
	},

	food_sec: {
		chartType: 'barChartStacked',
		type: 'character',
		ytickformat: '.0%',
		xScaleType: 'band',
		x_order: null,
		timeperiod_type: '12-month period',
		facetOrder: ['London', 'UK'],
		includeZero: true,
		yDomain: [0, 0.15],
		height: 300
	},

	unfair: {
		chartType: 'barChartVertical',
		type: 'character',
		ytickformat: '.0%',

		x_order: null,
		timeperiod_type: 'Financial Year',
		includeZero: true,
		xScaleType: 'band',
		yDomain: [0, 0.4]
	},

	hate_crimes: {
		chartType: 'line',
		type: 'date',
		ytickformat: ',.0f',

		x_order: null,
		timeperiod_type: 'Monthly',
		includeZero: true,
		insetRight: 60,
		insetLeft: 50,
		xDomain: [new Date('2024-01-01'), new Date('2026-03-01')]
	},

	pay_gap_gender: {
		chartType: 'line',
		type: 'date',
		ytickformat: '.0%',
		tooltipFormatValue: '.1%',

		x_order: null,
		timeperiod_type: 'Annual',
		includeZero: true,
		insetRight: 60,
		insetLeft: 40,
		xDomain: [new Date('1995-01-01'), new Date('2025-01-01')]
	},

	pay_gap_ethnicity: {
		chartType: 'line',
		type: 'date',
		ytickformat: '.0%',
		tooltipFormatValue: '.1%',

		x_order: null,
		timeperiod_type: 'Annual',
		includeZero: true,
		insetRight: 70,
		insetLeft: 40,
		xDomain: [new Date('2017-01-01'), new Date('2025-01-01')]
	},

	pay_gap_disability: {
		chartType: 'line',
		type: 'date',
		ytickformat: '.0%',
		tooltipFormatValue: '.1%',

		x_order: null,
		timeperiod_type: 'Annual',
		includeZero: true,
		insetRight: 130,
		insetLeft: 40,

		yDomain: [0, 0.3],

		xDomain: [new Date('2015-01-01'), new Date('2024-01-01')]
	},

	voter_reg: {
		chartType: 'line',
		type: 'date',
		ytickformat: '.0%',
		tooltipFormatValue: '.1%',

		yDomain: [0, 1],
		x_order: null,
		timeperiod_type: 'Annual',
		insetRight: 60,
		insetLeft: 50,
		includeZero: true
	},

	decision_influence: {
		chartType: 'line',
		type: 'character',
		ytickformat: '.0%',
		tooltipFormatValue: '.1%',

		x_order: null,
		timeperiod_type: 'Financial Year',
		includeZero: true,
		insetRight: 30,
		insetLeft: 15
	},

	locals: {
		chartType: 'line',
		type: 'date',
		ytickformat: '.0%',

		yDomain: [0, 1],
		x_order: null,
		timeperiod_type: 'Monthly',
		insetRight: 60,
		insetLeft: 50,
		includeZero: true,
		xDomain: [new Date('2020-01-01'), new Date('2026-01-01')]
	},

	help: {
		chartType: 'line',
		type: 'character',
		ytickformat: '.0%',
		tooltipFormatValue: '.1%',

		yDomain: [0, 1],
		x_order: null,
		timeperiod_type: 'Financial Year',
		insetRight: 30,
		insetLeft: 20,
		includeZero: true,
		labelNudges: {
			London: { dy: +6 },
			England: { dy: -6 }
		}
	},

	volunt_formal: {
		chartType: 'line',
		type: 'character',
		ytickformat: '.0%',
		tooltipFormatValue: '.1%',

		x_order: null,
		timeperiod_type: 'Financial Year',
		includeZero: true,
		insetRight: 30,
		insetLeft: 10,
		labelNudges: {
			London: { dy: -4 },
			England: { dy: +4 }
		}
	},

	volunt_informal: {
		chartType: 'line',
		type: 'character',
		ytickformat: '.0%',
		tooltipFormatValue: '.1%',

		x_order: null,
		timeperiod_type: 'Financial Year',
		includeZero: true,
		labelNudges: {
			London: { dy: -8 },
			England: { dy: 8 }
		},
		insetRight: 30,
		insetLeft: 10
	},

	social_action: {
		chartType: 'line',
		type: 'character',
		ytickformat: '.0%',
		tooltipFormatValue: '.1%',

		x_order: null,
		timeperiod_type: 'Financial Year',
		includeZero: true,
		insetRight: 30,
		insetLeft: 20
	},

	trust_neigh: {
		chartType: 'line',
		type: 'character',
		ytickformat: '.0%',
		tooltipFormatValue: '.1%',

		x_order: null,
		timeperiod_type: 'Financial Year',
		includeZero: true,
		insetRight: 30,
		insetLeft: 30
	},

	talk_neigh: {
		chartType: 'line',
		type: 'character',
		ytickformat: '.0%',
		tooltipFormatValue: '.1%',

		yDomain: [0, 1],
		x_order: null,
		timeperiod_type: 'Financial Year',
		insetRight: 30,
		insetLeft: 25,
		includeZero: true
	},

	/* Housing */
	missed_payment: {
		chartType: 'line',
		type: 'date',
		ytickformat: '.0%',
		tooltipFormatValue: '.1%',

		x_order: null,
		timeperiod_type: 'Quarter',
		includeZero: true,
		insetRight: 180,
		labelLineWidth: 14,
		insetLeft: 40
	},

	rent_affordability: {
		chartType: 'line',
		type: 'date',
		ytickformat: '.0f',
		tooltipFormatValue: '.1f',

		insetRight: 140,
		x_order: null,
		timeperiod_type: 'Monthly',
		indexLine: 100,
		insetLeft: 40,
		yDomain: [80, 160],
		xDomain: [new Date('2014-01-01'), new Date('2026-01-01')]
	},

	rent_payment: {
		chartType: 'line',
		type: 'date',
		ytickformat: '.0%',
		tooltipFormatValue: '.1%',

		x_order: null,
		timeperiod_type: 'Annual',
		includeZero: true,
		insetRight: 160,
		insetLeft: 40
	},

	hmls: {
		chartType: 'barChartStackedTimeseries',
		type: 'date',
		ytickformat: '.0s',
		tooltipFormatValue: '.3s',
		x_order: null,
		timeperiod_type: 'Quarter',
		includeZero: true,
		xInterval: 'quarter',
		yDomain: [0, 80000]
	},

	dec_homes: {
		chartType: 'line',
		type: 'date',
		ytickformat: '.0%',
		tooltipFormatValue: '.1%',
		x_order: null,
		timeperiod_type: 'Annual',
		numTicks: 3,
		insetRight: 60,
		insetLeft: 50,
		includeZero: true
	},

	cladding_remediation: {
		chartType: 'barChartHorizontalGrouped',
		type: 'character',
		ytickformat: ',.0f',
		x_order:
			'London|South East|North West|South West|East of England|West Midlands|Yorkshire and The Humber|East Midlands|North East',
		y_order: 'in programme|remediation underway|remediation complete',
		colorScale: {
			domain: ['in programme', 'remediation underway', 'remediation complete'],
			range: [
				theme.tokenNameToValue('palette.green.200'),
				theme.tokenNameToValue('palette.green.400'),
				theme.tokenNameToValue('palette.green.800')
			]
		},
		timeperiod_type: 'Annual',
		includeZero: true,
		marginLeft: 190,

		yDomain: [0, 1200]
	},

	sleep_rough: {
		chartType: 'line',
		type: 'date',
		ytickformat: '.0f',
		tooltipFormatValue: '.1s',

		x_order: null,
		timeperiod_type: 'Monthly',
		includeZero: true,
		insetLeft: 40,
		xDomain: [new Date('2020-01-01'), new Date('2026-01-01')]
	},

	roughsleeping_first_time: {
		chartType: 'line',
		type: 'date',
		ytickformat: ',.0f',
		x_order: null,
		timeperiod_type: 'Quarter',
		includeZero: true,
		insetRight: 180,
		labelLineWidth: 14,
		insetLeft: 55,
		xDomain: [new Date('2019-01-01'), new Date('2026-01-01')]
	},

	homeless_decisions: {
		chartType: 'line',
		type: 'date',
		ytickformat: ',.0f',
		x_order: null,
		timeperiod_type: 'Quarter',
		includeZero: true,
		insetRight: 160,
		labelLineWidth: 14,
		insetLeft: 60,
		xDomain: [new Date('2018-01-01'), new Date('2026-01-01')]
	},

	neighbourhood_satisfaction: {
		chartType: 'line',
		type: 'date',
		ytickformat: '.0%',
		tooltipFormatValue: '.1%',
		x_order: null,
		timeperiod_type: 'year',
		insetRight: 60,
		insetLeft: 40,
		yDomain: [0, 0.8],
		includeZero: true,
		labelNudges: {
			London: { dy: +2 },
			England: { dy: -2 }
		},
		xDomain: [new Date('2012-01-01'), new Date('2026-01-01')]
	},

	neighbourhood_belonging: {
		chartType: 'line',
		type: 'date',
		ytickformat: '.0%',
		tooltipFormatValue: '.1%',

		x_order: null,
		timeperiod_type: 'year',
		insetRight: 60,
		insetLeft: 40,

		yDomain: [0, 0.8],
		includeZero: true,
		labelNudges: {
			London: { dy: +2 },
			England: { dy: -2 }
		},
		xDomain: [new Date('2012-01-01'), new Date('2026-01-01')]
	},

	/* Environment */
	green_gas: {
		chartType: 'barChartStackedTimeseries',
		type: 'date',
		ytickformat: '.0s',
		tooltipFormatValue: '.2f',
		x_order: '<keep>',
		timeperiod_type: 'year',
		yDomain: [0, 60],
		includeZero: true
	},

	energy_performance: {
		chartType: 'line',
		type: 'date',
		ytickformat: '.0%',
		tooltipFormatValue: '.1%',

		x_order: null,
		timeperiod_type: 'Quarter',
		includeZero: true,
		insetRight: 60,
		insetLeft: 50,
		xDomain: [new Date('2008-01-01'), new Date('2026-01-01')]
	},

	renwable_energy: {
		chartType: 'line',
		type: 'date',
		ytickformat: ',.0f',
		tooltipFormatValue: ',.1f',

		x_order: null,
		timeperiod_type: 'year',
		includeZero: true,
		insetRight: 60,
		insetLeft: 60
	},

	recycling_rates: {
		chartType: 'line',
		type: 'date',
		ytickformat: '.0%',
		tooltipFormatValue: '.1%',

		x_order: null,
		timeperiod_type: 'Financial Year',
		includeZero: true,
		insetRight: 30,
		insetLeft: 10
	},

	aqno2: {
		chartType: 'line',
		type: 'date',
		ytickformat: '.0f',
		tooltipFormatValue: '.1f',

		x_order: null,
		timeperiod_type: 'year',
		yDomain: [0, 80],
		labelLineWidth: 8,

		reference_lines: [
			{ label: 'WHO limit', y: 10, strokeDasharray: '5,5' },
			{ label: 'UK limit', y: 40, strokeDasharray: '10,10' }
		],
		hide: ['UK limit', 'WHO limit'],
		includeZero: true,
		insetRight: 85,
		insetLeft: 40
	},

	aqpm25: {
		chartType: 'line',
		type: 'date',
		ytickformat: '.0f',
		tooltipFormatValue: '.1f',

		x_order: null,
		timeperiod_type: 'year',
		yDomain: [0, 25],
		labelLineWidth: 8,
		labelNudges: {
			Roadside: { dy: -8 },
			'Urban background': { dy: 8 }
		},
		reference_lines: [
			{ label: 'WHO limit', y: 5, strokeDasharray: '5,5' },
			{ label: 'UK limit', y: 20, strokeDasharray: '10,10' }
		],
		hide: ['UK limit', 'WHO limit'],
		insetRight: 85,
		insetLeft: 40,
		includeZero: true
	},

	part_of_nature: {
		chartType: 'line',
		type: 'date',
		ytickformat: '.0%',
		tooltipFormatValue: '.1%',
		x_order: null,
		timeperiod_type: 'Financial Year',
		includeZero: true,
		numTicks: 4,
		labelNudges: {
			England: { dy: -8 },
			London: { dy: 8 }
		},
		insetRight: 1,
		insetLeft: -30
	},

	aodpos: {
		chartType: 'slopeChart',
		type: 'character',
		ytickformat: '.0%',
		tooltipFormatValue: '.1%',

		x_order: '<keep>',
		timeperiod_type: 'Annual',
		includeZero: true
		//insetLeft: -140
	},

	sinc: {
		chartType: 'slopeChart',
		type: 'character',
		ytickformat: ',.0f',
		tooltipFormatValue: ',.0f',

		x_order: '<keep>',
		timeperiod_type: 'Annual',
		includeZero: true,
		insetLeft: 1,
		yDomain: [0, 40000]
	},

	heat_associated_deaths: {
		chartType: 'line',
		type: 'date',
		ytickformat: ',.0f',
		x_order: null,
		timeperiod_type: 'Annual',
		includeZero: true,
		insetRight: 60,
		insetLeft: 50
	},

	/* Crime */
	tno: {
		chartType: 'line',
		type: 'date',
		ytickformat: '.1s',
		tooltipFormatValue: ',.0f',
		includeZero: true,
		x_order: null,
		timeperiod_type: 'Annual',
		insetRight: 60,
		insetLeft: 60,
		xDomain: [new Date('2019-01-01'), new Date('2026-01-01')]
	},

	violence_with_injury: {
		chartType: 'line',
		type: 'date',
		ytickformat: ',.0f',
		x_order: null,
		timeperiod_type: 'Monthly',
		includeZero: true,
		insetRight: 80,
		insetLeft: 60,
		xDomain: [new Date('2021-01-01'), new Date('2026-01-01')]
	},

	proven_reoffending: {
		chartType: 'line',
		type: 'date',
		ytickformat: '.0%',
		tooltipFormatValue: '.1%',

		x_order: null,
		timeperiod_type: 'Annual',
		includeZero: true,
		insetRight: 80,
		insetLeft: 50,
		yDomain: [0, 0.4],
		xDomain: [new Date('2013-01-01'), new Date('2024-01-01')]
	},

	victimisation_rate: {
		chartType: 'line',
		type: 'date',
		ytickformat: '.0%',
		tooltipFormatValue: '.1%',

		x_order: null,
		timeperiod_type: 'Monthly',
		includeZero: true,
		insetRight: 60,
		insetLeft: 40
	},

	victim_satisfaction: {
		chartType: 'line',
		type: 'date',
		ytickformat: '.0%',
		tooltipFormatValue: '.1%',

		x_order: null,
		timeperiod_type: 'Quarter',
		includeZero: true,
		labelLineWidth: 12,
		insetRight: 160,
		insetLeft: 40
	},

	worried_crime_asb: {
		chartType: 'line',
		type: 'date',
		ytickformat: '.0%',
		tooltipFormatValue: '.1%',

		x_order: null,
		timeperiod_type: 'Quarter',
		labelLineWidth: 14,
		includeZero: true,
		insetRight: 170,
		labelNudges: {
			'Worried about anti-social behavior': { dy: 14 },
			'Worried about crime': { dy: -14 }
		},
		insetLeft: 40
	},

	trust_in_mps: {
		chartType: 'line',
		type: 'date',
		ytickformat: '.0%',
		tooltipFormatValue: '.1%',

		x_order: null,
		timeperiod_type: 'Annual',
		includeZero: true,
		insetRight: 60,
		insetLeft: 50
	},

	/* Transport */
	tfl_journeys: {
		chartType: 'line',
		type: 'date',
		ytickformat: '.0f',
		tooltipFormatValue: '.1f',

		x_order: null,
		timeperiod_type: 'TfL Period',
		includeZero: true,
		insetRight: 180,
		labelLineWidth: 14,
		labelNudges: {
			'TLRN vehicle kilometres': { dy: -14 },
			'London Underground journeys': { dy: 0 },
			'Bus journeys': { dy: 14 }
		},
		indexLine: 100,
		insetLeft: 40,
		xDomain: [new Date('2019-01-01'), new Date('2026-01-01')]
	},

	tfl_demand_idx: {
		chartType: 'line',
		type: 'date',
		ytickformat: '.0%',
		tooltipFormatValue: '.1%',

		x_order: null,
		timeperiod_type: 'Annual',
		includeZero: true,
		insetRight: 60,
		insetLeft: 50,
		yDomain: [0, 0.8]
	},

	tfl_active20_daily: {
		chartType: 'line',
		type: 'date',
		ytickformat: '.0%',
		tooltipFormatValue: '.1%',

		x_order: null,
		timeperiod_type: 'Financial Year',
		includeZero: true,
		insetRight: 30,
		insetLeft: 20
	},

	tfl_ksi: {
		chartType: 'line',
		type: 'date',
		ytickformat: ',.0f',
		tooltipFormatValue: ',.0f',

		x_order: null,
		timeperiod_type: 'Annual',
		includeZero: true,
		insetRight: 60,
		insetLeft: 50
	},

	tfl_sfdelay_reduction: {
		chartType: 'line',
		type: 'date',
		ytickformat: '.0%',
		tooltipFormatValue: '.1%',

		x_order: null,
		timeperiod_type: 'Annual',
		includeZero: true,
		insetRight: 60,
		insetLeft: 50
	},

	tfl_bus_speed: {
		chartType: 'line',
		type: 'date',
		ytickformat: '.0f',
		tooltipFormatValue: '.1f',

		x_order: null,
		timeperiod_type: 'Annual',
		numTicks: 3,
		indexLine: 100,
		insetRight: 60,
		insetLeft: 40
	},

	/* Children and young people */
	yr6_obesity: {
		chartType: 'lineChartWithLineStyles',
		type: 'date',
		ytickformat: '.0%',
		tooltipFormatValue: '.1%',

		x_order: null,
		timeperiod_type: 'Academic Year',
		includeZero: true,
		insetRight: 45,

		extraMarks: ({ Plot, options, colorChoice, data, makeTooltip }) =>
			Plot.text(
				[
					{
						x: '2007-08',
						y: 0.38,
						text: 'Year 6'
					},
					{
						x: '2007-08',
						y: 0.26,
						text: 'Reception'
					}
				],
				{
					x: 'x',
					y: 'y',
					text: 'text',
					textAnchor: 'start'
				}
			),

		yDomain: [0, 0.5]
	},

	sch_happ: {
		chartType: 'line',
		type: 'character',
		ytickformat: '.1f',
		//yDomain: [6.5, 7.5],
		yDomain: [0, 10],
		includeZero: true,

		x_order: null,
		timeperiod_type: 'Academic Year',
		insetRight: 15,

		labelNudges: {
			London: { dy: -8 },
			England: { dy: 8 }
		}
	},

	cyp_mental_disorder: {
		chartType: 'line',
		type: 'character',
		ytickformat: '.0f',
		tooltipFormatValue: '.1%',

		x_order: null,
		timeperiod_type: 'Academic Year',
		includeZero: true
	},

	cyp_gld: {
		chartType: 'line',
		type: 'character',
		ytickformat: '.0%',
		tooltipFormatValue: '.1%',

		x_order: null,
		timeperiod_type: 'Academic Year',
		insetRight: 30,
		includeZero: true,
		insetLeft: 10,
		labelNudges: {
			London: { dy: -2 },
			England: { dy: +2 }
		}
	},

	cyp_attainment8: {
		chartType: 'line',
		type: 'character',
		ytickformat: '.0f',
		tooltipFormatValue: '.1f',

		x_order: null,
		timeperiod_type: 'Academic Year',
		includeZero: true,
		insetRight: 30
	},

	cyp_safe: {
		chartType: 'barChartVerticalGrouped',
		type: 'character',
		ytickformat: '.0%',

		x_order: null,
		timeperiod_type: 'Annual',
		includeZero: true,
		xScaleType: 'band'
	},

	cyp_neet: {
		chartType: 'line',
		type: 'date',
		ytickformat: '.0%',
		tooltipFormatValue: '.1%',

		x_order: null,
		timeperiod_type: 'Quarter',
		includeZero: true,
		insetRight: 60,
		insetLeft: 50,
		xDomain: [new Date('2000-01-01'), new Date('2026-01-01')]
	},

	cyp_level3: {
		chartType: 'line',
		type: 'character',
		ytickformat: '.0%',
		tooltipFormatValue: '.1%',

		x_order: null,
		timeperiod_type: 'Academic Year',
		includeZero: true,
		insetRight: 30,
		insetLeft: 20
	},

	cyp_absence: {
		chartType: 'line',
		type: 'character',
		ytickformat: '.0f',
		tooltipFormatValue: '.1f',
		x_order: null,
		timeperiod_type: 'Academic Year',
		includeZero: true,
		insetRight: 35,
		insetLeft: 0
	},

	cyp_suspension: {
		chartType: 'line',
		type: 'character',
		ytickformat: '.0f',
		tooltipFormatValue: '.1f',
		x_order: null,
		timeperiod_type: 'Academic Year',
		includeZero: true,
		insetRight: 40,
		insetLeft: 10
	},

	cyp_exclusion: {
		chartType: 'line',
		type: 'date',
		ytickformat: '.2f',
		tooltipFormatValue: '.3f',
		x_order: null,
		timeperiod_type: 'Academic Year',
		includeZero: true,
		insetRight: 40,
		insetLeft: 10,
		yDomain: [0, 0.15]
	},

	/* Health */
	health_le_m: {
		chartType: 'line',
		type: 'date',
		ytickformat: '.0f',
		tooltipFormatValue: '.1f',

		x_order: null,
		timeperiod_type: 'Three Year Average',
		facetOrder: ['Female', 'Male'],
		insetRight: 60,
		insetLeft: 40,
		height: 300,
		yDomain: [75, 87]
	},

	health_hle_m: {
		chartType: 'line',
		type: 'date',
		ytickformat: '.0f',
		tooltipFormatValue: '.1f',

		x_order: null,
		timeperiod_type: 'Three Year Average',
		numTicks: 4,
		facetOrder: ['Female', 'Male'],
		insetRight: 60,
		insetLeft: 40,
		height: 300,
		yDomain: [59.8, 65.4]
	},

	inf_mort: {
		chartType: 'line',
		type: 'date',
		ytickformat: '.0f',
		tooltipFormatValue: '.1f',

		x_order: null,
		timeperiod_type: 'Three Year Average',
		includeZero: true,
		insetRight: 60,
		insetLeft: 30
	},

	lbw: {
		chartType: 'line',
		type: 'date',
		ytickformat: '.0f',
		tooltipFormatValue: '.1f',

		x_order: null,
		timeperiod_type: 'Annual',
		includeZero: true,
		numTicks: 4,
		insetRight: 60,
		insetLeft: 30
	},

	smoking: {
		chartType: 'line',
		type: 'date',
		ytickformat: '.0%',
		tooltipFormatValue: '.1%',

		x_order: null,
		timeperiod_type: 'Annual',
		includeZero: true,
		labelNudges: {
			London: { dy: 8 },
			England: { dy: -8 }
		},
		insetRight: 60,
		insetLeft: 40,
		xDomain: [new Date('2010-01-01'), new Date('2024-01-01')]
	},

	overweight_percentage: {
		chartType: 'boroughChoropleth',
		type: 'character',
		timeperiod_type: null,
		ytickformat: '.0%',
		tooltipFormatValue: '.1%',

		x_order: null,

		colorScale: {
			range: getColorRamp({
				count: 7,
				colors: [
					theme.tokenNameToValue('palette.blue.200'),
					theme.tokenNameToValue('palette.blue.500'),
					theme.tokenNameToValue('palette.blue.900')
				],
				even: true
			}),
			domain: [0.5, 0.53, 0.56, 0.59, 0.62, 0.65]
		}
	},

	anxiety_lifesat: {
		chartType: 'line',
		type: 'date',
		ytickformat: '.0f',
		tooltipFormatValue: '.1f',

		x_order: null,
		timeperiod_type: 'Financial Year',
		includeZero: true,
		numTicks: 4,
		facetOrder: ['Anxiety', 'Life Satisfaction'],
		labelNudges: {
			London: { dy: -10 },
			England: { dy: 10 }
		},
		insetRight: 30,
		insetLeft: -10
	},

	u75_m_cardio: {
		chartType: 'line',
		type: 'date',
		ytickformat: '.0f',
		tooltipFormatValue: '.1f',

		x_order: null,
		timeperiod_type: 'Three Year Average',
		includeZero: true,
		insetRight: 60,
		insetLeft: 40
	},

	u75_m_cancer: {
		chartType: 'line',
		type: 'date',
		ytickformat: '.0f',
		tooltipFormatValue: '.1f',

		x_order: null,
		timeperiod_type: 'Three Year Average',
		includeZero: true,
		insetRight: 60,
		insetLeft: 40
	},

	childhood_vacc: {
		chartType: 'line',
		type: 'character',
		ytickformat: '.0%',
		tooltipFormatValue: '.1%',

		x_order: null,
		timeperiod_type: 'Financial Year',
		labelLineWidth: 14,
		labelNudges: {
			'Rota at 12m': { dy: 10 },
			'MMR1 at 5y': { dy: -4 },
			'Hib/MenC at 5y': { dy: -10 }
		},
		reference_lines: [{ label: '95% target', y: 0.95 }],
		insetRight: 130,
		insetLeft: 40,
		yDomain: [0.67, 1]
	},

	sat_nhs: {
		chartType: 'line',
		type: 'date',
		ytickformat: '.0%',
		tooltipFormatValue: '.1%',

		x_order: null,
		timeperiod_type: 'Financial Year',
		includeZero: true,
		numTicks: 4,
		insetRight: 60,
		insetLeft: 40
	},

	usat_scs: {
		chartType: 'line',
		type: 'date',
		ytickformat: '.0%',
		tooltipFormatValue: '.1%',

		x_order: null,
		timeperiod_type: 'Financial Year',
		includeZero: true,
		insetRight: 30,
		insetLeft: 2,
		labelNudges: {
			London: { dy: +6 },
			England: { dy: -6 }
		}
	},

	/* UNSORTED or currently unused */

	gc_ldn_domint: {
		chartType: 'barChartStacked',
		type: 'character',
		ytickformat: '.0f',
		tooltipFormatValue: '.1f',

		yDomain: [0, 41],
		x_order: null,
		timeperiod_type: 'Annual',
		includeZero: true,
		xScaleType: 'band'
	}
};
