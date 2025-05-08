<script context="module" lang="ts">
	import { Story, Template } from '@storybook/addon-svelte-csf';
	import LayerControl from './LayerControl.svelte';

	export const meta = {
		title: 'Ui/Components/Layer Controls/LayerControl',
		component: LayerControl
	};
</script>

<script lang="ts">
	import { colorTokenNameToRGBArray, currentTheme, tokenNameToValue } from '../theme/themeStore';
	import { colorNames } from './layerControlUtils';

	let layerStates = {
		boroughs: {
			colorName: 'data.primary',
			visible: true,
			opacity: 1.0
		},
		imd: {
			colorName: 'data.categorical.red',
			visible: true,
			opacity: 1.0
		},
		fuel_poverty: {
			colorName: 'data.categorical.orange',
			visible: true,
			opacity: 1.0
		},
		customColors: {
			colorName: 'palette.blue.600',
			visible: true,
			opacity: 1.0
		}
	};

	let state = layerStates.boroughs;
</script>

<Template let:args>
	<div class="w-96">
		<LayerControl bind:state {...args} name="default" />
	</div>
	<pre class="mt-4 text-xs">{JSON.stringify(state, null, 2)}</pre>

	<p>
		Color is: {tokenNameToValue(state.colorName, $currentTheme)} or [{colorTokenNameToRGBArray(
			state.colorName,
			$currentTheme
		)}]
	</p>
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
	<LayerControl bind:state label="Borough" disableColorControl />
</Story>

<Story name="Hide opacity control" source>
	<LayerControl bind:state label="Borough" disableOpacityControl />
</Story>

<Story name="Hide size control" source>
	<LayerControl bind:state label="Borough" disableSizeControl />
</Story>

<Story name="Checkbox only" source>
	<LayerControl
		bind:state
		label="Borough"
		disableOpacityControl
		disableColorControl
		disableSizeControl
	/>
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

<Story name="Disabled (Color)" source>
	<LayerControl bind:state label="Borough" disableColorControl />
</Story>
<Story name="Disabled (Opacity)" source>
	<LayerControl bind:state label="Borough" disableOpacityControl />
</Story>
<Story name="Disabled (Size)" source>
	<LayerControl bind:state label="Borough" disableSizeControl />
</Story>

<Story name="With name prop" source>
	<LayerControl bind:state label="Borough" name="borough" />
</Story>

<!-- Note, this colour combination isn't accessible but is demonstrating potential for customising colours where necessary. -->
<Story name="With custom colours" source>
	<LayerControl bind:state={layerStates.customColors} label="Borough" {colorNames} />
</Story>
