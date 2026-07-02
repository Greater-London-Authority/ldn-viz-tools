<script lang="ts">
	import { resolve } from '$app/paths';
	import { page } from '$app/state';
	import { breakPoint, sidebarState } from '$lib/state.svelte';

	import { findActiveItem, NavigationMenu, Sidebar, SidebarSection } from '@ldn-viz/ui';

	let { navigation } = $props();

	let activeMenuItem = $derived(findActiveItem(navigation, page, resolve));

	let mainMenu = [{ title: 'Design System', id: 'design-system-docs', href: '/design-system' }];
</script>

<Sidebar sidebarId="sideNav" theme="light" bind:state={sidebarState.state}>
	{#snippet sections()}
		<SidebarSection>
			{#if breakPoint.current <= 768}
				<NavigationMenu
					items={mainMenu}
					orientation="horizontal"
					ariaLabel="main menu"
					activeMenuItemId={activeMenuItem?.id}
				/>
			{/if}

			<NavigationMenu
				items={navigation}
				ariaLabel="SiteNavigation"
				activeMenuItemId={activeMenuItem?.id}
			/>
		</SidebarSection>
	{/snippet}
</Sidebar>
