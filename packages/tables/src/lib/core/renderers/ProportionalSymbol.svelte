<script>
	import { format } from 'd3-format';

	export let color = 'steelblue';
	export let showValues = false;

	export let value;
	export let table;
	export let colSpec;

	export let formatString = '0.0f';
	$: f = format(formatString);

	let extent;
	$: extent = table.extents[colSpec.short_label];

	let r;
	$: r = Math.sqrt((value - extent[0]) / (extent[1] - extent[0]));

	const fPercentage = format('0.0%');

	// See the MDN docs on radial gradients: https://developer.mozilla.org/en-US/docs/Web/CSS/gradient/radial-gradient
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
