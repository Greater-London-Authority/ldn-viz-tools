<script lang="ts">
	/**
	 * The `GoodOrBad` component renders a table cell comparing a single value to a reference or benchmark value.
	 * @component
	 */

	import { format } from 'd3-format';

	import { Check, Minus, XMark } from '@steeze-ui/heroicons';
	import { Icon } from '@steeze-ui/svelte-icon';
	import type { ComparedBenchmark } from '../../types/benchmarks';
	import { classNames } from '../../utils/utilityFns';

	/**
	 * The value to be encoded in the cell.
	 */
	export let value: number | string;

	/**
	 * Format string defining how the number should be formatted for display (expressed in `d3-format`'s [notation](https://d3js.org/d3-format#locale_format),
	 * which is based on Python 3’s format specification mini-language (PEP 3101)).
	 */
	export let formatString = '0.0f';

	/**
	 * Value that the cell's value should be compared to.
	 */
	export let benchmarkValue: number;

	/**
	 * Name of benchmark to be included in message.
	 */
	export let benchmarkLabel = '';

	/**
	 * Determines whether a "good" or desired value is greater or less than the benchmark value.
	 */
	export let goodIs: 'high' | 'low' | 'n/a' = 'n/a';

	/**
	 * If `true`, then display just an icon, with no message.
	 */
	export let iconOnly = false;

	let compared: ComparedBenchmark;

	$: f = format(formatString);

	$: if (typeof benchmarkValue === 'number' && typeof value === 'number') {
		compared = compareToBenchmark(value, benchmarkValue, goodIs);
	}

	const benchmarkIcons: { [key: string]: any } = {
		good: Check,
		bad: XMark,
		equal: Minus
	};

	const benchmarkComparisonClass = {
		good: 'text-color-ui-positive',
		bad: 'text-color-ui-negative',
		equal: 'text-color-ui-neutral'
	};

	$: ragClasses = classNames(
		'text-sm inline-flex items-center',
		benchmarkComparisonClass[compared.good as 'good']
	);

	//
	export const compareToBenchmark = (
		value: number,
		benchmark: number,
		goodIs?: 'high' | 'low' | 'n/a'
	) => {
		const raw = benchmark;
		const diff = value - benchmark;
		const isGood =
			((goodIs === 'high' || goodIs === 'n/a') && diff > 0) ||
			((goodIs === 'low' || goodIs === 'n/a') && diff < 0);
		// const vs = goodIs === 'high' ? (isGood ? 'above' : 'below') : isGood ? 'below' : 'above';
		const vs = diff < 0 ? 'below' : 'above';
		const good = goodIs === 'n/a' ? 'n/a' : isGood ? 'good' : 'bad';

		return {
			raw,
			goodIs,
			value: diff,
			good: diff === 0 ? 'equal' : good,
			vs
		} as ComparedBenchmark;
	};

	//
</script>

<p class={ragClasses}>
	{#if goodIs !== 'n/a'}
		<div
			class={`flex shrink-0 grow-0 items-center justify-center rounded-full bg-current ${
				iconOnly ? 'h-4 w-4 mt-0.5' : 'h-5 w-5 mr-1 mb-0.5'
			}`}
		>
			<Icon src={benchmarkIcons[compared.good]} theme="mini" class="w-3 h-3" aria-hidden="true" />
		</div>
	{/if}

	{#if !iconOnly}
		{f(Math.abs(compared.value))}
		{compared.vs}
		{benchmarkLabel}
		{typeof benchmarkValue === 'number' ? f(benchmarkValue) : benchmarkValue}
		({f(+value)})
	{/if}
</p>
