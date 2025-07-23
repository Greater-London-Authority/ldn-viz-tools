<script module>
	import { defineMeta } from '@storybook/addon-svelte-csf';
	import CookieControlSettings from '../../../analytics/CookieControlSettings.svelte';
	import LogoCIU from '../../../logos/LogoCIU.svelte';
	import LogoMayor from '../../../logos/LogoMayor.svelte';
	import ThemeSwitcher from '../../../theme/ThemeSwitcher.svelte';
	import PrivacyPolicyLink from './PrivacyPolicyLink.svelte';
	import SidebarFooter from './SidebarFooter.svelte';

	// hack to make the "View cookie settings" link appear
	window.CookieControl = () => {};

	const { Story } = defineMeta({
		title: 'Ui/Components - Layout And Themes/Sidebar/elements/SidebarFooter',
		component: SidebarFooter
	});
</script>

<Story name="Default">
	{#snippet template()}
		<SidebarFooter>
			<div class="flex justify-between">
				<div class="w-[165px]"><LogoMayor /></div>
				<div class="w-[165px]"><LogoCIU /></div>
			</div>
			{#snippet menu()}
				<div class="flex justify-between">
					<ul class="flex space-x-2">
						<li><CookieControlSettings size="sm" /></li>
						<li><PrivacyPolicyLink size="sm" /></li>
					</ul>
					<ThemeSwitcher size="xs" />
				</div>
			{/snippet}
		</SidebarFooter>
	{/snippet}
</Story>

<Story name="With logos only">
	{#snippet template()}
		<SidebarFooter>
			<div class="flex justify-between">
				<div class="w-[165px]"><LogoMayor /></div>
				<div class="w-[165px]"><LogoCIU /></div>
			</div>
		</SidebarFooter>
	{/snippet}
</Story>

<Story name="With Single Logo">
	{#snippet template()}
		<SidebarFooter>
			<div class="flex">
				<div class="w-[165px]"><LogoCIU /></div>
			</div>
		</SidebarFooter>
	{/snippet}
</Story>

<Story name="With Menu">
	{#snippet template()}
		<SidebarFooter>
			{#snippet menu()}
				<div class="flex justify-between">
					<ul class="flex space-x-2">
						<li><CookieControlSettings size="sm" /></li>
						<li><PrivacyPolicyLink size="sm" /></li>
					</ul>
					<ThemeSwitcher size="xs" />
				</div>
			{/snippet}
		</SidebarFooter>
	{/snippet}
</Story>
