<script context="module" lang="ts">
	import Button from '../button/Button.svelte';
	import CheckboxGroup from './CheckboxGroup.svelte';

	export const meta = {
		title: 'Ui/Components/Checkboxes/CheckboxGroup',
		component: CheckboxGroup
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
</script>

<Template let:args>
	<CheckboxGroup options={optionsForGroup} bind:selectedOptions {...args} />
	<p class="mt-4 text-color-text-secondary">
		selectedOptions: {JSON.stringify(selectedOptions)}
	</p>
</Template>

<Story name="Default" source />

<Story name="with title">
	<CheckboxGroup options={optionsForGroup} bind:selectedOptions label="Transport method" />
	<p class="mt-4 text-color-text-secondary">
		selectedOptions: {JSON.stringify(selectedOptions)}
	</p>
</Story>

<Story name="with hint">
	<CheckboxGroup
		options={optionsForGroup}
		bind:selectedOptions
		label="Transport method"
		hint="contextual hint text"
	/>
	<p class="mt-4 text-color-text-secondary">
		selectedOptions: {JSON.stringify(selectedOptions)}
	</p>
</Story>

<Story name="with description">
	<CheckboxGroup
		options={optionsForGroup}
		buttonsHidden
		bind:selectedOptions
		label="Transport method"
		description="Pick you prefered method of transport - taxis are currently not available"
	/>
	<p class="mt-4 text-color-text-secondary">
		selectedOptions: {JSON.stringify(selectedOptions)}
	</p>
</Story>

<Story name="disabled buttons">
	<CheckboxGroup options={optionsForGroup} bind:selectedOptions buttonsHidden />
	<p class="mt-4 text-color-text-secondary">
		selectedOptions: {JSON.stringify(selectedOptions)}
	</p>
</Story>

<Story name="externally updated">
	<Button on:click={() => (selectedOptions = ['bus', 'train'])}>Select bus and train!</Button>

	<div class="my-4">
		<CheckboxGroup options={optionsForGroup} bind:selectedOptions buttonsHidden />
	</div>
	<p class="mt-4 text-color-text-secondary">
		selectedOptions: {JSON.stringify(selectedOptions)}
	</p>
</Story>

<Story name="Disabled (global)">
	<CheckboxGroup
		options={optionsForGroup}
		bind:selectedOptions
		buttonsHidden
		label="Preferred mode of transport"
		hint="Contextual Hint"
		description="This is a description"
		disabled
	/>
	<p class="mt-4 text-color-text-secondary">
		selectedOptions: {JSON.stringify(selectedOptions)}
	</p>
</Story>

<Story name="With error">
	<CheckboxGroup
		options={optionsForGroup}
		bind:selectedOptions
		buttonsHidden
		label="Preferred mode of transport"
		hint="Contextual Hint"
		description="Deselect all to see an error state!"
		error={!selectedOptions.length ? 'You must select an option' : undefined}
	/>
	<p class="mt-4 text-color-text-secondary">
		selectedOptions: {JSON.stringify(selectedOptions)}
	</p>
</Story>
