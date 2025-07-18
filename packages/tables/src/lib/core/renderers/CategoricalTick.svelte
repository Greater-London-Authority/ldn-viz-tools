<script lang="ts">
	/**
	 * The `CategoricalTick` component encodes a single categorical value redundantly as both the position and color of a tick.
	 * @component
	 */
	import { format } from 'd3-format';

	const fPercentage = format('0.0%');

	interface Props {
		/**
		 * The value to be encoded in the cell.
		 */
		value: any;
		/**
		 * Scale used to determine color of tick.
		 */
		colorScale: any;
		/**
		 * Categorical scale used to determine horizontal position of tick.
		 */
		posScale: any;
		/**
		 * If `true`, then the numerical value will be displayed as text beside the symbol.
		 */
		showValues?: boolean;
		[key: string]: any;
	}

	let { value, colorScale, posScale, showValues = true, ...rest }: Props = $props();

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
