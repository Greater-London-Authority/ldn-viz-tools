<script lang="ts">
	/**
	 * Test-only harness for AppShell.svelte.test.ts.
	 *
	 * `remountSidebar` lets a test destroy and recreate the <Sidebar> without
	 * destroying the parent <AppShell>, recreating what happens during an HMR
	 * update or a SvelteKit client-side navigation.
	 */
	import Sidebar from '../sidebar/Sidebar.svelte';
	import type { PlacementType, SidebarPlacement } from '../sidebar/types';
	import AppShell from './AppShell.svelte';

	interface Props {
		sidebarPlacement?: SidebarPlacement;
		/** Explicit placement passed through to <Sidebar>, if any. */
		placement?: PlacementType;
		remountSidebar?: boolean;
	}

	let { sidebarPlacement, placement = undefined, remountSidebar = false }: Props = $props();
</script>

<AppShell {sidebarPlacement}>
	{#snippet sidebar()}
		{#key remountSidebar}
			<Sidebar {placement} />
		{/key}
	{/snippet}
	{#snippet main()}
		<p>Main content</p>
	{/snippet}
</AppShell>
