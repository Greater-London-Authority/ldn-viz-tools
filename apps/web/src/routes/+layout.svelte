<script lang="ts">
	import { resolve } from '$app/paths';
	import { page } from '$app/state';

	import { afterNavigate } from '$app/navigation';
	import { findActiveItem } from '@ldn-viz/ui';

	import {
		Button,
		Footer,
		Header,
		HeaderItem,
		HeaderRight,
		HeaderTitle,
		NavigationMenu,
		Theme,
		ThemeSwitcher
	} from '@ldn-viz/ui';
	import { Bars3, XMark } from '@steeze-ui/heroicons';
	import { Icon } from '@steeze-ui/svelte-icon';
	import { slide } from 'svelte/transition';
	import '../app.postcss';

	let mainMenu = [
		{ title: 'Design System', id: 'design-system-docs', href: '/design-system' },
		{ title: 'Contact', id: 'contact', href: '/contact' }
	];

	let menuOpen = $state(false);
	let breakPoint: number = $state(0);

	let { children } = $props();

	let activeMenuItem = $derived(findActiveItem(mainMenu, page, resolve));

	afterNavigate(() => (menuOpen = false));
</script>

<Theme />

<svelte:window bind:innerWidth={breakPoint} />

<div class="flex min-h-dvh flex-col">
	<Header>
		<HeaderTitle base={resolve('/', {})}>London City Data</HeaderTitle>
		<HeaderRight>
			{#if breakPoint >= 768}
				<HeaderItem>
					<NavigationMenu
						items={mainMenu}
						orientation="horizontal"
						ariaLabel="main menu"
						activeMenuItemId={activeMenuItem?.id}
					/>
				</HeaderItem>
			{:else}
				<Button
					variant="text"
					class=" !text-color-static-white no-underline"
					onclick={() => (menuOpen = !menuOpen)}
				>
					Menu {#if !menuOpen}
						<Icon src={Bars3} class="ml-2 h-5 w-5"></Icon>
					{:else}
						<Icon src={XMark} class="ml-2 h-5 w-5"></Icon>
					{/if}
				</Button>
			{/if}
		</HeaderRight>

		{#if breakPoint <= 768 && menuOpen}
			<div class="absolute inset-x-0 top-[48px] z-50 bg-color-container-level-0" transition:slide>
				<NavigationMenu ariaLabel="Main Menu" items={mainMenu}></NavigationMenu>
			</div>
		{/if}
	</Header>

	{@render children()}

	<Footer showCiuLogo>
		<div class="pb-4 text-sm lg:w-1/6">
			<nav>
				<h3 class="mb-1 font-semibold">Links</h3>
				<ul class=" text-color-text-secondary">
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
				<ul class="text-color-text-secondary">
					<li>email:</li>
				</ul>
			</nav>
		</div>

		{#snippet footerCookieMenu()}
			<div class="flex justify-end">
				<ThemeSwitcher size="xs" />
			</div>
		{/snippet}
	</Footer>
</div>
