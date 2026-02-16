<script lang="ts">
	import { sum } from 'd3-array';

	interface Props {
		type: 'climate_suitability' | 'location';
		data: any[];
		domainColors: Record<string, string>;
	}

	let { type, data, domainColors }: Props = $props();

	// Total for display only
	let total = $derived(sum(data.map((d) => d.count)));

	const formatPercent = (val: number) => (val * 100).toFixed(1) + '%';

	const formatNumber = (val: number) => val.toLocaleString();

	let orderedData = $derived.by(() => {
		const order = Object.keys(domainColors);
		return [...data].sort((a, b) => {
			return order.indexOf(a[type]) - order.indexOf(b[type]);
		});
	});
</script>

<div class="m-4 flex flex-col p-4">
	<div class="mb-2 flex justify-between">
		<!-- <span class="text-xl font-bold">
			{type === 'climate_suitability' ? 'Climate Suitability' : 'Location'}
		</span> -->
		<span class="font-bold">
			All Trees: {formatNumber(total)}
		</span>
	</div>

	{#each [...orderedData] as entry}
		<div class="mb-1 flex items-center">
			<div
				class="mr-2 h-5 w-5 shrink-0"
				style="background-color: {domainColors[entry[type]] ?? '#ccc'}"
			></div>

			<div class="w-24">
				{entry[type]}
			</div>

			<div class="w-14 text-center font-bold">
				{formatPercent(entry.percent)}
			</div>

			<div class="w-20 text-right">
				{formatNumber(entry.count)}
			</div>
		</div>
	{/each}
</div>
