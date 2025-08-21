<script context="module" lang="ts">
	import FormField from './elements/formField/FormField.svelte';
	import FormSubmitButton from './elements/formSubmitButton/FormSubmitButton.svelte';
	import Form from './Form.svelte';
	import type {
		FormActiveButtonStore,
		FormErrorStore,
		FormHasErrors,
		FormValueStore
	} from './types';

	const colorOptions = [
		{ label: 'Red', value: '#FF0000' },
		{ label: 'Green', value: '#00FF00' },
		{ label: 'Blue', value: '#0000FF' }
	];

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
		title: 'Ui/Components/Form',
		component: Form,
		argTypes: {
			id: stringArg,
			name: stringArg,
			initialValues: immutableArg,
			initialErrors: immutableArg,
			valueStore: immutableArg,
			errorStore: immutableArg,
			activeButtonStore: immutableArg,
			hasErrors: immutableArg
		},
		args: {}
	};
</script>

<script lang="ts">
	import { Story, Template } from '@storybook/addon-svelte-csf';
	import Button from '../button/Button.svelte';

	let valueStore: FormValueStore;
	let errorStore: FormErrorStore;
	let hasErrors: FormHasErrors;
	let activeButtonStore: FormActiveButtonStore;

	const onSubmit = () => {
		validate();
	};

	const validate = () => {
		errorStore.set({});

		if (!$valueStore.name) {
			$errorStore.name = 'A name must be entered';
		}

		if (!$valueStore.color) {
			$errorStore.color = 'A color must be selected';
		}
	};

	const clear = () => {
		$valueStore.name = '';
		$valueStore.color = null;
		$valueStore.been_to_venice = false;
		errorStore.set({});
	};

	const resetToInitial = () => {
		$valueStore.name = 'Alice';
		$valueStore.color = null;
		$valueStore.been_to_venice = true;
		errorStore.set({
			color: 'A color must be selected'
		});
	};

	const waitTwoSeconds = () => {
		return new Promise((r) => setTimeout(r, 2000));
	};
</script>

<Template let:args>
	<Form {...args} />
</Template>

<Story name="Default" source />

<Story name="Simple Form">
	<Form name="about_you" bind:valueStore bind:errorStore>
		<FormField type="text" name="name" label="Name" required />
		<FormField type="select" name="color" label="Colour" options={colorOptions} />
		<FormField type="checkbox" name="been_to_venice" label="Have you been to Venice?" />
		<Button slot="leftButtons" variant="outline" on:click={clear}>Clear</Button>
		<FormSubmitButton slot="rightButtons" {onSubmit} />
	</Form>
	<div class="mt-4 flex flex-col gap-4 text-color-text-secondary italic">
		<pre>Values: {JSON.stringify($valueStore, null, 2)}</pre>
		<pre>Errors: {JSON.stringify($errorStore, null, 2)}</pre>
	</div>
</Story>

<Story name="Initial values and errors">
	<Form
		name="about_you"
		bind:valueStore
		bind:errorStore
		initialValues={{
			name: 'Alice',
			been_to_venice: true
		}}
		initialErrors={{
			color: 'A color must be selected'
		}}
	>
		<FormField type="text" name="name" label="Name" required />
		<FormField type="select" name="color" label="Colour" options={colorOptions} />
		<FormField type="checkbox" name="been_to_venice" label="Have you been to Venice?" />
		<Button slot="leftButtons" variant="outline" on:click={resetToInitial}>Reset</Button>
		<FormSubmitButton slot="rightButtons" {onSubmit} />
	</Form>
	<div class="mt-4 flex flex-col gap-4 text-color-text-secondary italic">
		<pre>Values: {JSON.stringify($valueStore, null, 2)}</pre>
		<pre>Errors: {JSON.stringify($errorStore, null, 2)}</pre>
	</div>
</Story>

<Story name="Has errors?">
	<Form name="has_errors" bind:errorStore bind:hasErrors>
		<FormField type="text" name="message" label="Always an error" required />
		<FormField type="checkbox" name="checkbox" label="Checkbox" required />
		<Button
			slot="leftButtons"
			variant="outline"
			on:click={() => {
				$errorStore.message = '';
			}}
		>
			Reset
		</Button>
		<FormSubmitButton
			slot="rightButtons"
			onSubmit={() => {
				$errorStore.message = 'An error message';
			}}
		/>
	</Form>
	<div class="mt-4 flex flex-col gap-4 text-color-text-secondary italic">
		{#key errorStore && $errorStore?.message}
			<p>Has errors: {hasErrors && hasErrors()}</p>
		{/key}
	</div>
</Story>

<Story name="Custom inputs">
	<Form name="about_you" bind:valueStore>
		{#if valueStore}
			<label>
				Custom input
				<textarea
					name="custom_input"
					class="w-full form-input"
					rows="3"
					bind:value={$valueStore.custom_input}
				/>
			</label>
		{/if}
	</Form>
	<div class="mt-4 flex flex-col gap-4 text-color-text-secondary italic">
		<pre>Values: {JSON.stringify($valueStore, null, 2)}</pre>
	</div>
</Story>

<Story name="Active button store">
	<Form
		name="about_you"
		bind:activeButtonStore
		initialValues={{
			message: 'Click submit!'
		}}
	>
		<FormField
			type="text"
			name="message"
			label="Message"
			required
			disabled={!!$activeButtonStore}
		/>
		<FormSubmitButton slot="rightButtons" async onSubmit={waitTwoSeconds} />
	</Form>
	<div class="mt-4 flex flex-col gap-4 text-color-text-secondary italic">
		<p>Active button: {$activeButtonStore}</p>
	</div>
</Story>
