<script module lang="ts">
	import { defineMeta } from '@storybook/addon-svelte-csf';
	import ColorPicker from './ColorPicker.svelte';
	import { colorNames } from './layerControlUtils';

	/**
	 * `ColorPicker` is a sub-control of `LayerControl`. It renders a colour chip that opens a
	 * popover containing a grid of colour swatches. The currently-selected swatch is highlighted
	 * with an active-selection ring.
	 */
	const { Story } = defineMeta({
		title: 'Ui/Components/Layer Controls/LayerControl/ColorPicker',
		component: ColorPicker,
		tags: ['autodocs']
	});
</script>

<script lang="ts">
	let activeColorName = $state('data.categorical.blue');
	let activeColorNameChip = $state('data.categorical.red');
	let activeColorNameCustom = $state('palette.purple.600');
</script>

<!-- Passing an empty `colorNames` array falls back to the default categorical palette. -->
<Story name="Default swatch grid">
	{#snippet template()}
		<ColorPicker label="Borough" colorNames={[]} bind:activeColorName />
		<pre class="mt-4 text-xs">{activeColorName}</pre>
	{/snippet}
</Story>

<!-- When disabled, a "no symbol" icon is shown in place of the colour chip. -->
<Story name="Disabled (no chip)">
	{#snippet template()}
		<ColorPicker label="Borough" colorNames={[]} bind:activeColorName disabled />
	{/snippet}
</Story>

<!-- With `alwaysShowcolorChip`, the (non-interactive) colour chip remains visible while disabled. -->
<Story name="Disabled with chip">
	{#snippet template()}
		<ColorPicker
			label="Borough"
			colorNames={[]}
			bind:activeColorName={activeColorNameChip}
			disabled
			alwaysShowcolorChip
		/>
	{/snippet}
</Story>

<!-- A custom set of colour tokens can be supplied via `colorNames`. -->
<Story name="Custom colorNames">
	{#snippet template()}
		<ColorPicker label="Borough" {colorNames} bind:activeColorName={activeColorNameCustom} />
		<pre class="mt-4 text-xs">{activeColorNameCustom}</pre>
	{/snippet}
</Story>
