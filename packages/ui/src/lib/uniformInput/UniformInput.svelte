<script lang="ts">
	import Checkbox from '../checkBox/Checkbox.svelte';
	import Input from '../input/Input.svelte';
	import SelectWrapper from './SelectWrapper.svelte';
	import type { UniformInputProps } from './types';

	export let name: UniformInputProps['name'];
	export let type: UniformInputProps['type'] = 'text';
	export let required: UniformInputProps['required'] = false;
	export let disabled: UniformInputProps['disabled'] = false;
	export let id: UniformInputProps['id'] = undefined;
	export let label: UniformInputProps['label'] = '';
	export let description: UniformInputProps['description'] = '';
	export let placeholder: UniformInputProps['placeholder'] = '';
	export let rows: UniformInputProps['rows'] = 2;
	export let options: UniformInputProps['options'] = [];
	export let value: UniformInputProps['value'] = undefined;
	export let error: UniformInputProps['error'] = undefined;
</script>

{#if type === 'hidden'}
	<input aria-hidden type="hidden" {id} {name} bind:value />
{:else if type === 'checkbox'}
	<Checkbox {disabled} {required} {id} {name} label={label || ''} bind:checked={value} />
{:else if type === 'select'}
	<SelectWrapper
		{disabled}
		{required}
		{id}
		{name}
		{label}
		{description}
		{placeholder}
		{options}
		bind:value
		bind:error
	/>
{:else if type === 'textarea'}
	<div class="disabled:[&_.form-input]:text-core-grey-400">
		<Input
			{disabled}
			{required}
			{type}
			{id}
			{name}
			{label}
			{description}
			{placeholder}
			{rows}
			bind:value
			bind:error
		/>
	</div>
{:else}
	<div class="disabled:[&_.form-input]:text-core-grey-400">
		<Input
			{disabled}
			{required}
			{type}
			{name}
			{label}
			{description}
			{placeholder}
			bind:value
			bind:error
		/>
	</div>
{/if}
