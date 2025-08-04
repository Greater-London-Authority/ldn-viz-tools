<script lang="ts">
	let { data } = $props();

	const PageComponent = $derived(data.component);
</script>

<div class="container mx-auto py-8">
	<h1 class="responsive headline">{data.metadata.title}</h1>
	<p class="responsive subhead mb-typography-spacing-xl">{data.metadata.description}</p>

	<PageComponent />
</div>
