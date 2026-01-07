<script lang="ts">
	let { data } = $props();

	const PageComponent = $derived(data.component);
</script>

<div class="container mx-auto py-8">
	<div class="prose max-w-full">
		<h1 class="responsive headline format">{data.metadata.title}</h1>
		<p class="responsive subhead format">{data.metadata.description}</p>

		<PageComponent />
	</div>
</div>
