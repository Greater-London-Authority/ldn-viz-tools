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
	import InputWrapper from './InputWrapper.svelte';
	import { classNames } from '../utils/classNames';
	import { randomId } from '../utils/randomId';

	export let type = 'text';
	export let inputmode: InputMode = undefined;

	export let id = randomId();
	export let label = '';
	export let name = id;

	export let description = '';
	export let descriptionAlignment: 'left' | 'right' = 'left';

	export let hint = '';
	export let hintLabel = '';

	export let optional = false;
	export let disabled = false;

	export let format: null | FormatFunction = trimInput;
	export let value = '';
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

	const discriptionId = `${id}-description`;
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
		error ? 'border-core-red-400 dark:border-core-red-400' : '',
		$$restProps.disabled ? 'cursor-not-allowed ' : '',
		'dark:bg-core-grey-600',
		'dark:text-white',
		'placeholder-core-grey-400',
		'dark:placeholder-core-grey-300',
		'form-input'
	);
</script>

<InputWrapper
	{label}
	{id}
	{discriptionId}
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
			aria-describedby={discriptionId}
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
			aria-describedby={discriptionId}
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
