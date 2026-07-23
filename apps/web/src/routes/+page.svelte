<script lang="ts">
	let { data } = $props();

	const PageComponent = $derived(data.component);
</script>

<div class="container mx-auto py-8">
	<div class="flow-prose prose">
		<h1 class="display mt-typography-spacing-sm">{data.metadata.title}</h1>
		<PageComponent />
	</div>
</div>
