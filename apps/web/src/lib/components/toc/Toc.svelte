<script module lang="ts">
	type TocMenuItem = {
		title: string;
		url: string;
		items: TocMenuItem[];
	};
</script>

<script lang="ts">
	import TocItem from './TocItem.svelte';

	interface TableOfContent {
		items?: TocMenuItem[];
	}

	let { toc }: { toc: TableOfContent } = $props();
</script>

{#if toc?.items?.length}
	<p class="product responsive label-sm mb-2">On this page</p>
	<ul class="border-color-ui-border-secondary border-l">
		{#each toc.items as { title, url, items }, index (index)}
			<TocItem {title} {url} {items} />
		{/each}
	</ul>
{/if}
