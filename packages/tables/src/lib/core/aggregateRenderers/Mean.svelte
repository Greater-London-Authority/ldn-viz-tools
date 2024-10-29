<script lang="ts">
	/**
	 * The `Mean` component renders the (arithmetic) mean of a set of values.
	 * @component
	 */

	import { mean } from 'd3-array';
	import { format } from 'd3-format';

	/**
	 * Array of values to be displayed.
	 */
	export let values: number[];

	$: meanVal = mean(values);

	export let formatString = '0.0f';

	let f = format(formatString);
	$: f = format(formatString);

	// This suppresses warnings due to the RowRenderer providing props that aren't used.
	$$restProps;
</script>

<span>{meanVal === undefined ? 'undefined' : f(meanVal)}</span>
