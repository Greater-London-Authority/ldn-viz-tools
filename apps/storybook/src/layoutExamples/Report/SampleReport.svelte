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
		{ label: 'Reports', href: '/' },
		{ label: 'State of London', href: '/' }
	];
</script>

<Header>
	<HeaderTitle>A sample report</HeaderTitle>
	<HeaderRight>
		<HeaderItem>
			<NavigationMenu items={mainMenu} orientation="horizontal" ariaLabel="main menu" />
		</HeaderItem>
	</HeaderRight>
</Header>

<!-- TODO: Banner Header -->
<!-- TODO: Proper Svelte Image -->

<section>
	<div class="relative">
		<div class="absolute inset-0">
			<picture class="absolute inset-0">
				<source
					media="(max-width: 1280px)"
					srcSet={`https://images.unsplash.com/photo-1513635269975-59663e0ac1ad?ixlib=rb-1.2.1&amp;ixid=eyJhcHBfaWQiOjEyMDd9&amp;auto=format&amp;fit=crop&amp;w=1000&amp;q=80
 1280w`}
					sizes="1280px"
				/>
				<source
					srcSet={`https://images.unsplash.com/photo-1513635269975-59663e0ac1ad?ixlib=rb-1.2.1&amp;ixid=eyJhcHBfaWQiOjEyMDd9&amp;auto=format&amp;fit=crop&amp;w=1000&amp;q=80 2480w`}
					sizes="2480px"
				/>

				<!-- svelte-ignore a11y_img_redundant_alt -->
				<img
					src={`https://images.unsplash.com/photo-1513635269975-59663e0ac1ad?ixlib=rb-1.2.1&amp;ixid=eyJhcHBfaWQiOjEyMDd9&amp;auto=format&amp;fit=crop&amp;w=1000&amp;q=80`}
					alt="Decorative header image of London"
					class="h-full w-full object-cover object-bottom"
				/>
			</picture>

			<div
				class="absolute inset-0 bg-gradient-to-r from-black/70 to-transparent"
				aria-hidden="true"
			></div>
		</div>

		<div class="md:px-4">
			<div
				class="container relative mx-auto flex h-full items-center pb-48 pt-24 xl:pb-64 xl:pt-32"
			>
				<div class="flow-prose prose">
					<h1 class="headline text-color-static-white">A Sample Report</h1>
					<p class="subhead text-color-static-white">Explore measures and performance in London</p>
				</div>
			</div>
		</div>
	</div>
</section>

<div
	class="container relative mx-auto -mt-24 border-t-[6px] border-color-surface-accent bg-color-canvas p-0 xl:-mt-32"
>
	<AppShell sidebarPlacement={{ initial: 'left' }} sidebarAlwaysOpen={{ md: true }}>
		{#snippet main()}
			<div class="flow-prose h-full bg-color-canvas py-4 pl-4 pr-0 xl:pl-8 2xl:pl-16">
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
				{#snippet sections()}
					<NavigationMenu items={navItems} ariaLabel="report navigation" />
				{/snippet}

				<!--NO FOOTER -->
			</Sidebar>
		{/snippet}
	</AppShell>
</div>
<Footer showCiuLogo>
	<div class="product flex flex-col gap-1">
		<p class="label">Report</p>
		<p class="body-sm text-color-text-muted">
			An example layout from the London City Data design system.
		</p>
	</div>
</Footer>
