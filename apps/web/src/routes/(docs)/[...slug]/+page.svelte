<script lang="ts">
	import Toc from '$lib/components/toc/Toc.svelte';

	let { data } = $props();

	const PageComponent = $derived(data.component);
	const tocItems = $derived(data.metadata.toc);
</script>

<!-- TODO: adding container her is of course restrictive to items that may want to break out of the column -->
<div class="prose responsive container p-0">
	<div class="my-typography-spacing-xl">
		<p class="text-color-ui-primary mb-0.5 text-xs uppercase tracking-widest">Design system</p>
		<h1 class="headline format">{data.metadata.title}</h1>
		<p class="subhead format">
			{data.metadata.description}
		</p>
	</div>
	<PageComponent />
</div>

<Toc toc={{ items: tocItems }} />
