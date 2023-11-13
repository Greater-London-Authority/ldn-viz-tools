<script lang="ts">
	import { Meta, Story, Template } from '@storybook/addon-svelte-csf';

	import Select from './Select.svelte';

	type Item = { label: string; value: number };
	let value: Item;

	const items: Item[] = [
		{ label: 'One', value: 1 },
		{ label: 'Two', value: 2 },
		{ label: 'Three', value: 3 }
	];
</script>

<Meta title="Ui/Select" component={Select} />

<Template let:args>
	<Select {...args} />
</Template>

<Story name="Default" args={{ items: items }} />

<Story name="Basic">
	<Select {items} id="labelled-input" />
</Story>

<Story name="With Label">
	<Select {items} label="Label" id="labelled-input" />
</Story>

<Story name="Optional">
	<Select {items} label="Label" id="labelled-input" optional />
</Story>

<Story name="Custom Placeholder">
	<Select {items} label="Label" id="labelled-input" placeholder="Custom Placeholder text" />
</Story>

<Story name="With Context Hint">
	<Select
		{items}
		label="Label"
		id="labelled-input"
		hint
		hintText="Tooltip text"
		hintTooltipContent="A brief contextual help text"
	/>
</Story>

<Story name="Description">
	<Select {items} label="Label" id="labelled-input" description="descriptive text" />
</Story>

<Story name="Description alignment">
	<Select
		{items}
		label="Label"
		id="labelled-input"
		placeholder="Placeholder text"
		hint
		hintText="Tooltip text"
		hintTooltipContent="A brief contextual help text"
		description="descriptive text"
		descriptionAlignment="right"
		optional
	/>
</Story>

<Story name="Multiple selects">
	<Select
		{items}
		label="Label"
		id="labelled-input"
		placeholder="Placeholder text"
		hint
		hintText="Tooltip text"
		hintTooltipContent="A brief contextual help text"
		description="descriptive text"
		optional
		multiple
		bind:value
		on:change={() => console.log('Selection changed!')}
	/>

	<span class="mt-4 text-core-grey-700 dark:text-core-grey-200 block">
		Value is: {JSON.stringify(value)}
	</span>
</Story>

<Story name="Error">
	<Select
		{items}
		label="Label"
		id="labelled-input"
		placeholder="Placeholder text"
		hint
		hintText="Tooltip text"
		hintTooltipContent="A brief contextual help text"
		description="descriptive text"
		optional
		error
		errorMessage="something has gone wrong here"
	/>
</Story>

<Story name="Disabled">
	<Select
		{items}
		label="Label"
		id="labelled-input"
		placeholder="Placeholder text"
		hint
		hintText="Tooltip text"
		hintTooltipContent="A brief contextual help text"
		description="descriptive text"
		disabled
		optional
	/>
</Story>
