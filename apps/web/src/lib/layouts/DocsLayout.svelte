<script lang="ts">
	import PageNav from '$lib/components/pageNav/PageNav.svelte';
	import { AppShell } from '@ldn-viz/ui';
	import DocsSidebar from './DocsSidebar.svelte';

	let { children, navigation } = $props();
</script>

<AppShell
	sidebarPlacement={{ initial: 'left' }}
	sidebarAlwaysOpen={{ initial: false, '2xl': true }}
>
	{#snippet sidebar()}
		<DocsSidebar {navigation} />
	{/snippet}

	{#snippet main()}
		{@render children?.()}

		<div class="container mx-auto">
			<PageNav />
		</div>
	{/snippet}
</AppShell>
