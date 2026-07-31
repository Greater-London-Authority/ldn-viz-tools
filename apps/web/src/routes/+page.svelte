<script lang="ts">
	let { data } = $props();

	const PageComponent = $derived(data.component);
</script>

<div class="container mx-auto py-8">
	<div class="prose flow-prose">
		<h1 class="display mt-3">{data.metadata.title}</h1>
		<PageComponent />
	</div>
</div>
