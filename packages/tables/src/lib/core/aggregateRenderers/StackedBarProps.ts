export interface StackedBarProps {
	/**
	 * Array of (categorical) values to be displayed.
	 */
	values: (string | number)[];
	/**
	 * A D3 color scale used to determine bar color.
	 */
	color?: string | ((val: any) => string);
	/**
	 * Width of cell (in pixels).
	 */
	width?: number;

	[key: string]: any;
}
