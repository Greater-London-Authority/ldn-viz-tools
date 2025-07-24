<script lang="ts">
	import InputWrapper from '../input/InputWrapper.svelte';
	import type { UniformInputProps } from '../uniformInput/types';
	import { randomId } from '../utils/randomId';

	interface Props {
		name: UniformInputProps['name'];
		// export let type: UniformInputProps['type'] = '';
		required?: UniformInputProps['required'];
		disabled?: UniformInputProps['disabled'];
		id?: UniformInputProps['id'];
		label?: UniformInputProps['label'];
		description?: UniformInputProps['description'];
		descriptionAlignment?: UniformInputProps['descriptionAlignment'];
		value?: UniformInputProps['value'];
		error?: UniformInputProps['error'];
		min?: number | string;
		max?: number | string;
		step?: number | string;
		hint?: import('svelte').Snippet;
		[key: string]: any;
	}

	let {
		name,
		required = false,
		disabled = false,
		id = randomId(),
		label = '',
		description = '',
		descriptionAlignment = 'left',
		value = $bindable(undefined),
		error = undefined,
		min = 0,
		max = 10,
		step = 1,
		hint,
		...rest
	}: Props = $props();

	const descriptionId = id + '-description';
	const errorId = id + '-error';

	const hint_render = $derived(hint);
</script>

<InputWrapper
	{label}
	{id}
	{descriptionId}
	{description}
	{descriptionAlignment}
	{errorId}
	{error}
	{disabled}
	optional={!required}
>
	{#snippet hint()}
		{@render hint_render?.()}
	{/snippet}
	<input
		type="range"
		{required}
		{name}
		{min}
		{max}
		{step}
		bind:value
		aria-describedby={descriptionId}
		aria-errormessage={errorId}
		aria-invalid={!!error}
		{...rest}
	/>
</InputWrapper>
