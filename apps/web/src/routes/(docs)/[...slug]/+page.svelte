<script lang="ts">
	import Toc from '$lib/components/toc/Toc.svelte';

	let { data } = $props();

	const PageComponent = $derived(data.component);
	const tocItems = $derived(data.metadata.toc);
</script>

<div class="prose responsive">
	<h2 class="title-lg format">{data.metadata.title}</h2>
	<p class="subtitle format">
		{data.metadata.description}
	</p>

	<PageComponent />
</div>

<aside class="sticky top-0 self-start">
	<Toc toc={{ items: tocItems }} />
</aside>
