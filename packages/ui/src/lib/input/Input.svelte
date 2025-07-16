<script lang="ts" context="module">
	import type { FormatFunction } from '$lib/input/types';

	export const trimInput: FormatFunction = (value) => value.trim();
</script>

<script lang="ts">
	import type { ChangeEventHandler, HTMLInputAttributes, HTMLTextareaAttributes, HTMLInputTypeAttribute } from 'svelte/elements';

	import { classNames } from '../utils/classNames';
	import { randomId } from '../utils/randomId';
	import InputWrapper from './InputWrapper.svelte';
	import { type InputAsNonTextArea, type InputAsTextArea, type InputProps, type Props } from './types';


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

	let input: HTMLInputElement | HTMLTextAreaElement | undefined = undefined;

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

	// type assertions can't go in the Svelte template section, so are here instead
	let textAreaRestProps = $derived(restProps as InputAsTextArea);
	let nonTextAreaRestProps = $derived(restProps as InputAsNonTextArea);
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
			{...textAreaRestProps}
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
			{...nonTextAreaRestProps}
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
