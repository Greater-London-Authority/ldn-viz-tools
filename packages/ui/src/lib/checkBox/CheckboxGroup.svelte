<script lang="ts">
	/**
	 * The `<CheckboxGroup>` component provides a way to create a set of `<Checkbox>` components defined by an array of objects.
	 *
	 * **Alternatives**: if representing a set of options that are mutually exclusive, use the [RadioButton](./?path=/docs/ui-components-radiobuttons-radiobutton--documentation)/[RadioButtonGroup](./?path=/docs/ui-components-radiobuttons-radiobuttongroup--documentation) component rather than the [Checkbox](./?path=/docs/ui-components-checkboxes-checkbox--documentation)/[CheckboxGroup](./?path=/docs/ui-components-checkboxes-checkboxgroup--documentation).
	 * @component
	 */

	import type { InputProps } from '$lib/input/types';
	import InputWrapper from '../input/InputWrapper.svelte';
	import { randomId } from '../utils/randomId';
	import Checkbox from './Checkbox.svelte';

	interface CheckboxGroupProps extends InputProps {
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
		options: {
			id: string;
			name?: string;
			label: string;
			disabled?: boolean;
			color?: string;
			hint?: string;
			hintLabel?: string;
			customOverlay?: () => ReturnType<import('svelte').Snippet>;
		}[];

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
	}

	let {
		label,
		id = randomId(),
		description,
		descriptionAlignment = 'left',
		hintLabel,
		hint,
		error,
		disabled = false,
		optional,

		ariaLabel,
		options = [],
		selectedOptions = $bindable([]),
		hideSelectAll = false,
		customOverlay = undefined,
		onChange = () => {}
	}: CheckboxGroupProps = $props();

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

	let optionIds = options.map((o) => o.id).join(' ');

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
	<!-- <slot name="hint" slot="hint" /> -->
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

		<ul class={`flex flex-col space-y-1 ${hideSelectAll ? '' : 'pl-5'}`}>
			{#each options as option (option.id)}
				<li>
					<Checkbox
						id={option.id}
						name={option.name}
						label={option.label}
						color={option.color}
						disabled={option.disabled || disabled}
						hint={option.hint}
						hintLabel={option.hintLabel}
						checked={selectionState[option.id]}
						onchange={() => updateSelectedOptions(option.id)}
						customOverlay={option.customOverlay}
					/>
				</li>
			{/each}
		</ul>
	</div>
</InputWrapper>
