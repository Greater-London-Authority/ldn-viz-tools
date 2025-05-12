<script lang="ts">
	/**
	 * The `CategoricalTick` component encodes a single categorical value redundantly as both the position and color of a tick.
	 * @component
	 */
	import { format } from 'd3-format';
	import { getVal } from '../lib/getVal';

	/**
	 * The value to be encoded in the cell.
	 */
	export let value: number;

	const fPercentage = format('0.0%');

	/**
	 * Scale used to determine color of tick.
	 */
	export let color: string | ((value: number) => string) = 'black';

	/**
	 * Categorical scale used to determine horizontal position of tick.
	 */
	export let posScale;

	/**
	 * If `true`, then the numerical value will be displayed as text beside the symbol.
	 */
	export let showValues = true;

	let w;
	$: w = 1 / posScale.domain().length;

	let l;
	$: l = posScale(value);

	// This suppresses warnings due to the RowRenderer providing props that aren't used.
	// eslint-disable-next-line @typescript-eslint/no-unused-expressions
	$$restProps;
</script>

<div
	class="w-[3px] h-full top-0 transform -translate-x-1/2 z-[-1] relative"
	style="width: 3px"
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
