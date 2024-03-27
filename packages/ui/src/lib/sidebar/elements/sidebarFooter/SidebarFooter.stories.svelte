<script context="module">
	import SidebarFooter from './SidebarFooter.svelte';

	export const meta = {
		title: 'Ui/Sidebar/elements/SidebarFooter',
		component: SidebarFooter
	};
</script>

<script>
	import { Story, Template } from '@storybook/addon-svelte-csf';
	import LogoCIU from '../../../logos/LogoCIU.svelte';
	import LogoMayor from '../../../logos/LogoMayor.svelte';
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
			<ul class="flex space-x-2">
				<li>View Cookie settings</li>
				<li>Privacy Policy</li>
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
			<ul class="flex space-x-2">
				<li>View Cookie settings</li>
				<li>Privacy Policy</li>
			</ul>
		</svelte:fragment>
	</SidebarFooter>
</Story>
