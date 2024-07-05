<script context="module" lang="ts">
	import Button from '../button/Button.svelte';
	import CheckboxGroup from './CheckboxGroup.svelte';

	export const meta = {
		title: 'Ui/CheckboxGroup',
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
	<p class="mt-8 text-core-grey-500 dark:text-core-grey-200 italic">
		selectedOptions: {JSON.stringify(selectedOptions)}
	</p>
</Template>

<Story name="Default" source />

<Story name="Checkbox Group - disabled buttons">
	<CheckboxGroup options={optionsForGroup} bind:selectedOptions buttonsHidden />
	<p class="mt-8 text-core-grey-500 dark:text-core-grey-200 italic">
		selectedOptions: {JSON.stringify(selectedOptions)}
	</p>
</Story>

<Story name="Checkbox Group - externally updated">
	<Button on:click={() => (selectedOptions = ['bus', 'train'])}>Select bus and train!</Button>

	<CheckboxGroup options={optionsForGroup} bind:selectedOptions buttonsHidden />
	<p class="mt-8 text-core-grey-500 dark:text-core-grey-200 italic">
		selectedOptions: {JSON.stringify(selectedOptions)}
	</p>
</Story>
