<script module lang="ts">
	import { defineMeta } from '@storybook/addon-svelte-csf';
	import LayerControlGroup from './LayerControlGroup.svelte';
	import { colorNames } from './layerControlUtils';

	const { Story } = defineMeta({
		title: 'Ui/Components/Layer Controls/LayerControlGroup',
		component: LayerControlGroup,
		tags: ['autodocs']
	});
</script>

<script lang="ts">
	let optionsForGroup = $state([
		{ id: 'bus', label: 'Bus stops' },
		{
			id: 'train',
			label: 'Train stations',
			hint: 'Excluding underground stations'
		},
		{ id: 'underground', label: 'Underground stations' },
		{ id: 'taxi', label: 'Taxi ranks', disabled: true }
	]);

	let optionsForGroup2 = $state([
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
	]);

	let state1 = $state({
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
	});
	let state2 = $state({
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
	});
	let state3 = $state({
		bus: {
			colorName: 'palette.blue.600',
			visible: true,
			opacity: 1.0,
			size: 1
		},
		train: {
			colorName: 'palette.green.600',
			visible: true,
			opacity: 1.0,
			size: 1
		},
		underground: {
			colorName: 'palette.darkpink.600',
			visible: true,
			opacity: 1.0,
			size: 1
		}
	});

	let ariaLabel = 'Customise layers';
</script>

<Story name="Default">
	{#snippet template({ args })}
		<LayerControlGroup bind:options={optionsForGroup} bind:state={state1} {...args} {ariaLabel} />
		<pre class="mt-4 text-xs">{JSON.stringify(state1, null, 2)}</pre>
	{/snippet}
</Story>

<Story name="With label">
	{#snippet template()}
		<LayerControlGroup
			bind:options={optionsForGroup}
			bind:state={state1}
			disableOpacityControl
			disableSizeControl
			label="Layer Control Group"
			{ariaLabel}
		/>

		<pre class="mt-4 text-xs">{JSON.stringify(state1, null, 2)}</pre>
	{/snippet}
</Story>

<Story name="With hint">
	{#snippet template()}
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
	{/snippet}
</Story>

<Story name="With description">
	{#snippet template()}
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
	{/snippet}
</Story>

<Story name="Hide controls size and opacity controls">
	{#snippet template()}
		<LayerControlGroup
			bind:options={optionsForGroup}
			bind:state={state1}
			disableOpacityControl
			disableSizeControl
			{ariaLabel}
		/>

		<pre class="mt-4 text-xs">{JSON.stringify(state1, null, 2)}</pre>
	{/snippet}
</Story>

<Story name="Disable controls size and opacity controls for some layers">
	{#snippet template()}
		<LayerControlGroup bind:options={optionsForGroup2} bind:state={state2} {ariaLabel} />
		<pre class="mt-4 text-xs">{JSON.stringify(state2, null, 2)}</pre>
	{/snippet}
</Story>

<Story name="In small text size context">
	{#snippet template()}
		<div class="text-sm">
			<LayerControlGroup
				bind:options={optionsForGroup}
				bind:state={state1}
				disableOpacityControl
				disableSizeControl
				{ariaLabel}
			/>
		</div>
	{/snippet}
</Story>

<!--
Sometimes a set of layers is mutually exclusive, as only one will be visible at any one time.
For example, choropleth layers would cover each other.
-->
<Story name="Mutually exclusive layers">
	{#snippet template()}
		<LayerControlGroup
			bind:options={optionsForGroup}
			bind:state={state1}
			mutuallyExclusive
			name="mutually-exclusive-layers"
			{ariaLabel}
		/>

		<pre class="mt-4 text-xs">{JSON.stringify(state1, null, 2)}</pre>
	{/snippet}
</Story>

<Story name="Disabled (global)">
	{#snippet template()}
		<LayerControlGroup
			bind:options={optionsForGroup}
			bind:state={state1}
			disabled
			name="Disabled"
			{ariaLabel}
		/>

		<pre class="mt-4 text-xs">{JSON.stringify(state1, null, 2)}</pre>
	{/snippet}
</Story>

<Story name="With error">
	{#snippet template()}
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
	{/snippet}
</Story>

<!-- Note, this colour combination isn't accessible but is demonstrating potential for customising colours where necessary. -->
<Story name="With custom colours" source>
	{#snippet template()}
		<LayerControlGroup
			bind:options={optionsForGroup}
			bind:state={state3}
			{ariaLabel}
			{colorNames}
		/>
		<pre class="mt-4 text-xs">{JSON.stringify(state3, null, 2)}</pre>
	{/snippet}
</Story>
