<script lang="ts">
	import { ArrowDownTray, ChartBar, Funnel, MapPin } from '@steeze-ui/heroicons';

	import AppShell from '../../appShell/AppShell.svelte';

	import LogoCIU from '../../logos/LogoCIU.svelte';
	import LogoMayor from '../../logos/LogoMayor.svelte';
	import Overlay from '../../overlay/Overlay.svelte';

	import Sidebar from '../../sidebar/Sidebar.svelte';
	import SidebarFooter from '../../sidebar/elements/sidebarFooter/SidebarFooter.svelte';
	import SidebarHeader from '../../sidebar/elements/sidebarHeader/SidebarHeader.svelte';
	import ThemeSwitcher from '../../theme/ThemeSwitcher.svelte';
	import { Demo1, Sewers } from './demoTabs';

	let tabs = [
		{ id: 'sewers', label: 'Sewers', icon: ChartBar, content: Sewers },
		{ id: 'monitoring', label: 'Monitoring', icon: Funnel, content: Demo1 },
		{ id: 'swimming', label: 'Swimming', icon: ArrowDownTray, content: Sewers },
		{ id: 'context', label: 'Context', icon: MapPin, content: Demo1 }
	];
</script>

<AppShell sidebarPlacement={{ initial: 'right' }} sidebarAlwaysOpen={{ initial: false, md: true }}>
	{#snippet main()}
		<div class="bg-color-canvas-background-1 h-full p-6 pr-24">
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
				<SidebarHeader title="London's River Health">
					{#snippet subTitle()}
						<p>How healthy is your local river?</p>
					{/snippet}

					{#snippet hint()}
						<Overlay overlayType="modal" modalTitle="Modal Title">This is a modal.</Overlay>
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
								<li>View Cookie settings</li>
								<li>Privacy Policy</li>
							</ul>

							<ThemeSwitcher size="xs" />
						</div>
					{/snippet}
				</SidebarFooter>
			{/snippet}
		</Sidebar>
	{/snippet}
</AppShell>
