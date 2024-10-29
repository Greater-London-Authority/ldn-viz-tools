<script lang="ts">
	/**
	 * The `Summary` component lists some summary statistics for a set of values.
	 */
	import { max, mean, median, min } from 'd3-array';
	import { format } from 'd3-format';

	/**
	 * Array of values to be displayed.
	 */
	export let values: number[];

	export let formatString = '0.0f';

	$: f = format(formatString);
	$: f2 = (val: number | undefined) => (val === undefined ? 'undefined' : f(val));

	// This suppresses warnings due to the RowRenderer providing props that aren't used.
	$$restProps;
</script>

<span
	>Min: {f2(min(values))}, Max: {f2(max(values))}, Median: {f2(median(values))}, Mean: {f2(
		mean(values)
	)}</span
>
