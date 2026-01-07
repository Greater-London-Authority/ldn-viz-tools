<script lang="ts">
	/**
	 * The `ProportionalSymbol` component renders a table cell encoding a single value as a circle, with the radius encoding the value.
	 * @component
	 */
	import type { ProportionalSymbolProps } from '$lib/core/renderers/ProportionalSymbolProps';
	import { format } from 'd3-format';

	let {
		color = 'steelblue',
		value,
		showValues = false,
		formatString = '0.0f',
		extent = [0, 1],
		...rest
	}: ProportionalSymbolProps = $props();

	const fPercentage = format('0.0%');

	// See the MDN docs on radial gradients: https://developer.mozilla.org/en-US/docs/Web/CSS/gradient/radial-gradient

	let f = $derived(format(formatString));
	let r = $derived(Math.sqrt((value - extent[0]) / (extent[1] - extent[0])));
</script>

<div
	style:background={`radial-gradient(circle closest-side, ${color} ${fPercentage(r)}, transparent ${fPercentage(r)})`}
	title=""
	class="lu-renderer-circle lu-detail le-td le-td-lu-c63 le-td-lu-c63T0"
	data-renderer="circle"
	data-group="d"
	data-id="col9"
>
	{#if showValues}
		<div>{f(value)}</div>
	{:else}
		<div>&nbsp;</div>
	{/if}
</div>
