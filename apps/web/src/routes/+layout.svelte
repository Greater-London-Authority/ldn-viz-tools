<script lang="ts">
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
		// { title: 'Dataviz Guide', id: 'dataviz-guide', href: '/dataviz-guide' },
		// { title: 'Tools', id: 'tools', href: '/overview' },
		// { title: 'Team', id: 'team', href: '/overview' },
		{ title: 'Contact', id: 'contact', href: '/' }
	];

	let { children } = $props();
</script>

<Theme />

<div class="flex min-h-dvh flex-col">
	<Header>
		<HeaderTitle>London City Data</HeaderTitle>
		<HeaderRight>
			<HeaderItem>
				<NavigationMenu items={mainMenu} orientation="horizontal" ariaLabel="main menu" />
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
