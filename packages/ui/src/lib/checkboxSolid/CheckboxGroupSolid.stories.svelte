<script module lang="ts">
	import { Funnel, Map, PresentationChartLine } from '@steeze-ui/heroicons';
	import { defineMeta } from '@storybook/addon-svelte-csf';
	import Button from '../button/Button.svelte';
	import CheckboxGroupSolid from './CheckboxGroupSolid.svelte';
	import CheckboxGroupSolidDemo from './CheckboxGroupSolidDemo.svelte';
	import type { CheckboxSolidProps } from './types';

	/**
	 * The `<CheckboxGroupSolid>` component provides a way to create a set of `<CheckboxSolid>` components defined by an array of objects.
	 *
	 * **Alternatives**: if representing a set of options that are mutually exclusive, use the [CheckboxSolid](./?path=/docs/ui-components-Checkboxs-Checkboxgroupsolid--documentation).
	 * Consider using the [Checkbox](./?path=/docs/ui-components--checkboxes-checkbox--documentation)/[CheckboxGroupSolid](./?path=/docs/ui-components-checkboxes-checkboxgroup--documentation).
	 */

	let selectedOptions: string[] = $state(['bus', 'underground']);
	let selectedOptions2: string[] = $state([]);
	let selectedOptionsDisabled: string[] = $state([]);

	let optionsForGroup = [
		{ id: 'bus', name: 'transport-1', label: 'Bus stops' },
		{
			id: 'train',
			name: 'transport-1',
			label: 'Train stations'
		},
		{ id: 'underground', name: 'transport-1', label: 'Underground stations' },
		{ id: 'taxi', name: 'transport-1', label: 'Taxi ranks', disabled: true }
	];

	let optionsForGroupIconsAbove: Omit<CheckboxSolidProps, 'checked'>[] = [
		{ id: 'bus', name: 'transport-2', label: 'Bus stops', icon: Funnel },
		{ id: 'train', name: 'transport-2', label: 'Train stations', icon: Map },
		{
			id: 'underground',
			name: 'transport-2',
			label: 'Underground stations',
			icon: PresentationChartLine
		}
	];

	let optionsForGroupIconsBelow: Omit<CheckboxSolidProps, 'checked'>[] = [
		{ id: 'bus', name: 'transport-3', label: 'Bus stops', icon: Funnel, iconPlacement: 'below' },
		{
			id: 'train',
			name: 'transport-3',
			label: 'Train stations',
			icon: Map,
			iconPlacement: 'below'
		},
		{
			id: 'underground',
			name: 'transport-3',
			label: 'Underground stations',
			icon: PresentationChartLine,
			iconPlacement: 'below'
		}
	];

	const { Story } = defineMeta({
		title: 'Ui/Components/Checkboxes/CheckboxGroupSolid',
		component: CheckboxGroupSolid,
		tags: ['autodocs'],
		args: {
			options: optionsForGroup,
			ariaLabel: 'Select transport methods'
		}
	});

	// Variables to show correct filtering functionality
	let selectedFilters: string[] = $state([]);
	const data = ['bus', 'train', 'underground'];
	const filterData = (filters: string[], data: string[]) => {
		return filters.length ? data.filter((x) => filters.includes(x)) : data;
	};
	let filteredData = $derived(filterData(selectedFilters, data));
</script>

<Story name="Default">
	{#snippet template(args)}
		<CheckboxGroupSolid {...args} bind:selectedOptions />

		<p class="text-color-text-secondary mt-4">
			selectedOptions: {JSON.stringify(selectedOptions)}
		</p>
	{/snippet}
</Story>

<Story name="With title">
	{#snippet template(args)}
		<CheckboxGroupSolid {...args} bind:selectedOptions label="Transport method" />
		<p class="text-color-text-secondary mt-4">
			selectedOptions: {JSON.stringify(selectedOptions)}
		</p>
	{/snippet}
</Story>

<Story name="With hint">
	{#snippet template(args)}
		<CheckboxGroupSolid
			{...args}
			bind:selectedOptions
			label="Transport method"
			hint="contextual hint text"
		/>
		<p class="text-color-text-secondary mt-4">
			selectedOptions: {JSON.stringify(selectedOptions)}
		</p>
	{/snippet}
</Story>

<Story name="With description">
	{#snippet template(args)}
		<CheckboxGroupSolid
			{...args}
			bind:selectedOptions
			label="Transport method"
			hint="contextual hint text"
			description="Pick your preferred method of transport - taxis are currently not available"
		/>
		<p class="text-color-text-secondary mt-4">
			selectedOptions: {JSON.stringify(selectedOptions)}
		</p>
	{/snippet}
</Story>

<Story name="Hide select all">
	{#snippet template(args)}
		<CheckboxGroupSolid {...args} bind:selectedOptions hideSelectAll />
		<p class="text-color-text-secondary mt-4">
			selectedOptions: {JSON.stringify(selectedOptions)}
		</p>
	{/snippet}
</Story>

<Story name="Externally updated">
	{#snippet template(args)}
		<Button onclick={() => (selectedOptions = ['bus', 'train'])}>Select bus and train!</Button>

		<CheckboxGroupSolid {...args} bind:selectedOptions />
		<p class="text-color-text-secondary mt-4">
			selectedOptions: {JSON.stringify(selectedOptions)}
		</p>
	{/snippet}
</Story>

<Story name="With Icons above">
	{#snippet template(args)}
		<CheckboxGroupSolid
			name="station-type"
			bind:selectedOptions
			{...args}
			options={optionsForGroupIconsAbove}
		></CheckboxGroupSolid>
		<p class="text-color-text-secondary mt-8">
			Selected options: {JSON.stringify(selectedOptions)}
		</p>
	{/snippet}
</Story>

<Story name="With Icons below">
	{#snippet template(args)}
		<CheckboxGroupSolid
			name="station-type"
			bind:selectedOptions
			{...args}
			options={optionsForGroupIconsBelow}
		></CheckboxGroupSolid>
		<p class="text-color-text-secondary mt-8">
			Selected options: {JSON.stringify(selectedOptions)}
		</p>
	{/snippet}
</Story>

<Story name="With 2 options">
	{#snippet template(args)}
		<CheckboxGroupSolid
			name="station-type"
			bind:selectedOptions={selectedOptions2}
			{...args}
			options={[optionsForGroup[0], optionsForGroup[1]]}
		></CheckboxGroupSolid>
		<p class="text-color-text-secondary mt-8">
			Selected options: {JSON.stringify(selectedOptions2)}
		</p>
	{/snippet}
</Story>

<Story name="Disabled (global)">
	{#snippet template(args)}
		<CheckboxGroupSolid {...args} bind:selectedOptions={selectedOptionsDisabled} disabled />
		<p class="text-color-text-secondary mt-4">
			selectedOptions: {JSON.stringify(selectedOptionsDisabled)}
		</p>
	{/snippet}
</Story>

<Story name="With error">
	{#snippet template(args)}
		<CheckboxGroupSolid
			{...args}
			bind:selectedOptions
			error={!selectedOptions.length ? 'You must select an option' : undefined}
		/>
		<p class="text-color-text-secondary mt-4">
			selectedOptions: {JSON.stringify(selectedOptions)}
		</p>
		<Button onclick={() => (selectedOptions = [])}>Clear</Button>
	{/snippet}
</Story>

<Story name="As filter">
	{#snippet template(args)}
		<CheckboxGroupSolid {...args} bind:selectedOptions={selectedFilters} />
		<p class="text-color-text-secondary mt-4">
			selectedFilters: {JSON.stringify(selectedFilters)}
		</p>
		<div class="pt-2">
			<p class="font-semibold">Visible data:</p>
			{#each filteredData as d}
				<p>{d}</p>
			{/each}
		</div>
	{/snippet}
</Story>

<Story name="With custom overlay">
	{#snippet template()}
		<CheckboxGroupSolidDemo />
	{/snippet}
</Story>
