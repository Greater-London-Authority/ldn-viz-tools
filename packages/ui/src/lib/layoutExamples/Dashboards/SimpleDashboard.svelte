<script lang="ts">
	import AppShell from '../../appShell/AppShell.svelte';
	import Header from '../../header/Header.svelte';
	import HeaderItem from '../../header/HeaderItem.svelte';
	import HeaderRight from '../../header/HeaderRight.svelte';
	import HeaderTitle from '../../header/HeaderTitle.svelte';
	import LogoCIU from '../../logos/LogoCIU.svelte';
	import LogoMayor from '../../logos/LogoMayor.svelte';
	import Sidebar from '../../sidebar/Sidebar.svelte';
	import SidebarFooter from '../../sidebar/elements/sidebarFooter/SidebarFooter.svelte';
	import SidebarHeader from '../../sidebar/elements/sidebarHeader/SidebarHeader.svelte';
	import ThemeSwitcher from '../../theme/ThemeSwitcher.svelte';
	import { Demo1 } from './demoTabs';

	import NavigationMenu from '../../navigationMenu/NavigationMenu.svelte';

	let mainMenu = [
		{ title: 'Design System', id: 'design-system-docs', href: '/design-system' },
		{ title: 'Contact', id: 'contact', href: '/' }
	];
</script>

<Header>
	<HeaderTitle>Simple Header</HeaderTitle>
	<HeaderRight>
		<HeaderItem>
			<NavigationMenu items={mainMenu} orientation="horizontal" ariaLabel="main menu" />
		</HeaderItem>
	</HeaderRight>
</Header>
<AppShell>
	{#snippet main()}
		<div class="bg-color-canvas-background-1 h-full p-6">
			<div class="mb-4">
				<h1 class="title-lg responsive">This is the main content area</h1>
				<h2 class="subtitle responsive font-normal">
					Maecenas ut libero vel nibh maximus feugiat non sed tortor.
				</h2>
			</div>
		</div>
	{/snippet}

	{#snippet sidebar()}
		<Sidebar>
			<!-- HEADER -->
			{#snippet header()}
				<SidebarHeader title="Main sidebar title">
					{#snippet subTitle()}
						<p>Maecenas ut libero vel nibh maximus feugiat non sed tortor.</p>
					{/snippet}
				</SidebarHeader>
			{/snippet}

			<!-- SECTIONS -->
			{#snippet sections()}
				<Demo1 />
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
