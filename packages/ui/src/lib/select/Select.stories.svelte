<script module lang="ts">
	import { defineMeta } from '@storybook/addon-svelte-csf';
	import Select from './Select.svelte';

	const options: Option[] = [
		{ label: 'One', value: 1 },
		{ label: 'Two', value: 2 },
		{ label: 'Three', value: 3 }
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

	// let justValue: number | null = $state();
	// let justValueMulti: number[] | null = $state();
	let error = $state('');
</script>

<Story name="Basic">
	{#snippet template(args)}
		<div class="w-96">
			<Select {...args} {options} id="labelled-input" />
		</div>
	{/snippet}
</Story>

<!--
<Template>
	{#snippet children({ args })}
		<Select {...args} />
	{/snippet}
</Template>

<Story name="Default" args={{ options: options }} source />
-->

<!--
<Story name="Basic">
	<div class="w-96">
		<Select {options} id="labelled-input" />
	</div>
</Story>

<Story name="With Label">
	<div class="w-96">
		<Select {options} label="Label" id="labelled-input" />
	</div>
</Story>

<Story name="Optional">
	<div class="w-96">
		<Select {options} label="Label" id="labelled-input" optional />
	</div>
</Story>

<Story name="Custom Placeholder">
	<div class="w-96">
		<Select {options} label="Label" id="labelled-input" placeholder="Custom Placeholder text" />
	</div>
</Story>

<Story name="With Context Hint">
	<div class="w-96">
		<Select {options} label="Label" id="labelled-input">
			{#snippet hint()}
				<Overlay hintLabel="optional hint label">Contextual help text</Overlay>
			{/snippet}
		</Select>
	</div>
</Story>

<Story name="Description">
	<div class="w-96">
		<Select {options} label="Label" id="labelled-input" description="descriptive text" />
	</div>
</Story>

<Story name="Description alignment">
	<div class="w-96">
		<Select
			{options}
			label="Label"
			id="labelled-input"
			placeholder="Placeholder text"
			description="descriptive text"
			descriptionAlignment="right"
			optional
		/>
	</div>
</Story>

<Story name="Multiple selects">
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
			on:change={() => console.log('Selection changed!')}
		/>

		<span class="text-color-text-secondary mt-4 block">
			Value is: {JSON.stringify(value)}
		</span>
	</div>
</Story>

<Story name="Error">
	<div class="w-96">
		<Select
			{options}
			label="Label"
			id="labelled-input"
			placeholder="Placeholder text"
			description="descriptive text"
			optional
			error="something has gone wrong here"
		/>
	</div>
</Story>

<Story name="Disabled">
	<div class="w-96">
		<Select
			{options}
			label="Label"
			id="labelled-input"
			placeholder="Placeholder text"
			description="descriptive text"
			disabled
			optional
		/>
	</div>
</Story>

<Story name="Binding to justValue">
	<div class="flex w-[500px] flex-col gap-2">
		<p>
			You can bind directly to <code>justValue</code>, rather than <code>value</code> (which is an
			object including the <code>label</code> as well as <code>value</code>)
		</p>

		<div>Current value: <span class="font-bold">{justValue}</span></div>

		<Button on:click={() => (justValue = 2)}>Reset to 2</Button>
		<Button on:click={() => (justValue = null)}>Clear</Button>

		<Select {options} bind:justValue id="labelled-input" />
	</div>
</Story>

<Story name="Binding to justValue - multi">
	<div class="flex w-[500px] flex-col gap-2">
		<p>
			You can bind directly to <code>justValue</code>, rather than <code>value</code> (which is an
			object including the <code>label</code> as well as <code>value</code>)
		</p>

		<div>Current value: <span class="font-bold">{justValueMulti}</span></div>

		<Button on:click={() => (justValueMulti = [1, 3])}>Reset to 1 and 3</Button>
		<Button on:click={() => (justValueMulti = null)}>Clear</Button>

		<Select {options} bind:justValue={justValueMulti} id="labelled-input" multiple />
	</div>
</Story>

<Story name="Setting and clearing error message">
	<div class="flex w-[500px] flex-col gap-2">
		<Button on:click={() => (error = 'OH NO')}>Set error</Button>
		<Button on:click={() => (error = '')}>Clear error</Button>

		<span><code>error is:</code> {error}</span>

		<Select {options} id="labelled-input" {error} />
	</div>
</Story>
-->
