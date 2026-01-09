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
		{ title: 'Contact', id: 'contact', href: '/contact' }
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
							Data for London Libraray
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
