<script module lang="ts">
	type TocMenuItem = {
		title: string;
		url: string;
		items: TocMenuItem[];
	};
</script>

<script lang="ts">
	import { onMount } from 'svelte';

	import TocItem from './TocItem.svelte';

	interface TableOfContent {
		items?: TocMenuItem[];
	}

	let { toc }: { toc: TableOfContent } = $props();

	///
	let scrollY = $state(0);

	let mounted = false;
	let activeUrl = $state('');

	const getUrls = (item: TocMenuItem): string[] => {
		return [item.url, ...item.items.flatMap((it) => getUrls(it))];
	};

	function computeCurrentSection(scrollY: number) {
		if (!mounted) return;

		const positions = (toc.items || [])
			?.flatMap((it) => getUrls(it))
			.map((url) => ({
				url,
				y: document.getElementById(url.slice(1))?.offsetTop ?? 0
			}));

		for (let i = 0; i < positions.length; i++) {
			const pos = positions[i].y;
			if (scrollY >= pos && (i === positions.length - 1 || scrollY < positions[i + 1].y)) {
				activeUrl = positions[i].url;
				return;
			}
		}
	}

	onMount(() => {
		mounted = true;
	});

	$effect(() => {
		computeCurrentSection(scrollY);
	});
</script>

<svelte:window bind:scrollY />

{#if toc?.items?.length}
	<div class="hidden min-w-[186px] 2xl:block">
		<aside class="sticky top-0">
			<p class="product label-sm responsive mb-4 pt-8">On this page</p>
			<ul class="border-l border-color-ui-border-secondary">
				{#each toc.items as { title, url, items }, index (index)}
					<TocItem {title} {url} {items} {activeUrl} />
				{/each}
			</ul>
		</aside>
	</div>
{/if}
