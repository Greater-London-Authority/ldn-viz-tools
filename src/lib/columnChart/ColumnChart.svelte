<script lang="ts">
	import AxisX from '$lib/shared/AxisX.svelte';
	import AxisY from '$lib/shared/AxisY.svelte';
	import Column from '$lib/shared/Column.svelte';
	import Container from '../chartContainer/ChartContainer.svelte';

	export let data: { [key: string]: any }[];
	export let title: string | null = null;
	export let subTitle: string | null = null;
	export let alt: string | null = null;
	export let footer: boolean = false;
	export let exportBtns: boolean = false;
</script>

<Container {data} {title} {subTitle} {alt} {footer} {exportBtns}>
	<AxisX />
	<AxisY />
	<Column />
</Container>
