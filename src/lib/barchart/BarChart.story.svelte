<script lang="ts">
	import type { Hst } from '@histoire/plugin-svelte';
	import { data } from '../../data/testData';
	import BarChart from './BarChart.svelte';
	export let Hst: Hst;
</script>

<Hst.Story title="Charts/BarChart">
	<Hst.Variant title="default"><BarChart {data} xKey="year" yKey="value" /></Hst.Variant>
	<Hst.Variant title="with title"
		><BarChart {data} xKey="year" yKey="value" title="Chart Title" /></Hst.Variant
	>
</Hst.Story>
