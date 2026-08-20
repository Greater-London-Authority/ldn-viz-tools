<script lang="ts">
	import { asset, resolve } from '$app/paths';
	import { page } from '$app/state';

	import { afterNavigate, beforeNavigate } from '$app/navigation';

	import { breakPoint, sidebarState } from '$lib/state.svelte';
	import { resolveNavItems } from '$lib/utils';
	import {
		AnalyticsAndCookieConsent,
		Button,
		findActiveItem,
		Footer,
		Header,
		HeaderItem,
		HeaderRight,
		HeaderTitle,
		NavigationMenu,
		PageMetadata,
		Theme
	} from '@ldn-viz/ui';
	import { Bars3, XMark } from '@steeze-ui/heroicons';
	import { Icon } from '@steeze-ui/svelte-icon';
	import '../app.postcss';

	let mainMenu = [
		{ title: 'Design System', id: 'design-system-docs', href: '/design-system' }
		// { title: 'Contact', id: 'contact', href: '/contact' }
	];

	let { children } = $props();

	let activeMenuItem = $derived(findActiveItem(mainMenu, page, resolve));

	$effect(() => {
		sidebarState.state.isOpen = breakPoint.current >= 1280;
	});

	beforeNavigate(() => {
		document.documentElement.classList.add('disable-smooth-scroll');
	});

	afterNavigate(() => {
		requestAnimationFrame(() => {
			document.documentElement.classList.remove('disable-smooth-scroll');
		});
	});

	afterNavigate(() => (sidebarState.state.isOpen = breakPoint.current >= 1280));
</script>

<PageMetadata
	title="London City Data"
	description="We build data applications that help Londoners get access to the data they need, and support policy makers to make data driven decisions to improve London for all."
	url={`https://apps.london.gov.uk/city-data`}
	image="https://apps.london.gov.uk/city-data/preview.png"
	imageAlt="London City Data"
	favicon={asset('/favicon.ico')}
/>

<svelte:head>
	<script>
		window.ldnVizCivicApiKey = 'b08bca6362c188d40519ea5501ffd4a94d8003dc';
		window.ldnVizCivicAppName = 'ldn-city-data';
	</script>

	<link rel="preconnect" href="https://fonts.googleapis.com" />
	<link rel="preconnect" href="https://fonts.gstatic.com" crossorigin />
	<link
		href="https://fonts.googleapis.com/css2?family=Inter:wght@100..900&display=swap"
		rel="stylesheet"
		crossorigin="anonymous"
	/>
</svelte:head>

<AnalyticsAndCookieConsent />

<Theme />

<svelte:window bind:innerWidth={breakPoint.current} />

<div class="flex min-h-dvh flex-col bg-color-surface">
	<Header>
		{#if page.data.metadata?.slug !== 'index'}
			<Button
				variant="square"
				size="sm"
				emphasis="secondary"
				class="-ml-3 mr-1 !bg-transparent text-color-text no-underline hover:!text-color-text-muted xl:hidden"
				onclick={() => (sidebarState.state.isOpen = !sidebarState.state.isOpen)}
			>
				{#if !sidebarState.state.isOpen}
					<Icon src={Bars3} class="h-5 w-5"></Icon>
				{:else}
					<Icon src={XMark} class="h-5 w-5"></Icon>
				{/if}
			</Button>
		{/if}
		<HeaderTitle base={resolve('/', {})}>London City Data</HeaderTitle>
		<HeaderRight>
			{#if breakPoint.current >= 768}
				<HeaderItem>
					<NavigationMenu
						items={resolveNavItems(mainMenu, resolve)}
						orientation="horizontal"
						ariaLabel="main menu"
						activeMenuItemId={activeMenuItem?.id}
					/>
				</HeaderItem>
			{/if}
		</HeaderRight>
	</Header>

	{@render children()}

	<Footer showCiuLogo showCookieMenu>
		<div class="pb-4 text-sm lg:w-1/6">
			<nav>
				<h3 class="mb-1 font-semibold">Links</h3>
				<ul class="text-color-text-muted">
					<li>
						<a href="https://data.london.gov.uk/" target="_blank" class="hover:underline">
							London Data Store
						</a>
					</li>
					<li>
						<a href="https://dfl.london.gov.uk/library" target="_blank" class="hover:underline">
							Data for London Library
						</a>
					</li>
				</ul>
			</nav>
		</div>

		<div class="pb-4 text-sm lg:w-1/6">
			<nav>
				<h3 class="mb-1 font-semibold">Contact</h3>
				<ul class="text-color-text-muted">
					<li>email: <a href="mailto:gis@london.gov.uk">gis@london.gov.uk</a></li>
				</ul>
			</nav>
		</div>
	</Footer>
</div>
