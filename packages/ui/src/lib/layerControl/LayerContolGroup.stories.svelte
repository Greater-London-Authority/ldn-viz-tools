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
		{ id: 'bus', label: 'Bus stops', color: '#00AEEF' },
		{
			id: 'train',
			label: 'Train stations',
			color: '#008D48',
			hint: 'Excluding underground stations'
		},
		{ id: 'underground', label: 'Underground stations', color: '#9E0059' },
		{ id: 'taxi', label: 'Taxi ranks', color: 'firebrick', disabled: true }
	];

	let optionsForGroup2 = [
		{ id: 'bus', label: 'Bus stops' },
		{
			id: 'train',
			label: 'Train stations',
			hint: 'Excluding underground stations'
		},
		{
			id: 'underground',
			label: 'Underground stations',
			hideOpacityControl: true,
			hideSizeControl: true
		},
		{
			id: 'taxi',
			label: 'Taxi ranks',
			disabled: true,
			hideOpacityControl: true,
			hideSizeControl: true
		}
	];

	let state1 = {
		bus: {
			color: '#00AEEF',
			visible: true,
			opacity: 1.0,
			size: 1
		},
		underground: {
			color: '#9E0059',
			visible: true,
			opacity: 1.0,
			size: 1
		},
		taxi: {
			color: 'firebrick',
			visible: true,
			opacity: 1.0,
			size: 1
		}
	};
	let state2 = {
		bus: {
			color: '#00AEEF',
			visible: true,
			opacity: 1.0,
			size: 1
		},
		underground: {
			color: '#9E0059',
			visible: true,
			opacity: 1.0,
			size: 1
		},
		taxi: {
			color: 'firebrick',
			visible: true,
			opacity: 1.0,
			size: 1
		}
	};
</script>

<Template let:args>
	<LayerControlGroup bind:options={optionsForGroup} bind:state={state1} {...args} />
	<pre>{JSON.stringify(state1, null, 2)}</pre>
</Template>

<Story name="Default" source />

<Story name="Hide controls size and opacity controls">
	<LayerControlGroup
		bind:options={optionsForGroup}
		bind:state={state1}
		hideOpacityControl
		hideSizeControl
	/>
	<pre>{JSON.stringify(state1, null, 2)}</pre>
</Story>

<Story name="Hide controls size and opacity controls for some layers">
	<LayerControlGroup bind:options={optionsForGroup2} bind:state={state2} />
	<pre>{JSON.stringify(state2, null, 2)}</pre>
</Story>
