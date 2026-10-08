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
	x_order?: string | null;

	/**
	 * Override for x-axis. This is used mostly to ensure that there is always an x-axis tick and gridline to the left of the first datapoint.
	 * (doing this automatically by finding the extent and then adjusting by a scale interval is more awkward for this axis as we are working with dates rounded to different resolutions)
	 * For charts with a categorical x-axis (e.g. `incomeSlope`), this is the ordered list of categories.
	 */
	xDomain?: [Date, Date] | [number, number] | string[];

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
	colorScale?: ColorScaleOverride;

	/**
	 * Overrides `colorScale` when the light theme is active.
	 */
	colorScaleLight?: ColorScaleOverride;

	/**
	 * Overrides `colorScale` when the dark theme is active.
	 */
	colorScaleDark?: ColorScaleOverride;

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

export interface LineChartWithForecastOptions extends BaseChartOptions {
	chartType: 'lineChartWithForecast';

	/**
	 * Horizontal reference lines/rules to draw.
	 */
	reference_lines?: { label: string; y: number; strokeDasharray?: string }[];

	/**
	 * If provided for date-based line charts, shades the chart area from this date onward
	 * and draws the projected part of each series with a dashed line.
	 */
	projectedStart?: string;

	/**
	 * Label to use on the x-axis for charts whose x variable is not time.
	 */
	xAxisLabel?: string | null;
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

export interface HistogramOptions extends BaseChartOptions {
	chartType: 'histogram';

	/**
	 * Label to use on the x-axis (the binned values). Defaults to no label.
	 */
	xAxisLabel?: string | null;

	/**
	 * Label to use on the y-axis (the count in each bin). Defaults to 'Count'.
	 */
	yAxisLabel?: string | null;

	/**
	 * Spacing between vertical grid lines, in x-axis units (e.g. 0.05 for every 5 percentage points).
	 * Defaults to Plot's automatic tick spacing.
	 */
	gridXInterval?: number;
}

export interface PairedDotplotOptions extends BaseChartOptions {
	chartType: 'pairedDotPlot';

	/**
	 * The pair of values being compared by the paired dot-plot chart.
	 */
	compareValues?: [string, string];
}

/**
 * Types of area for which the GLA geographies API provides boundaries.
 */
export type ChoroplethAreaType =
	| 'borough'
	| 'ward-2022'
	| 'ward-2021'
	| 'msoa-2021'
	| 'lsoa-2021'
	| 'lsoa-2011'
	| 'oa-2021';

export interface ChoroplethOptions extends BaseChartOptions {
	chartType: 'choropleth';

	/**
	 * Type of area to draw; determines which boundaries are fetched.
	 */
	areaType: ChoroplethAreaType;

	/**
	 * Property on the area features that will be used to match against each data row's `xd` field.
	 * Defaults to `'name'`. Use `'id'` for wards or other areas with non-unique names.
	 */
	joinKey?: 'name' | 'id';

	/**
	 * Fill color for areas with no matching data row (or a missing value).
	 * If not set, these areas are not drawn.
	 */
	missingDataColor?: string;
}

// Chart types that need no fields beyond BaseChartOptions.
export interface CoreChartOptions extends BaseChartOptions {
	chartType:
		| 'barChartVertical'
		| 'barChartVerticalGrouped'
		| 'barChartStacked'
		| 'incomeSlope'
		| 'slopeChart';
}

export type ChartOptions =
	| LineChartOptions
	| LineChartWithLineStylesOptions
	| LineChartWithForecastOptions
	| BarChartHorizontalOptions
	| BarChartHorizontalGroupedOptions
	| BarChartStackedTimeseriesOptions
	| HistogramOptions
	| PairedDotplotOptions
	| ChoroplethOptions
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

export type ColorScaleOverride = {
	domain: (number | string)[];
	range: string[];
};

export type ColorChoice = {
	type?: ScaleType;
	domain?: (number | string)[];
	range?: string[];
};

export type ChartGenerator = (
	options: ChartOptions,
	data: ChartDataRow[],
	colorChoice: ColorChoice,
	width: number
) => PlotOptions;

type ExtraMarksArgs = {
	Plot: typeof import('../observablePlotFragments/plot').Plot;
	options: ChartOptions;
	colorChoice: ColorChoice;
	data: ChartDataRow[];
	makeTooltip: (
		options: Pick<ChartOptions, 'tooltipFormatValue' | 'ytickformat' | 'tooltipFormatDate'>
	) => (d: ChartDataRow) => string;
};

export const chartOptions: Record<string, ChartOptions> = {};
