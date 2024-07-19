<script context="module" lang="ts">
	import UniformInput from './UniformInput.svelte';

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

	export const meta = {
		title: 'Ui/UniformInput',
		component: UniformInput,
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
			format: immutableArg,
			value: stringArg,
			error: stringArg
		},
		args: {
			type: 'text',
			label: 'An informative label',
			options: dummyOptions
		}
	};
</script>

<script lang="ts">
	import { Story, Template } from '@storybook/addon-svelte-csf';
	import Button from '../button/Button.svelte';

	let value: string | boolean = '';

	const reset = (args: { [key: string]: any }) => {
		if (args.value) {
			value = args.value;
			return;
		}

		if (args.type === 'checkbox') {
			value = false;
			return;
		}

		value = '';
	};
</script>

<Template let:args>
	<UniformInput {...args} bind:value />
	<div class="mt-8 flex flex-wrap gap-4 items-center">
		<Button emphasis="secondary" condition="warning" on:click={() => reset(args)}>Reset</Button>
		<p class="text-core-grey-500 dark:text-core-grey-200 italic">Value: {value}</p>
	</div>
</Template>

<Story name="Default" source />
