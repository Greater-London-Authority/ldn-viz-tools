<script context="module" lang="ts">
	import LayerControlGroup from './LayerControlGroup.svelte';
	import { Story, Template } from '@storybook/addon-svelte-csf';

	export const meta = {
		title: 'Ui/LayerControlGroup',
		component: LayerControlGroup
	};
</script>

<script lang="ts">
	let optionsForGroup = [
		{ id: 'bus', name: 'bus', label: 'Bus stops', color: '#00AEEF' },
		{
			id: 'train',
			name: 'train',
			label: 'Train stations',
			color: '#008D48',
			hint: 'Excluding underground stations'
		},
		{ id: 'underground', name: 'underground', label: 'Underground stations', color: '#9E0059' },
		{ id: 'taxi', name: 'taxi', label: 'Taxi ranks', color: 'firebrick', disabled: true }
	];

	let optionsForGroup2 = [
		{ id: 'bus', name: 'bus', label: 'Bus stops', color: '#00AEEF' },
		{
			id: 'train',
			name: 'train',
			label: 'Train stations',
			color: '#008D48',
			hint: 'Excluding underground stations'
		},
		{
			id: 'underground',
			name: 'underground',
			label: 'Underground stations',
			color: '#9E0059',
			hideOpacityControl: true,
			hideSizeControl: true
		},
		{
			id: 'taxi',
			name: 'taxi',
			label: 'Taxi ranks',
			color: 'firebrick',
			disabled: true,
			hideOpacityControl: true,
			hideSizeControl: true
		}
	];
</script>

<Template let:args>
	<LayerControlGroup bind:options={optionsForGroup} {...args} />
	<pre>{JSON.stringify(optionsForGroup, null, 2)}</pre>
</Template>

<Story name="Default" source />

<Story name="Hide controls size and opacity controls">
	<LayerControlGroup bind:options={optionsForGroup} hideOpacityControl hideSizeControl />
	<pre>{JSON.stringify(optionsForGroup, null, 2)}</pre>
</Story>

<Story name="Hide controls size and opacity controls for some layers">
	<LayerControlGroup bind:options={optionsForGroup2} />
	<pre>{JSON.stringify(optionsForGroup2, null, 2)}</pre>
</Story>
