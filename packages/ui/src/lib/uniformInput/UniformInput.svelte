<script lang="ts">
	import Checkbox from '../checkBox/Checkbox.svelte';
	import Input from '../input/Input.svelte';
	import Select from '../select/Select.svelte';
	import type { UniformInputProps } from './types';

	export let name: UniformInputProps['name'] = undefined;
	export let type: UniformInputProps['type'] = 'text';
	export let required: UniformInputProps['required'] = false;
	export let disabled: UniformInputProps['disabled'] = false;
	export let id: UniformInputProps['id'] = undefined;
	export let label: UniformInputProps['label'] = '';
	export let description: UniformInputProps['description'] = '';
	export let descriptionAlignment: UniformInputProps['descriptionAlignment'] = 'left';
	export let placeholder: UniformInputProps['placeholder'] = '';
	export let color: UniformInputProps['color'] = '';
	export let rows: UniformInputProps['rows'] = 2;
	export let options: UniformInputProps['options'] = [];
	export let hint: UniformInputProps['hint'] = '';
	export let hintLabel: UniformInputProps['hintLabel'] = '';
	export let inputmode: UniformInputProps['inputmode'] = undefined;
	export let format: UniformInputProps['format'] = undefined;
	export let value: UniformInputProps['value'] = undefined;
	export let error: UniformInputProps['error'] = undefined;
</script>

{#if type === 'hidden'}
	<input aria-hidden type="hidden" {id} {name} bind:value {...$$restProps} />
{:else if type === 'checkbox'}
	<Checkbox
		{disabled}
		{required}
		{id}
		{name}
		{color}
		{hint}
		{hintLabel}
		label={label || ''}
		bind:checked={value}
		{...$$restProps}
	/>
{:else if type === 'select'}
	<Select
		{disabled}
		{required}
		{id}
		{name}
		{label}
		{description}
		{descriptionAlignment}
		{placeholder}
		{hint}
		{hintLabel}
		items={options}
		bind:justValue={value}
		bind:error
		{...$$restProps}
	/>
{:else if type === 'textarea'}
	<div class="disabled:[&_.form-input]:text-core-grey-400">
		<Input
			{disabled}
			optional={!required}
			type="textarea"
			{id}
			{name}
			{label}
			{description}
			{descriptionAlignment}
			{placeholder}
			{rows}
			{hint}
			{hintLabel}
			{inputmode}
			{format}
			bind:value
			bind:error
			{...$$restProps}
		/>
	</div>
{:else}
	<div class="disabled:[&_.form-input]:text-core-grey-400">
		<Input
			{disabled}
			optional={!required}
			{type}
			{name}
			{label}
			{description}
			{descriptionAlignment}
			{placeholder}
			{hint}
			{hintLabel}
			{inputmode}
			{format}
			bind:value
			bind:error
			{...$$restProps}
		/>
	</div>
{/if}
