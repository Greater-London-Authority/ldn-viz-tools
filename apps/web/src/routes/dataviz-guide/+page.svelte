<script lang="ts">
	let { data } = $props();
	const PageComponent = $derived(data.component);
</script>

<h2 class="headline responsive format">{data.metadata.title}</h2>
<p class="subtitle responsive">
	{data.metadata.description}
</p>

<PageComponent />
