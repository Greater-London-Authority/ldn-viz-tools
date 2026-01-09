<script lang="ts">
	let { data } = $props();

	const PageComponent = $derived(data.component);
</script>

<!-- TODO: this might be better as standalone page not from markdown -->
<div class="container mx-auto py-8">
	<div class="prose responsive max-w-full">
		<h1 class="headline format">{data.metadata.title}</h1>
		<p class="subhead format">{data.metadata.description}</p>

		<PageComponent />
	</div>
</div>
