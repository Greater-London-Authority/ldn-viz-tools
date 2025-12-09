<script lang="ts">
	let { data } = $props();

	const PageComponent = $derived(data.component);
</script>

<div class="py-typography-spacing-xl">
	<h2 class="responsive headline not-prose !mb-0">{data.metadata.title}</h2>
	<p class="responsive subtitle mb-typography-spacing-sm not-prose max-w-prose">
		{data.metadata.description}
	</p>

	<PageComponent />
</div>
