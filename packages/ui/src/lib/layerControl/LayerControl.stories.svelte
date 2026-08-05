<script module lang="ts">
	import { defineMeta } from '@storybook/addon-svelte-csf';
	import { theme } from '../theme/themeState.svelte';
	import LayerControl from './LayerControl.svelte';
	import { colorNames } from './layerControlUtils';

	/**
	 * The `LayerControl` component combines a checkbox with color and opacity controls.
	 */
	const { Story } = defineMeta({
		title: 'Ui/Components/Layer Controls/LayerControl',
		component: LayerControl,
		tags: ['autodocs']
	});

	let layerStates = $state({
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
	});

	let layerState = $state(layerStates.boroughs);
</script>

<script lang="ts">
	import Overlay from '../overlay/Overlay.svelte';
	import Trigger from '../overlay/Trigger.svelte';

	let fillLayerState = $state({
		colorName: 'data.categorical.blue',
		visible: true,
		opacity: 1.0,
		size: 10,
		fillType: 'solid-fill'
	});

	let sizeLayerState = $state({
		colorName: 'data.categorical.green',
		visible: true,
		opacity: 1.0,
		size: 20
	});

	let radioSelectedId = $state<string | undefined>('borough');
</script>

<Story name="Default">
	{#snippet template(args)}
		<div class="w-96">
			<LayerControl {...args} bind:layerState name="default" />
		</div>
		<pre class="mt-4 text-xs">{JSON.stringify(layerState, null, 2)}</pre>

		<p class="mt-4 text-sm">
			Active Color is: <span
				style={`color: ${theme.tokenNameToValue(layerState.colorName, theme.currentTheme)}`}
			>
				{theme.tokenNameToValue(layerState.colorName, theme.currentTheme)}
			</span>
			or [{theme.colorTokenNameToRGBArray(layerState.colorName, theme.currentTheme)}]
		</p>
	{/snippet}
</Story>

<Story name="With Label">
	{#snippet template()}
		<LayerControl bind:layerState label="Borough" />
	{/snippet}
</Story>

<Story name="With Label and hint">
	{#snippet template()}
		<LayerControl
			bind:layerState
			label="Borough"
			hint="Boundaries of each of Greater London's 32 boroughs"
		/>
	{/snippet}
</Story>

<Story name="Hide color control">
	{#snippet template()}
		<LayerControl bind:layerState label="Borough" disableColorControl />
	{/snippet}
</Story>

<Story name="Hide opacity control">
	{#snippet template()}
		<LayerControl bind:layerState label="Borough" disableOpacityControl />
	{/snippet}
</Story>

<Story name="Hide size control">
	{#snippet template()}
		<LayerControl bind:layerState label="Borough" disableSizeControl />
	{/snippet}
</Story>

<Story name="Checkbox only">
	{#snippet template()}
		<LayerControl
			bind:layerState
			label="Borough"
			disableOpacityControl
			disableColorControl
			disableSizeControl
		/>
	{/snippet}
</Story>

<Story name="Multiple control instances">
	{#snippet template()}
		<div class="space-y-1">
			<LayerControl bind:layerState={layerStates.boroughs} label="Borough" />
			<LayerControl
				bind:layerState={layerStates.imd}
				label="IMD"
				hint="Index of Multiple Deprivation"
			/>
			<LayerControl bind:layerState={layerStates.fuel_poverty} label="Fuel Poverty" />
		</div>

		<div class="mt-4 text-xs">
			Layer states are:

			<pre>{JSON.stringify(layerState, null, 2)}</pre>
		</div>
	{/snippet}
</Story>

<Story name="Disabled (Color)">
	{#snippet template()}
		<LayerControl bind:layerState label="Borough" disableColorControl />
	{/snippet}
</Story>

<!-- The color control is disabled but the color chip is still displayed to show the current color. -->
<Story name="Color chips shown, desite color control being disabled">
	{#snippet template()}
		<LayerControl bind:layerState label="Borough" disableColorControl alwaysShowcolorChip />
	{/snippet}
</Story>

<Story name="Disabled (Opacity)">
	{#snippet template()}
		<LayerControl bind:layerState label="Borough" disableOpacityControl />
	{/snippet}
</Story>
<Story name="Disabled (Size)">
	{#snippet template()}
		<LayerControl bind:layerState label="Borough" disableSizeControl />
	{/snippet}
</Story>

<Story name="With name prop">
	{#snippet template()}
		<LayerControl bind:layerState label="Borough" name="borough" />
	{/snippet}
</Story>

<!-- Note, this colour combination isn't accessible but is demonstrating potential for customising colours where necessary. -->
<Story name="With custom colours">
	{#snippet template()}
		<LayerControl bind:layerState={layerStates.customColors} label="Borough" {colorNames} />
	{/snippet}
</Story>

<!-- The `fill` control is only rendered when `'fill'` is included in `controlsInUse`. -->
<Story name="With fill control">
	{#snippet template()}
		<LayerControl
			bind:layerState={fillLayerState}
			label="Borough"
			controlsInUse={['color', 'opacity', 'size', 'fill']}
		/>
		<pre class="mt-4 text-xs">{JSON.stringify(fillLayerState, null, 2)}</pre>
	{/snippet}
</Story>

<!-- When `mutuallyExclusive` is set, the checkbox is swapped for a radio button and the selection is tracked via `selectedOptionId`. -->
<Story name="Mutually exclusive (radio)">
	{#snippet template()}
		<LayerControl
			bind:layerState
			label="Borough"
			mutuallyExclusive
			optionId="borough"
			name="mutually-exclusive-layer"
			bind:selectedOptionId={radioSelectedId}
		/>
		<pre class="mt-4 text-xs">Selected: {radioSelectedId}</pre>
	{/snippet}
</Story>

<!-- The master `disabled` flag disables the input and every sub-control. -->
<Story name="Fully disabled">
	{#snippet template()}
		<LayerControl bind:layerState label="Borough" disabled />
	{/snippet}
</Story>

<!--
Here the min/max marker sizes are set to 10/50 (overriding the default 1/100)
-->
<Story name="Custom min/max marker size">
	{#snippet template()}
		<LayerControl bind:layerState={sizeLayerState} label="Borough" minSize={10} maxSize={50} />
		<pre class="mt-4 text-xs">{JSON.stringify(sizeLayerState, null, 2)}</pre>
	{/snippet}
</Story>

<!-- `customOverlay` supersedes the `hint` prop and can contain richer content. -->
<Story name="With customOverlay">
	{#snippet template()}
		{#snippet customOverlay()}
			<Overlay open={false}>
				{#snippet trigger(props)}
					<Trigger {...props} size="xs" hintLabel="More information" />
				{/snippet}
				This is a custom overlay: it supersedes the hint prop and can contain
				<span class="text-lg font-bold italic">richer</span> content.
			</Overlay>
		{/snippet}
		<LayerControl
			bind:layerState
			label="Borough"
			hint="This hint is superseded by customOverlay"
			{customOverlay}
		/>
	{/snippet}
</Story>
