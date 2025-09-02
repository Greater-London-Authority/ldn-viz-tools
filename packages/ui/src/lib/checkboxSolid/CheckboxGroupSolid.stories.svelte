<script context="module">
	import Button from '../button/Button.svelte';
	import CheckboxGroupSolid from './CheckboxGroupSolid.svelte';
	import CheckboxSolid from './CheckboxSolid.svelte';

	export const meta = {
		title: 'Ui/Components/Checkboxes/CheckboxGroupSolid',
		component: CheckboxGroupSolid,
		subcomponents: { CheckboxSolid }
	};
</script>

<script lang="ts">
	import { Story, Template } from '@storybook/addon-svelte-csf';

	let selectedOptions: string[] = ['bus', 'underground'];

	let optionsForGroup = [
		{ id: 'bus', name: 'bus', label: 'Bus stops', color: '#00AEEF' },
		{
			id: 'train',
			name: 'train',
			label: 'Train stations',
			color: '#008D48',
			hint: 'Excluding underground stations'
		},
		{ id: 'underground', name: 'underground', label: 'Underground stations', color: '#9E0059' },
		{ id: 'taxi', name: 'taxi', label: 'Taxi ranks', color: 'firebrick', disabled: true }
	];

	let ariaLabel = 'Select transport methods';

	// Variables to show correct filtering functionality
	let selectedFilters: string[] = [];

	const data = ['bus', 'train', 'underground', 'taxi'];

	const filterData = (filters: string[], data: string[]) => {
		return filters.length ? data.filter((x) => filters.includes(x)) : data;
	};

	$: filteredData = filterData(selectedFilters, data);
</script>

<Template let:args>
	<CheckboxGroupSolid options={optionsForGroup} bind:selectedOptions {...args} {ariaLabel} />
	<p class="mt-4 text-color-text-secondary">
		selectedOptions: {JSON.stringify(selectedOptions)}
	</p>
</Template>

<Story name="Default" source />

<Story name="with title">
	<CheckboxGroupSolid
		options={optionsForGroup}
		bind:selectedOptions
		label="Transport method"
		{ariaLabel}
	/>
	<p class="mt-4 text-color-text-secondary">
		selectedOptions: {JSON.stringify(selectedOptions)}
	</p>
</Story>

<Story name="with hint">
	<CheckboxGroupSolid
		options={optionsForGroup}
		bind:selectedOptions
		label="Transport method"
		hint="contextual hint text"
		{ariaLabel}
	/>
	<p class="mt-4 text-color-text-secondary">
		selectedOptions: {JSON.stringify(selectedOptions)}
	</p>
</Story>

<Story name="with description">
	<CheckboxGroupSolid
		options={optionsForGroup}
		bind:selectedOptions
		label="Transport method"
		description="Pick your preferred method of transport - taxis are currently not available"
		{ariaLabel}
	/>
	<p class="mt-4 text-color-text-secondary">
		selectedOptions: {JSON.stringify(selectedOptions)}
	</p>
</Story>

<Story name="disabled buttons">
	<CheckboxGroupSolid options={optionsForGroup} bind:selectedOptions {ariaLabel} />
	<p class="mt-4 text-color-text-secondary">
		selectedOptions: {JSON.stringify(selectedOptions)}
	</p>
</Story>

<Story name="externally updated">
	<Button on:click={() => (selectedOptions = ['bus', 'train'])}>Select bus and train!</Button>

	<div class="my-4">
		<CheckboxGroupSolid options={optionsForGroup} bind:selectedOptions {ariaLabel} />
	</div>
	<p class="mt-4 text-color-text-secondary">
		selectedOptions: {JSON.stringify(selectedOptions)}
	</p>
</Story>

<Story name="Disabled (global)">
	<CheckboxGroupSolid
		options={optionsForGroup}
		bind:selectedOptions
		label="Preferred mode of transport"
		hint="Contextual Hint"
		description="This is a description"
		disabled
		{ariaLabel}
	/>
	<p class="mt-4 text-color-text-secondary">
		selectedOptions: {JSON.stringify(selectedOptions)}
	</p>
</Story>

<Story name="With error">
	<CheckboxGroupSolid
		options={optionsForGroup}
		bind:selectedOptions
		label="Preferred mode of transport"
		hint="Contextual Hint"
		description="Deselect all to see an error state!"
		error={!selectedOptions.length ? 'You must select an option' : undefined}
		{ariaLabel}
	/>
	<p class="mt-4 text-color-text-secondary">
		selectedOptions: {JSON.stringify(selectedOptions)}
	</p>
</Story>

<!--
When `CheckboxGroupSolid` is used as a filter and nothing is selected, all options should be visible.

```
	let selectedFilters: string[] = [];
	
	const data = ['bus', 'train', 'underground', 'taxi'];

	const filterOptions = (filters: string[], data: string[]) => {
		return filters.length ? data.filter((x) => filters.includes(x)) : data;
	};

	$: filteredData = filterOptions(selectedFilters, data);
```
-->
<Story name="As filter">
	<CheckboxGroupSolid
		options={optionsForGroup}
		bind:selectedOptions={selectedFilters}
		{ariaLabel}
	/>
	<p class="mt-4 text-color-text-secondary">
		selectedFilters: {JSON.stringify(selectedFilters)}
	</p>
	<div class="pt-2">
		<p class="font-semibold">Visible data:</p>
		{#each filteredData as d}
			<p>{d}</p>
		{/each}
	</div>
</Story>
