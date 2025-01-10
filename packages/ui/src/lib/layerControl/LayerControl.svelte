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
	 * * color (string)
	 * * visibility (boolean)
	 * * opacity (number between 0 and 1, inclusive)
	 * * size (number)
	 */
	export let state: { color: string; visible: boolean; opacity: number; size?: number } = {
		color: '#000000',
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

<div class="flex items-center content-center gap-2">
	<div class="flex items-center content-center gap-0.5">
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

	<div class="flex items-center content-center gap-0.5">
		{label}
		{#if hint}
			<Tooltip hintLabel="">{hint}</Tooltip>
		{/if}
	</div>
</div>
