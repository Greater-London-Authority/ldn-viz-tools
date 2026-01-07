<script lang="ts">
	/**
	 * The `<LayerControlGroup>` component provides a way to create a set of `<LayerControl>` components defined by an array of objects.
	 *
	 * @component
	 */

	import Checkbox from '../checkBox/Checkbox.svelte';
	import InputWrapper from '../input/InputWrapper.svelte';

	import Button from '../button/Button.svelte';
	import { randomId } from '../utils/randomId';
	import LayerControl from './LayerControl.svelte';
	import type { PatternDefinitions } from './patterns';

	type LayerControlGroupState = Record<
		string,
		{
			colorName: string;
			visible: boolean;
			opacity: number;
			size: number;
		}
	>;

	interface Props {
		/**
		 * The `id` of the `<input>` element: defaults to a randomly-generated value.
		 */
		id?: any;
		/**
		 * Text displayed above the `<input>` element.
		 */
		label?: string;
		/**
		 * Enables screen reader to describe group
		 */
		ariaLabel?: string;
		/**
		 * Text that appears below the `<input>` element, in smaller font than the `label`.
		 */
		description?: string;
		/**
		 * Determines which edge of the `<input>` the description is aligned with.
		 */
		descriptionAlignment?: 'left' | 'right';
		/**
		 * Help text to be displayed in tooltip
		 */
		hint?: string;
		/**
		 * Text to be displayed next to icon in tooltip trigger.
		 */
		hintLabel?: undefined | string;
		/**
		 * If `false`, then `required` attribute is applied to `<input>`.
		 */
		optional?: boolean;
		/**
		 * If `true`, then user is prevented from interacting with the `<input>`.
		 */
		disabled?: boolean;
		/**
		 * Message to be displayed below `<input>` in red text (replacing description).
		 * If set, then the border of the `<input>` is also red.
		 */
		error?: string;
		/**
		 * Each element of this array defines the control for a layer, and is an object with the properties:
		 * * `id` (string)
		 * * `label` (string) - the text displayed next to the checkbox
		 * * `name` (string, optional) - for use by radio or checkbox buttons
		 * * `hint` (string, optional) - help text to be displayed in tooltip
		 *
		 * * `disableColorControl` (boolean) - if `true`, then the trigger to open the opacity control for this layer is not displayed
		 * * `disableOpacityControl` (boolean) - if `true`, then the trigger to open the opacity control for this layer is not displayed
		 * * `disableSizeControl` (boolean) - if `true`, then the trigger to open the opacity control for this layer is not displayed
		 *
		 * * `disabled` (boolean, optional) - if `true`, users cannot change whether the checkbox is checked
		 * * `color` (string, optional) - color of the layer
		 * * `visible` (boolean) - whether the layer should be displayed (indicated by checked checkbox)
		 * * `opacity` (number between 0 and 1, inclusive) - the opacity of the layer
		 * * `size` (number) - size of marker used to display the point
		 */
		options?: {
			id: string;
			label: string;
			name?: string;
			hint?: string;
			disabled?: boolean;
			disableColorControl?: boolean;
			disableOpacityControl?: boolean;
			disableSizeControl?: boolean;
			disableFillControl?: boolean;
		}[];
		/**
		 * Object containing the state of the layers.
		 */
		layersState: LayerControlGroupState;
		/**
		 * if `true`, then the "Clear" control is not displayed (when mutually exclusive).
		 */
		allowClear?: boolean;
		/**
		 * if `true`, then the "Select all" control is not displayed.
		 */
		hideSelectAll?: boolean;
		/**
		 * if `true`, then the trigger to open the color picker is not displayed for any layers
		 */
		disableColorControl?: boolean;
		/**
		 * if `true`, then the trigger to open the opacity control is not displayed for any layers
		 */
		disableOpacityControl?: boolean;
		/**
		 * if `true`, then the trigger to open the size control is not displayed for any layers
		 */
		disableSizeControl?: boolean;
		/**
		 * if `true`, then the trigger to open the fill control is not displayed
		 */
		disableFillControl?: boolean;
		/**
		 * Optional array of colour tokens for use by `ColorPicker`. Defaults to categorical colours.
		 */
		colorNames?: string[];
		/**
		 * Message to be displayed next to the checkbox that toggles the visibility of all layers.
		 */
		showAllLabel?: string;
		mutuallyExclusive?: boolean;
		/**
		 * Name of the radio button group (used only if `mutuallyExclusive` is true)
		 */
		name?: string;

		/**
		 * Definition of available fill patterns (e.g., hatching or dots).
		 */
		patterns?: PatternDefinitions;
	}

	let {
		id = randomId(),
		label = '',
		ariaLabel = '',
		description = '',
		descriptionAlignment = 'left',
		hint = '',
		hintLabel = undefined,
		optional = false,
		disabled = false,
		error = '',
		options = [],
		layersState = $bindable(),
		allowClear = true,
		hideSelectAll = false,
		disableColorControl = false,
		disableOpacityControl = false,
		disableSizeControl = false,
		disableFillControl = false,
		colorNames = [],
		showAllLabel = 'Show all',
		mutuallyExclusive = false,
		name = '',
		patterns
	}: Props = $props();

	/**
	 * Only generate `descriptionId` and/or `errorId` when `description` and/or `error` exist.
	 * `descriptionId` is static but `errorId` is reactive as error state could change.
	 */
	const descriptionId = description ? `${id}-description` : undefined;

	let allCheckboxesCheckedOrDisabled: boolean = $derived(
		options.every((o) => (o.disabled ? true : layersState[o.id]?.visible))
	);

	let noCheckboxesChecked: boolean = $derived(!Object.values(layersState).some((o) => o.visible));

	const selectAll = () => {
		for (const o of options) {
			layersState[o.id].visible = o.disabled ? layersState[o.id].visible : true;
		}
	};

	const clearAll = () => {
		for (const o of options) {
			layersState[o.id].visible = o.disabled ? layersState[o.id].visible : false;
		}
	};

	const toggleAll = () => {
		if (!allCheckboxesCheckedOrDisabled) {
			selectAll();
		} else {
			clearAll();
		}
	};

	let optionIds = options.map((o) => o.id).join(' ');

	let selectedOptionId: string | undefined = $state(); // only used by radioButtons, if mutuallyExclusive
	const updateStateFromCheckbox = (selectedId: string | undefined) => {
		// For Radio Buttons, state is updated by LayerControlGroup.
		// For Checkboxes, each LayerControl updates part of state directly.
		for (const o of options) {
			layersState[o.id].visible = o.disabled ? layersState[o.id].visible : o.id === selectedId;
		}
	};
	const clearRadioButtons = () => {
		clearAll();
		selectedOptionId = undefined;
	};

	// construct list of controls which are in use
	let errorId = $derived(error ? `${id}-error` : undefined);

	// eslint-disable-next-line @typescript-eslint/no-unused-expressions
	$effect(() => {
		mutuallyExclusive && updateStateFromCheckbox(selectedOptionId);
	});

	let controlsInUse = $derived.by(() => {
		const controls = [];
		if (!disableColorControl && !options.every((l) => l.disableColorControl)) {
			controls.push('color');
		}
		if (!disableOpacityControl && !options.every((l) => l.disableOpacityControl)) {
			controls.push('opacity');
		}
		if (!disableSizeControl && !options.every((l) => l.disableSizeControl)) {
			controls.push('size');
		}
		if (!disableFillControl && !options.every((l) => l.disableFillControl)) {
			controls.push('fill');
		}
		return controls as ('color' | 'opacity' | 'size' | 'fill')[];
	});
</script>

<InputWrapper
	{label}
	{id}
	{descriptionId}
	{description}
	{descriptionAlignment}
	{hintLabel}
	{hint}
	{errorId}
	{error}
	{disabled}
	{optional}
>
	<!-- TODO: hint -->

	<div {id} role="group" aria-label={ariaLabel} class="flex flex-col space-y-1">
		{#if mutuallyExclusive}
			{#if allowClear}
				<Button {disabled} variant="text" class="!justify-start  !px-0" onclick={clearRadioButtons}>
					Clear
				</Button>
			{/if}

			<ul class="flex flex-col space-y-1">
				{#each options as option}
					<li>
						<LayerControl
							label={option.label}
							{name}
							bind:layerState={layersState[option.id]}
							optionId={option.id}
							disabled={option.disabled || disabled}
							bind:selectedOptionId
							mutuallyExclusive
							{colorNames}
							{patterns}
						/>
					</li>
				{/each}
			</ul>
		{:else}
			{#if !hideSelectAll}
				<!--
        form="" should prevent this checkbox from being included in form
        submissions.
      -->
				<Checkbox
					id={randomId()}
					form=""
					name="all"
					label={showAllLabel}
					checked={allCheckboxesCheckedOrDisabled}
					indeterminate={!allCheckboxesCheckedOrDisabled && !noCheckboxesChecked}
					aria-controls={optionIds}
					onchange={toggleAll}
					{disabled}
				/>
			{/if}

			<ul class={`flex flex-col space-y-1 ${allowClear ? '' : 'pl-5'}`}>
				{#each options as option (option.id)}
					<li>
						<LayerControl
							label={option.label}
							name={option.name}
							disabled={option.disabled || disabled}
							hint={option.hint}
							disableColorControl={disableColorControl || option.disableColorControl}
							disableOpacityControl={disableOpacityControl || option.disableOpacityControl}
							disableSizeControl={disableSizeControl || option.disableSizeControl}
							bind:layerState={layersState[option.id]}
							{controlsInUse}
							{colorNames}
							{patterns}
						/>
					</li>
				{/each}
			</ul>
		{/if}
	</div>
</InputWrapper>
