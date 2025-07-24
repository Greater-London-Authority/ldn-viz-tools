<script module lang="ts">
	import { defineMeta } from '@storybook/addon-svelte-csf';

	import Form from '../../Form.svelte';
	import type { FormErrorStore, FormValueStore } from '../../types';
	import FormField from './FormField.svelte';

	const dummyOptions = [
		{ label: '一 (Ichi)', value: 'one' },
		{ label: 'に (Ni)', value: 'two' },
		{ label: '三 (San)', value: 'three' }
	];

	const stringArg = {
		control: { type: 'text' },
		table: {
			defaultValue: { summary: '' },
			type: { summary: 'string' }
		}
	};

	const numberArg = {
		control: { type: 'number' }
	};

	const boolArg = {
		control: { type: 'boolean' }
	};

	const immutableArg = {
		control: { type: 'none' }
	};

	const { Story } = defineMeta({
		title: 'Ui/Components/Form/FormField',
		component: FormField,
		tags: ['autodocs'],

		argTypes: {
			type: {
				control: { type: 'select' },
				options: [
					'text',
					'textarea',
					'checkbox',
					'select',
					'number',
					'email',
					'email',
					'password',
					'search',
					'tel',
					'url'
				]
			},
			id: stringArg,
			name: stringArg,
			label: stringArg,
			disabled: boolArg,
			required: boolArg,
			description: stringArg,
			descriptionAlignment: {
				control: { type: 'select' },
				options: ['left', 'right']
			},
			placeholder: stringArg,
			color: stringArg,
			rows: numberArg,
			options: {
				control: { type: 'none' }
			},
			hint: stringArg,
			hintLabel: stringArg,
			inputmode: {
				control: { type: 'select' },
				options: [
					'none',
					'text',
					'decimal',
					'numeric',
					'tel',
					'search',
					'email',
					'url',
					'search',
					'tel',
					'url'
				]
			},
			format: immutableArg
		},
		args: {
			type: 'text',
			label: 'An informative label',
			name: 'field_name',
			options: dummyOptions
		}
	});
</script>

<script lang="ts">
	import Button from '../../../button/Button.svelte';

	let valueStore: FormValueStore = $state();
	let errorStore: FormErrorStore = $state();

	const validate = () => {
		$errorStore.error_field = '';

		if (!$valueStore.error_field) {
			$errorStore.error_field = 'The field must not be empty';
			return;
		}

		if ($valueStore.error_field?.toLowerCase() !== 'svelte') {
			$errorStore.error_field = "The field may only contain the world 'Svelte'";
		}
	};
</script>

<Story name="Default" source>
	{#snippet template(args)}
		{#key args}
			<Form
				bind:valueStore
				initialValues={{
					[args.name]: args.type === 'checkbox' ? false : ''
				}}
			>
				<FormField {...args} />
			</Form>
			<div class="text-color-text-secondary mt-4 flex flex-col gap-4 italic">
				{#if args.type === 'select'}
					<Button
						variant="text"
						emphasis="secondary"
						onclick={() => ($valueStore[args.name] = null)}>Reset</Button
					>
				{/if}
				<p>Value: {valueStore && $valueStore[args.name]}</p>
			</div>
		{/key}
	{/snippet}
</Story>

<Story name="Error">
	{#snippet template(args)}
		<Form
			{...args}
			bind:valueStore
			bind:errorStore
			initialErrors={{
				error_field: 'The field must not be empty'
			}}
		>
			<FormField type="text" name="error_field" />
		</Form>
		<div class="text-color-text-secondary mt-4 flex flex-col gap-4 italic">
			<Button type="submit" emphasis="primary" onclick={validate}>Validate</Button>
			<p>Value: {valueStore && $valueStore.error_field}</p>
			<p>Error: {errorStore && $errorStore.error_field}</p>
		</div>
	{/snippet}
</Story>
