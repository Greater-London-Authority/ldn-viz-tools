<script context="module" lang="ts">
	import { Story, Template } from '@storybook/addon-svelte-csf';
	import LayerControlGroup from './LayerControlGroup.svelte';

	export const meta = {
		title: 'Ui/Components/Layer Controls/LayerControlGroup',
		component: LayerControlGroup
	};
</script>

<script lang="ts">
	let optionsForGroup = [
		{ id: 'bus', label: 'Bus stops' },
		{
			id: 'train',
			label: 'Train stations',
			hint: 'Excluding underground stations'
		},
		{ id: 'underground', label: 'Underground stations' },
		{ id: 'taxi', label: 'Taxi ranks', disabled: true }
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
			disableOpacityControl: true,
			disableSizeControl: true
		}
	];

	let state1 = {
		bus: {
			colorName: 'data.categorical.blue',
			visible: true,
			opacity: 1.0,
			size: 1
		},
		train: {
			colorName: 'data.categorical.green',
			visible: true,
			opacity: 1.0,
			size: 1
		},

		underground: {
			colorName: 'data.categorical.darkpink',
			visible: true,
			opacity: 1.0,
			size: 1
		},
		taxi: {
			colorName: 'data.categorical.orange',
			visible: false,
			opacity: 1.0,
			size: 1
		}
	};
	let state2 = {
		bus: {
			colorName: 'data.categorical.blue',
			visible: true,
			opacity: 1.0,
			size: 1
		},
		train: {
			colorName: 'data.categorical.green',
			visible: true,
			opacity: 1.0,
			size: 1
		},
		underground: {
			colorName: 'data.categorical.darkpink',
			visible: true,
			opacity: 1.0,
			size: 1
		}
	};

	let ariaLabel = 'Customise layers';
</script>

<Template let:args>
	<LayerControlGroup bind:options={optionsForGroup} bind:state={state1} {...args} {ariaLabel} />
	<pre class="mt-4 text-xs">{JSON.stringify(state1, null, 2)}</pre>
</Template>

<Story name="Default" source />

<Story name="With label">
	<LayerControlGroup
		bind:options={optionsForGroup}
		bind:state={state1}
		disableOpacityControl
		disableSizeControl
		label="Layer Control Group"
		{ariaLabel}
	/>

	<pre class="mt-4 text-xs">{JSON.stringify(state1, null, 2)}</pre>
</Story>

<Story name="With hint">
	<LayerControlGroup
		bind:options={optionsForGroup}
		bind:state={state1}
		disableOpacityControl
		disableSizeControl
		label="Layer Control Group"
		hint="Turn the layers of the map on and off"
		{ariaLabel}
	/>

	<pre class="mt-4 text-xs">{JSON.stringify(state1, null, 2)}</pre>
</Story>

<Story name="With description">
	<LayerControlGroup
		bind:options={optionsForGroup}
		bind:state={state1}
		disableOpacityControl
		disableSizeControl
		label="Layer Control Group"
		hint="Turn the layers of the map on and off"
		description="Transport layers - Taxis disabled"
		{ariaLabel}
	/>

	<pre class="mt-4 text-xs">{JSON.stringify(state1, null, 2)}</pre>
</Story>

<Story name="Hide controls size and opacity controls">
	<LayerControlGroup
		bind:options={optionsForGroup}
		bind:state={state1}
		disableOpacityControl
		disableSizeControl
		{ariaLabel}
	/>

	<pre class="mt-4 text-xs">{JSON.stringify(state1, null, 2)}</pre>
</Story>

<Story name="Disable controls size and opacity controls for some layers">
	<LayerControlGroup bind:options={optionsForGroup2} bind:state={state2} {ariaLabel} />
	<pre class="mt-4 text-xs">{JSON.stringify(state2, null, 2)}</pre>
</Story>

<Story name="In small text size context">
	<div class="text-sm">
		<LayerControlGroup
			bind:options={optionsForGroup}
			bind:state={state1}
			disableOpacityControl
			disableSizeControl
			{ariaLabel}
		/>
	</div>
</Story>

<!--
Sometimes a set of layers is mutually exclusive, as only one will be visible at any one time.
For example, choropleth layers would cover each other.
-->
<Story name="Mutually exclusive layers">
	<LayerControlGroup
		bind:options={optionsForGroup}
		bind:state={state1}
		mutuallyExclusive
		name="mutually-exclusive-layers"
		{ariaLabel}
	/>

	<pre class="mt-4 text-xs">{JSON.stringify(state1, null, 2)}</pre>
</Story>

<Story name="Disabled (global)">
	<LayerControlGroup
		bind:options={optionsForGroup}
		bind:state={state1}
		disabled
		name="Disabled"
		{ariaLabel}
	/>

	<pre class="mt-4 text-xs">{JSON.stringify(state1, null, 2)}</pre>
</Story>

<Story name="With error">
	<LayerControlGroup
		bind:options={optionsForGroup}
		bind:state={state1}
		label="Preferred mode of transport"
		hint="Contextual Hint"
		description="Deselect all to see an error state!"
		error={Object.values(state1).every((layer) => layer.visible === false)
			? 'You must select an option'
			: undefined}
		{ariaLabel}
	/>

	<pre class="mt-4 text-xs">{JSON.stringify(state1, null, 2)}</pre>
</Story>
