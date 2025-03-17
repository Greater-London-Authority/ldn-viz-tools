<script context="module" lang="ts">
	import { Story, Template } from '@storybook/addon-svelte-csf';
	import Select from './Select.svelte';

	export const meta = {
		title: 'Ui/Components/Select',
		component: Select
	};
</script>

<script lang="ts">
	import Button from '../button/Button.svelte';
	import Overlay from '../overlay/Overlay.svelte';
	type Item = { label: string; value: number };
	let value: Item;

	const items: Item[] = [
		{ label: 'One', value: 1 },
		{ label: 'Two', value: 2 },
		{ label: 'Three', value: 3 }
	];

	let justValue: number | null;
	let justValueMulti: number[] | null;
	let error = '';
</script>

<Template let:args>
	<Select {...args} />
</Template>

<Story name="Default" args={{ items: items }} source />

<Story name="Basic">
	<div class="w-96">
		<Select {items} id="labelled-input" />
	</div>
</Story>

<Story name="With Label">
	<div class="w-96">
		<Select {items} label="Label" id="labelled-input" />
	</div>
</Story>

<Story name="Optional">
	<div class="w-96">
		<Select {items} label="Label" id="labelled-input" optional />
	</div>
</Story>

<Story name="Custom Placeholder">
	<div class="w-96">
		<Select {items} label="Label" id="labelled-input" placeholder="Custom Placeholder text" />
	</div>
</Story>

<Story name="With Context Hint">
	<div class="w-96">
		<Select {items} label="Label" id="labelled-input">
			<Overlay slot="hint" hintLabel="optional hint label">Contextual help text</Overlay>
		</Select>
	</div>
</Story>

<Story name="Description">
	<div class="w-96">
		<Select {items} label="Label" id="labelled-input" description="descriptive text" />
	</div>
</Story>

<Story name="Description alignment">
	<div class="w-96">
		<Select
			{items}
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
			{items}
			label="Label"
			id="labelled-input"
			placeholder="Placeholder text"
			description="descriptive text"
			optional
			multiple
			bind:value
			on:change={() => console.log('Selection changed!')}
		/>

		<span class="mt-4 text-color-text-secondary block">
			Value is: {JSON.stringify(value)}
		</span>
	</div>
</Story>

<Story name="Error">
	<div class="w-96">
		<Select
			{items}
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
			{items}
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
	<div class="w-[500px] flex flex-col gap-2">
		<p>
			You can bind directly to <code>justValue</code>, rather than <code>value</code> (which is an
			object including the <code>label</code> as well as <code>value</code>)
		</p>

		<div>Current value: <span class="font-bold">{justValue}</span></div>

		<Button on:click={() => (justValue = 2)}>Reset to 2</Button>
		<Button on:click={() => (justValue = null)}>Clear</Button>

		<Select {items} bind:justValue id="labelled-input" />
	</div>
</Story>

<Story name="Binding to justValue - multi">
	<div class="w-[500px] flex flex-col gap-2">
		<p>
			You can bind directly to <code>justValue</code>, rather than <code>value</code> (which is an
			object including the <code>label</code> as well as <code>value</code>)
		</p>

		<div>Current value: <span class="font-bold">{justValueMulti}</span></div>

		<Button on:click={() => (justValueMulti = [1, 3])}>Reset to 1 and 3</Button>
		<Button on:click={() => (justValueMulti = null)}>Clear</Button>

		<Select {items} bind:justValue={justValueMulti} id="labelled-input" multiple />
	</div>
</Story>

<Story name="Setting and clearing error message">
	<div class="w-[500px] flex flex-col gap-2">
		<Button on:click={() => (error = 'OH NO')}>Set error</Button>
		<Button on:click={() => (error = '')}>Clear error</Button>

		<span><code>error is:</code> {error}</span>

		<Select {items} id="labelled-input" {error} />
	</div>
</Story>
