<!-- @migration-task Error while migrating Svelte code: can't migrate `let layerStates = {
		boroughs: {
			colorName: 'data.categorical.blue',
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
	};` to `$state` because there's a variable named state.
     Rename the variable and try again or migrate by hand. -->
<script context="module" lang="ts">
	import { defineMeta } from '@storybook/addon-svelte-csf';
	import LayerControl from './LayerControl.svelte';

	const { Story } = defineMeta({
		title: 'Ui/Components/Layer Controls/LayerControl',
		component: LayerControl,
		tags: ['autodocs']
	});
</script>

<script lang="ts">
	import { theme } from '../theme/themeState.svelte';
	//import { colorTokenNameToRGBArray, currentTheme, tokenNameToValue } from '../theme/themeStore';
	import { colorNames } from './layerControlUtils';

	let layerStates = {
		boroughs: {
			colorName: 'data.categorical.blue',
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

<Story name="Default">
	{#snippet template({ args })}
		<div class="w-96">
			<LayerControl bind:state {...args} name="default" />
		</div>
		<pre class="mt-4 text-xs">{JSON.stringify(state, null, 2)}</pre>

		<p class="mt-4 text-sm">
			Active Color is: <span
				style={`color: ${theme.tokenNameToValue(state.colorName, theme.currentTheme)}`}
			>
				{theme.tokenNameToValue(state.colorName, theme.currentTheme)}
			</span>
			or [{theme.colorTokenNameToRGBArray(state.colorName, theme.currentTheme)}]
		</p>
	{/snippet}
</Story>

<Story name="With Label" source>
	{#snippet template()}
		<LayerControl bind:state label="Borough" />
	{/snippet}
</Story>

<Story name="With Label and hint" source>
	{#snippet template()}
		<LayerControl
			bind:state
			label="Borough"
			hint="Boundaries of each of Greater London's 32 boroughs"
		/>
	{/snippet}
</Story>

<Story name="Hide color control" source>
	{#snippet template()}
		<LayerControl bind:state label="Borough" disableColorControl />
	{/snippet}
</Story>

<Story name="Hide opacity control" source>
	{#snippet template()}
		<LayerControl bind:state label="Borough" disableOpacityControl />
	{/snippet}
</Story>

<Story name="Hide size control" source>
	{#snippet template()}
		<LayerControl bind:state label="Borough" disableSizeControl />
	{/snippet}
</Story>

<Story name="Checkbox only" source>
	{#snippet template()}
		<LayerControl
			bind:state
			label="Borough"
			disableOpacityControl
			disableColorControl
			disableSizeControl
		/>
	{/snippet}
</Story>

<Story name="Multiple control instances" source>
	{#snippet template()}
		<div class="space-y-1">
			<LayerControl bind:state={layerStates.boroughs} label="Borough" />
			<LayerControl bind:state={layerStates.imd} label="IMD" hint="Index of Multiple Deprivation" />
			<LayerControl bind:state={layerStates.fuel_poverty} label="Fuel Poverty" />
		</div>

		<div class="mt-4 text-xs">
			Layer states are:

			<pre>{JSON.stringify(state, null, 2)}</pre>
		</div>
	{/snippet}
</Story>

<Story name="Disabled (Color)" source>
	{#snippet template()}
		<LayerControl bind:state label="Borough" disableColorControl />
	{/snippet}
</Story>

<Story name="Disabled (Opacity)" source>
	{#snippet template()}
		<LayerControl bind:state label="Borough" disableOpacityControl />
	{/snippet}
</Story>
<Story name="Disabled (Size)" source>
	{#snippet template()}
		<LayerControl bind:state label="Borough" disableSizeControl />
	{/snippet}
</Story>

<Story name="With name prop" source>
	{#snippet template()}
		<LayerControl bind:state label="Borough" name="borough" />
	{/snippet}
</Story>

<!-- Note, this colour combination isn't accessible but is demonstrating potential for customising colours where necessary. -->
<Story name="With custom colours" source>
	{#snippet template()}
		<LayerControl bind:state={layerStates.customColors} label="Borough" {colorNames} />
	{/snippet}
</Story>
