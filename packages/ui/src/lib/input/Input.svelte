<script lang="ts" context="module">
	export type FormatFunction = (
		value: string,
		details?: {
			name?: string;
			type?: string;
			disabled?: boolean;
		}
	) => string;

	export type InputMode =
		| 'none'
		| 'search'
		| 'text'
		| 'tel'
		| 'url'
		| 'email'
		| 'numeric'
		| 'decimal'
		| null
		| undefined;

	export const trimInput: FormatFunction = (value) => value.trim();
</script>

<script lang="ts">
	import { classNames } from '../utils/classNames';
	import { randomId } from '../utils/randomId';
	import InputWrapper from './InputWrapper.svelte';

	/**
	 * The `type` of the `<input>` element (see [MDN docs](https://developer.mozilla.org/en-US/docs/Web/HTML/Element/input#input_types)).
	 */
	export let type = 'text';

	/**
	 * The `inputmode` of the `<input>` element, which provides a hint about what type of virtual keyboard to display.
	 */
	export let inputmode: InputMode = undefined;

	/**
	 * The `id` of the `<input>` element: defaults to a randomly-generated value.
	 */
	export let id = randomId();

	/**
	 * Text displayed above the `<input>` element.
	 */
	export let label = '';

	/**
	 * The `name` of the `<input>` element. Defaults to same value as `id`. Optional, unless value of the input needs to be included with a form submission.
	 */
	export let name = id;

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
	export let hintLabel = 'more info';

	/**
	 * If `false`, then `required` attribute is applied to `<input>`.
	 */
	export let optional = false;

	/**
	 * If `true`, then user is prevented from interacting with the `<input>`.
	 */
	export let disabled = false;

	/**
	 * Function that will be applied to transform the value when the input element loses focus.
	 * By default, it trims leading and trailing whitespace (but does nothing if `type` is `password`).
	 */
	export let format: null | FormatFunction = trimInput;

	/**
	 * The value of the input. Can be bound to and externally modified.
	 */
	export let value = '';

	/**
	 * Message to be displayed below `<input>` in red text (replacing description).
	 * If set, then the border of the `<input>` is also red.
	 */
	export let error = '';

	let inputType = type;

	if (type === 'number') {
		// Don't use type number. Advised by both MDN and GDS.
		// Use inputmode numeric instead unless the user dev specified another.
		inputType = 'text';
		inputmode = inputmode ? inputmode : 'numeric';
	}

	if (type === 'password' && format === trimInput) {
		// Form input values rarely need to keep leading and trailing whitespace
		// but passwords are an exception so default to no formatting.
		format = null;
	}

	const descriptionId = `${id}-description`;
	const errorId = `${id}-error`;
	let input: HTMLInputElement | HTMLTextAreaElement;

	// Svelte does not allow bind:type and bind:value simultaneously so this
	// function acts as the input change handler.
	const formatAndUpdateValue = () => {
		if (!format) {
			return;
		}

		value = format(value, {
			name,
			type,
			disabled: !!$$restProps.disabled
		});

		// Protect from cyclic reactivity.
		if (input.value !== value) {
			input.value = value;
		}
	};

	const updateValue = () => {
		// input.value will be an empty string if the value is invalid.
		value = input.value;
	};

	$: inputClasses = classNames(
		'm-0',
		error ? 'border-color-input-border-error' : '',
		$$restProps.disabled || disabled ? 'cursor-not-allowed text-color-input-label-disabled' : '',
		type === 'range' ? 'form-range' : 'form-input'
	);
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
	<!--
		Svelte does not allow bind:text and bind:value on an input element at
		the same time so an on change listener is required.
	-->
	{#if inputType === 'textarea'}
		<textarea
			bind:this={input}
			class={inputClasses}
			{id}
			{name}
			{value}
			{disabled}
			required={!optional}
			aria-describedby={descriptionId}
			aria-errormessage={errorId}
			aria-invalid={!!error}
			on:blur={formatAndUpdateValue}
			on:input={updateValue}
			on:input
			on:blur
			on:focus
			on:focusin
			on:focusout
			on:keydown
			on:keypress
			on:keyup
			on:click
			on:mousedown
			on:mouseenter
			on:mouseleave
			on:mouseout
			on:mouseover
			on:mouseup
			on:touchcancel
			on:touchend
			on:touchmove
			on:touchstart
			{...$$restProps}
		/>
	{:else}
		<input
			bind:this={input}
			class={inputClasses}
			type={inputType}
			{inputmode}
			{id}
			{name}
			{value}
			{disabled}
			required={!optional}
			aria-describedby={descriptionId}
			aria-errormessage={errorId}
			aria-invalid={!!error}
			on:blur={formatAndUpdateValue}
			on:input={updateValue}
			on:input
			on:blur
			on:focus
			on:focusin
			on:focusout
			on:keydown
			on:keypress
			on:keyup
			on:click
			on:mousedown
			on:mouseenter
			on:mouseleave
			on:mouseout
			on:mouseover
			on:mouseup
			on:touchcancel
			on:touchend
			on:touchmove
			on:touchstart
			{...$$restProps}
		/>
	{/if}
</InputWrapper>

<style>
	input[type='number']::-webkit-outer-spin-button,
	input[type='number']::-webkit-inner-spin-button {
		-webkit-appearance: none;
	}

	textarea {
		appearance: textfield;
	}
</style>
