<script lang="ts">
	import { min, max, mean, median } from 'd3-array';
	import { format } from 'd3-format';
	export let values;

	$: meanVal = mean(values);

	let formatString = '0.0f';
	$: f = format(formatString);
</script>

<span
	>Min: {f(min(values))}, Max: {f(max(values))}, Median: {f(median(values))}, Mean: {f(
		mean(values)
	)}</span
>
