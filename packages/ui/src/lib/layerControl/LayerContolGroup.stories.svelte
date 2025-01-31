<script context="module" lang="ts">
	import { Story, Template } from '@storybook/addon-svelte-csf';
	import LayerControlGroup from './LayerControlGroup.svelte';

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
			hint: 'Excluding underground stations',
			hideColorControl: true
		},
		{
			id: 'underground',
			label: 'Underground stations',
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
		}
	};
</script>

<Template let:args>
	<LayerControlGroup bind:options={optionsForGroup} bind:state={state1} {...args} />
	<pre class="mt-4 text-xs">{JSON.stringify(state1, null, 2)}</pre>
</Template>

<Story name="Default" source />

<Story name="Hide controls size and opacity controls">
	<div class="space-y-4">
		<LayerControlGroup
			bind:options={optionsForGroup}
			bind:state={state1}
			hideOpacityControl
			hideSizeControl
		/>
	</div>
	<pre class="mt-4 text-xs">{JSON.stringify(state1, null, 2)}</pre>
</Story>

<Story name="Hide controls size and opacity controls for some layers">
	<LayerControlGroup bind:options={optionsForGroup2} bind:state={state2} />
	<pre class="mt-4 text-xs">{JSON.stringify(state1, null, 2)}</pre>
</Story>

<Story name="In small text size context">
	<div class="text-sm">
		<LayerControlGroup
			bind:options={optionsForGroup}
			bind:state={state1}
			hideOpacityControl
			hideSizeControl
		/>
	</div>
</Story>
