<script lang="ts">
	/**
	 * The `<RadioButtonGroup>` provides a way to create a set of `<RadioButton>` components defined by an array of objects.
	 *
	 * **Alternatives**: if representing a set of options that are not mutually exclusive, use the [Checkbox](./?path=/docs/ui-components-checkboxes-checkbox--documentation)/[CheckboxGroup](./?path=/docs/ui-components-checkboxes-checkboxgroup--documentation) rather than the [RadioButton](./?path=/docs/ui-components-radiobuttons-radiobutton--documentation)/[RadioButtonGroup](./?path=/docs/ui-components-radiobuttons-radiobuttongroup--documentation).
	 * If the number of alternatives is small and one must be selected, consider using the [RadioButtonSolid](./?path=/docs/ui-components-radiobuttons-radiobuttongroupsolid--documentation).
	 * @component
	 */
	import Button from '../button/Button.svelte';
	import InputWrapper from '../input/InputWrapper.svelte';
	import type { InputProps } from '../input/types';
	import { randomId } from '../utils/randomId';
	import RadioButton from './RadioButton.svelte';

	interface RadioButtonGroupProps extends InputProps {
		/**
		 * the `id` of the entry in the `options` array that is currently selected (state).
		 */
		selectedId: string;

		/**
		 * Each element of this array defines a radio button, and is an object with the properties:
		 * * `id` (string)
		 * * `label` (string) - the text displayed next to the checkbox
		 * * `disabled` (boolean, optional) - if `true`, users cannot change whether the checkbox is checked
		 * * `color` (string, optional) - CSS color of the checkbox
		 * * `hint` (string, optional) - help text to be displayed in tooltip
		 * * `hintLabel` (string, optional) - text to be displayed next to icon in tooltip trigger
		 * * `customOverlay` (Snippet, optional) - a custom overlay component
		 */
		options?: {
			id: string;
			label: string;
			color?: string;
			disabled?: boolean;
			hint?: string;
			hintLabel?: string;
			customOverlay?: () => ReturnType<import('svelte').Snippet>;
		}[];
		/**
		 * `orientation` (string, optional) determines whether radio buttons are vertically or horizontally aligned.
		 * If `vertical`, radio buttons will display in a column. If `horizontal`, radio buttons will display in a row.
		 */
		orientation?: 'vertical' | 'horizontal';
		/**
		 * if `false`, then the `Clear` button is not displayed.
		 */
		allowClear?: boolean;
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
		selectedId = $bindable(),
		name,
		options = [],
		orientation = 'vertical',
		allowClear = true,
		customOverlay = undefined
	}: RadioButtonGroupProps = $props();

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
	<div class="flex flex-col space-y-0.5">
		{#if allowClear}
			<Button
				{disabled}
				variant="text"
				size="sm"
				class="!justify-start !px-0"
				onclick={() => (selectedId = '')}
			>
				Clear
			</Button>
		{/if}
		<div
			class={orientation === 'vertical'
				? 'flex flex-col space-y-1'
				: 'flex flex-wrap gap-x-3 gap-y-1'}
		>
			{#each options as option}
				<RadioButton
					id={option.id}
					label={option.label}
					color={option.color}
					disabled={option.disabled || disabled}
					hint={option.hint}
					hintLabel={option.hintLabel}
					bind:selectedId
					{name}
					customOverlay={option.customOverlay}
				/>
			{/each}
		</div>
	</div>
</InputWrapper>
