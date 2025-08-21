<script lang="ts">
	/**
	 * The `RadioButtonGroupSolid` component contains a set of `RadioButtonSolid` buttons for switching between tabs or selecting one option from a small number of alternatives.
	 *
	 * **Alternatives**: consider using the [RadioButton](./?path=/docs/ui-components-radiobuttons-radiobutton--documentation)/[RadioButtonGroup](./?path=/docs/ui-components-radiobuttons-radiobuttongroup--documentation).
	 * @component
	 */

	import { setContext } from 'svelte';
	import { writable, type Writable } from 'svelte/store';
	import InputWrapper from '../input/InputWrapper.svelte';
	import { randomId } from '../utils/randomId';
	import RadioButtonSolid from './RadioButtonSolid.svelte';

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
	export let selectedId = '';

	/**
	 * the `name` assigned to the group of radio buttons.
	 */
	export let name: string;

	/**
	 * Each element of this array defines a radio button, and is an object with the properties:
	 * * `id` (string)
	 * * `label` (string) - the text displayed within the button
	 * * `disabled` (boolean, optional) - if `true`, users cannot change whether the checkbox is checked
	 */

	export let options: {
		id: string;
		label: string;
		disabled?: boolean;
	}[] = [];

	const val: Writable<string> = writable(selectedId);
	val.subscribe((newVal) => (selectedId = newVal));

	setContext('selectedId', {
		selectedId: val
	});

	$: {
		// update id of store when id of prop changes
		$val = selectedId;
	}
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
	<div class="flex">
		{#if options.length}
			{#each options as option}
				<RadioButtonSolid
					id={option.id}
					label={option.label}
					disabled={option.disabled || disabled}
					{name}
				/>
			{/each}
		{:else}
			<!-- should contain a series of `<RadioButtonSolid>` components  -->
			<slot />
		{/if}
	</div>
</InputWrapper>
