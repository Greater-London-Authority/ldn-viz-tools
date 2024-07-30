<script lang="ts">
	/**
	 * The `Summary` component lists some summary statistics for a set of values.
	 */
	import { min, max, mean, median } from 'd3-array';
	import { format } from 'd3-format';

	/**
	 * Array of values to be displayed.
	 */
	export let values;

	export let formatString = '0.0f';
	$: f = format(formatString);
</script>

<span
	>Min: {f(min(values))}, Max: {f(max(values))}, Median: {f(median(values))}, Mean: {f(
		mean(values)
	)}</span
>
