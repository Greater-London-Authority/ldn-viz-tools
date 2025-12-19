<script lang="ts">
	let { data } = $props();

	const PageComponent = $derived(data.component);
</script>

<h2 class="title-lg format">{data.metadata.title}</h2>
<p class="subtitle format">
	{data.metadata.description}
</p>

<PageComponent />
