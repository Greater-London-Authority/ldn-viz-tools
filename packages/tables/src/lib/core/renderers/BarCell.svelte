<script lang="ts">
	/**
	 * The `BarCell` component renders a table cell representing a numerical value as a bar, where the length of the bar encodes the value.
	 * @component
	 */

	import type { BarCellProps } from '$lib/core/renderers/BarCellProps';
	import { format } from 'd3-format';
	import { getVal } from '../../getVal';

	let {
		value,
		color = 'red',
		formatString = '0.0f',
		extent = [0, 1],
		domain,
		...rest
	}: BarCellProps = $props();

	const formatPercent = format('0.0f');
	const scale = (val: number) => {
		if (domain) {
			return formatPercent((100 * (val - domain[0])) / (domain[1] - domain[0]));
		} else {
			return formatPercent((100 * (val - extent[0])) / (extent[1] - extent[0]));
		}
	};

	let f = $derived(format(formatString));
</script>

<div class="flex h-full items-center py-1">
	<div class="bg-color-ui-neutral relative flex w-full text-xs">
		<div
			style:width={scale(+value) + 'px'}
			style:background-color={getVal(value, color)}
			class="absolute left-0 h-full text-right"
		></div>

		{#if +value <= 0.4}
			<div class="relative ml-1 p-1" style={`padding-left:${scale(+value)}%`}>
				{#if formatString}{f(+value)}{/if}
			</div>
		{:else}
			<div class="relative p-1 text-right text-white" style={`width:${scale(+value)}%`}>
				{#if formatString}{f(+value)}{/if}
			</div>
		{/if}
	</div>
</div>
