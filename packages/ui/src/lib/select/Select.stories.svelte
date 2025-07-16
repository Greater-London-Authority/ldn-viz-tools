<script module lang="ts">
	import { defineMeta } from '@storybook/addon-svelte-csf';
	import Button from '../button/Button.svelte';
	import Overlay from '../overlay/Overlay.svelte';
	import Select from './Select.svelte';

	const options: Option[] = [
		{ label: 'One', value: 1 },
		{ label: 'Two', value: 2 },
		{ label: 'Three', value: 3 }
	];

	const optionsAltFieldNames = [
		{ word: 'One', number: 1 },
		{ word: 'Two', number: 2 },
		{ word: 'Three', number: 3 }
	];

	const groupedOptions = [
		{
			label: 'B',
			options: [
				{ text: 'Barking and Dagenham', value: 'Barking and Dagenham' },
				{ text: 'Barnet', value: 'Barnet' },
				{ text: 'Bexley', value: 'Bexley' },
				{ text: 'Brent', value: 'Brent' },
				{ text: 'Bromley', value: 'Bromley' }
			]
		},

		{
			label: 'C',
			options: [
				{ text: 'Camden', value: 'Camden' },
				{ text: 'Croydon', value: 'Croydon' }
			]
		},

		{
			label: 'E',
			options: [
				{ text: 'Ealing', value: 'Ealing' },
				{ text: 'Enfield', value: 'Enfield' }
			]
		}
	];

	const { Story } = defineMeta({
		title: 'Ui/Components/Select',
		component: Select,
		tags: ['autodocs'],
		args: {
			label: 'Label',
			options
		}
	});

	type Option = { label: string; value: number };
	let value: Option | undefined = $state();

	let selectedValue: number | null = $state(null);
	let selectedValueMulti: number[] | null = $state(null);
	let error = $state('');
</script>

<Story name="Basic">
	{#snippet template(args)}
		<div class="w-96">
			<Select {...args} {options} id="labelled-input" />
		</div>
	{/snippet}
</Story>

<Story name="With Label">
	{#snippet template(args)}
		<div class="w-96">
			<Select {options} label="Pick a number" id="labelled-input" />
		</div>
	{/snippet}
</Story>

<Story name="Optional">
	{#snippet template(args)}
		<div class="w-96">
			<Select {options} label="Pick a number" id="labelled-input" optional />
		</div>
	{/snippet}
</Story>

<Story name="Custom placeholder">
	{#snippet template(args)}
		<div class="w-96">
			<Select {options} label="Label" id="labelled-input" placeholder="Pick a number!" />
		</div>
	{/snippet}
</Story>

<Story name="With Contextual Hint">
	{#snippet template(args)}
		<div class="w-96">
			<Select {options} label="Label" id="labelled-input" hint="Contextual help text" />
		</div>
	{/snippet}
</Story>

<Story name="With contextual hint in cusotm overlay">
	{#snippet template(args)}
		<div class="w-96">
			<Select {options} label="Label" id="labelled-input">
				{#snippet customOverlay()}
					<Overlay hintLabel="optional hint label">Contextual help text</Overlay>
				{/snippet}
			</Select>
		</div>
	{/snippet}
</Story>

<Story name="Description">
	{#snippet template(args)}
		<div class="w-96">
			<Select {options} label="Label" id="labelled-input" description="descriptive text" />
		</div>
	{/snippet}
</Story>

<Story name="Description alignment">
	{#snippet template(args)}
		<Select
			{options}
			label="Label"
			id="labelled-input"
			placeholder="Placeholder text"
			description="descriptive text"
			descriptionAlignment="right"
			optional
		/>
	{/snippet}
</Story>

<Story name="Multiple selects">
	{#snippet template(args)}
		<div class="w-96">
			<Select
				{options}
				label="Label"
				id="labelled-input"
				placeholder="Placeholder text"
				description="descriptive text"
				optional
				multiple
				bind:value
			/>

			<span class="text-color-text-secondary mt-4 block">
				Value is: {JSON.stringify(value)}
			</span>
		</div>
	{/snippet}
</Story>

<Story name="Error">
	{#snippet template(args)}
		<Select
			{options}
			label="Label"
			id="labelled-input"
			placeholder="Placeholder text"
			description="descriptive text"
			optional
			error="something has gone wrong here"
		/>
	{/snippet}
</Story>

<Story name="Disabled">
	{#snippet template(args)}
		<Select
			{options}
			label="Label"
			id="labelled-input"
			placeholder="Placeholder text"
			description="descriptive text"
			disabled
			optional
		/>
	{/snippet}
</Story>

<Story name="Binding to value">
	{#snippet template(args)}
		<div class="flex w-[500px] flex-col gap-2">
			<div>Current value: <span class="font-bold">{selectedValue}</span></div>

			<Button onclick={() => (selectedValue = 2)}>Reset to 2</Button>
			<Button onclick={() => (selectedValue = null)}>Clear</Button>

			<Select {options} bind:value={selectedValue} id="labelled-input" />
		</div>
	{/snippet}
</Story>

<Story name="Binding to value - multiple selections">
	{#snippet template(args)}
		<div class="flex w-[500px] flex-col gap-2">
			<div>Current value: <span class="font-bold">{selectedValueMulti}</span></div>

			<Button onclick={() => (selectedValueMulti = [1, 3])}>Reset to 1 and 3</Button>
			<Button onclick={() => (selectedValueMulti = null)}>Clear</Button>

			<Select {options} bind:value={selectedValueMulti} id="labelled-input" multiple />
		</div>
	{/snippet}
</Story>

<Story name="Setting and clearing error message">
	{#snippet template(args)}
		<div class="flex w-[500px] flex-col gap-2">
			<Button onclick={() => (error = 'OH NO')}>Set error</Button>
			<Button onclick={() => (error = '')}>Clear error</Button>

			<span><code>error is:</code> {error}</span>

			<Select {options} id="labelled-input" {error} />
		</div>
	{/snippet}
</Story>

<Story name="Grouped options">
	{#snippet template(args)}
		<div class="flex w-[500px] flex-col gap-2">
			<Select options={groupedOptions} id="labelled-input" />
		</div>
	{/snippet}
</Story>

<Story name="Options with different field names">
	{#snippet template(args)}
		<div class="flex w-[500px] flex-col gap-2">
			<Select
				options={optionsAltFieldNames}
				labelField="word"
				valueField="number"
				id="labelled-input"
			/>
		</div>
	{/snippet}
</Story>

<Story name="Re-orderable selection">
	{#snippet template(args)}
		<div class="flex w-[500px] flex-col gap-2">
			<Select {options} bind:value={selectedValueMulti} id="labelled-input" multiple reorderable />
		</div>
	{/snippet}
</Story>
