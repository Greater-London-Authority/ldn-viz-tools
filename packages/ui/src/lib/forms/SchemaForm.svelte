<script lang="ts">
	import Form from './Form.svelte';
	import SchemaFormField from './SchemaFormField.svelte';
	import type {
		FormValues,
		FormErrors,
		FormValueStore,
		FormErrorStore,
		FormHasErrors,
		FormActiveButtonStore,
		SchemaFormFieldProps,
		SchemaFormCustomTypes
	} from './types';

	export let id: string | undefined = undefined;
	export let name: string | undefined = undefined;

	export let title: string | undefined = undefined;
	export let description: string | undefined = undefined;

	export let fields: SchemaFormFieldProps[] = [];
	export let customTypes: SchemaFormCustomTypes = {};

	export let initialValues: FormValues = {};
	export let initialErrors: FormErrors = {};

	export let valueStore: FormValueStore | undefined;
	export let errorStore: FormErrorStore | undefined;
	export let hasErrors: FormHasErrors | undefined;
	export let activeButtonStore: FormActiveButtonStore | undefined;
</script>

<Form
	{id}
	{name}
	{initialValues}
	{initialErrors}
	bind:valueStore
	bind:errorStore
	bind:hasErrors
	bind:activeButtonStore
	{...$$restProps}
>
	<slot name="title">
		{#if title}
			<h1 class="text-lg font-bold">
				{title}
			</h1>
		{/if}
	</slot>

	<slot name="description">
		{#if description}
			<p>{@html description}</p>
		{/if}
	</slot>

	<slot name="fields">
		{#if fields}
			{#each fields as field (field.name)}
				<SchemaFormField component={customTypes[field.type]} {field} />
			{/each}
		{/if}
	</slot>

	<slot slot="leftButtons" name="leftButtons" />
	<slot slot="rightButtons" name="rightButtons" />
</Form>
