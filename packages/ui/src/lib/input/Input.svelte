<script lang="ts">
	import { classNames } from '../utils/classNames';
	import InputWrapper from './InputWrapper.svelte';

	export let id: string;
	export let name = '';
	export let placeholder = '';
	export let type = 'text';
	export let disabled = false;
	export let error = false;

	if (!name) {
		name = id;
	}

	$: inputClasses = classNames(
		error ? 'border-core-red-400 dark:border-core-red-400' : '',
		disabled ? 'cursor-not-allowed ' : '',
		'form-input'
	);
</script>

<InputWrapper {...$$restProps} {id} {disabled} {error}>
	<input class={inputClasses} {id} {name} {placeholder} {type} {disabled} />
</InputWrapper>
