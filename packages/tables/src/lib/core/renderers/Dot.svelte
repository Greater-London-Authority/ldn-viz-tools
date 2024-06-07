<script>
	import { format } from 'd3-format';

	export let color = 'steelblue';
	export let showValues = true;

	export let value;
	export let table;
	export let colSpec;

	export let formatString = '0.0f';
	$: f = format(formatString);

	let extent;
	$: extent = table.extents[colSpec.short_label];

	let d;
	$: d = (value - extent[0]) / (extent[1] - extent[0]);

	const fPercentage = format('0.0%');
</script>

<div
	class="opacity-100 rounded-sm w-[7px] h-[7px] mt-[-3.5px] ml-[-3.5px] relative"
	style:background-color={color}
	style:left={fPercentage(d)}
>
	{#if showValues}
		<div class="pl-2">{f(value)}</div>
	{:else}
		<div>&nbsp;</div>
	{/if}
</div>
