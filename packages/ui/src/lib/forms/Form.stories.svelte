<script module lang="ts">
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

	let valueStore: FormValueStore = $state();
	let errorStore: FormErrorStore = $state();
	let hasErrors: FormHasErrors = $state();
	let activeButtonStore: FormActiveButtonStore = $state();

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

<Template>
	{#snippet children({ args })}
		<Form {...args} />
	{/snippet}
</Template>

<Story name="Default" source />

<Story name="Simple Form">
	<Form name="about_you" bind:valueStore bind:errorStore>
		<FormField type="text" name="name" label="Name" required />
		<FormField type="select" name="color" label="Colour" options={colorOptions} />
		<FormField type="checkbox" name="been_to_venice" label="Have you been to Venice?" />
		{#snippet leftButtons()}
			<Button variant="outline" onclick={clear}>Clear</Button>
		{/snippet}
		{#snippet rightButtons()}
			<FormSubmitButton {onSubmit} />
		{/snippet}
	</Form>
	<div class="text-color-text-secondary mt-4 flex flex-col gap-4 italic">
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
		{#snippet leftButtons()}
			<Button variant="outline" click={resetToInitial}>Reset</Button>
		{/snippet}
		{#snippet rightButtons()}
			<FormSubmitButton {onSubmit} />
		{/snippet}
	</Form>
	<div class="text-color-text-secondary mt-4 flex flex-col gap-4 italic">
		<pre>Values: {JSON.stringify($valueStore, null, 2)}</pre>
		<pre>Errors: {JSON.stringify($errorStore, null, 2)}</pre>
	</div>
</Story>

<Story name="Has errors?">
	<Form name="has_errors" bind:errorStore bind:hasErrors>
		<FormField type="text" name="message" label="Always an error" required />
		<FormField type="checkbox" name="checkbox" label="Checkbox" required />
		{#snippet leftButtons()}
			<Button
				variant="outline"
				onclick={() => {
					$errorStore.message = '';
				}}
			>
				Reset
			</Button>
		{/snippet}
		{#snippet rightButtons()}
			<FormSubmitButton
				onSubmit={() => {
					$errorStore.message = 'An error message';
				}}
			/>
		{/snippet}
	</Form>
	<div class="text-color-text-secondary mt-4 flex flex-col gap-4 italic">
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
					class="form-input w-full"
					rows="3"
					bind:value={$valueStore.custom_input}
				></textarea>
			</label>
		{/if}
	</Form>
	<div class="text-color-text-secondary mt-4 flex flex-col gap-4 italic">
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
		{#snippet rightButtons()}
			<FormSubmitButton async onSubmit={waitTwoSeconds} />
		{/snippet}
	</Form>
	<div class="text-color-text-secondary mt-4 flex flex-col gap-4 italic">
		<p>Active button: {$activeButtonStore}</p>
	</div>
</Story>
