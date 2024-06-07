<script>
	import { format } from 'd3-format';

	export let showValues = true;

	export let value;
	export let table;
	export let colSpec;

	let extent;
	$: extent = table.extents[colSpec.short_label];

	const fPercentage = format('0.0%');

	let colorScale;
	$: colorScale = table.scales[colSpec.short_label];

	let posScale;
	$: posScale = table.posScales[colSpec.short_label];

	let w;
	$: w = 1 / posScale.domain().length;

	let l;
	// $: l = extent.indexOf(value) * (1 / extent.length);
	$: l = posScale(value);

	$: console.log(`Value ${value}, l ${l}`);
	$: console.log('CatTIck extent:', extent);
</script>

<div
	class="w-[3px] h-full top-0 transform -translate-x-1/2 z-[-1] relative"
	style:background={colorScale(value)}
	style:left={fPercentage(l)}
	style:width={fPercentage(w)}
>
	{#if showValues}
		<div class="pl-2">{value}</div>
	{:else}
		<div>&nbsp;</div>
	{/if}
</div>
