<script lang="ts">
	import { getContext } from 'svelte';
	import UniformInput from '../../../uniformInput/UniformInput.svelte';
	import type { FormValueStore, FormErrorStore } from '../../types';
	import type { FormFieldProps } from '../../types';

	const valueStore: FormValueStore = getContext('formValueStore');
	const errorStore: FormErrorStore = getContext('formErrorStore');

	export let name: FormFieldProps['name'];
	export let type: FormFieldProps['type'] = 'text';
	export let required: FormFieldProps['required'] = false;
	export let disabled: FormFieldProps['disabled'] = false;
	export let id: FormFieldProps['id'] = undefined;
	export let label: FormFieldProps['label'] = '';
	export let description: FormFieldProps['description'] = '';
	export let descriptionAlignment: FormFieldProps['descriptionAlignment'] = 'left';
	export let placeholder: FormFieldProps['placeholder'] = '';
	export let color: FormFieldProps['color'] = '';
	export let rows: FormFieldProps['rows'] = 2;
	export let options: FormFieldProps['options'] = [];
	export let hint: FormFieldProps['hint'] = '';
	export let hintLabel: FormFieldProps['hintLabel'] = '';
	export let inputmode: FormFieldProps['inputmode'] = undefined;
	export let format: FormFieldProps['format'] = undefined;
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
