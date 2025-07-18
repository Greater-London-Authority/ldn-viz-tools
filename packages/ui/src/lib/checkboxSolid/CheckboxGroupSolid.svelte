<script lang="ts">
	/**
	 * The `<CheckboxGroupSolid>` component provides a way to create a set of `<CheckboxSolid>` components defined by an array of objects.
	 *
	 * This should only be used when the number of options is small. Alternatively, use [CheckboxGroup](?path=/docs/ui-components-checkboxes-checkboxgroup--documentation).
	 * @component
	 */

	import InputWrapper from '../input/InputWrapper.svelte';
	import { randomId } from '../utils/randomId';
	import CheckboxSolid from './CheckboxSolid.svelte';

	/**
	 * The `id` of the `<input>` element: defaults to a randomly-generated value.
	 */
	export let id = randomId();

	/**
	 * Text displayed above the `<input>` element.
	 */
	export let label = '';

	/**
	 * Accessible name of group to be read by screen reader.
	 */
	export let ariaLabel = '';

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
	 * An array containing the `id` of each entry in the `options` array for which the corresponding checkbox is selected.
	 */
	export let selectedOptions: string[] = [];
	let selectionState: Record<string, boolean> = {};

	$: selectedOptions = options.map((o) => o.id).filter((id) => selectionState[id]);

	const updateSelectionStateFromSelectedOptions = (selectedOptions: string[]) => {
		const so = options.map((o) => o.id).filter((id) => selectionState[id]);
		if (JSON.stringify(selectedOptions) !== JSON.stringify(so)) {
			selectionState = Object.fromEntries(
				options.map((o) => [o.id, selectedOptions.includes(o.id)])
			);
		}
	};

	updateSelectionStateFromSelectedOptions(selectedOptions);

	$: updateSelectionStateFromSelectedOptions(selectedOptions);
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
	{#if $$slots.hint}
		<slot name="hint" />
	{/if}
	<ul {id} role="group" aria-label={ariaLabel} class="flex gap-[2px]">
		{#each options as option (option.id)}
			<li class="w-full flex">
				<CheckboxSolid
					id={`${id}-${option.id}`}
					name={option.name}
					label={option.label}
					disabled={option.disabled || disabled}
					bind:checked={selectionState[option.id]}
				/>
			</li>
		{/each}
	</ul>
</InputWrapper>
