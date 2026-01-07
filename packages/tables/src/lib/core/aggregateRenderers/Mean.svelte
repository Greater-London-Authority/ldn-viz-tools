<script lang="ts">
	/**
	 * The `Mean` component renders the (arithmetic) mean of a set of values.
	 * @component
	 */

	import { mean } from 'd3-array';
	import { format } from 'd3-format';
	import type { MeanProps } from '$lib/core/aggregateRenderers/MeanProps';

	let { values, formatString = '0.0f', ...rest }: MeanProps = $props();

	let f = $derived(format(formatString));

	let meanVal = $derived(mean(values));
</script>

<span>{meanVal === undefined ? 'undefined' : f(meanVal)}</span>
