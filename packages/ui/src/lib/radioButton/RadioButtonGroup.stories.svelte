<script lang="ts">
	import { Meta, Story, Template } from '@storybook/addon-svelte-csf';
	import RadioButtonGroup from './RadioButtonGroup.svelte';

	let selectedId: string;

	let optionsForGroup = [
		{ id: 'bus', label: 'Bus stops', color: '#00AEEF' },
		{ id: 'train', label: 'Train stations', color: '#008D48' },
		{ id: 'underground', label: 'Underground stations', color: '#9E0059' },
		{ id: 'taxi', label: 'Taxi ranks', color: 'firebrick', disabled: true }
	];
</script>

<Meta title="Ui/RadioButtonGroup" component={RadioButtonGroup} />

<Template let:args>
	<RadioButtonGroup options={optionsForGroup} name="station-type" bind:selectedId {...args} />
	<p class="mt-8 text-core-grey-500 dark:text-core-grey-200 italic">Selected id: {selectedId}</p>
</Template>

<Story name="Default" source />

<Story name="RadioGroup">
	<RadioButtonGroup options={optionsForGroup} name="station-type" bind:selectedId />
	<p class="mt-8 text-core-grey-500 dark:text-core-grey-200 italic">Selected id: {selectedId}</p>
</Story>

<Story name="RadioGroup - no clear button">
	<RadioButtonGroup options={optionsForGroup} name="station-type" bind:selectedId buttonsHidden />
	<p class="mt-8 text-core-grey-500 dark:text-core-grey-200 italic">Selected id: {selectedId}</p>
</Story>
