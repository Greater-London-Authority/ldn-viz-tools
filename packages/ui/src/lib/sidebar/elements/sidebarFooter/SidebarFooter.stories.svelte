<script context="module">
	import SidebarFooter from './SidebarFooter.svelte';

	import CookieControlSettings from '../../../analytics/CookieControlSettings.svelte';
	import PrivacyPolicyLink from './PrivacyPolicyLink.svelte';

	export const meta = {
		title: 'Ui/Components - Layout And ThemesSidebar/elements/SidebarFooter',
		component: SidebarFooter
	};
</script>

<script>
	import { Story, Template } from '@storybook/addon-svelte-csf';
	import { writable } from 'svelte/store';
	import LogoCIU from '../../../logos/LogoCIU.svelte';
	import LogoMayor from '../../../logos/LogoMayor.svelte';
	import ThemeSwitcher from '../../../theme/ThemeSwitcher.svelte';

	// hack to make the "View cookie settings" link appear
	window.CookieControl = writable(true);
</script>

<Template let:args>
	<SidebarFooter {...args} />
</Template>

<Story name="Default" source>
	<SidebarFooter>
		<div class="flex justify-between">
			<div class="w-[165px]"><LogoMayor /></div>
			<div class="w-[165px]"><LogoCIU /></div>
		</div>
		<svelte:fragment slot="menu">
			<div class="flex justify-between">
				<ul class="flex space-x-2">
					<li>View Cookie settings</li>
					<li>Privacy Policy</li>
				</ul>
				<ThemeSwitcher />
			</div>
		</svelte:fragment>
	</SidebarFooter>
</Story>

<Story name="Typical" source>
	<SidebarFooter>
		<div class="flex justify-between">
			<div class="w-[165px]"><LogoMayor /></div>
			<div class="w-[165px]"><LogoCIU /></div>
		</div>
		<svelte:fragment slot="menu">
			<ul class="flex space-x-2">
				<CookieControlSettings />
				<PrivacyPolicyLink />
			</ul>
		</svelte:fragment>
	</SidebarFooter>
</Story>

<Story name="With Logos" source>
	<SidebarFooter>
		<div class="flex justify-between">
			<div class="w-[165px]"><LogoMayor /></div>
			<div class="w-[165px]"><LogoCIU /></div>
		</div>
	</SidebarFooter>
</Story>

<Story name="With Single Logo" source>
	<SidebarFooter>
		<div class="flex">
			<div class="w-[165px]"><LogoCIU /></div>
		</div>
	</SidebarFooter>
</Story>

<Story name="With Menu" source>
	<SidebarFooter>
		<svelte:fragment slot="menu">
			<div class="flex justify-between">
				<ul class="flex space-x-2">
					<li>View Cookie settings</li>
					<li>Privacy Policy</li>
				</ul>
				<ThemeSwitcher />
			</div>
		</svelte:fragment>
	</SidebarFooter>
</Story>
