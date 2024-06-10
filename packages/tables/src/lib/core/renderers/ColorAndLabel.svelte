<script lang="ts">
	/**
	 * The `ColorAndLabel` component renders a table cell representing a numerical value as a label, next to a small square with a background color encoding the value.
	 * See also [ColoredCell](./?path=/docs/tables-encodings-coloredcell--documentation).
	 * @component
	 */

	/**
	 * The value to be encoded in the cell.
	 */
	export let value: number;

	/**
	 * A D3 color scale used to determine cell background color.
	 */
	export let colorScale;
</script>

<div class="flex items-center">
	<div
		class="flex-none w-4 h-4 mr-1"
		style={`background-color: ${colorScale ? colorScale(value) : 'lightgrey'};`}
	></div>
	<div class="w-0 flex-auto overflow-hidden truncate items-center">{value}</div>
</div>
