<script context="module" lang="ts">
	import { Story, Template } from '@storybook/addon-svelte-csf';
	import LayerControl from './LayerControl.svelte';

	export const meta = {
		title: 'Ui/LayerControl',
		component: LayerControl
	};
</script>

<script lang="ts">
	let state;

	let layerStates = {
		boroughs: {
			color: '#00AEEF',
			visible: true,
			opacity: 1.0
		},
		imd: {
			color: '#DCA000',
			visible: true,
			opacity: 1.0
		},
		fuel_poverty: {
			color: '#E0001B',
			visible: true,
			opacity: 1.0
		}
	};
</script>

<Template let:args>
	<div class="w-96">
		<LayerControl {...args} />
	</div>
</Template>

<Story name="Default" source />

<Story name="More complete" source>
	<LayerControl
		bind:state
		label="Borough"
		helpText="Boundaries of each of Greater London's 32 boroughs"
	/>

	<div>
		Layer state is:

		<pre>{JSON.stringify(state, null, 2)}</pre>
	</div>
</Story>

<Story name="No opacity control" source>
	<LayerControl
		bind:state
		label="Borough"
		helpText="Boundaries of each of Greater London's 32 boroughs"
		hideOpacityControl
	/>
</Story>

<Story name="No color control" source>
	<LayerControl
		bind:state
		label="Borough"
		helpText="Boundaries of each of Greater London's 32 boroughs"
		hideColorControl
	/>
</Story>

<Story name="No size control" source>
	<LayerControl
		bind:state
		label="Borough"
		helpText="Boundaries of each of Greater London's 32 boroughs"
		hideSizeControl
	/>
</Story>

<Story name="No controls - just the checkbox and help text" source>
	<LayerControl
		bind:state
		label="Borough"
		helpText="Boundaries of each of Greater London's 32 boroughs"
		hideOpacityControl
		hideColorControl
		hideSizeControl
	/>
</Story>

<Story name="Multiple controls" source>
	<LayerControl
		bind:state={layerStates.boroughs}
		label="Borough"
		helpText="Boundaries of each of Greater London's 32 boroughs"
	/>
	<LayerControl bind:state={layerStates.imd} label="IMD" helpText="Index of Multiple Deprivation" />
	<LayerControl
		bind:state={layerStates.fuel_poverty}
		label="Fuel Poverty"
		helpText="Percentage of households in fuel poverty"
	/>

	<div>
		Layer states are:

		<pre>{JSON.stringify(layerStates, null, 2)}</pre>
	</div>
</Story>
