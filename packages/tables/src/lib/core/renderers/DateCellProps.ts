export interface DateCellProps {
	/**
	 * The value to be encoded in the cell.
	 */
	value: Date;
	/**
	 * Alignment of the text within the cell.
	 */
	alignText?: 'left' | 'right' | 'center' | undefined;
	/**
	 * Format string defining how the number should be formatted for display (expressed in `d3-time-format`'s [notation](https://d3js.org/d3-time-format#locale_format),
	 * which is based on "the venerable strptime and strftime functions from the C standard library")
	 */
	formatString?: string;

	[key: string]: any;
}
