<script lang="ts">
	/**
	 * The `<RadioButtonGroup>` provides a way to create a set of `<RadioButton>` components defined by an array of objects.
	 *
	 * **Alternatives**: if representing a set of options that are not mutually exclusive, use the [Checkbox](./?path=/docs/ui-checkbox--documentation)/[CheckboxGroup](./?path=/docs/ui-checkboxgroup--documentation) rather than the [RadioButton](./?path=/docs/ui-radiobutton--documentation)/[RadioButtonGroup](./?path=/docs/ui-radiobuttongroup--documentation).
	 * If the number of alternatives is small and one must be selected, consider using the [RadioButtonSolid](./?path=/docs/ui-radiobuttongroupsolid--documentation).
	 * @component
	 */

	import Button from '../button/Button.svelte';
	import RadioButton from './RadioButton.svelte';

	/**
	 * the `id` of the entry in the `options` array that is currently selected.
	 */
	export let selectedId: string;

	/**
	 * `name` of the group to which the radio buttons is assigned.
	 */
	export let name: string;

	/**
	 * Each element of this array defines a radio button, and is an object with the properties:
	 * * `id` (string)
	 * * `label` (string) - the text displayed next to the checkbox
	 * * `disabled` (boolean, optional) - if `true`, users cannot change whether the checkbox is checked
	 * * `color` (string, optional) - CSS color of the checkbox
	 * * `hint` (string, optional) - help text to be displayed in tooltip
	 * * `hintLabel` (string, optional) - text to be displayed next to icon in tooltip trigger
	 */
	export let options: {
		id: string;
		label: string;
		color?: string;
		disabled?: boolean;
		hint?: string;
		hintLabel: string;
	}[] = [];

	/**
	 * `orientation` (string, optional) determines whether radio buttons are vertically or horizontally aligned.
	 * If `vertical`, radio buttons will display in a column. If `horizontal`, radio buttons will display in a row.
	 */
	export let orientation: 'vertical' | 'horizontal' = 'vertical';
	// row with title,
	// clear button
	// title and hint~

	/**
	 * if `true`, then the `Clear` button is not displayed.
	 */
	export let buttonsHidden = false;
</script>

<div class="flex flex-col space-y-0.25">
	{#if !buttonsHidden}
		<Button variant="text" class="!px-0" on:click={() => (selectedId = '')}>Clear</Button>
	{/if}
	<div
		class={orientation === 'vertical'
			? 'flex flex-col space-y-0.25'
			: orientation === 'horizontal'
				? 'flex space-x-3'
				: ''}
	>
		{#each options as option}
			<RadioButton
				id={option.id}
				label={option.label}
				color={option.color}
				disabled={option.disabled}
				hint={option.hint}
				hintLabel={option.hintLabel}
				bind:selectedId
				{name}
			/>
		{/each}
	</div>
</div>
