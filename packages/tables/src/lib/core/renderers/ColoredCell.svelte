<script lang="ts">
	/**
	 * The `ColoredCell` component renders a table cell representing a numerical value as a label, with the background color encoding the value.
	 * See also [ColorAndLabel](./?path=/docs/tables-components-renderers-colorandlabel--documentation).
	 * @component
	 */

	import { hsl } from 'd3-color';
	import { format } from 'd3-format';
	import type { ColoredCellProps } from '$lib/core/renderers/ColoredCellProps';

	let { value, formatString = '.2f', colorScale }: ColoredCellProps = $props();

	let f = $derived(format(formatString));
</script>

{#if !colorScale}
	<span></span>
{:else if value}
	<span
		class="flex h-full items-center justify-end p-2 text-right"
		style={`background-color: ${colorScale(value)}; color: ${
			hsl(colorScale(value).toString()).l >= 0.6 ? '#000000' : '#FFFFFF'
		}`}
	>
		{#if formatString}{f(+value)}{/if}
	</span>
{/if}
