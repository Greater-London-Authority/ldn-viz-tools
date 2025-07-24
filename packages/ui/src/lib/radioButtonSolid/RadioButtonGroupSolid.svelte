<script lang="ts">
	/**
	 * The `RadioButtonGroupSolid` component contains a set of `RadioButtonSolid` buttons for switching between tabs or selecting one option from a small number of alternatives.
	 *
	 * **Alternatives**: consider using the [RadioButton](./?path=/docs/ui-components-radiobuttons-radiobutton--documentation)/[RadioButtonGroup](./?path=/docs/ui-components-radiobuttons-radiobuttongroup--documentation).
	 * @component
	 */

	import type { InputProps } from '$lib/input/types';
	import InputWrapper from '../input/InputWrapper.svelte';
	import { randomId } from '../utils/randomId';
	import RadioButtonSolid from './RadioButtonSolid.svelte';
	import type { RadioButtonSolidProps } from './types';

	export interface RadioButtonGroupSolidProps extends Omit<InputProps, 'children'> {
		/**
		 * the `id` of the entry in the `options` array that is currently selected.
		 */
		selectedId?: string;
		/**
		 * Each element of this array defines a radio button, and is an object with the properties:
		 * * `id` (string)
		 * * `label` (string) - the text displayed within the button
		 * * `disabled` (boolean, optional) - if `true`, users cannot change whether the checkbox is checked
		 */
		options?: RadioButtonSolidProps[];
	}

	let {
		id = randomId(),
		label = '',
		description = '',
		descriptionAlignment = 'left',
		hint = '',
		hintLabel = undefined,
		optional = false,
		disabled = false,
		error = '',
		selectedId = $bindable(''),
		name,
		options = [],
		customOverlay = undefined
	}: RadioButtonGroupSolidProps = $props();

	let errorId = $derived(error ? `${id}-error` : undefined);
	let descriptionId = $derived(description ? `${id}-description` : undefined);
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
	<div class="flex">
		{#if options.length}
			{#each options as option}
				<RadioButtonSolid
					id={option.id}
					label={option.label}
					disabled={option.disabled || disabled}
					bind:selectedId
					{name}
					icon={option.icon}
					rawIcon={option.rawIcon}
					iconPlacement={option.iconPlacement}
				/>
			{/each}
		{/if}
	</div>
</InputWrapper>
