<!-- @migration-task Error while migrating Svelte code: This migration would change the name of a slot (hint to hint_1) making the component unusable -->
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

	import { randomId } from '../utils/randomId';
	import FillTypeControl from './FillTypeControl.svelte';

	/**
	 * if `true`, then the trigger to open the color picker is not displayed
	 */
	export let disableColorControl = false;

	/**
	 * if `true`, then the trigger to open the opacity control is not displayed
	 */
	export let disableOpacityControl = false;

	/**
	 * if `true`, then the trigger to open the size control is not displayed
	 */
	export let disableSizeControl = false;

	export let disableFillControl = false;

	/**
	 * Optional array of colour tokens for use by `ColorPicker`. Defaults to categorical colours.
	 */
	export let colorNames: string[] = [];

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
		fillType?: string;
	} = {
		colorName: 'data.categorical.darkpink',
		visible: true,
		opacity: 1.0,
		size: 10,
		fillType: 'solid-fill'
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
	 * Id of this option.
	 */
	export let optionId = randomId();

	/**
	 * Name of the radio/checkbox button group. If `mutuallyExclusive` is true,
	 * this is required (should have the same value for all radio buttons in group).
	 */
	export let name = '';

	/**
	 * List of controls for which placeholder should be displayed in control is hidden.
	 * This enables alignment of controls between different `LayerControl`s with different controls enabled,
	 */
	export let controlsInUse: ('color' | 'opacity' | 'size' | 'fill')[] = [
		'color',
		'opacity',
		'size'
	];
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
			<Checkbox bind:checked={state.visible} label="" {disabled} id={optionId} {name} />
		{/if}
	</div>

	{#if controlsInUse.includes('color')}
		<ColorPicker
			{colorNames}
			bind:activeColorName={state.colorName}
			disabled={disabled || disableColorControl}
			{label}
		/>
	{/if}

	{#if controlsInUse.includes('opacity')}
		<OpacityControl
			bind:opacity={state.opacity}
			disabled={disabled || disableOpacityControl}
			{label}
		/>
	{/if}

	{#if controlsInUse.includes('size')}
		<ResizeControl
			bind:size={state.size}
			{minSize}
			{maxSize}
			disabled={disabled || disableSizeControl}
			{label}
		/>
	{/if}

	{#if controlsInUse.includes('fill')}
		<FillTypeControl
			bind:fillType={state.fillType}
			disabled={disabled || disableFillControl}
			{label}
		/>
	{/if}

	{#if label}
		<label class="form-label font-normal leading-none" for={optionId}>{label}</label>
	{/if}

	{#if $$slots.hint}
		<!-- An optional `<Overlay>` component to provide additional explanation. -->
		<slot name="hint" />
	{/if}

	{#if hint}
		<Overlay>
			<Trigger
				slot="trigger"
				size="xs"
				{hintLabel}
				ariaLabel={!hintLabel && label ? label : null}
			/>
			{hint}
		</Overlay>
	{/if}
</div>
