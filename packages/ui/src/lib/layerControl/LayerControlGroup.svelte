<script lang="ts">
	/**
	 * The `<LayerControlGroup>` component provides a way to create a set of `<LayerControlGroup>` components defined by an array of objects.
	 *
	 * @component
	 */

	import Checkbox from '../checkBox/Checkbox.svelte';
	import InputWrapper from '../input/InputWrapper.svelte';

	import Button from '../button/Button.svelte';
	import { randomId } from '../utils/randomId';
	import LayerControl from './LayerControl.svelte';

	/**
	 * The `id` of the `<input>` element: defaults to a randomly-generated value.
	 */
	export let id = randomId();

	/**
	 * Text displayed above the `<input>` element.
	 */
	export let label = '';

	/**
	 * Text that appears below the `<input>` element, in smaller font than the `label`.
	 */
	export let description = '';

	/**
	 * Determines which edge of the `<input>` the description is aligned with.
	 */
	export let descriptionAlignment: 'left' | 'right' = 'left';

	/**
	 * Help text to be displayed in tooltip
	 */
	export let hint = '';

	/**
	 * Text to be displayed next to icon in tooltip trigger.
	 */
	export let hintLabel: undefined | string = undefined;

	/**
	 * If `false`, then `required` attribute is applied to `<input>`.
	 */
	export let optional = false;

	/**
	 * If `true`, then user is prevented from interacting with the `<input>`.
	 */
	export let disabled = false;

	/**
	 * Message to be displayed below `<input>` in red text (replacing description).
	 * If set, then the border of the `<input>` is also red.
	 */
	export let error = '';

	/**
	 * Only generate `descriptionId` and/or `errorId` when `description` and/or `error` exist.
	 * `descriptionId` is static but `errorId` is reactive as error state could change.
	 */
	const descriptionId = description ? `${id}-description` : undefined;
	$: errorId = error ? `${id}-error` : undefined;

	/**
	 * Each element of this array defines the control for a layer, and is an object with the properties:
	 * * `id` (string)
	 * * `label` (string) - the text displayed next to the checkbox
	 * * `hint` (string, optional) - help text to be displayed in tooltip
	 *
	 * * `hideColorControl` (boolean) - if `true`, then the trigger to open the opacity control for this layer is not displayed
	 * * `hideOpacityControl` (boolean) - if `true`, then the trigger to open the opacity control for this layer is not displayed
	 * * `hideSizeControl` (boolean) - if `true`, then the trigger to open the opacity control for this layer is not displayed
	 *
	 * * `disabled` (boolean, optional) - if `true`, users cannot change whether the checkbox is checked
	 * * `color` (string, optional) - color of the layer
	 * * `visible` (boolean) - whether the layer should be displayed (indicated by checked checkbox)
	 * * `opacity` (number between 0 and 1, inclusive) - the opacity of the layer
	 * * `size` (number) - size of marker used to display the point
	 */
	export let options: {
		id: string;
		label: string;
		hint?: string;

		disabled?: boolean;
		hideColorControl?: boolean;
		hideOpacityControl?: boolean;
		hideSizeControl?: boolean;
	}[] = [];

	type LayerControlGroupState = Record<
		string,
		{
			colorName: string;
			visible: boolean;
			opacity: number;
			size: number;
		}
	>;

	/**
	 * Object containing the state of the layers.
	 */
	export let state: LayerControlGroupState;

	/**
	 * if `true`, then the "Select all" control is not displayed.
	 */
	export let buttonsHidden = false;

	/**
	 * if `true`, then the trigger to open the color picker is not displayed for any layers
	 */
	export let hideColorControl = false;

	/**
	 * if `true`, then the trigger to open the opacity control is not displayed for any layers
	 */
	export let hideOpacityControl = false;

	/**
	 * if `true`, then the trigger to open the size control is not displayed for any layers
	 */
	export let hideSizeControl = false;

	/**
	 * Message to be displayed next to the checkbox that toggles the visibility of all layers.
	 */
	export let showAllLabel = 'Show all';

	export let mutuallyExclusive = false;
	export let name = '';

	let allCheckboxesCheckedOrDisabled: boolean;
	$: allCheckboxesCheckedOrDisabled = options.every((o) =>
		o.disabled ? true : state[o.id]?.visible
	);

	let noCheckboxesChecked: boolean;
	$: noCheckboxesChecked = !Object.values(state).some((o) => o.visible);

	const selectAll = () => {
		for (const o of options) {
			state[o.id].visible = o.disabled ? state[o.id].visible : true;
		}
	};

	const clearAll = () => {
		for (const o of options) {
			state[o.id].visible = o.disabled ? state[o.id].visible : false;
		}
	};

	const toggleAll = () => {
		if (!allCheckboxesCheckedOrDisabled) {
			selectAll();
		} else {
			clearAll();
		}
	};

	let selectedOptionId: string | undefined; // only used by radioButtons, if mutuallyExclusive
	const updateStateFromCheckbox = (selectedId: string | undefined) => {
		// For Radio Buttons, state is updated by LayerControlGroup.
		// For Checkboxes, each LayerControl updates part of state directly.
		for (const o of options) {
			state[o.id].visible = o.disabled ? state[o.id].visible : o.id === selectedId;
		}
	};
	const clearRadioButtons = () => {
		clearAll();
		selectedOptionId = undefined;
	};

	// eslint-disable-next-line @typescript-eslint/no-unused-expressions
	$: mutuallyExclusive && updateStateFromCheckbox(selectedOptionId);
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
	<slot name="hint" slot="hint" />
	<div class="flex flex-col space-y-1">
		{#if mutuallyExclusive}
			{#if !buttonsHidden}
				<Button {disabled} variant="text" class="!px-0" on:click={clearRadioButtons}>Clear</Button>
			{/if}

			<div class={'flex flex-col space-y-1'}>
				{#each options as option}
					<LayerControl
						label={option.label}
						{name}
						bind:state={state[option.id]}
						optionId={option.id}
						disabled={option.disabled || disabled}
						bind:selectedOptionId
						mutuallyExclusive
					/>
				{/each}
			</div>
		{:else}
			{#if !buttonsHidden}
				<!--
        form="" should prevent this checkbox from being included in form
        submissions.
      -->
				<Checkbox
					id={randomId()}
					form=""
					label={showAllLabel}
					checked={allCheckboxesCheckedOrDisabled}
					indeterminate={!allCheckboxesCheckedOrDisabled && !noCheckboxesChecked}
					on:change={toggleAll}
					{disabled}
				/>
			{/if}

			<div class={`flex flex-col space-y-1 ${buttonsHidden ? '' : 'pl-5'}`}>
				{#each options as option (option.id)}
					<LayerControl
						label={option.label}
						disabled={option.disabled || disabled}
						hint={option.hint}
						hideColorControl={hideColorControl || option.hideColorControl}
						hideOpacityControl={hideOpacityControl || option.hideOpacityControl}
						hideSizeControl={hideSizeControl || option.hideSizeControl}
						bind:state={state[option.id]}
					/>
				{/each}
			</div>
		{/if}
	</div>
</InputWrapper>
