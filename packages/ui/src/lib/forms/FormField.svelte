<script lang="ts">
	import { getContext } from 'svelte';
	import UniformInput from './UniformInput.svelte';
	import type { UniformInputProps } from './UniformInput.svelte';
	import type { FormValueStore, FormErrorStore } from './types';

	const valueStore: FormValueStore = getContext('formValueStore');
	const errorStore: FormErrorStore = getContext('formErrorStore');

	export let name: UniformInputProps.name;
	export let type: UniformInputProps.type = 'text';
	export let required: UniformInputProps.required = false;
	export let disabled: UniformInputProps.disabled = false;
	export let id: UniformInputProps.id = undefined;
	export let label: UniformInputProps.label = '';
	export let description: UniformInputProps.description = '';
	export let placeholder: UniformInputProps.placeholder = '';
	export let rows: UniformInputProps.rows = 2;
	export let options: UniformInputProps.options = [];
	export let value: unknown = undefined;
	export let error: UniformInputProps.error = undefined;
</script>

<UniformInput
	{name}
	{type}
	{disabled}
	{required}
	{id}
	{label}
	{description}
	{placeholder}
	{rows}
	{options}
	bind:value={$valueStore[name]}
	bind:error={$errorStore[name]}
/>
