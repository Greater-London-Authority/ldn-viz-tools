<script lang="ts">
	/**
	 * The `CategoricalTick` component encodes a single categorical value redundantly as both the position and color of a tick.
	 * @component
	 */
	import type { CategoricalTickProps } from '$lib/core/renderers/CategoricalTickProps';
	import { theme } from '@ldn-viz/ui';
	import { format } from 'd3-format';
	import { getVal } from '../../getVal';

	const fPercentage = format('0.0%');

	let {
		value,
		color = theme.tokenNameToValue('chart.label'),
		posScale,
		showValues = true,
		..._rest
	}: CategoricalTickProps = $props();

	let w = $derived(1 / posScale.domain().length);

	let l = $derived(posScale(value));
</script>

<div
	class="relative top-0 z-[-1] h-full w-[3px] -translate-x-1/2 transform"
	style:background={getVal(value, color)}
	style:left={fPercentage(l)}
	style:width={fPercentage(w)}
>
	{#if showValues}
		<div class="pl-2">{value}</div>
	{:else}
		<div>&nbsp;</div>
	{/if}
</div>
