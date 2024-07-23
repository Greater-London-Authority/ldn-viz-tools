<script lang="ts">
	import Form from '../../Form.svelte';
	import SchemaFormField from './SchemaFormField.svelte';
	import type { FormValues, FormErrors } from '../../types';

	export let id: string | undefined = undefined;
	export let name: string | undefined = undefined;

	export let title = '';
	export let description = '';

	export let fields = [];
	export let customTypes = {};

	export let initialValues: FormValues = {};
	export let initialErrors: FormErrors = {};

	export let valueStore;
	export let errorStore;
	export let hasErrors;
	export let activeButtonStore;
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
