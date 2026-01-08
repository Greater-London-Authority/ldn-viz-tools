<script lang="ts">
	/**
	 * The `<CheckboxGroupSolid>` component provides a way to create a set of `<CheckboxSolid>` components defined by an array of objects.
	 *
	 * **Alternatives**: if representing a set of options that are mutually exclusive, use the [RadioButtonSolid](./?path=/docs/ui-components-radiobuttons-radiobuttongroupsolid--documentation).
	 * Consider using the [Checkbox](./?path=/docs/ui-components--checkboxes-checkbox--documentation)/[CheckboxGroup](./?path=/docs/ui-components-checkboxes-checkboxgroup--documentation).
	 * @component
	 */

	import type { InputProps } from '$lib/input/types';
	import type { Snippet } from 'svelte';
	import Checkbox from '../checkBox/Checkbox.svelte';
	import InputWrapper from '../input/InputWrapper.svelte';
	import { randomId } from '../utils/randomId';
	import CheckboxSolid from './CheckboxSolid.svelte';
	import type { CheckboxSolidProps } from './types';

	interface CheckboxGroupSolidProps extends InputProps {
		/**
		 * Each element of this array defines a checkbox, and is an object with the properties:
		 * * `id` (string)
		 * * `name` (string, optional) - used to set the `name` attribute of the `<input>` element
		 * * `label` (string) - the text displayed next to the checkbox
		 * * `disabled` (boolean, optional) - if `true`, users cannot change whether the checkbox is checked
		 * * `color` (string, optional) - CSS color of the checkbox
		 * * `hint` (string, optional) - help text to be displayed in tooltip
		 * * `hintLabel` (string, optional) - text to be displayed next to icon in tooltip trigger
		 * * `customOverlay` (Snippet, optional) - a custom overlay component
		 */
		options: Omit<CheckboxSolidProps, 'checked'>[];

		/**
		 * An array containing the `id` of each entry in the `options` array for which the corresponding checkbox is selected.
		 */
		selectedOptions?: string[];

		/**
		 * if `true`, then the "Select all" control is not displayed.
		 */
		hideSelectAll?: boolean;

		/**
		 * Accessible name of group to be read by screen reader.
		 */
		ariaLabel?: string;

		onChange?: (selectedOptions: string[]) => void;
		customOverlay?: () => ReturnType<Snippet>;
	}

	let {
		label,
		id = randomId(),
		description,
		descriptionAlignment = 'left',
		hintLabel,
		hint,
		error = '',
		disabled = false,
		optional,
		ariaLabel,
		options = [],
		selectedOptions = $bindable([]),
		hideSelectAll = false,
		customOverlay = undefined,
		onChange = () => {}
	}: CheckboxGroupSolidProps = $props();

	let errorId = $derived(error ? `${id}-error` : undefined);
	let descriptionId = $derived(description ? `${id}-description` : undefined);

	let selectionState = $derived.by(() =>
		Object.fromEntries(options.map((o) => [o.id, selectedOptions.includes(o.id)]))
	);

	let allCheckboxesCheckedOrDisabled = $derived(
		options.filter((o) => !o.disabled).every((o) => selectedOptions.includes(o.id))
	);

	let noCheckboxesChecked = $derived(selectedOptions.length === 0);

	const selectAll = () => {
		selectedOptions = options.filter((o) => !o.disabled).map((o) => o.id);
		onChange(selectedOptions);
	};

	const clearAll = () => {
		selectedOptions = [];
		onChange(selectedOptions);
	};

	const toggleAll = () => {
		if (!allCheckboxesCheckedOrDisabled) {
			selectAll();
		} else {
			clearAll();
		}
	};

	let optionIds = $derived(options.map((o) => o.id).join(' '));

	const updateSelectedOptions = (optionId: string) => {
		if (selectedOptions.includes(optionId)) {
			selectedOptions = selectedOptions.filter((id) => id !== optionId);
		} else {
			selectedOptions = [...selectedOptions, optionId];
		}

		onChange(selectedOptions);
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
	{customOverlay}
>
	<div {id} role="group" aria-label={ariaLabel} class="flex flex-col space-y-1">
		{#if !hideSelectAll}
			<!--
			form="" should prevent this checkbox from being included in form
			submissions.
		-->
			<Checkbox
				id={randomId()}
				form=""
				name="all"
				label="Select all"
				checked={allCheckboxesCheckedOrDisabled}
				indeterminate={!allCheckboxesCheckedOrDisabled && !noCheckboxesChecked}
				aria-controls={optionIds}
				onchange={toggleAll}
				{disabled}
			/>
		{/if}
		<ul class="flex">
			{#each options as option (option.id)}
				<li class="flex w-full">
					<CheckboxSolid
						id={`${id}-${option.id}`}
						name={option.name}
						label={option.label}
						disabled={option.disabled || disabled}
						checked={selectionState[option.id]}
						icon={option.icon}
						rawIcon={option.rawIcon}
						iconPlacement={option.iconPlacement}
						onchange={() => updateSelectedOptions(option.id)}
					/>
				</li>
			{/each}
		</ul>
	</div>
</InputWrapper>
