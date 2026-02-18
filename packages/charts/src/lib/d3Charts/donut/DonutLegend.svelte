<script lang="ts">
	import { sum } from 'd3-array';
	import type { DonutData } from './types';

	interface Props {
		data: DonutData[];
		colorMapping: any;
		percentFormatter?: (value: number, total: number) => string;
		countFormatter?: (value: number) => string;
	}

	let {
		data,
		colorMapping,

		percentFormatter = (v, total) => (total ? ((v / total) * 100).toFixed(1) + '%' : ''),
		countFormatter = (v) => v.toLocaleString()
	}: Props = $props();

	let total = $derived(sum(data.map((d) => d.value)));

	let orderedData = $derived.by(() => {
		const order = Object.keys(colorMapping);
		return [...data].sort((a, b) => {
			return order.indexOf(a.label) - order.indexOf(b.label);
		});
	});
</script>

<div class="m-4 flex flex-col p-4">
	<div class="mb-2 flex justify-between">
		<span class="font-bold">
			Total: {countFormatter(total)}
		</span>
	</div>

	{#each orderedData as entry}
		<div class="mb-1 flex items-center">
			<div
				class="mr-2 h-5 w-5 shrink-0"
				style="background-color: {colorMapping[entry.label] ?? '#ccc'}"
			></div>

			<div class="w-24">
				{entry.label}
			</div>

			<div class="w-14 text-center font-bold">
				{percentFormatter(entry.value, total)}
			</div>

			<div class="w-20 text-right">
				{countFormatter(entry.value)}
			</div>
		</div>
	{/each}
</div>
