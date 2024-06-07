<script lang="ts">
	import { format, hsl, type ScaleThreshold } from 'd3';

	export let value: number;

	export let formatString = '.2f';
	export let colorScale: ScaleThreshold<string | number, string> | (() => string);

	// $: f = metric.short_label === selectedMetric ? format(formatString) : format(`+${formatString}`);

	$: f = format(formatString);

	// $: console.log({value, color: colorScale(value)})
</script>

<!--
<a
        href="{base ? `${base}` : ''}/report/metric?loc={locale}&area_type={row.original.area
			.type}&area_id={row.original.area.id}&metric={selectedMetric}"

-->

{#if !colorScale}
	<span />
{:else if value}
	<span
		class={`text-right flex h-full justify-end p-2 items-center`}
		style={`background-color: ${colorScale(value)}; color: ${
			hsl(colorScale(value).toString()).l >= 0.6 ? '#000000' : '#FFFFFF'
		}`}
	>
		{f(value)}
	</span>
{/if}
