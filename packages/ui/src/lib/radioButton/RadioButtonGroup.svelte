<script lang="ts">
	/**
	 * The `<RadioButtonGroup>` provides a way to create a set of `<RadioButton>` components defined by an array of objects.
	 *
	 * **Alternatives**: if representing a set of options that are not mutually exclusive, use the [Checkbox](./?path=/docs/ui-components-checkobxes-checkbox--documentation)/[CheckboxGroup](.-components-checkboxes-checkboxgroup--documentation) rather than the [RadioButton](./?path=/docs/ui-components-radiobuttons-radiobutton--documentation)/[RadioButtonGroup](./?path=/docs/ui-components-radiobuttons-radiobuttongroup--documentation).
	 * If the number of alternatives is small and one must be selected, consider using the [RadioButtonSolid](./?path=/docs/ui-components-radiobuttons-radiobuttongroupsolid--documentation).
	 * @component
	 */
	import Button from '../button/Button.svelte';
	import InputWrapper from '../input/InputWrapper.svelte';
	import { randomId } from '../utils/randomId';
	import RadioButton from './RadioButton.svelte';

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
		hintLabel?: string;
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
	<div class="flex flex-col space-y-0.5">
		{#if !buttonsHidden}
			<Button variant="text" class="!px-0" on:click={() => (selectedId = '')}>Clear</Button>
		{/if}
		<div class={orientation === 'vertical' ? 'flex flex-col space-y-1' : 'flex space-x-3'}>
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
</InputWrapper>
