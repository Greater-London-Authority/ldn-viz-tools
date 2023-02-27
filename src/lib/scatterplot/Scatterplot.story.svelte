<script lang="ts">
	import type { Hst } from '@histoire/plugin-svelte';
	import { data } from '../../data/testData';
	import Scatterplot from './Scatterplot.svelte';
	export let Hst: Hst;
</script>

<Hst.Story title="ldn-viz/Scatterplot">
	<Hst.Variant title="default"><Scatterplot {data} xKey="year" yKey="value" /></Hst.Variant>
	<Hst.Variant title="with title"
		><Scatterplot {data} xKey="year" yKey="value" title="Chart Title" /></Hst.Variant
	>
</Hst.Story>
