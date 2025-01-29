<script lang="ts">
	/**
	 * The `LayerControl` component combines a checkbox with color and opacity controls.
	 * @component
	 */
	import Checkbox from '../checkBox/Checkbox.svelte';
	import OpacityControl from '../layerControl/OpacityControl.svelte';
	import Tooltip from '../tooltip/Tooltip.svelte';
	import ColorPicker from './ColorPicker.svelte';
	import ResizeControl from './ResizeControl.svelte';

	/**
	 * if `true`, then the trigger to open the color picker is not displayed
	 */
	export let hideColorControl = false;

	/**
	 * if `true`, then the trigger to open the opacity control is not displayed
	 */
	export let hideOpacityControl = false;

	/**
	 * if `true`, then the trigger to open the size control is not displayed
	 */
	export let hideSizeControl = false;

	/**
	 * the name of the layer
	 */
	export let label = '';

	/**
	 * (optional) explanatory help text to be displayed in tooltip
	 */
	export let hint = '';

	export let disabled = false;

	/**
	 * object containing user-controlled properties of the layer:
	 * * colorName (string) - the name of the color token in our design system (e,g, `data.categorical.yellow`)
	 *  * color (string) - the actual color, as a hexstring (e.g., fff200)
	 * * visibility (boolean)
	 * * opacity (number between 0 and 1, inclusive)
	 * * size (number)
	 *
	 * Note that the `color` is automatically derived from the `colorName`, and will update if the theme is switched between light and dark.
	 */
	export let state: {
		color: string;
		colorName: string;
		visible: boolean;
		opacity: number;
		size?: number;
	} = {
		color: '#9e0059',
		colorName: 'data.categorical.darkpink',
		visible: true,
		opacity: 1.0,
		size: 10
	};

	/**
	 * minimum permitted value for the marker size
	 */
	export let minSize = 1;

	/**
	 * maximum permitted value for the marker size
	 */
	export let maxSize = 100;
</script>

<div class="flex items-center space-x-1">
	<div class="mr-1">
		<Checkbox bind:checked={state.visible} label="" {disabled} />
	</div>

	{#if !hideColorControl}
		<ColorPicker bind:color={state.color} bind:colorName={state.colorName} />
	{/if}

	{#if !hideOpacityControl}
		<OpacityControl bind:opacity={state.opacity} />
	{/if}

	{#if !hideSizeControl}
		<ResizeControl bind:size={state.size} {minSize} {maxSize} />
	{/if}
	{#if label}
		<span class="form-label font-normal leading-none">{label}</span>
	{/if}
	{#if hint}
		<Tooltip hintLabel="">
			{hint}
		</Tooltip>
	{/if}
</div>

<!-- <div class="flex items-center content-center space-x-1">
	<div class="flex items-center content-center space-x-1">
		<Checkbox bind:checked={state.visible} label="" {disabled} />

		{#if !hideColorControl}
			<ColorPicker bind:color={state.color} />
		{/if}

		{#if !hideOpacityControl}
			<OpacityControl bind:opacity={state.opacity} />
		{/if}

		{#if !hideSizeControl}
			<ResizeControl bind:size={state.size} {minSize} {maxSize} />
		{/if}
	</div>

	<div class="flex pl-1">
		{label}
		{#if hint}
			<Tooltip hintLabel="">{hint}</Tooltip>
		{/if}
	</div>
</div> -->
