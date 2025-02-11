<script lang="ts">
	/**
	 * The `<CheckboxGroup>` component provides a way to create a set of `<Checkbox>` components defined by an array of objects.
	 *
	 * **Alternatives**: if representing a set of options that are mutually exclusive, use the [RadioButton](./?path=/docs/ui-components-radiobuttons-radiobutton--documentation)/[RadioButtonGroup](./?path=/docs/ui-components-radiobuttons-radiobuttongroup--documentation) component rather than the [Checkbox](./?path=/docs/ui-components-checkboxes-checkbox--documentation)/[CheckboxGroup](./?path=/docs/ui-components-checkboxes-checkboxgroup--documentation).
	 * @component
	 */

	import InputWrapper from '../input/InputWrapper.svelte';
	import { randomId } from '../utils/randomId';
	import Checkbox from './Checkbox.svelte';

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
	 * Each element of this array defines a checkbox, and is an object with the properties:
	 * * `id` (string)
	 * * `name` (string, optional) - used to set the `name` attribute of the `<input>` element
	 * * `label` (string) - the text displayed next to the checkbox
	 * * `disabled` (boolean, optional) - if `true`, users cannot change whether the checkbox is checked
	 * * `color` (string, optional) - CSS color of the checkbox
	 * * `hint` (string, optional) - help text to be displayed in tooltip
	 * * `hintLabel` (string, optional) - text to be displayed next to icon in tooltip trigger
	 */
	export let options: {
		id: string;
		name?: string;
		label: string;
		disabled?: boolean;
		color?: string;
		hint?: string;
		hintLabel?: string;
	}[] = [];

	/**
	 * if `true`, then the "Select all" control is not displayed.
	 */
	export let buttonsHidden = false;

	/**
	 * An array containing the `id` of each entry in the `options` array for which the corresponding checkbox is selected.
	 */
	export let selectedOptions: string[] = [];
	$: selectedOptions = options.map((o) => o.id).filter((id) => selectionState[id]);

	const updateSelectionStateFromSelectedOptions = (selectedOptions: string[]) => {
		const so = options.map((o) => o.id).filter((id) => selectionState[id]);
		if (JSON.stringify(selectedOptions) !== JSON.stringify(so)) {
			selectionState = Object.fromEntries(
				options.map((o) => [o.id, selectedOptions.includes(o.id)])
			);
		}
	};

	let selectionState: Record<string, boolean> = {};
	updateSelectionStateFromSelectedOptions(selectedOptions);

	$: updateSelectionStateFromSelectedOptions(selectedOptions);

	let allCheckboxesCheckedOrDisabled;
	$: allCheckboxesCheckedOrDisabled = options.every((o) =>
		o.disabled ? true : selectionState[o.id]
	);

	let noCheckboxesChecked;
	$: noCheckboxesChecked = !Object.values(selectionState).some((d) => d);

	const selectAll = () => {
		selectionState = Object.fromEntries(
			options.map((o) => [o.id, o.disabled ? selectionState[o.id] : true])
		);
	};

	const clearAll = () => {
		selectionState = Object.fromEntries(
			options.map((o) => [o.id, o.disabled ? selectionState[o.id] : false])
		);
	};

	const toggleAll = () => {
		if (!allCheckboxesCheckedOrDisabled) {
			selectAll();
		} else {
			clearAll();
		}
	};
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
		{#if !buttonsHidden}
			<!--
			form="" should prevent this checkbox from being included in form
			submissions.
		-->
			<Checkbox
				id={randomId()}
				form=""
				label="Select all"
				color="#3787D2"
				checked={allCheckboxesCheckedOrDisabled}
				indeterminate={!allCheckboxesCheckedOrDisabled && !noCheckboxesChecked}
				on:change={toggleAll}
				{disabled}
			/>
		{/if}

		<div class={`flex flex-col space-y-1 ${buttonsHidden ? '' : 'pl-5'}`}>
			{#each options as option (option.id)}
				<Checkbox
					id={option.id}
					name={option.name}
					label={option.label}
					color={option.color}
					disabled={option.disabled || disabled}
					hint={option.hint}
					hintLabel={option.hintLabel}
					bind:checked={selectionState[option.id]}
				/>
			{/each}
		</div>
	</div>
</InputWrapper>
