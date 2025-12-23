/**
 * The `ColorAndLabel` component renders a table cell representing a numerical value as a label, next to a small square with a background color encoding the value.
 * See also [ColoredCell](./?path=/docs/tables-components-renderers-coloredcell--documentation).
 * @component
 */

export interface ColorAndLabelProps {
	/**
	 * The value to be encoded in the cell.
	 */
	value: number;
	/**
	 * A D3 color scale used to determine cell background color.
	 */
	color: string | ((value: number) => string);
}
