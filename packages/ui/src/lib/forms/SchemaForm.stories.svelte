<script context="module" lang="ts">
	import FormSubmitButton from './elements/formSubmitButton/FormSubmitButton.svelte';
	import SchemaForm from './SchemaForm.svelte';

	import type { FormErrorStore, FormValueStore } from './types';

	const stringArg = {
		control: { type: 'text' },
		table: {
			defaultValue: { summary: '' },
			type: { summary: 'string' }
		}
	};

	const immutableArg = {
		control: { type: 'none' }
	};

	export const meta = {
		title: 'Ui/Form/SchemaForm',
		component: SchemaForm,
		argTypes: {
			id: stringArg,
			name: stringArg,
			title: stringArg,
			description: stringArg,
			fields: immutableArg,
			customTypes: immutableArg,
			initialValues: immutableArg,
			initialErrors: immutableArg,
			hasErrors: immutableArg,
			valueStore: immutableArg,
			errorStore: immutableArg,
			activeButtonStore: immutableArg
		},
		args: {}
	};
</script>

<script lang="ts">
	import { Story, Template } from '@storybook/addon-svelte-csf';
	import Button from '../button/Button.svelte';
	import CustomInput from './CustomInput.svelte';

	let valueStore: FormValueStore;
	let errorStore: FormErrorStore;
</script>

<Template let:args>
	<SchemaForm {...args} />
</Template>

<Story name="Default" source />

<Story name="Simple form">
	<SchemaForm
		name="about_you"
		bind:valueStore
		bind:errorStore
		fields={[
			{
				required: true,
				type: 'text',
				name: 'name',
				label: 'Name'
			},
			{
				type: 'select',
				name: 'color',
				label: 'Colour',
				options: [
					{ label: 'Red', value: '#FF0000' },
					{ label: 'Green', value: '#00FF00' },
					{ label: 'Blue', value: '#0000FF' }
				]
			},
			{
				type: 'checkbox',
				name: 'been_to_venice',
				label: 'Have you been to Venice?'
			}
		]}
	>
		<div slot="rightButtons" class="space-x-2 flex">
			<Button
				variant="outline"
				on:click={() => {
					$valueStore.name = '';
					$valueStore.color = null;
					$valueStore.been_to_venice = false;
					errorStore.set({});
				}}
			>
				Clear
			</Button>
			<FormSubmitButton
				onSubmit={() => {
					errorStore.set({});

					if (!$valueStore.name) {
						$errorStore.name = 'A name must be entered';
					}

					if (!$valueStore.color) {
						$errorStore.color = 'A color must be selected';
					}
				}}
			/>
		</div>
	</SchemaForm>
	<div class="mt-4 flex flex-col gap-4 text-color-text-secondary italic">
		<pre>Values: {JSON.stringify($valueStore, null, 2)}</pre>
		<pre>Errors: {JSON.stringify($errorStore, null, 2)}</pre>
	</div>
</Story>

<Story name="Title & description">
	<SchemaForm
		title="About you"
		description="Please enter information about yourself."
		name="about_you"
		bind:valueStore
		bind:errorStore
		fields={[
			{
				required: true,
				type: 'text',
				name: 'name',
				label: 'Name'
			},
			{
				type: 'select',
				name: 'color',
				label: 'Colour',
				options: [
					{ label: 'Red', value: '#FF0000' },
					{ label: 'Green', value: '#00FF00' },
					{ label: 'Blue', value: '#0000FF' }
				]
			}
		]}
	>
		<FormSubmitButton slot="rightButtons" onSubmit={() => {}} />
	</SchemaForm>
</Story>

<Story name="Custom input type">
	<SchemaForm
		title="Custom type"
		name="about_you"
		bind:valueStore
		bind:errorStore
		customTypes={{
			slider: CustomInput
		}}
		fields={[
			{
				required: true,
				type: 'slider',
				name: 'age',
				label: 'How old are you?',
				min: 0,
				max: 150
			}
		]}
	>
		<div slot="rightButtons" class="space-x-2 flex">
			<Button
				variant="outline"
				on:click={() => {
					errorStore.set({});
					$valueStore.age = 40;
				}}
			>
				Clear
			</Button>
			<FormSubmitButton
				onSubmit={() => {
					errorStore.set({});

					if (typeof $valueStore.age === 'number' && $valueStore.age > 122) {
						$errorStore.age = 'No one has yet lived over the age of 122';
					}
				}}
			/>
		</div>
	</SchemaForm>
	<div class="mt-4 flex flex-col gap-4 text-color-text-secondary italic">
		<pre>Values: {JSON.stringify($valueStore, null, 2)}</pre>
		<pre>Errors: {JSON.stringify($errorStore, null, 2)}</pre>
	</div>
</Story>
