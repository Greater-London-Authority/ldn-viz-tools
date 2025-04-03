<script lang="ts">
	import AppShell from '../../appShell/AppShell.svelte';
	import ListMenu from '../../listMenu/ListMenu.svelte';
	import LogoCIU from '../../logos/LogoCIU.svelte';
	import LogoMayor from '../../logos/LogoMayor.svelte';
	import Sidebar from '../../sidebar/Sidebar.svelte';
	import SidebarFooter from '../../sidebar/elements/sidebarFooter/SidebarFooter.svelte';
	import SidebarHeader from '../../sidebar/elements/sidebarHeader/SidebarHeader.svelte';
	import SidebarSection from '../../sidebar/elements/sidebarSection/SidebarSection.svelte';
	import Theme from '../../theme/Theme.svelte';
	import ThemeSwitcher from '../../theme/ThemeSwitcher.svelte';

	let subMenu = [
		{ title: 'Accessibility', id: 'accessibility', url: '#accessibility' },
		{ title: 'Brand', id: 'brand', url: '/' },
		{ title: 'Color', id: 'color', url: '/' },
		{ title: 'Typography', id: 'typography', url: '/' },
		{ title: 'Spacing', id: 'spacing', url: '/' },
		{ title: 'Design Tokens', id: 'design-tokens', url: '/' }
	];

	let subMenuNoLinks = [
		{
			title: 'Accessibility',
			id: 'accessibility-nl',
			url: '',
			children: subMenu.map((i) => ({ ...i, id: `a-${i.id}` }))
		},
		{
			title: 'Brand',
			id: 'brand-nl',
			url: '',
			children: subMenu.map((i) => ({ ...i, id: `b-${i.id}` }))
		},
		{
			title: 'Color',
			id: 'color-nl',
			url: '',
			children: subMenu.map((i) => ({ ...i, id: `c-${i.id}` }))
		},
		{
			title: 'Typography',
			id: 'typography-nl',
			url: '',
			children: subMenu.map((i) => ({ ...i, id: `d-${i.id}` }))
		},
		{
			title: 'Spacing',
			id: 'spacing-nl',
			url: '',
			children: subMenu.map((i) => ({ ...i, id: `e-${i.id}` }))
		},
		{
			title: 'Design Tokens',
			id: 'tokens-nl',
			url: '',
			children: subMenu.map((i) => ({ ...i, id: `f-${i.id}` }))
		}
	];
</script>

<!--Only need the theme in a story in an app this will be in the layout-->
<Theme />

<AppShell sidebarPlacement={{ initial: 'left' }}>
	<svelte:fragment slot="main">
		<div class="bg-color-canvas-background-1 h-full p-6">
			<div class="mb-4">
				<h1 class="title-lg responsive">This is the main content area</h1>
				<h2 class="subtitle responsive font-normal">
					Maecenas ut libero vel nibh maximus feugiat non sed tortor.
				</h2>
			</div>
		</div>
	</svelte:fragment>
	<Sidebar slot="sidebar">
		<!-- HEADER -->
		<SidebarHeader title="Main sidebar title" slot="header">
			<svelte:fragment slot="subTitle">
				<p>Maecenas ut libero vel nibh maximus feugiat non sed tortor.</p>
			</svelte:fragment>
		</SidebarHeader>

		<!-- SECTIONS -->
		<svelte:fragment slot="sections">
			<SidebarSection>
				<ListMenu ariaLabel="no links" items={subMenuNoLinks} />
			</SidebarSection>
		</svelte:fragment>

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
