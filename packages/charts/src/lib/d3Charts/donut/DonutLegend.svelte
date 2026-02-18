<script lang="ts">
	import { sum } from 'd3-array';
	import type { DonutData } from './types';

	interface Props {
		data: DonutData[];
		domainColors: any;
		valueFormatter?: (value: number, total: number) => string;
		numberFormatter?: (value: number) => string;
	}

	let {
		data,
		domainColors,

		valueFormatter = (v, total) => (total ? ((v / total) * 100).toFixed(1) + '%' : ''),
		numberFormatter = (v) => v.toLocaleString()
	}: Props = $props();

	let total = $derived(sum(data.map((d) => d.value)));

	let orderedData = $derived.by(() => {
		const order = Object.keys(domainColors);
		return [...data].sort((a, b) => {
			return order.indexOf(a.label) - order.indexOf(b.label);
		});
	});
</script>

<div class="m-4 flex flex-col p-4">
	<div class="mb-2 flex justify-between">
		<span class="font-bold">
			Total: {numberFormatter(total)}
		</span>
	</div>

	{#each orderedData as entry}
		<div class="mb-1 flex items-center">
			<div
				class="mr-2 h-5 w-5 shrink-0"
				style="background-color: {domainColors[entry.label] ?? '#ccc'}"
			></div>

			<div class="w-24">
				{entry.label}
			</div>

			<div class="w-14 text-center font-bold">
				{valueFormatter(entry.value, total)}
			</div>

			<div class="w-20 text-right">
				{numberFormatter(entry.value)}
			</div>
		</div>
	{/each}
</div>
