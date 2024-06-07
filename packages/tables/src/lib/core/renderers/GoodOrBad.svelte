<script lang="ts">
	import { format } from 'd3-format';

	import type { ComparedBenchmark } from '../../types/benchmarks';
	import { classNames } from '../../utils/utilityFns';
	import { Check, Minus, XMark } from '@steeze-ui/heroicons';
	import { Icon } from '@steeze-ui/svelte-icon';

	export let value: number | string;
	export let formatString;

	export let benchmarkValue: number | string;
	export let benchmarkLabel = '';
	export let goodIs: 'high' | 'low' | 'n/a';
	export let iconOnly = false;

	let compared: ComparedBenchmark;

	let f;
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
		good: 'text-core-green-500',
		bad: 'text-core-red-500',
		equal: 'text-core-grey-400'
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
		const vs = goodIs === 'high' ? (isGood ? 'above' : 'below') : isGood ? 'below' : 'above';
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
			class={`flex shrink-0 grow-0 items-center justify-center rounded-full bg-current border border-white ${
				iconOnly ? 'h-4 w-4 mt-0.5' : 'h-5 w-5 mr-1 mb-0.5'
			}`}
		>
			<Icon
				src={benchmarkIcons[compared.good]}
				theme="mini"
				class="w-3 h-3 fill-white"
				aria-hidden="true"
			/>
		</div>
	{/if}

	{#if !iconOnly}
		{f(compared.value)}
		{compared.vs}
		{benchmarkLabel}
		{typeof benchmarkValue === 'number' ? f(benchmarkValue) : benchmarkValue}
		({f(value)})
	{/if}
</p>
