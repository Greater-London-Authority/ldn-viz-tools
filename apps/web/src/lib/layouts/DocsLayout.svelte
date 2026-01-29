<script lang="ts">
	import PageNav from '$lib/components/pageNav/PageNav.svelte';
	import { AppShell } from '@ldn-viz/ui';
	import DocsSidebar from './DocsSidebar.svelte';

	let { children, navigation } = $props();
</script>

<AppShell sidebarPlacement={{ initial: 'left' }} sidebarAlwaysOpen={{ initial: false, md: true }}>
	{#snippet sidebar()}
		<DocsSidebar {navigation} />
	{/snippet}

	{#snippet main()}
		<div class="flex space-x-24 p-4 lg:p-8">
			{@render children?.()}
		</div>
		<PageNav />
	{/snippet}
</AppShell>
