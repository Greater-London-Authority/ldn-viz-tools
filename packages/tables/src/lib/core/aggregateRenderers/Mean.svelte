<script lang="ts">
	/**
	 * The `Mean` component renders the (arithmetic) mean of a set of values.
	 * @component
	 */

	import { mean } from 'd3-array';
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

	let meanVal = $derived(mean(values));
</script>

<span>{meanVal === undefined ? 'undefined' : f(meanVal)}</span>
