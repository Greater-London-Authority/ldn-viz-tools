export interface BarCellProps {
	/**
	 * The value to be encoded in the cell.
	 */
	value: number;
	/**
	 * Color of the bar, in any CSS format (color name, hex-string, `rgb()` notation, etc.).
	 */
	color?: string | ((val: number) => string);
	/**
	 * Format string defining how the number should be formatted for display (expressed in `d3-format`'s [notation](https://d3js.org/d3-format#locale_format),
	 * which is based on Python 3’s format specification mini-language (PEP 3101)).
	 * If set to a falsy value, then bars will not be labelled with a value.
	 */
	formatString?: string;
	extent?: any; // used to pass automatically extracted val
	domain: any; // allows extent to be over-ridden
	[key: string]: any;
}
