<script lang="ts">
	import MultipleLine from '$lib/components/charts/exampleCharts/lineCharts/MultipleLine.svelte';

	let { data } = $props();

	const PageComponent = $derived(data.component);
</script>

<h2 class="responsive headline not-prose !mb-0">{data.metadata.title}</h2>
<p class="responsive subtitle mb-typography-spacing-sm not-prose max-w-prose">
	{data.metadata.description}
</p>

<PageComponent />
