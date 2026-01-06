<script lang="ts">
	import Toc from '$lib/components/toc/Toc.svelte';

	let { data } = $props();

	const PageComponent = $derived(data.component);
	const tocItems = $derived(data.metadata.toc);
</script>

<div class="prose responsive">
	<div class="my-typography-spacing-xl">
		<h1 class="headline format">{data.metadata.title}</h1>
		<p class="subhead format">
			{data.metadata.description}
		</p>
	</div>
	<PageComponent />
</div>

<div class="hidden min-w-[186px] 2xl:block">
	<aside class="sticky top-0">
		<Toc toc={{ items: tocItems }} />
	</aside>
</div>
