<script lang="ts">
	/**
	 * Test-only harness for AppShell.svelte.test.ts.
	 *
	 * `remountSidebar` lets a test destroy and recreate the <Sidebar> while the
	 * <AppShell> around it stays alive. That is the condition an HMR update or a
	 * SvelteKit client-side navigation produces, and the one that used to leave
	 * the sidebar on the wrong side of the screen.
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
