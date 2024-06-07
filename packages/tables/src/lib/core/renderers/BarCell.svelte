<script lang="ts">
	import { format } from 'd3-format';

	export let value: string | number;
	export let color: string | undefined = 'red';
	export let formatString = '0.0f';

	export let extent = [0, 1]; // used to pass automatically extracted val
	export let domain; // allows extent to be over-ridden

	const formatPercent = format('0.0f');
	const scale = (val: number) => {
		if (domain) {
			return formatPercent((100 * (val - domain[0])) / (domain[1] - domain[0]));
		} else {
			return formatPercent((100 * (val - extent[0])) / (extent[1] - extent[0]));
		}
	};

	$: f = format(formatString);
</script>

<div class="p-1">
	<div class="bg-core-grey-200 h-full flex relative text-xs">
		<div
			style={`width:${scale(+value)}%; background-color:${color}`}
			class="h-full text-right absolute left-0"
		/>
		{#if +value <= 0.4}
			<div class="relative p-1 ml-1" style={`padding-left:${scale(+value)}%`}>
				{f(+value)}
			</div>
		{:else}
			<div class="relative p-1 text-right text-white" style={`width:${scale(+value)}%`}>
				{f(+value)}
			</div>
		{/if}
	</div>
</div>
