<script lang="ts">
	export let value: string | number;

	export let table;
	export let colSpec;
</script>

<div class="flex items-center">
	<div
		class="flex-none w-4 h-4 mr-1"
		style={`background-color: ${table.scales ? table.scales[colSpec.short_label](value) : 'lightgrey'};`}
	></div>
	<div class="w-0 flex-auto overflow-hidden truncate items-center">{value}</div>
</div>
