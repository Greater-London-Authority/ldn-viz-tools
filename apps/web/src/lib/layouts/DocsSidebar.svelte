<script lang="ts">
	import { NavigationMenu, Sidebar, SidebarSection } from '@ldn-viz/ui';

	let { navigation } = $props();
</script>

<Sidebar theme="light">
	{#snippet sections()}
		<SidebarSection>
			<NavigationMenu items={navigation} ariaLabel="SiteNavigation" />
		</SidebarSection>
	{/snippet}
</Sidebar>

<!-- <div class="w-96">
	<NavigationMenu items={navigation} ariaLabel="SiteNavigation" />
</div> -->
