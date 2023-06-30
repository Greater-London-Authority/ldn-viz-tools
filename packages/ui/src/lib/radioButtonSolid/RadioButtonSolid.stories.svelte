<script lang="ts">
	import { Meta, Story } from '@storybook/addon-svelte-csf';

	import RadioButtonGroupSolid from './RadioButtonGroupSolid.svelte';

	let selectedId: string;

	let optionsForGroup = [
		{ id: 'bus', label: 'Bus stops' },
		{ id: 'train', label: 'Train stations' },
		{ id: 'underground', label: 'Underground stations' },
		{ id: 'taxi', label: 'Taxi ranks', disabled: true }
	];
</script>

<Meta title="Ui/RadioButtonSolid" component={RadioButtonGroupSolid} />

<Story name="RadioGroup">
	<RadioButtonGroupSolid options={optionsForGroup} name="station-type" bind:selectedId />
	<p class="mt-8 text-core-grey-500 dark:text-core-grey-200 italic">Selected id: {selectedId}</p>
</Story>
