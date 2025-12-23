export interface CategoricalTickProps {
	/**
	 * The value to be encoded in the cell.
	 */
	value: any;
	/**
	 * Scale used to determine color of tick.
	 */
	color: string | ((value: number) => string);
	/**
	 * Categorical scale used to determine horizontal position of tick.
	 */
	posScale: any;
	/**
	 * If `true`, then the numerical value will be displayed as text beside the symbol.
	 */
	showValues?: boolean;

	[key: string]: any;
}
