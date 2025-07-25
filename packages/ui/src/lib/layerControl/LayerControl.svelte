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
	import ResizeControl from './ResizeControl.svelte';

	import type { Snippet } from 'svelte';
	import { randomId } from '../utils/randomId';
	import ColorPicker from './ColorPicker.svelte';
	import FillTypeControl from './FillTypeControl.svelte';

	interface Props {
		/**
		 * if `true`, then the trigger to open the color picker is not displayed
		 */
		disableColorControl?: boolean;
		/**
		 * if `true`, then the trigger to open the opacity control is not displayed
		 */
		disableOpacityControl?: boolean;
		/**
		 * if `true`, then the trigger to open the size control is not displayed
		 */
		disableSizeControl?: boolean;
		disableFillControl?: boolean;
		/**
		 * Optional array of colour tokens for use by `ColorPicker`. Defaults to categorical colours.
		 */
		colorNames?: string[];
		/**
		 * the name of the layer
		 */
		label?: string;
		/**
		 * Optional help text that appears in a tooltip when a user interacts with the tooltip trigger.
		 * It provides additional information intended to help the user decide whether to check the checkbox.
		 */
		hint?: string;
		/**
		 * Optional text that appears next to the information icon (the letter "i" in a circle) in the tooltip trigger.
		 * It provides additional clues that help text is available (e.g. "More information", "About", "Help")
		 */
		hintLabel?: string;
		/**
		 * Optional help snippet passed as an overlay component when a user interacts with the overlay trigger.
		 * hint and hintLabel props are superceeded if customOverlay is supplied
		 * It provides additional information to support the users decisions.
		 */
		customOverlay?: Snippet;

		disabled?: boolean;
		/**
		 * object containing user-controlled properties of the layer:
		 * * colorName (string) - the name of the color token in our design system (e,g, `data.categorical.yellow`)
		 * * visibility (boolean)
		 * * opacity (number between 0 and 1, inclusive)
		 * * size (number)
		 */
		layerState?: {
			colorName: string;
			visible: boolean;
			opacity: number;
			size?: number;
			fillType?: string;
		};
		/**
		 * minimum permitted value for the marker size
		 */
		minSize?: number;
		/**
		 * maximum permitted value for the marker size
		 */
		maxSize?: number;
		/**
		 * If true, then control is rendered as a radio button rather than checkbox.
		 */
		mutuallyExclusive?: boolean;
		/**
		 * Id of selected option (used only if `mutuallyExclusive` is true)
		 */
		selectedOptionId?: string | undefined;
		/**
		 * Id of this option.
		 */
		optionId?: any;
		/**
		 * Name of the radio/checkbox button group. If `mutuallyExclusive` is true,
		 * this is required (should have the same value for all radio buttons in group).
		 */
		name?: string;
		/**
		 * List of controls for which placeholder should be displayed in control is hidden.
		 * This enables alignment of controls between different `LayerControl`s with different controls enabled,
		 */
		controlsInUse?: ('color' | 'opacity' | 'size' | 'fill')[];
	}

	let {
		disableColorControl = false,
		disableOpacityControl = false,
		disableSizeControl = false,
		disableFillControl = false,
		colorNames = [],
		label = '',
		hint = '',
		hintLabel = '',
		customOverlay = undefined,
		disabled = false,
		layerState = $bindable(/*{
			colorName: 'data.categorical.darkpink',
			visible: true,
			opacity: 1.0,
			size: 10,
			fillType: 'solid-fill'
		}*/),
		minSize = 1,
		maxSize = 100,
		mutuallyExclusive = false,
		selectedOptionId = $bindable(),
		optionId = randomId(),
		name = '',
		controlsInUse = ['color', 'opacity', 'size']
	}: Props = $props();
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
			<Checkbox bind:checked={layerState.visible} label="" {disabled} id={optionId} {name} />
		{/if}
	</div>

	{#if controlsInUse.includes('color')}
		<ColorPicker
			{colorNames}
			bind:activeColorName={layerState.colorName}
			disabled={disabled || disableColorControl}
			{label}
		/>
	{/if}

	{#if controlsInUse.includes('opacity')}
		<OpacityControl
			bind:opacity={layerState.opacity}
			disabled={disabled || disableOpacityControl}
			{label}
		/>
	{/if}

	{#if controlsInUse.includes('size')}
		<ResizeControl
			bind:size={layerState.size}
			{minSize}
			{maxSize}
			disabled={disabled || disableSizeControl}
			{label}
		/>
	{/if}

	{#if controlsInUse.includes('fill')}
		<FillTypeControl
			bind:fillType={layerState.fillType}
			disabled={disabled || disableFillControl}
			{label}
		/>
	{/if}

	{#if label}
		<label class="form-label font-normal leading-none" for={optionId}>{label}</label>
	{/if}

	{#if hint}
		<Overlay>
			{#snippet trigger(props)}
				<Trigger {...props} size="xs" {hintLabel} />
			{/snippet}
			{hint}
		</Overlay>
	{/if}

	{#if customOverlay}
		{@render customOverlay()}
	{/if}
</div>
