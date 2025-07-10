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
		ariaLabel?: string;

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
		selectedOptions?: string[];
		hideSelectAll?: boolean;
	}

	let {
		label,
		id,
		descriptionId,
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
		hideSelectAll = false
	}: CheckboxGroupProps = $props();

	let errorId = $derived(error ? `${id}-error` : undefined);

	let selectionState = $derived.by(() =>
		Object.fromEntries(options.map((o) => [o.id, selectedOptions.includes(o.id)]))
	);

	let allCheckboxesCheckedOrDisabled = $derived(
		options.filter((o) => !o.disabled).every((o) => selectedOptions.includes(o.id))
	);

	let noCheckboxesChecked = $derived(selectedOptions.length === 0);

	const selectAll = () => {
		selectedOptions = options.filter((o) => !o.disabled).map((o) => o.id);
	};

	const clearAll = () => {
		selectedOptions = [];
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
	};

	// $inspect(customOverlay);
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
