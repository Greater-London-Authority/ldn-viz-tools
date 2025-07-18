<script lang="ts">
	/**
	 * The `Summary` component lists some summary statistics for a set of values.
	 */
	import { max, mean, median, min } from 'd3-array';
	import { format } from 'd3-format';

	interface Props {
		/**
		 * Array of values to be displayed.
		 */
		values: number[];
		formatString?: string;
		[key: string]: any;
	}

	let { values, formatString = '0.0f', ...rest }: Props = $props();

	let f = $derived(format(formatString));
	let f2 = $derived((val: number | undefined) => (val === undefined ? 'undefined' : f(val)));
</script>

<span
	>Min: {f2(min(values))}, Max: {f2(max(values))}, Median: {f2(median(values))}, Mean: {f2(
		mean(values)
	)}</span
>
