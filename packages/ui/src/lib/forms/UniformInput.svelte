<script lang="ts" context="module">
	export interface InputOption<T = string> {
		value: T;
		label: string;
	}

	export interface UniformInputProps<T = string> {
		name: string;
		type: string;
		required: boolean;
		disabled: boolean;
		id: string | undefined;
		label: string;
		description: string;
		placeholder: string;
		rows: number | string;
		options: InputOption[];
		value: T | null | undefined;
		error: string | null | undefined;
	}
</script>

<script lang="ts">
	import { Input, Checkbox } from '@ldn-viz/ui';

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

{#if type === 'hidden'}
	<input aria-hidden type="hidden" {id} {name} bind:value />
{:else if type === 'checkbox'}
	<Checkbox {disabled} {required} {id} {name} {label} bind:checked={value} />
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
