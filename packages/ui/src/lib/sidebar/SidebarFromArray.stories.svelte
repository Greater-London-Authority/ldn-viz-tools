<script context="module">
	import { RelativeWrapper } from '../../../../../apps/docs';
	import SidebarFromArray from './SidebarFromArray.svelte';

	import NonIdealState from '../nonIdealState/NonIdealState.svelte';

	import { Map as MapIcon, Square3Stack3d } from '@steeze-ui/heroicons';

	export const meta = {
		title: 'Ui/Components - App Layout/Sidebar/SidebarFromArray',
		component: SidebarFromArray,
		decorators: [() => RelativeWrapper],
		parameters: {
			layout: 'fullscreen'
		},
		argTypes: {
			width: {
				options: ['standard', 'wide'],
				control: { type: 'radio' }
			},
			theme: {
				options: ['light', 'dark'],
				control: { type: 'radio' }
			},
			position: {
				options: ['absolute', 'fixed'],
				control: { type: 'radio' }
			},
			placement: {
				options: ['right', 'left', 'bottom', 'top'],
				control: { type: 'select' }
			}
		}
	};

	let tabs = [
		{ id: 'sites', label: 'Sites', icon: MapIcon, content: NonIdealState },
		{
			id: 'context-layers',
			label: 'Layers & Markers',
			icon: Square3Stack3d,
			content: NonIdealState
		}
	];
</script>

<script lang="ts">
	import { Story, Template } from '@storybook/addon-svelte-csf';
	import { setContext } from 'svelte';
	import { writable } from 'svelte/store';
	import LogoCIU from '../logos/LogoCIU.svelte';
	import LogoMayor from '../logos/LogoMayor.svelte';
	import SidebarFooter from './elements/sidebarFooter/SidebarFooter.svelte';
	import SidebarHeader from './elements/sidebarHeader/SidebarHeader.svelte';

	import Button from '../button/Button.svelte';

	let selectedValue = 'markers';

	// In order for the sidebar to open/ close a writable boolean store must be provided to context.
	// NB. This is provided by AppShell when using
	const isOpen = writable(true);
	setContext('sidebarIsOpen', isOpen);
</script>

<Template let:args>
	<SidebarFromArray {...args} {tabs}>
		<SidebarHeader title="Main sidebar title" slot="header" />
	</SidebarFromArray>
</Template>

<Story
	name="Default"
	source
	parameters={{
		options: {
			showPanel: true
		}
	}}
></Story>

<Story name="Custom footer" source>
	<SidebarFromArray {tabs}>
		<SidebarHeader title="Main sidebar title" slot="header">
			<svelte:fragment slot="subTitle">
				<p>
					Maecenas ut libero vel nibh maximus feugiat non sed tortor. Sed in lacinia dui, nec
					venenatis sapien. Etiam venenatis felis.
				</p>
			</svelte:fragment>
		</SidebarHeader>

		<SidebarFooter slot="footer">
			<div class="flex justify-between">
				<div class="w-[165px]">
					<LogoMayor />
				</div>
				<div class="w-[165px]">
					<LogoCIU />
				</div>
			</div>
			<span>Not just the usual content</span>
		</SidebarFooter>
	</SidebarFromArray>
</Story>

<Story name="Externally controlled selected tab" source>
	<div class="w-52 gap-2 flex flex-col">
		<span>Press button to select tab</span>
		<Button on:click={() => (selectedValue = 'sites')} class="w-full">Sites</Button>
		<Button on:click={() => (selectedValue = 'context-layers')} class="w-full">Layers</Button>
	</div>

	<SidebarFromArray {tabs} bind:selectedValue>
		<SidebarHeader title="Main sidebar title" slot="header">
			<svelte:fragment slot="subTitle">
				<p>
					Maecenas ut libero vel nibh maximus feugiat non sed tortor. Sed in lacinia dui, nec
					venenatis sapien. Etiam venenatis felis.
				</p>
			</svelte:fragment>
		</SidebarHeader>

		<SidebarFooter slot="footer">
			<div class="flex justify-between">
				<div class="w-[165px]">
					<LogoMayor />
				</div>
				<div class="w-[165px]">
					<LogoCIU />
				</div>
			</div>
			<span>Not just the usual content</span>
		</SidebarFooter>
	</SidebarFromArray>
</Story>
