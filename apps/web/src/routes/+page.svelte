<script lang="ts">
	let { data } = $props();

	const PageComponent = $derived(data.component);
</script>

<div class="container mx-auto py-8">
	<div class="prose max-w-full">
		<h1 class="headline responsive format">{data.metadata.title}</h1>
		<p class="subhead responsive format">{data.metadata.description}</p>

		<PageComponent />
	</div>
</div>
