<script lang="ts">
	import type { Hst } from '@histoire/plugin-svelte';
	import { data } from '../../data/testData';
	import ColumnChart from './ColumnChart.svelte';
	export let Hst: Hst;
</script>

<Hst.Story title="Charts/ColumnChart">
	<Hst.Variant title="default">
		<ColumnChart {data} title="Column Chart" subTitle="subTitle" />
	</Hst.Variant>
</Hst.Story>
