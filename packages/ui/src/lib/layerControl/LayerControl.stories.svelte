<script context="module" lang="ts">
	import { Story, Template } from '@storybook/addon-svelte-csf';
	import LayerControl from './LayerControl.svelte';

	export const meta = {
		title: 'Ui/LayerControl',
		component: LayerControl
	};
</script>

<script lang="ts">
	let layerStates = {
		boroughs: {
			color: '#ffcc00',
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

	let state = layerStates.boroughs;
</script>

<Template let:args>
	<div class="w-96">
		<LayerControl bind:state {...args} />
	</div>
	<pre class="mt-4 text-xs">{JSON.stringify(state, null, 2)}</pre>
</Template>

<Story name="Default" source />

<Story name="With Label" source>
	<LayerControl bind:state label="Borough" />
</Story>

<Story name="With Label and hint" source>
	<LayerControl
		bind:state
		label="Borough"
		hint="Boundaries of each of Greater London's 32 boroughs"
	/>
</Story>

<Story name="Hide color control" source>
	<LayerControl bind:state label="Borough" hideColorControl />
</Story>

<Story name="Hide opacity control" source>
	<LayerControl bind:state label="Borough" hideOpacityControl />
</Story>

<Story name="Hide size control" source>
	<LayerControl bind:state label="Borough" hideSizeControl />
</Story>

<Story name="Checkbox only" source>
	<LayerControl bind:state label="Borough" hideOpacityControl hideColorControl hideSizeControl />
</Story>

<Story name="Multiple control instances" source>
	<div class="space-y-1">
		<LayerControl bind:state={layerStates.boroughs} label="Borough" />
		<LayerControl bind:state={layerStates.imd} label="IMD" hint="Index of Multiple Deprivation" />
		<LayerControl bind:state={layerStates.fuel_poverty} label="Fuel Poverty" />
	</div>

	<div class="mt-4 text-xs">
		Layer states are:

		<pre>{JSON.stringify(state, null, 2)}</pre>
	</div>
</Story>

<!-- <Story name="More complete" source>
	<LayerControl
		bind:state
		label="Borough"
		hint="Boundaries of each of Greater London's 32 boroughs"
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
		hint="Boundaries of each of Greater London's 32 boroughs"
		hideOpacityControl
	/>
</Story>

<Story name="No color control" source>
	<LayerControl
		bind:state
		label="Borough"
		hint="Boundaries of each of Greater London's 32 boroughs"
		hideColorControl
	/>
</Story>

<Story name="No size control" source>
	<LayerControl
		bind:state
		label="Borough"
		hint="Boundaries of each of Greater London's 32 boroughs"
		hideSizeControl
	/>
</Story>

<Story name="No controls - just the checkbox and help text" source>
	<LayerControl
		bind:state
		label="Borough"
		hint="Boundaries of each of Greater London's 32 boroughs"
		hideOpacityControl
		hideColorControl
		hideSizeControl
	/>
</Story>

<Story name="Multiple controls" source>
	<div class="space-y-1">
		<LayerControl
			bind:state={layerStates.boroughs}
			label="Borough"
			hint="Boundaries of each of Greater London's 32 boroughs"
		/>
		<LayerControl bind:state={layerStates.imd} label="IMD" hint="Index of Multiple Deprivation" />
		<LayerControl
			bind:state={layerStates.fuel_poverty}
			label="Fuel Poverty"
			hint="Percentage of households in fuel poverty"
		/>

		<div>
			Layer states are:

			<pre>{JSON.stringify(layerStates, null, 2)}</pre>
		</div>
	</div>
</Story> -->
