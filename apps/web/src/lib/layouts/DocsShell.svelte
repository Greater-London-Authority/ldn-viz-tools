<script lang="ts">
	import PageNav from '$lib/components/pageNav/PageNav.svelte';
	import { AppShell } from '@ldn-viz/ui';
	import DocsSidebar from './DocsSidebar.svelte';

	let { children, navigation } = $props();
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
			<PageNav />
		</div>
	{/snippet}
</AppShell>
