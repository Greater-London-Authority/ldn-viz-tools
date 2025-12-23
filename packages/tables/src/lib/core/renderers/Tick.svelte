<script lang="ts">
	/**
	 * The `Tick` component renders a table cell representing a numerical value as a tick;
	 * the horizontal position of the tick encodes the value.
	 * See also: [Dot](./?path=/docs/tables-components-encodings-dot--documentation)
	 * @component
	 */

	import type { TickProps } from '$lib/core/renderers/TickProps';
	import { format } from 'd3-format';
	import { getVal } from '../../getVal';

	let {
		color = 'steelblue',
		showValues = true,
		value,
		formatString = '0.0f',
		extent,
		...rest
	}: TickProps = $props();

	const fPercentage = format('0.0%');

	let f = $derived(format(formatString));
	let d = $derived((value - extent[0]) / (extent[1] - extent[0]));
</script>

<div
	class="relative top-0 z-[-1] h-full w-[3px] -translate-x-1/2 transform"
	style="width: 3px"
	style:background={getVal(value, color)}
	style:left={fPercentage(d)}
>
	{#if showValues}
		<div class="pl-2">{f(value)}</div>
	{:else}
		<div>&nbsp;</div>
	{/if}
</div>
