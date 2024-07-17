<script lang="ts">
	/**
	 * The `LayerControl` component combines a checkbox with color and opacity controls.
	 * @component
	 */
	import Tooltip from '../tooltip/Tooltip.svelte';
	import OpacityControl from '../layerControl/OpacityControl.svelte';
	import Checkbox from '../checkBox/Checkbox.svelte';
	import ColorPicker from './ColorPicker.svelte';

	/**
	 * if `true`, then the trigger to open the color picker is not displayed
	 */
	export let hideColorControl = false;

	/**
	 * if `true`, then the trigger to open the opacity control is not displayed
	 */
	export let hideOpacityControl = false;

	/**
	 * the name of the layer
	 */
	export let label = '';

	/**
	 * (optional) explanatory help text to be displayed in tooltip
	 */
	export let helpText = '';

	/**
	 * object containing user-controlled properties of the layer:
	 * * color (string)
	 * * visibility (boolean)
	 * * opacity (number between 0 and 1, inclusive)
	 */
	export let state = {
		color: '#000000',
		visible: true,
		opacity: 1.0
	};
</script>

<div class="flex items-center content-center gap-2">
	<div class="flex items-center content-center gap-0.5">
		<Checkbox bind:checked={state.visible} label="" />

		{#if !hideColorControl}
			<ColorPicker bind:color={state.color} />
		{/if}

		{#if !hideOpacityControl}
			<OpacityControl bind:opacity={state.opacity} />
		{/if}
	</div>

	<div class="flex items-center content-center gap-0.5">
		{label}
		{#if helpText}
			<Tooltip hintLabel="">{helpText}</Tooltip>
		{/if}
	</div>
</div>
