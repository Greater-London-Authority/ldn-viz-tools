<script lang="ts">
	/**
	 * The `RadioButtonGroupSolid` component contains a set of `RadioButtonSolid` buttons for switching between tabs or selecting one option from a small number of alternatives.
	 *
	 * **Alternatives**: consider using the [RadioButton](./?path=/docs/ui-components-radiobuttons-radiobutton--documentation)/[RadioButtonGroup](./?path=/docs/ui-components-radiobuttons-radiobuttongroup--documentation).
	 * @component
	 */

	import type { InputProps } from '$lib/input/types';
	import { type Snippet } from 'svelte';
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
		children?: Snippet;
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
		children
	}: RadioButtonGroupSolidProps = $props();

	/**
	 * Only generate `descriptionId` and/or `errorId` when `description` and/or `error` exist.
	 * `descriptionId` is static but `errorId` is reactive as error state could change.
	 */
	const descriptionId = description ? `${id}-description` : undefined;
	let errorId = error ? `${id}-error` : undefined;

	// const val = $derived(selectedId);

	// const val: Writable<string> = writable(selectedId);
	// val.subscribe((newVal) => (selectedId = newVal));

	// setContext('selectedId', {
	// 	selectedId: val
	// });

	// setContext('selectedId', () => val);

	// run(() => {
	// 	// update id of store when id of prop changes
	// 	$val = selectedId;
	// });
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
	<div class="flex">
		{#if options.length}
			{#each options as option}
				<RadioButtonSolid
					id={option.id}
					label={option.label}
					disabled={option.disabled || disabled}
					{name}
					bind:selectedId
				/>
			{/each}
		{:else}
			<!-- should contain a series of `<RadioButtonSolid>` components  -->
			{@render children?.()}
		{/if}
	</div>
</InputWrapper>
