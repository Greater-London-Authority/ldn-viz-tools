export interface BarChartProps {
	/**
	 * Array of values to be displayed.
	 */
	values: any;
	/**
	 * A D3 color scale used to determine bar color.
	 */
	color: string | ((val: any) => string);
	/**
	 * Categorical scale used to determine horizontal position of bar.
	 */
	posScale: any;
	/**
	 * Width of cell (in pixels).
	 */
	width?: number;

	[key: string]: any;
}
