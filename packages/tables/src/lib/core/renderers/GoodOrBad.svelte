<script lang="ts">
	/**
	 * The `GoodOrBad` component renders a table cell comparing a single value to a reference or benchmark value.
	 * @component
	 */

	import { format } from 'd3-format';

	import type { GoodOrBadProps } from '$lib/core/renderers/GoodOrBadProps';
	import { Check, Minus, XMark } from '@steeze-ui/heroicons';
	import { Icon } from '@steeze-ui/svelte-icon';
	import type { ComparedBenchmark } from '../../types/benchmarks';
	import { classNames } from '../../utils/utilityFns';

	let {
		value,
		formatString = '0.0f',
		benchmarkValue,
		benchmarkLabel = '',
		goodIs = 'n/a',
		iconOnly = false,
		...rest
	}: GoodOrBadProps = $props();

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

	let f = $derived(format(formatString));

	let compared = $derived.by(() => {
		if (typeof value === 'number') {
			return compareToBenchmark(value, benchmarkValue, goodIs);
		}
	});

	let ragClasses = $derived(
		classNames(
			'text-sm inline-flex items-center',
			benchmarkComparisonClass[compared?.good as 'good']
		)
	);
</script>

<div class={ragClasses}>
	{#if goodIs !== 'n/a' && compared}
		<div
			class={`flex shrink-0 grow-0 items-center justify-center rounded-full bg-current ${
				iconOnly ? 'mt-0.5 h-4 w-4' : 'mb-0.5 mr-1 h-5 w-5'
			}`}
		>
			<Icon src={benchmarkIcons[compared.good]} theme="mini" class="h-3 w-3" aria-hidden="true" />
		</div>
	{/if}

	{#if !iconOnly && compared}
		{f(Math.abs(compared.value))}
		{compared.vs}
		{benchmarkLabel}
		{typeof benchmarkValue === 'number' ? f(benchmarkValue) : benchmarkValue}
		({f(+value)})
	{/if}
</div>
