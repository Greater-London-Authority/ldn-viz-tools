<script lang="ts" generics="T extends Record<string, any>">
	import { sum } from 'd3-array';

	interface Props<T extends Record<string, any>> {
		data: T[];
		labelField: keyof T;
		countField: keyof T;
		colorMapping: Record<string, string>;
		percentFormatter?: (value: number, total: number) => string;
		countFormatter?: (value: number) => string;
	}

	let {
		data,
		colorMapping,
		labelField,
		countField,
		percentFormatter = (v, total) => (total ? ((v / total) * 100).toFixed(1) + '%' : ''),
		countFormatter = (v) => v.toLocaleString()
	}: Props<T> = $props();

	let total = $derived(sum(data.map((d) => Number(d[countField]))));

	let orderedData = $derived.by(() => {
		const order = Object.keys(colorMapping);
		return [...data].sort((a, b) => {
			return order.indexOf(a[labelField]) - order.indexOf(b[labelField]);
		});
	});
</script>

<div class="typeset-product chart-label m-4 flex flex-col p-4">
	<div class="mb-2 flex justify-between">
		<span class="text-strong tabular-nums">
			Total: {countFormatter(total)}
		</span>
	</div>

	{#each orderedData as entry}
		<div class="mb-1 flex items-center">
			<div
				class="mr-2 h-5 w-5 shrink-0"
				style="background-color: {colorMapping[entry[labelField]] ?? '#ccc'}"
			></div>

			<div class="w-24">
				{entry[labelField]}
			</div>

			<div class="chart-label w-14 text-right tabular-nums">
				{percentFormatter(entry[countField], total)}
			</div>

			<div class="w-20 text-right tabular-nums">
				{countFormatter(entry[countField])}
			</div>
		</div>
	{/each}
</div>
