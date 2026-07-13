<script module lang="ts">
	import { defineMeta } from '@storybook/addon-svelte-csf';
	import Button from '../button/Button.svelte';
	import Overlay from '../overlay/Overlay.svelte';
	import Select from './Select.svelte';

	/**
	 * The `Select` component allows users to select an option from a drop-down list of alternatives.
	 * Our select element is a wrapper around ['svelecte'](https://github.com/mskocik/svelecte).
	 * Many of the props exposed by this component are provided by `svelecte`, so you may find it helpful to consult its [documentation](https://svelecte.vercel.app/).
	 *
	 * Notably, this wrapper applies the `InputWrapper` chrome (label, description, tooltip, error, etc.), and adds a Boolean `reorderable` prop.
	 */
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

	// A large option list to demonstrate the virtualised dropdown.
	const manyOptions = Array.from({ length: 500 }, (_, i) => ({
		label: `Option ${i + 1}`,
		value: i + 1
	}));

	const groupedOptions = [
		{
			label: 'B',
			options: [
				{ label: 'Barking and Dagenham', value: 'Barking and Dagenham' },
				{ label: 'Barnet', value: 'Barnet' },
				{ label: 'Bexley', value: 'Bexley' },
				{ label: 'Brent', value: 'Brent' },
				{ label: 'Bromley', value: 'Bromley' }
			]
		},

		{
			label: 'C',
			options: [
				{ label: 'Camden', value: 'Camden' },
				{ label: 'Croydon', value: 'Croydon' }
			]
		},

		{
			label: 'E',
			options: [
				{ label: 'Ealing', value: 'Ealing' },
				{ label: 'Enfield', value: 'Enfield' }
			]
		}
	];

	/**
	 * The `Select` component allows users to select an option from a drop-down list of alternatives.
	 * Our select element is a wrapper around ['svelecte'](https://github.com/mskocik/svelecte).
	 * Many of the props exposed by this component are provided by `svelecte`, so you may find it helpful to consult its [documentation](https://svelecte.vercel.app/).
	 *
	 * Notably, this wrapper applies the `InputWrapper` chrome (label, description, tooltip, error, etc.), and adds a Boolean `reorderable` prop.
	 */

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
	let selectedBorough: string | null = $state(null);
	let selectedValueClearable = $state(2);

	let error = $state('');
</script>

<Story name="Basic">
	{#snippet template(args)}
		<div class="w-96">
			<Select {...args} {options} name="A Name" />
		</div>
	{/snippet}
</Story>

<Story name="With Label">
	{#snippet template(args)}
		<div class="w-96">
			<Select {...args} {options} label="Pick a number" />
		</div>
	{/snippet}
</Story>

<Story name="Optional">
	{#snippet template(args)}
		<div class="w-96">
			<Select {...args} {options} label="Label" optional />
		</div>
	{/snippet}
</Story>

<Story name="Don't highlight first option">
	{#snippet template(args)}
		<div class="w-96">
			<Select {...args} {options} highlightFirstItem={false} label="Pick a number" />
		</div>
	{/snippet}
</Story>

<Story name="Custom placeholder">
	{#snippet template(args)}
		<div class="w-96">
			<Select {...args} {options} label="Label" placeholder="Pick a number!" />
		</div>
	{/snippet}
</Story>

<Story name="With Contextual Hint">
	{#snippet template(args)}
		<div class="w-96">
			<Select {...args} {options} label="Label" hint="Contextual help text" />
		</div>
	{/snippet}
</Story>

<Story name="With contextual hint in custom overlay">
	{#snippet template(args)}
		<div class="w-96">
			<Select {...args} {options} label="Label">
				{#snippet customOverlay()}
					<Overlay overlayType="popover" hintLabel="optional hint label">
						Contextual help text
					</Overlay>
				{/snippet}
			</Select>
		</div>
	{/snippet}
</Story>

<Story name="Description">
	{#snippet template(args)}
		<div class="w-96">
			<Select {...args} {options} label="Label" description="descriptive text" />
		</div>
	{/snippet}
</Story>

<!--
The `clearable` prop will be passed through to svelecte, and create a button with a cross-shape icon to clear the current selection.
-->
<Story name="Adding clear button">
	{#snippet template(args)}
		<div class="w-96">
			<Select {...args} {options} clearable label="Label" bind:value={selectedValueClearable} />
		</div>
	{/snippet}
</Story>

<Story name="Description alignment">
	{#snippet template(args)}
		<div class="w-96">
			<Select
				{...args}
				{options}
				label="Label"
				description="descriptive text"
				descriptionAlignment="right"
			/>
		</div>
	{/snippet}
</Story>

<Story name="Multiple selects">
	{#snippet template(args)}
		<div class="w-96">
			<Select {...args} {options} label="Label" multiple bind:value />

			<span class="mt-4 block text-color-text-muted">
				Value is: {JSON.stringify(value)}
			</span>
		</div>
	{/snippet}
</Story>

<Story name="Multiple selects keep selection in list">
	{#snippet template(args)}
		<div class="w-96">
			<Select {...args} {options} label="Label" multiple keepSelectionInList bind:value />

			<span class="mt-4 block text-color-text-muted">
				Value is: {JSON.stringify(value)}
			</span>
		</div>
	{/snippet}
</Story>

<!--
When `multiple` is combined with `max`, the number of selections is capped.
Once the limit is reached, no further options can be selected.
-->
<Story name="Multiple selects - max num selections">
	{#snippet template(args)}
		<div class="w-96">
			<Select {...args} {options} label="Pick up to two" multiple max={2} />
		</div>
	{/snippet}
</Story>

<Story name="Error">
	{#snippet template(args)}
		<Select {...args} {options} label="Label" error="something has gone wrong here" />
	{/snippet}
</Story>

<Story name="Disabled">
	{#snippet template(args)}
		<Select {...args} {options} label="Label" description="descriptive text" disabled />
	{/snippet}
</Story>

<Story name="Binding to value">
	{#snippet template(args)}
		<div class="flex w-[500px] flex-col gap-2">
			<div>Current value: <span class="font-bold">{selectedValue}</span></div>

			<Button onclick={() => (selectedValue = 2)}>Reset to 2</Button>
			<Button variant="outline" emphasis="secondary" onclick={() => (selectedValue = null)}>
				Clear
			</Button>

			<Select {...args} {options} bind:value={selectedValue} />
		</div>
	{/snippet}
</Story>

<Story name="Binding to value - multiple selections">
	{#snippet template(args)}
		<div class="flex w-[500px] flex-col gap-2">
			<div>Current value: <span class="font-bold">{selectedValueMulti}</span></div>

			<Button onclick={() => (selectedValueMulti = [1, 3])}>Reset to 1 and 3</Button>
			<Button variant="outline" emphasis="secondary" onclick={() => (selectedValueMulti = null)}>
				Clear
			</Button>

			<Select {...args} {options} bind:value={selectedValueMulti} multiple />
		</div>
	{/snippet}
</Story>

<Story name="Setting and clearing error message">
	{#snippet template(args)}
		<div class="flex w-[500px] flex-col gap-2">
			<Button onclick={() => (error = 'OH NO')}>Set error</Button>
			<Button variant="outline" emphasis="secondary" onclick={() => (error = '')}
				>Clear error</Button
			>

			<span><code>error is:</code> {error}</span>

			<Select {...args} {options} {error} />
		</div>
	{/snippet}
</Story>

<Story name="Grouped options">
	{#snippet template(args)}
		<div class="flex w-[500px] flex-col gap-2">
			<Select {...args} options={groupedOptions} />
		</div>
	{/snippet}
</Story>

<Story name="Options with different field names">
	{#snippet template(args)}
		<div class="flex w-[500px] flex-col gap-2">
			<Select {...args} options={optionsAltFieldNames} labelField="word" valueField="number" />
		</div>
	{/snippet}
</Story>

<Story name="Re-orderable selection">
	{#snippet template(args)}
		<div class="flex w-[500px] flex-col gap-2">
			<Select {...args} {options} bind:value={selectedValueMulti} multiple reorderable />
		</div>
	{/snippet}
</Story>

<!--
The `creatable` prop lets users add their own options that are not in the list.
`creatablePrefix` sets the text shown before the value to be created, and `keepCreated`
retains created options in the dropdown so they can be re-selected.
-->
<Story name="Creatable options">
	{#snippet template(args)}
		<div class="w-96">
			<Select
				{...args}
				{options}
				label="Tags"
				multiple
				creatable
				keepCreated
				creatablePrefix="Add: "
				placeholder="Select or type to add..."
			/>
		</div>
	{/snippet}
</Story>

<!--
For very long option lists, set `virtualList` to only render the visible rows.
`vlItemSize` sets the row height (in pixels) used to calculate the scroll position.
-->
<Story name="Large / virtualised list">
	{#snippet template(args)}
		<div class="w-96">
			<Select
				{...args}
				options={manyOptions}
				label="Pick an option (500 options)"
				virtualList
				vlItemSize={40}
			/>
		</div>
	{/snippet}
</Story>

<Story name="Loading options from API">
	{#snippet template(args)}
		<div class="flex w-[500px] flex-col gap-2">
			<Select
				{...args}
				label="London Borough"
				placeholder="Select a borough..."
				fetch="https://api2.ldn-gis.co.uk/tables/geographies/core_london_borough?select=name,gss_code"
				fetchCallback={(response) => {
					return response.map((item) => ({
						label: item.name,
						value: item.gss_code
					}));
				}}
				labelField="label"
				valueField="value"
				bind:value={selectedBorough}
			/>

			<div class="mt-4 text-color-text-muted">
				<strong>Selected:</strong>
				{selectedBorough ?? 'None'}
			</div>
		</div>
	{/snippet}
</Story>
