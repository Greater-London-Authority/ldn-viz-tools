<script lang="ts">
	/**
	 * The `Mean` component renders the (arithmetic) mean of a set of values.
	 * @component
	 */

	import type { MeanProps } from '$lib/core/aggregateRenderers/MeanProps';
	import { mean } from 'd3-array';
	import { format } from 'd3-format';

	let { values, formatString = '0.0f', ..._rest }: MeanProps = $props();

	let f = $derived(format(formatString));

	let meanVal = $derived(mean(values));
</script>

{#if values && values.length > 0}
	<span>{meanVal === undefined ? 'undefined' : f(meanVal)}</span>
{/if}
