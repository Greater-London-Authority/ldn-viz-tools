<script lang="ts">
	import InputWrapper from '../../../input/InputWrapper.svelte';
	import { randomId } from '../../../utils/randomId';
	import type { UniformInputProps } from '../../../uniformInput/types';

	export let name: UniformInputProps['name'];
	export let required: UniformInputProps['required'] = false;
	export let disabled: UniformInputProps['disabled'] = false;
	export let id: UniformInputProps['id'] = randomId();
	export let label: UniformInputProps['label'] = '';
	export let description: UniformInputProps['description'] = '';
	export let descriptionAlignment: UniformInputProps['descriptionAlignment'] = 'left';
	export let hint: UniformInputProps['hint'] = '';
	export let hintLabel: UniformInputProps['hintLabel'] = '';
	export let value: UniformInputProps['value'] = undefined;
	export let error: UniformInputProps['error'] = undefined;

	export let min: number | string = 0;
	export let max: number | string = 10;
	export let step: number | string = 1;

	const descriptionId = id + '-description';
	const errorId = id + '-error';
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
	optional={!required}
>
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
		{...$$restProps}
	/>
</InputWrapper>
