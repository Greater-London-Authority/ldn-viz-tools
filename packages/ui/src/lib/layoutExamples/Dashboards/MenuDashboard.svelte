<script lang="ts">
	import AppShell from '../../appShell/AppShell.svelte';
	import LogoCIU from '../../logos/LogoCIU.svelte';
	import LogoMayor from '../../logos/LogoMayor.svelte';
	import NavigationMenu from '../../navigationMenu/NavigationMenu.svelte';
	import Sidebar from '../../sidebar/Sidebar.svelte';
	import SidebarFooter from '../../sidebar/elements/sidebarFooter/SidebarFooter.svelte';
	import SidebarHeader from '../../sidebar/elements/sidebarHeader/SidebarHeader.svelte';
	import SidebarSection from '../../sidebar/elements/sidebarSection/SidebarSection.svelte';
	import ThemeSwitcher from '../../theme/ThemeSwitcher.svelte';

	let subMenu = [
		{ title: 'Accessibility', id: 'accessibility', href: '#accessibility' },
		{ title: 'Brand', id: 'brand', href: '/' },
		{ title: 'Color', id: 'color', href: '/' },
		{ title: 'Typography', id: 'typography', href: '/' },
		{ title: 'Spacing', id: 'spacing', href: '/' },
		{ title: 'Design Tokens', id: 'design-tokens', href: '/' }
	];

	let subMenuNoLinks = [
		{
			title: 'Accessibility',
			id: 'accessibility-nl',
			href: '',
			children: subMenu.map((i) => ({ ...i, id: `a-${i.id}` }))
		},
		{
			title: 'Brand',
			id: 'brand-nl',
			href: '',
			children: subMenu.map((i) => ({ ...i, id: `b-${i.id}` }))
		},
		{
			title: 'Color',
			id: 'color-nl',
			href: '',
			children: subMenu.map((i) => ({ ...i, id: `c-${i.id}` }))
		},
		{
			title: 'Typography',
			id: 'typography-nl',
			href: '',
			children: subMenu.map((i) => ({ ...i, id: `d-${i.id}` }))
		},
		{
			title: 'Spacing',
			id: 'spacing-nl',
			href: '',
			children: subMenu.map((i) => ({ ...i, id: `e-${i.id}` }))
		},
		{
			title: 'Design Tokens',
			id: 'tokens-nl',
			href: '',
			children: subMenu.map((i) => ({ ...i, id: `f-${i.id}` }))
		}
	];
</script>

<AppShell sidebarPlacement={{ initial: 'left' }}>
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
				<SidebarSection>
					<NavigationMenu ariaLabel="no links" items={subMenuNoLinks} />
				</SidebarSection>
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
