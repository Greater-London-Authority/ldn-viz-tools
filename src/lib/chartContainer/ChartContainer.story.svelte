<script lang="ts">
	import type { Hst } from '@histoire/plugin-svelte';
	import { data } from '../../data/testData';
	import Container from './ChartContainer.svelte';
	export let Hst: Hst;
</script>

<Hst.Story title="Container">
	<Hst.Variant title="default">
		<Container {data} title="Inherit this title" subTitle="inherit this subtitle"
			>Viz Element</Container
		>
	</Hst.Variant>
</Hst.Story>
