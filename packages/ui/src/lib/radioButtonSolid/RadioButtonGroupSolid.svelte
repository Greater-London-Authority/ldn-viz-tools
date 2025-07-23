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

	export interface RadioButtonGroupSolidProps extends InputProps {
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
		options?: {
			id: string;
			label: string;
			disabled?: boolean;
		}[];
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
		children,
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
				/>
			{/each}
		{:else}
			<!-- should contain a series of `<RadioButtonSolid>` components, included to allow for icons  -->
			{@render children?.()}
		{/if}
	</div>
</InputWrapper>
