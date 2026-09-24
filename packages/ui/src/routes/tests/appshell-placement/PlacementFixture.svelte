<script lang="ts">
	/**
	 * Fixture for tests/appShellPlacement.test.ts.
	 *
	 * Lives under src/routes (the package's own dev/preview app) rather than
	 * src/lib, so it is never published: `svelte-package` builds dist/ from
	 * src/lib only.
	 */
	import AppShell from '$lib/appShell/AppShell.svelte';
	import Sidebar from '$lib/sidebar/Sidebar.svelte';
	import { getSidebarState } from '$lib/sidebar/sidebarState.svelte';
	import type { SidebarPlacement } from '$lib/sidebar/types';

	interface Props {
		sidebarPlacement: SidebarPlacement;
		/** Route to link to, so the test can trigger a client-side navigation. */
		otherHref: string;
	}

	let { sidebarPlacement, otherHref }: Props = $props();
</script>

{#snippet probe()}
	{@const sidebarState = getSidebarState()}
	<!-- Surfaces the resolved placement so the test can assert on it directly. -->
	<span data-testid="placement">{sidebarState.placement}</span>
{/snippet}

<!-- Starts closed so the sidebar does not overlay the navigation link, and so
     the test can exercise the first open *after* a navigation. -->
<AppShell {sidebarPlacement} startOpen={false}>
	{#snippet sidebar()}
		<Sidebar />
	{/snippet}
	{#snippet main()}
		{@render probe()}
		<!-- The href arrives as a prop, so it cannot be resolved statically. These
			are fixture routes in the package's own dev app, never a published base. -->
		<!-- eslint-disable-next-line svelte/no-navigation-without-resolve -->
		<a href={otherHref} data-testid="nav">Go to the other page</a>
	{/snippet}
</AppShell>
