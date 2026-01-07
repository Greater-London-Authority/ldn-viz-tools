<script lang="ts">
	/**
	 * The `Dot` component renders a table cell representing a numerical value as a tick;
	 * the horizontal position of the dot encodes the value.
	 * See also: [Tick](./?path=/docs/tables-components-renderers-tick--documentation)
	 * @component
	 */

	import type { DotProps } from '$lib/core/renderers/DotProps';
	import { format } from 'd3-format';
	import { getVal } from '../../getVal';

	let {
		color = 'steelblue',
		showValues = true,
		value,
		formatString = '0.0f',
		extent = [0, 1],
		...rest
	}: DotProps = $props();

	let d = $derived((value - extent[0]) / (extent[1] - extent[0]));

	const fPercentage = format('0.0%');

	let f = $derived(format(formatString));
</script>

<div
	class="relative ml-[-3.5px] mt-[-3.5px] h-[7px] w-[7px] rounded-sm opacity-100"
	style="width: 7px; height: 7px;"
	style:background-color={getVal(value, color)}
	style:left={fPercentage(d)}
>
	{#if showValues}
		<div class="pl-2">{f(value)}</div>
	{:else}
		<div>&nbsp;</div>
	{/if}
</div>
