<script lang="ts">
	/**
	 * The `<Header>` component appears at the top of a page.
	 * It typically includes the app name, links to other pages (if the app has multiple pages), and a login/logout control (if the app requires authentication).
	 *
	 * @component
	 */

	import { base } from '$app/paths';
	//import { page } from '$app/stores';
	import { slide } from 'svelte/transition';

	import { Bars3, XMark } from '@steeze-ui/heroicons';
	import { Icon } from '@steeze-ui/svelte-icon';

	import HeaderItem from './HeaderItem.svelte';
	import HeaderRight from './HeaderRight.svelte';
	import HeaderTitle from './HeaderTitle.svelte';

	import NavigationMenu from '../navigationMenu/NavigationMenu.svelte';
	import Button from '../button/Button.svelte';

	interface Props {
		/**
		 * Colour scheme to use, either `light` or `dark`.
		 */
		theme?: 'light' | 'dark';
		children?: import('svelte').Snippet;

		titleFn?: (width: number) => string;
		title?: string;

		navMenu: { title: string; id: string; href: string }[] | undefined;
		menuFoldingBreakpoint?: number;
	}

	let {
		theme = 'dark',
		title,
		titleFn,
		navMenu,
		menuFoldingBreakpoint = 1050,
		children
	}: Props = $props();

	let width: number = $state();
	let mbMenuOpen = $state(false);

	$inspect(mbMenuOpen);

	// TODO: should be something more generic
	//let selectedMenuItemId = $derived($page.route.id === '/' ? 'Introduction' : 'Dashboard');
</script>

<svelte:window bind:innerWidth={width} />

<header
	class={`bg-color-container-level-0 border-b-color-ui-border-secondary text-color-text-primary border-color-static-brand flex h-[50px] items-center border-b  border-l-[5px] px-4 py-[.5rem] text-left ${theme}`}
>
	<HeaderTitle {base}>
		{#if title}
			{title}
		{:else if titleFn}
			{titleFn(width)}
		{/if}
	</HeaderTitle>

	<!-- Contents of the header (typically a combination of `<HeaderTitle>`, `<HeaderRight>`, `<NavLinks>`, and `<HeaderItem>` components) -->
	{@render children?.()}

	{#if navMenu}
		<HeaderRight>
			{#if width >= menuFoldingBreakpoint}
				<HeaderItem>
					<NavigationMenu ariaLabel="Main Menu" items={navMenu} orientation="horizontal" />
				</HeaderItem>
			{:else}
				<Button
					variant="text"
					class="!text-color-static-white no-underline"
					onclick={() => (mbMenuOpen = !mbMenuOpen)}
				>
					Menu
					{#if !mbMenuOpen}
						<Icon src={Bars3} class="ml-2 h-5 w-5"></Icon>
					{:else}
						<Icon src={XMark} class="ml-2 h-5 w-5"></Icon>
					{/if}
				</Button>
			{/if}
		</HeaderRight>
		{#if width <= menuFoldingBreakpoint && mbMenuOpen}
			<div class="bg-color-container-level-0 absolute inset-x-0 top-[48px]" transition:slide>
				<NavigationMenu ariaLabel="List Menu" items={navMenu}></NavigationMenu>
			</div>
		{/if}
	{/if}
</header>
