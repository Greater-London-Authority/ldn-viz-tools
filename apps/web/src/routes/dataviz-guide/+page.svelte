<script lang="ts">
	let { data } = $props();
	const PageComponent = $derived(data.component);
</script>

<h2 class="responsive headline format">{data.metadata.title}</h2>
<p class="responsive subtitle">
	{data.metadata.description}
</p>

<PageComponent />
