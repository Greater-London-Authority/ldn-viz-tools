<script lang="ts">
	import {
		Header,
		HeaderTitle,
		Footer,
		AnalyticsAndCookieConsent,
		ThemeSwitcher,
		Theme,
		HeaderRight,
		NavigationMenu,
		HeaderItem
	} from '@ldn-viz/ui';
	import '../app.postcss';

	//TMP
	let mainMenu = [
		{ title: 'Docs', id: 'docs', href: '/overview' },
		{ title: 'Tools', id: 'tools', href: '/overview' },
		{ title: 'Team', id: 'team', href: '/overview' }
	];

	let { children } = $props();
</script>

<Theme />

<div class="flex min-h-dvh flex-col overflow-x-hidden">
	<Header>
		<HeaderTitle>Ldn-viz design system</HeaderTitle>
		<HeaderRight>
			<HeaderItem>
				<NavigationMenu items={mainMenu} orientation="horizontal" ariaLabel="main menu" />
			</HeaderItem>
		</HeaderRight>
	</Header>
	<div class="border-color-ui-border-secondary border-t">
		{@render children()}
	</div>
	<Footer showCiuLogo>
		<!-- TODO: cookies + privacy etc? -->
		{#snippet footerCookieMenu()}
			<div class="flex justify-end">
				<ThemeSwitcher size="xs" />
			</div>
		{/snippet}
	</Footer>
</div>
