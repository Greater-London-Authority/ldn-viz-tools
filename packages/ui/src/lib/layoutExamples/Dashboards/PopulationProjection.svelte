<script lang="ts">
	import { ArrowDownTray, ChartBar, Funnel } from '@steeze-ui/heroicons';

	import AppShell from '../../appShell/AppShell.svelte';

	import LogoCIU from '../../logos/LogoCIU.svelte';
	import LogoMayor from '../../logos/LogoMayor.svelte';
	import Overlay from '../../overlay/Overlay.svelte';

	import Sidebar from '../../sidebar/Sidebar.svelte';
	import SidebarFooter from '../../sidebar/elements/sidebarFooter/SidebarFooter.svelte';
	import SidebarHeader from '../../sidebar/elements/sidebarHeader/SidebarHeader.svelte';

	import Theme from '../../theme/Theme.svelte';
	import ThemeSwitcher from '../../theme/ThemeSwitcher.svelte';
	import { Demo1, Pop1, Sewers } from './demoTabs';

	const tabs = [
		{ id: 'projection', label: 'Projections', icon: ChartBar, content: Pop1 },
		{ id: 'filters', label: 'Filters', icon: Funnel, content: Demo1 },
		{ id: 'download', label: 'Downloads', icon: ArrowDownTray, content: Sewers }
	];
</script>

<!--Only need the theme in a story in an app this will be in the layout-->
<Theme />
<AppShell
	sidebarPlacement={{ initial: 'left' }}
	sidebarAlwaysOpen={{ initial: 'false', md: 'true' }}
>
	<svelte:fragment slot="main">
		<div class="bg-color-canvas-background-1 h-full p-6 pl-24">
			<div class="mb-4">
				<h1 class="text-2xl text-color-text-primary font-bold">This is the main content area</h1>
				<h2 class="text-xl text-color-text-secondary">
					Maecenas ut libero vel nibh maximus feugiat non sed tortor.
				</h2>
			</div>
		</div>
	</svelte:fragment>
	<Sidebar slot="sidebar" {tabs}>
		<!-- HEADER -->
		<SidebarHeader title="London's Population" slot="header">
			<svelte:fragment slot="subTitle">
				<p>London's 2022-based housing-led population projections, produced by GLA demography.</p>
			</svelte:fragment>
			<Overlay slot="hint" overlayType="modal" modalTitle="Modal Title">This is a modal.</Overlay>
		</SidebarHeader>

		<!-- FOOTER -->
		<SidebarFooter slot="footer">
			<div class="flex justify-between">
				<div class="w-[165px]"><LogoMayor /></div>
				<div class="w-[165px]"><LogoCIU /></div>
			</div>
			<svelte:fragment slot="menu">
				<div class="flex justify-between">
					<ul class="flex space-x-2">
						<li>View Cookie settings</li>
						<li>Privacy Policy</li>
					</ul>

					<ThemeSwitcher size="xs" />
				</div>
			</svelte:fragment>
		</SidebarFooter>
	</Sidebar>
</AppShell>
