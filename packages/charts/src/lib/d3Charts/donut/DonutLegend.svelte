<script lang="ts" generics="T">
	import { sum } from 'd3-array';

	interface Props<T> {
		data: T[];
		labelAccessor: (d: T) => string;
		valueAccessor: (d: T) => number;
		colorAccessor?: (d: T) => string;
		order?: string[]; // optional manual ordering
		valueFormatter?: (value: number, total: number) => string;
		numberFormatter?: (value: number) => string;
	}

	let {
		data,
		labelAccessor,
		valueAccessor,
		colorAccessor,
		order,
		valueFormatter = (v, total) => (total ? ((v / total) * 100).toFixed(1) + '%' : ''),
		numberFormatter = (v) => v.toLocaleString()
	}: Props<T> = $props();

	/* =========================
	   Derived Values
	========================= */

	let total = $derived(sum(data.map((d) => valueAccessor(d))));

	let orderedData = $derived.by(() => {
		if (!order) return [...data];

		return [...data].sort((a, b) => {
			return order.indexOf(labelAccessor(a)) - order.indexOf(labelAccessor(b));
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
				style="background-color: {colorAccessor ? colorAccessor(entry) : '#ccc'}"
			></div>

			<div class="w-24">
				{labelAccessor(entry)}
			</div>

			<div class="w-14 text-center font-bold">
				{valueFormatter(valueAccessor(entry), total)}
			</div>

			<div class="w-20 text-right">
				{numberFormatter(valueAccessor(entry))}
			</div>
		</div>
	{/each}
</div>
