<script lang="ts">
	let { data } = $props();
	const PageComponent = $derived(data.component);
</script>

<h2 class="headline">{data.metadata.title}</h2>
<p class="subtitle">
	{data.metadata.description}
</p>

<PageComponent />
