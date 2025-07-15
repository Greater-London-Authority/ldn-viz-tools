<script lang="ts" module>
	export type FormatFunction = (
		value: string,
		details?: {
			name?: string;
			type?: string;
			disabled?: boolean;
		}
	) => string | number;

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
	import type { HTMLInputAttributes, HTMLTextareaAttributes } from 'svelte/elements';

	import { classNames } from '../utils/classNames';
	import { randomId } from '../utils/randomId';
	import InputWrapper from './InputWrapper.svelte';
	import { type InputProps } from './types';

	interface Props extends InputProps {
		/**
		 * The `type` of the `<input>` element (see [MDN docs](https://developer.mozilla.org/en-US/docs/Web/HTML/Element/input#input_types)).
		 *
		 * Additionally, passing `textarea` will render a `<textarea>` instead of an `<input>`.
		 */
		type: string;

		/**
		 * The value of the input. Can be bound to and externally modified.
		 */
		value?: string;

		/**
		 * The `inputmode` of the `<input>` element, which provides a hint about what type of virtual keyboard to display.
		 */
		inputmode?: InputMode;

		/**
		 * Text that appears within the `<input>` element when no value is present.
		 */
		placeholder?: string;

		/**
		 * Function that will be applied to transform the value when the input element loses focus.
		 * By default, it trims leading and trailing whitespace (but does nothing if `type` is `password`).
		 */
		format: null | FormatFunction;

		// TODO: Correct below?
		restProps: HTMLInputAttributes | HTMLTextareaAttributes;
	}

	let {
		type = 'text',
		inputmode = undefined,
		id = randomId(),
		label = '',
		format = trimInput,
		description = '',
		error = '',
		value = $bindable(''),
		disabled = false,
		descriptionAlignment = 'left',
		hint,
		hintLabel,
		optional,
		customOverlay,
		placeholder,
		name = id,
		...restProps
	}: Props = $props();

	let inputType = $derived(type);

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

	/**
	 * Only generate `descriptionId` and/or `errorId` when `description` and/or `error` exist.
	 * `descriptionId` is static but `errorId` is reactive as error state could change.
	 */
	let errorId = $derived(error ? `${id}-error` : undefined);
	let descriptionId = $derived(description ? `${id}-description` : undefined);

	// if error exists, description won't render so `aria-describedby` should equal `undefined`.
	let descriptionIsVisible = $derived(!error);

	let input: HTMLInputElement | HTMLTextAreaElement | undefined = $state();

	// Svelte does not allow bind:type and bind:value simultaneously so this
	// function acts as the input change handler.
	const formatAndUpdateValue = () => {
		if (!format) {
			return;
		}

		value = `${format(value, {
			name,
			type,
			disabled: !!disabled
		})}`;

		// Protect from cyclic reactivity.
		if (input && input.value !== value) {
			input.value = value;
		}
	};

	const updateValue = () => {
		// input.value will be an empty string if the value is invalid.
		value = input ? input.value : '';
	};

	let inputClasses = $derived(
		classNames(
			'm-0',
			error ? 'border-color-input-border-error' : '',
			disabled
				? 'cursor-not-allowed text-color-input-label-disabled placeholder-color-input-label-disabled'
				: '',
			type === 'range' ? 'form-range' : 'form-input',
			'placeholder-color-input-placeholder'
		)
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
	{customOverlay}
>
	<!--
    TODO: CLARIFY
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
			{placeholder}
			required={!optional}
			aria-describedby={descriptionIsVisible ? descriptionId : undefined}
			aria-errormessage={errorId}
			aria-invalid={!!error}
			onblur={formatAndUpdateValue}
			oninput={updateValue}
		></textarea>
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
			{placeholder}
			required={!optional}
			aria-describedby={descriptionIsVisible ? descriptionId : undefined}
			aria-errormessage={errorId}
			aria-invalid={!!error}
			onblur={formatAndUpdateValue}
			oninput={updateValue}
			{...restProps}
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
