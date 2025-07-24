<script lang="ts">
	/**
	 * The `<FormField>` component is the standard way to add fields to
	 * a `<Form>` component. The component can only be used as slotted content
	 * in parent components that set a `formValueStore` and `formErrorStore`
	 * context such as `<Form>`.
	 *
	 * The fields value and error is bound to an entry in the `valueStore` and
	 * `errorStore` respectively. The entry key is the name of the form.
	 *
	 * Unlike `<UniformInput>`, a `name` property must always be passed to a
	 * `<FormField>`.
	 * @component
	 */

	import { getContext } from 'svelte';
	import UniformInput from '../../../uniformInput/UniformInput.svelte';
	import type { FormErrorStore, FormFieldProps, FormValueStore } from '../../types';

	const valueStore: FormValueStore = getContext('formValueStore');
	const errorStore: FormErrorStore = getContext('formErrorStore');

	interface Props {
		/**
		 * Name of the component for use in forms.
		 */
		name: FormFieldProps['name'];
		/**
		 * Type determines which underlying user input component to render.
		 */
		type?: FormFieldProps['type'];
		/**
		 * If `true`, then `required` attribute is applied to the user input.
		 */
		required?: FormFieldProps['required'];
		/**
		 * If `true`, then `disabled` attribute is applied to the user input.
		 */
		disabled?: FormFieldProps['disabled'];
		/**
		 * The `id` of the user input element: defaults to a randomly-generated
		 * value.
		 */
		id?: FormFieldProps['id'];
		/**
		 * Text displayed above the user input element.
		 */
		label?: FormFieldProps['label'];
		/**
		 * Text that appears below the user input, in smaller font than the `label`.
		 */
		description?: FormFieldProps['description'];
		/**
		 * Determines which edge of the user input the description is aligned with.
		 */
		descriptionAlignment?: FormFieldProps['descriptionAlignment'];
		/**
		 * Placeholder text displayed before any value is entered or options
		 * selected.
		 */
		placeholder?: FormFieldProps['placeholder'];
		/**
		 * Color of the user input if applicable, as a string in any CSS color format
		 * (e.g., "LightCoral", "#FFA500", "hsl(120, 100%, 25%)", "rgb(255, 0, 0)").
		 * The color should be selected from the design system.
		 */
		color?: FormFieldProps['color'];
		/**
		 * Rows set as default for the user input if applicable, e.g. `textarea`.
		 */
		rows?: FormFieldProps['rows'];
		/**
		 * Options for user inputs with a defined set of values.
		 *
		 * Each element of this array represents an available option, and is an
		 * object with the properties:
		 * - `value` (string) - the value that is stored in `value` if this item is selected
		 * - `label` (string) - the text displayed for this option
		 * - `hint` (string, optional) - if applicable, help text to be displayed in tooltips
		 * - `hintLabel` (string, optional) - if applicable, text to be displayed next to icon in tooltip trigger
		 */
		options?: FormFieldProps['options'];
		/**
		 * Help text to be displayed in tooltip
		 */
		hint?: FormFieldProps['hint'];
		/**
		 * Text to be displayed next to icon in tooltip trigger.
		 */
		hintLabel?: FormFieldProps['hintLabel'];
		/**
		 * The `inputmode` of the `<input>` element, which provides a hint about what
		 * type of virtual keyboard to display.
		 */
		inputmode?: FormFieldProps['inputmode'];
		/**
		 * Function that will be applied to transform the value when the input
		 * element loses focus.
		 *
		 * By default, it trims leading and trailing whitespace (but does nothing if
		 * `type` is `password`).
		 */
		format?: FormFieldProps['format'];
	}

	let {
		name,
		type = 'text',
		required = false,
		disabled = false,
		id = undefined,
		label = '',
		description = '',
		descriptionAlignment = 'left',
		placeholder = '',
		color = '',
		rows = 2,
		options = [],
		hint = '',
		hintLabel = '',
		inputmode = undefined,
		format = undefined
	}: Props = $props();
</script>

<UniformInput
	{name}
	{type}
	{disabled}
	{required}
	{id}
	{label}
	{description}
	{descriptionAlignment}
	{placeholder}
	{color}
	{rows}
	{options}
	{hint}
	{hintLabel}
	{inputmode}
	{format}
	bind:value={$valueStore[name]}
	bind:error={$errorStore[name]}
/>
