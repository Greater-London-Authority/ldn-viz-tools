<script lang="ts">
	import { ArrowDownTray, ChartBar, Funnel } from '@steeze-ui/heroicons';
	import AppShell from '../../appShell/AppShell.svelte';
	import LogoCIU from '../../logos/LogoCIU.svelte';
	import LogoMayor from '../../logos/LogoMayor.svelte';
	import Sidebar from '../../sidebar/Sidebar.svelte';
	import SidebarFooter from '../../sidebar/elements/sidebarFooter/SidebarFooter.svelte';
	import SidebarHeader from '../../sidebar/elements/sidebarHeader/SidebarHeader.svelte';
	import ThemeSwitcher from '../../theme/ThemeSwitcher.svelte';

	import CookieControlSettings from '../../analytics/CookieControlSettings.svelte';
	import PrivacyPolicyLink from '../../sidebar/elements/sidebarFooter/PrivacyPolicyLink.svelte';
	import { Demo1, Leggi, Sewers } from './demoTabs';

	const tabs = [
		{ id: 'projection', label: 'Projections', icon: ChartBar, content: Leggi },
		{ id: 'filters', label: 'Filters', icon: Funnel, content: Demo1 },
		{ id: 'download', label: 'Downloads', icon: ArrowDownTray, content: Sewers }
	];
</script>

<AppShell sidebarPlacement={{ initial: 'left' }} sidebarAlwaysOpen={{ initial: false, md: true }}>
	{#snippet main()}
		<div class="bg-color-canvas-background-1 h-full p-6 pl-24">
			<div class="mb-4">
				<h1 class="text-color-text-primary text-2xl font-bold">This is the main content area</h1>
				<h2 class="text-color-text-secondary text-xl">
					Maecenas ut libero vel nibh maximus feugiat non sed tortor.
				</h2>
			</div>
		</div>
	{/snippet}

	{#snippet sidebar()}
		<Sidebar {tabs}>
			<!-- HEADER -->
			{#snippet header()}
				<SidebarHeader title="LEGGI Data Explorer">
					{#snippet subTitle()}
						<p>
							The London Energy and Greenhouse Gas Inventory (LEGGI) monitors the energy used and
							greenhouse gas emissions produced in London every year.
						</p>
					{/snippet}
				</SidebarHeader>
			{/snippet}

			<!-- FOOTER -->
			{#snippet footer()}
				<SidebarFooter>
					<div class="flex justify-between">
						<div class="w-[165px]"><LogoMayor /></div>
						<div class="w-[165px]"><LogoCIU /></div>
					</div>
					{#snippet menu()}
						<div class="flex justify-between">
							<ul class="flex space-x-2">
								<li><CookieControlSettings size="sm" /></li>
								<li><PrivacyPolicyLink size="sm" /></li>
							</ul>

							<ThemeSwitcher size="xs" />
						</div>
					{/snippet}
				</SidebarFooter>
			{/snippet}
		</Sidebar>
	{/snippet}
</AppShell>
