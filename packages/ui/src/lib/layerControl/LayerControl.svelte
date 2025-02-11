<script lang="ts">
	/**
	 * The `LayerControl` component combines a checkbox with color and opacity controls.
	 * @component
	 */
	import Checkbox from '../checkBox/Checkbox.svelte';
	import OpacityControl from '../layerControl/OpacityControl.svelte';
	import Overlay from '../overlay/Overlay.svelte';
	import Trigger from '../overlay/Trigger.svelte';
	import RadioButton from '../radioButton/RadioButton.svelte';
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
	 * Optional help text that appears in a tooltip when a user interacts with the tooltip trigger.
	 * It provides additional information intended to help the user decide whether to check the checkbox.
	 */
	export let hint = '';

	/**
	 * Optional text that appears next to the information icon (the letter "i" in a circle) in the tooltip trigger.
	 * It provides additional clues that help text is available (e.g. "More information", "About", "Help")
	 */
	export let hintLabel = '';

	export let disabled = false;

	/**
	 * object containing user-controlled properties of the layer:
	 * * colorName (string) - the name of the color token in our design system (e,g, `data.categorical.yellow`)
	 * * visibility (boolean)
	 * * opacity (number between 0 and 1, inclusive)
	 * * size (number)
	 */
	export let state: {
		colorName: string;
		visible: boolean;
		opacity: number;
		size?: number;
	} = {
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

	/**
	 * If true, then control is rendered as a radio button rather than checkbox.
	 */
	export let mutuallyExclusive = false;

	/**
	 * Id of selected option (used only if `mutuallyExclusive` is true)
	 */
	export let selectedOptionId: string | undefined = undefined;
	/**
	 * Id of this option  (used only if `mutuallyExclusive` is true).
	 */
	export let optionId = '';

	/**
	 * Name of the radio button group  (used only if `mutuallyExclusive` is true)
	 */
	export let name = '';
</script>

<div class="flex items-center space-x-1">
	<div class="mr-1">
		{#if mutuallyExclusive}
			<RadioButton
				id={optionId}
				bind:selectedId={selectedOptionId}
				label=""
				{disabled}
				{hint}
				{name}
			/>
		{:else}
			<Checkbox bind:checked={state.visible} label="" {disabled} />
		{/if}
	</div>

	{#if !hideColorControl}
		<ColorPicker bind:colorName={state.colorName} />
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
	{#if $$slots.hint}
		<!-- An optional `<Overlay>` component to provide additional explanation. -->
		<slot name="hint" />
	{/if}
	{#if hint}
		<Overlay>
			<Trigger slot="trigger" size="xs" {hintLabel} />
			{hint}
		</Overlay>
	{/if}
</div>
