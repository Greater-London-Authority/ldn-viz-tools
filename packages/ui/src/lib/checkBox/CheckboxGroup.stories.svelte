<script context="module" lang="ts">
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
