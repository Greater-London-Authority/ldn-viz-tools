<script lang="ts">
	/**
	 * The `<CheckboxGroup>` component provides a way to create a set of `<Checkbox>` components defined by an array of objects.
	 *
	 * **Alternatives**: if representing a set of options that are mutually exclusive, use the [RadioButton](./?path=/docs/ui-radiobutton--documentation)/[RadioButtonGroup](./?path=/docs/ui-radiobuttongroup--documentation) component rather than the [Checkbox](./?path=/docs/ui-checkbox--documentation)/[CheckboxGroup](./?path=/docs/ui-checkboxgroup--documentation).
	 * @component
	 */

	import Checkbox from './Checkbox.svelte';
	import { randomId } from '../utils/randomId';

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

	let selectionState = Object.fromEntries(
		options.map((o) => [o.id, selectedOptions.includes(o.id)])
	);

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

<div>
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
		/>
	{/if}

	<div class={buttonsHidden ? '' : 'pl-[28px]'}>
		{#each options as option (option.id)}
			<Checkbox
				id={option.id}
				name={option.name}
				label={option.label}
				color={option.color}
				disabled={option.disabled}
				hint={option.hint}
				hintLabel={option.hintLabel}
				bind:checked={selectionState[option.id]}
			/>
		{/each}
	</div>
</div>
