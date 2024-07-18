<script context="module" lang="ts">
	import UniformInput from './UniformInput.svelte';

	const dummyOptions = [
		{ label: "一 (Ichi)", value: "one" },
		{ label: "に (Ni)", value: "two" },
		{ label: "三 (San)", value: "three" },
	]

	const stringArg = {
		control: { type: 'text' },
		table: {
			defaultValue: { summary: '' },
			type: { summary: 'string' }
		}
	}

	const numberArg = {
		control: { type: 'number' },
	}

	const boolArg = {
		control: { type: 'boolean' },
	}

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
					'number', 'email', 
			    "email",
			    "password",
			    "search",
			    "tel",
			    "url",
				],
			},
			id: stringArg,
			name: stringArg,
			label: stringArg,
			disabled: boolArg,
			required: boolArg,
			description: stringArg,
			placeholder: stringArg,
			rows: numberArg,
			options: {
				control: { type: 'none' }
			},
			value: stringArg,
			error: stringArg,
		},
		args: {
			type: 'text',
			label: 'An informative label',
			options: dummyOptions,
		}
	};
</script>

<script lang="ts">
	import { Story, Template } from '@storybook/addon-svelte-csf';

	let stringValue = ''
	let boolValue = false
</script>

<Template let:args>
	<UniformInput {...args} />
</Template>

<Story name="Default" source />

<Story name="Text">
	<UniformInput type="text" label="Text input" placeholder="Type anything..." bind:value={stringValue} />
	<p class="mt-8 text-core-grey-500 dark:text-core-grey-200 italic">Value: {stringValue}</p>
</Story>

<Story name="Password">
	<UniformInput type="password" label="Password input" placeholder="Type anything..." bind:value={stringValue} />
	<p class="mt-8 text-core-grey-500 dark:text-core-grey-200 italic">Value: {stringValue}</p>
</Story>

<Story name="Textarea">
	<UniformInput type="textarea" label="Textarea input" rows="3" placeholder="Type anything..." bind:value={stringValue} />
	<p class="mt-8 text-core-grey-500 dark:text-core-grey-200 italic">Value: {stringValue}</p>
</Story>

<Story name="Checkbox">
	<UniformInput type="checkbox" label="Checkbox input" bind:value={boolValue} />
	<p class="mt-8 text-core-grey-500 dark:text-core-grey-200 italic">Value: {boolValue}</p>
</Story>

<Story name="Select">
	<UniformInput type="select" label="Select input" options={dummyOptions} placeholder="Select a Japanese number" bind:value={stringValue} />
	<p class="mt-8 text-core-grey-500 dark:text-core-grey-200 italic">Value: {stringValue}</p>
</Story>

<!-- TODO: disabled -->

<!-- TODO: error -->