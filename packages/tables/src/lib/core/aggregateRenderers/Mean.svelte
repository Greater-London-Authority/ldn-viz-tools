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
	export let values;

	$: meanVal = mean(values);

	export let formatString = '0.0f';
	$: f = format(formatString);
</script>

<span>{f(meanVal)}</span>
