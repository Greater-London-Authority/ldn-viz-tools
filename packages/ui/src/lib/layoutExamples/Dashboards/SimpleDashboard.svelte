<script lang="ts">
	import { writable } from 'svelte/store';
	import AppShell from '../../appShell/AppShell.svelte';
	import LogoCIU from '../../logos/LogoCIU.svelte';
	import LogoMayor from '../../logos/LogoMayor.svelte';
	import Overlay from '../../overlay/Overlay.svelte';
	import RadioButtonGroupSolid from '../../radioButtonSolid/RadioButtonGroupSolid.svelte';
	import Select from '../../select/Select.svelte';
	import Sidebar from '../../sidebar/Sidebar.svelte';
	import SidebarFooter from '../../sidebar/elements/sidebarFooter/SidebarFooter.svelte';
	import SidebarHeader from '../../sidebar/elements/sidebarHeader/SidebarHeader.svelte';
	import SidebarGroup from '../../sidebar/elements/sidebarSection/SidebarGroup.svelte';
	import SidebarSection from '../../sidebar/elements/sidebarSection/SidebarSection.svelte';
	import SidebarGroupTitle from '../../sidebar/elements/sidebarSection/sidebarGroupTitle/SidebarGroupTitle.svelte';

	/* Select Items */
	type Item = { label: string; value: number };
	const items: Item[] = [
		{ label: 'One', value: 1 },
		{ label: 'Two', value: 2 },
		{ label: 'Three', value: 3 }
	];

	/* Radio Button Options */
	let buttonGroupOptions = [
		{ id: 'one', label: 'One' },
		{ id: 'two', label: 'Two' },
		{ id: 'three', label: 'Three' }
	];
</script>

<AppShell>
	<svelte:fragment slot="main">
		<div class="bg-color-canvas-background-1 h-full p-6">
			<div class="mb-4">
				<h1 class="text-2xl text-color-text-primary font-bold">This is the main content area</h1>
				<h2 class="text-xl text-color-text-secondary">
					Maecenas ut libero vel nibh maximus feugiat non sed tortor.
				</h2>
			</div>
			<div class="bg-color-static-white">HELLO</div>
		</div>
	</svelte:fragment>
	<Sidebar slot="sidebar">
		<!-- HEADER -->
		<SidebarHeader title="Main sidebar title" slot="header">
			<svelte:fragment slot="subTitle">
				<p>Maecenas ut libero vel nibh maximus feugiat non sed tortor.</p>
			</svelte:fragment>
		</SidebarHeader>

		<!-- SECTIONS -->
		<svelte:fragment slot="sections">
			<SidebarSection title="First Section Title">
				<SidebarGroup title={'First Group Title'}>
					<Select {items} label="Label" id="example-input-1" />
					<Select {items} label="Label" id="example-input-2" />
				</SidebarGroup>
				<SidebarGroup title="Second Group Title">
					<Select {items} label="Label" id="example-input-1" />
					<Select {items} label="Label" id="example-input-2" />
				</SidebarGroup>
			</SidebarSection>

			<SidebarSection title="Second Section Title">
				<SidebarGroup>
					<RadioButtonGroupSolid options={buttonGroupOptions} name="Radio Group One" />
					<RadioButtonGroupSolid options={buttonGroupOptions} name="Radio Group Two" />
				</SidebarGroup>
			</SidebarSection>
		</svelte:fragment>

		<!-- FOOTER -->
		<SidebarFooter slot="footer">
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
	</Sidebar>
</AppShell>
