<script lang="ts">
	import { resolve } from '$app/paths';
	import { page } from '$app/state';

	import { findActiveItem } from '@ldn-viz/ui';

	import {
		Footer,
		Header,
		HeaderItem,
		HeaderRight,
		HeaderTitle,
		NavigationMenu,
		Theme,
		ThemeSwitcher
	} from '@ldn-viz/ui';
	import '../app.postcss';

	//TMP
	let mainMenu = [
		{ title: 'Design System', id: 'design-system-docs', href: '/design-system' },
		{ title: 'Contact', id: 'contact', href: '/' }
	];

	let { children } = $props();

	let activeMenuItem = $derived(findActiveItem(mainMenu, page, resolve));
</script>

<Theme />

<div class="flex min-h-dvh flex-col">
	<Header>
		<HeaderTitle>London City Data</HeaderTitle>
		<HeaderRight>
			<HeaderItem>
				<NavigationMenu
					items={mainMenu}
					orientation="horizontal"
					ariaLabel="main menu"
					activeMenuItemId={activeMenuItem?.id}
				/>
			</HeaderItem>
		</HeaderRight>
	</Header>

	{@render children()}

	<Footer showCiuLogo>
		{#snippet footerCookieMenu()}
			<div class="flex justify-end">
				<ThemeSwitcher size="xs" />
			</div>
		{/snippet}
	</Footer>
</div>
