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
	 */
	export let options: { id: string; label: string; color: string; disabled?: boolean }[] = [];

	/**
	 * if `true`, then then `Clear` button is not displayed.
	 */
	export let buttonsHidden = false;
</script>

<div>
	{#if !buttonsHidden}
		<Button variant="text" on:click={() => (selectedId = '')}>Clear</Button>
	{/if}
	{#each options as option}
		<RadioButton
			id={option.id}
			label={option.label}
			color={option.color}
			disabled={option.disabled}
			bind:selectedId
			{name}
		/>
	{/each}
</div>
