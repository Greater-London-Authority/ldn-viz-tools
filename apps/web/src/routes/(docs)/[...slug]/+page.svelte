<script lang="ts">
	import Toc from '$lib/components/toc/Toc.svelte';

	let { data } = $props();

	const PageComponent = $derived(data.component);
	const tocItems = $derived(data.metadata.toc);
</script>

<div class="prose responsive">
	<div class="my-typography-spacing-xl">
		<p class="mb-0.5 text-xs uppercase tracking-widest text-color-ui-primary">Design system</p>
		<h1 class="headline format">{data.metadata.title}</h1>
		<p class="subhead format">
			{data.metadata.description}
		</p>
	</div>
	<PageComponent />
</div>

<Toc toc={{ items: tocItems }} />
