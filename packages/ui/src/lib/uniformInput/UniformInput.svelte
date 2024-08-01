<script lang="ts">
	/**
	 * The `<UniformInput>` component exposes a uniform API for user input
	 * components.
	 *
	 * The `type` property determines the underlying component or element.
	 * For example:
	 * - `hidden` renders a simple `<input>`
	 * - `select` renders a `<Select>`
	 * - `checkbox` renders a `<Checkbox>`
	 * - `text`, `textarea`, `number`, etc.. renders an `<Input>`
	 *
	 * Only applicable properties are passed to the underlying input components
	 * and elements.
	 * @component
	 */

	import Checkbox from '../checkBox/Checkbox.svelte';
	import Input from '../input/Input.svelte';
	import Select from '../select/Select.svelte';
	import type { UniformInputProps } from './types';

	/**
	 * Name of the component for use in forms.
	 */
	export let name: UniformInputProps['name'] = undefined;

	/**
	 * Type determines which underlying user input component to render.
	 */
	export let type: UniformInputProps['type'] = 'text';

	/**
	 * If `true`, then `required` attribute is applied to the user input.
	 */
	export let required: UniformInputProps['required'] = false;

	/**
	 * If `true`, then `disabled` attribute is applied to the user input.
	 */
	export let disabled: UniformInputProps['disabled'] = false;

	/**
	 * The `id` of the user input element: defaults to a randomly-generated
	 * value.
	 */
	export let id: UniformInputProps['id'] = undefined;

	/**
	 * Text displayed above the user input element.
	 */
	export let label: UniformInputProps['label'] = '';

	/**
	 * Text that appears below the user input, in smaller font than the `label`.
	 */
	export let description: UniformInputProps['description'] = '';

	/**
	 * Determines which edge of the user input the description is aligned with.
	 */
	export let descriptionAlignment: UniformInputProps['descriptionAlignment'] = 'left';

	/**
	 * Placeholder text displayed before any value is entered or options
	 * selected.
	 */
	export let placeholder: UniformInputProps['placeholder'] = '';

	/**
	 * Color of the user input if applicable, as a string in any CSS color format
	 * (e.g., "LightCoral", "#FFA500", "hsl(120, 100%, 25%)", "rgb(255, 0, 0)").
	 * The color should be selected from the design system.
	 */
	export let color: UniformInputProps['color'] = '';

	/**
	 * Rows set as default for the user input if applicable, e.g. `textarea`.
	 */
	export let rows: UniformInputProps['rows'] = 2;

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
	export let options: UniformInputProps['options'] = [];

	/**
	 * Help text to be displayed in tooltip
	 */
	export let hint: UniformInputProps['hint'] = '';

	/**
	 * Text to be displayed next to icon in tooltip trigger.
	 */
	export let hintLabel: UniformInputProps['hintLabel'] = '';

	/**
	 * The `inputmode` of the `<input>` element, which provides a hint about what
	 * type of virtual keyboard to display.
	 */
	export let inputmode: UniformInputProps['inputmode'] = undefined;

	/**
	 * Function that will be applied to transform the value when the input
	 * element loses focus.
	 *
	 * By default, it trims leading and trailing whitespace (but does nothing if
	 * `type` is `password`).
	 */
	export let format: UniformInputProps['format'] = undefined;

	/**
	 * The value of the user input. Can be bound to and externally modified.
	 *
	 * The value is always a primitive type such as _string_, _number_, or
	 * _boolean_. The underlying input component or element may have other
	 * properties or attributes which can be bound to in order to get the value
	 * in a different format.
	 */
	export let value: UniformInputProps['value'] = undefined;

	/**
	 * Message to be displayed below `<input>` in red text (replacing
	 * description). If set, then border within the user input elements are
	 * also red.
	 */
	export let error: UniformInputProps['error'] = undefined;
</script>

{#if type === 'hidden'}
	<input aria-hidden type="hidden" {id} {name} bind:value {...$$restProps} />
{:else if type === 'checkbox'}
	<Checkbox
		{disabled}
		{required}
		{id}
		{name}
		{color}
		{hint}
		{hintLabel}
		label={label || ''}
		bind:checked={value}
		{...$$restProps}
	/>
{:else if type === 'select'}
	<Select
		{disabled}
		{required}
		{id}
		{name}
		{label}
		{description}
		{descriptionAlignment}
		{placeholder}
		{hint}
		{hintLabel}
		items={options}
		bind:justValue={value}
		bind:error
		{...$$restProps}
	/>
{:else if type === 'textarea'}
	<div class="disabled:[&_.form-input]:text-color-text-disabled">
		<Input
			{disabled}
			optional={!required}
			type="textarea"
			{id}
			{name}
			{label}
			{description}
			{descriptionAlignment}
			{placeholder}
			{rows}
			{hint}
			{hintLabel}
			{inputmode}
			{format}
			bind:value
			bind:error
			{...$$restProps}
		/>
	</div>
{:else}
	<div class="disabled:[&_.form-input]:text-color-text-disabled">
		<Input
			{disabled}
			optional={!required}
			{type}
			{name}
			{label}
			{description}
			{descriptionAlignment}
			{placeholder}
			{hint}
			{hintLabel}
			{inputmode}
			{format}
			bind:value
			bind:error
			{...$$restProps}
		/>
	</div>
{/if}
