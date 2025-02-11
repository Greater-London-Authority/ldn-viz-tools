<script context="module" lang="ts">
	import { Story, Template } from '@storybook/addon-svelte-csf';
	import RadioButtonGroup from './RadioButtonGroup.svelte';

	export const meta = {
		title: 'Ui/Components/RadioButtons/RadioButtonGroup',
		component: RadioButtonGroup
	};
</script>

<script lang="ts">
	let selectedId: string;
	let selectedId2: undefined | string = undefined;

	let optionsForGroup = [
		{ id: 'bus', label: 'Bus stops', color: '#00AEEF' },
		{
			id: 'train',
			label: 'Train stations',
			color: '#008D48',
			hint: 'Excluding underground stations'
		},
		{ id: 'underground', label: 'Underground stations', color: '#9E0059' },
		{ id: 'taxi', label: 'Taxi ranks', color: 'firebrick', disabled: true }
	];
</script>

<Template let:args>
	<RadioButtonGroup options={optionsForGroup} name="station-type" bind:selectedId {...args} />
	<p class="mt-8 text-color-text-secondary">Selected id: {selectedId}</p>
</Template>

<Story name="Default" source />

<Story name="With title">
	<RadioButtonGroup options={optionsForGroup} name="station-type" bind:selectedId label="Radio" />
	<p class="mt-8 text-color-text-secondary">Selected id: {selectedId}</p>
</Story>

<Story name="With hint">
	<RadioButtonGroup
		options={optionsForGroup}
		name="station-type"
		bind:selectedId
		label="Radio"
		hint="gaga"
	/>
	<p class="mt-8 text-color-text-secondary">Selected id: {selectedId}</p>
</Story>

<Story name="With description">
	<RadioButtonGroup
		options={optionsForGroup}
		buttonsHidden
		name="station-type"
		bind:selectedId
		label="Transport method"
		description="Pick you prefered method of transport - taxis are currently not available"
	/>
	<p class="mt-8 text-color-text-secondary">Selected id: {selectedId}</p>
</Story>

<Story name="No clear button">
	<RadioButtonGroup options={optionsForGroup} name="station-type" bind:selectedId buttonsHidden />
	<p class="mt-8 text-color-text-secondary">Selected id: {selectedId}</p>
</Story>

<Story name="Aligned in row">
	<RadioButtonGroup
		options={optionsForGroup}
		name="station-type"
		bind:selectedId
		orientation="horizontal"
	/>
	<p class="mt-8 text-color-text-secondary">Selected id: {selectedId}</p>
</Story>

<Story name="Disabled (global)">
	<RadioButtonGroup
		options={optionsForGroup}
		name="station-type"
		bind:selectedId
		label="RadioGroup Label"
		hint="Contextual Hint"
		description="This is a description"
		disabled
	/>
	<p class="mt-8 text-color-text-secondary">Selected id: {selectedId}</p>
</Story>

<Story name="With error">
	<RadioButtonGroup
		options={optionsForGroup}
		name="station-type"
		bind:selectedId={selectedId2}
		label="Preferred mode of transport"
		hint="Contextual Hint"
		description="How you prefer to get around London."
		error={!selectedId2 ? 'You must select an option' : undefined}
	/>
	<p class="mt-8 text-color-text-secondary">Selected id: {selectedId}</p>
</Story>
