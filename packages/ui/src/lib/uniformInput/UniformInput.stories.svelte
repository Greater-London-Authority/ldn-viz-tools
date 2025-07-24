<script module lang="ts">
	import { defineMeta } from '@storybook/addon-svelte-csf';

	import UniformInput from './UniformInput.svelte';

	const dummyOptions = [
		{ label: '一 (Ichi)', value: 'one' },
		{ label: 'に (Ni)', value: 'two' },
		{ label: '三 (San)', value: 'three' }
	];

	const newStringArg = (defaultValue = '') => ({
		control: { type: 'text' },
		table: {
			defaultValue: { summary: defaultValue },
			type: { summary: 'string' }
		}
	});

	const newSelectedStringArg = (options, defaultValue = '') => ({
		control: { type: 'select' },
		options: options,
		table: {
			defaultValue: { summary: defaultValue },
			type: { summary: 'string' }
		}
	});

	const newFunctionArg = (detail = '') => ({
		type: 'function',
		control: 'none',
		table: {
			type: {
				summary: 'function',
				detail: detail
			}
		}
	});

	const { Story } = defineMeta({
		title: 'Ui/Components/Form/UniformInput',
		component: UniformInput,
		tags: ['autodocs'],

		argTypes: {
			type: newSelectedStringArg(
				[
					'hidden',
					'text',
					'textarea',
					'number',
					'email',
					'password',
					'search',
					'tel',
					'url',
					'time',
					'date',
					'datetime-local',
					'file',
					'range'
				],
				'text'
			),
			inputmode: newSelectedStringArg(
				[
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
				],
				'text'
			),
			id: newStringArg('// random ID'),
			name: newStringArg("// 'id' prop"),
			label: newStringArg(),
			description: newStringArg(),
			descriptionAlignment: {
				control: { type: 'select' },
				options: ['left', 'right']
			},
			placeholder: newStringArg(),
			color: newStringArg(),
			options: {
				control: { type: 'none' },
				table: {
					type: {
						summary: 'array',
						detail: `array[{
	value: string,
	label: string,
	id?: string;
	name?: string;
	disabled?: boolean;
	color?: string;
	hint?: string,
	hintLabel?: string,
}]`
					}
				}
			},
			format: newFunctionArg('(value: string) => string'),
			value: newStringArg(),
			error: newStringArg()
		},
		args: {
			type: 'text',
			label: 'An informative label',
			options: dummyOptions
		}
	});
</script>

<script lang="ts">
	import Button from '../button/Button.svelte';

	let value: string | boolean = $state('');

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

<Story name="Default" source>
	{#snippet template(args)}
		{#key args}
			<UniformInput {...args} bind:value />
		{/key}

		<div class="mt-4 flex flex-wrap items-center gap-4">
			<Button variant="text" emphasis="secondary" onclick={() => reset(args)}>Reset</Button>
			<p class="text-color-text-secondary italic">Value: {value}</p>
		</div>
	{/snippet}
</Story>
