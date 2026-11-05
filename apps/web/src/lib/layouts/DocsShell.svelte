<script lang="ts">
	import { resolve } from '$app/paths';
	import { page } from '$app/state';
	import type { navigation as docsNavigation } from '$lib/navigation';
	import { AppShell, PageNav } from '@ldn-viz/ui';
	import type { Snippet } from 'svelte';
	import DocsSidebar from './DocsSidebar.svelte';

	let { children, navigation }: { children: Snippet; navigation: typeof docsNavigation } = $props();

	// An Array of all the pages
	const pages = $derived(navigation.flatMap((p) => [p, ...(p.children.length ? p.children : [])]));
</script>

<AppShell sidebarPlacement={{ initial: 'left' }} sidebarAlwaysOpen={{ initial: false, xl: true }}>
	{#snippet sidebar()}
		<DocsSidebar {navigation} />
	{/snippet}

	{#snippet main()}
		{@render children?.()}

		<!-- We cant wrap the whole content in a container,
		 but the page nav requires it's own -->
		<div class="container">
			<PageNav
				{pages}
				currentHref={page.data.metadata.slugFull}
				resolve={(url: string) => resolve(url, {})}
			/>
		</div>
	{/snippet}
</AppShell>
