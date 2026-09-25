<script lang="ts">
	import {
		AppShell,
		Breadcrumbs,
		Footer,
		Header,
		HeaderItem,
		HeaderRight,
		HeaderTitle,
		NavigationMenu,
		Sidebar
	} from '@ldn-viz/ui';
	import TypographySample from '../../content/TypographySample.svelte';
	import { navItems } from '../DemoData/navItems';

	let mainMenu = [
		{ title: 'Design System', id: 'design-system-docs', href: '/design-system' },
		{ title: 'Contact', id: 'contact', href: '/' }
	];

	const breadcrumbs = [
		{ label: 'Home', href: '/' },
		{ label: 'Documentation', href: '/' },
		{ label: 'Foundations', href: '/' }
	];
</script>

<Header>
	<HeaderTitle>App title</HeaderTitle>
	<HeaderRight>
		<HeaderItem>
			<NavigationMenu items={mainMenu} orientation="horizontal" ariaLabel="main menu" />
		</HeaderItem>
	</HeaderRight>
</Header>

<AppShell sidebarPlacement={{ initial: 'left' }} sidebarAlwaysOpen={{ md: true }}>
	{#snippet main()}
		<div class="container flow-prose mx-auto h-full bg-color-canvas py-6">
			<Breadcrumbs {breadcrumbs} />

			<div class="grid-gutter flex">
				<div class="w-full">
					<TypographySample />
				</div>

				<div class="sticky top-4 hidden w-1/3 self-start lg:flex">TODO: TOC</div>
			</div>
		</div>
	{/snippet}

	{#snippet sidebar()}
		<Sidebar width="slim" theme="light">
			<!-- NO HEADER -->

			<!-- SECTIONS -->
			<!-- A sticky nav need to utilise the unstyledContentSnippet -->
			{#snippet unstyledContent()}
				<div class="sticky top-0 px-6 pt-6">
					<NavigationMenu items={navItems} ariaLabel="report navigation" />
				</div>
			{/snippet}

			<!--NO FOOTER -->
		</Sidebar>
	{/snippet}
</AppShell>

<Footer showCiuLogo>
	<div class="product flex flex-col gap-1">
		<p class="label">Documentation</p>
		<p class="body-sm text-color-text-muted">
			An example layout from the London City Data design system.
		</p>
	</div>
</Footer>
