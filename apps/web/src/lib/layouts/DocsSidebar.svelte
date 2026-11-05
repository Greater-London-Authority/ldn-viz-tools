<script lang="ts">
	import { resolve } from '$app/paths';
	import { page } from '$app/state';
	import { siteMenu } from '$lib/siteMenu';
	import { breakPoint, sidebarState } from '$lib/state.svelte';
	import { resolveNavItems } from '$lib/utils';

	import { findActiveItem, NavigationMenu, Sidebar, SidebarSection } from '@ldn-viz/ui';

	let { navigation } = $props();

	let activeMenuItem = $derived(findActiveItem(navigation, page, resolve));
	let activeSiteMenuItem = $derived(findActiveItem(siteMenu, page, resolve));
</script>

<Sidebar sidebarId="sideNav" theme="light" bind:state={sidebarState.state} width={'slim'}>
	{#snippet sections()}
		<SidebarSection>
			{#if breakPoint.current <= 768}
				<NavigationMenu
					items={resolveNavItems(siteMenu, resolve)}
					orientation="horizontal"
					ariaLabel="main menu"
					activeMenuItemId={activeSiteMenuItem?.id}
				/>
			{/if}

			<NavigationMenu
				items={resolveNavItems(navigation, resolve)}
				ariaLabel="SiteNavigation"
				activeMenuItemId={activeMenuItem?.id}
			/>
		</SidebarSection>
	{/snippet}
</Sidebar>
