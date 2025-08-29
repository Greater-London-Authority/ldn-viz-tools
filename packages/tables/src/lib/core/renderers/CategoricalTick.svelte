<script lang="ts">
	/**
	 * The `CategoricalTick` component encodes a single categorical value redundantly as both the position and color of a tick.
	 * @component
	 */
	import { format } from 'd3-format';
	import type { CategoricalTickProps } from '$lib/core/renderers/CategoricalTickProps';

	const fPercentage = format('0.0%');

	let { value, colorScale, posScale, showValues = true, ...rest }: CategoricalTickProps = $props();

	let w = $derived(1 / posScale.domain().length);

	let l = $derived(posScale(value));
</script>

<div
	class="relative top-0 z-[-1] h-full w-[3px] -translate-x-1/2 transform"
	style="width: 3px"
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
