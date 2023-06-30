<script lang="ts">
	import {
		FilterIcon,
		MapIcon,
		PresentationChartLineIcon
	} from '@rgossiaux/svelte-heroicons/solid';
	import { Meta, Story } from '@storybook/addon-svelte-csf';

	import RadioButtonGroupSolid from './RadioButtonGroupSolid.svelte';
	import RadioButtonSolid from './RadioButtonSolid.svelte';

	let selectedId = 'bus';

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

<Story name="RadioGroup with Icons above">
	<RadioButtonGroupSolid name="station-type" bind:selectedId>
		<RadioButtonSolid id="bus" name="station-type-bus">
			<FilterIcon class="w-6 h-6 mb-1" aria-hidden="true" />
			Bus
		</RadioButtonSolid>
		<RadioButtonSolid id="train" name="station-type-train">
			<MapIcon class="w-6 h-6 mb-1" aria-hidden="true" />
			Train
		</RadioButtonSolid>
		<RadioButtonSolid id="plane" name="station-type-plane">
			<PresentationChartLineIcon class="w-6 h-6 mb-1" aria-hidden="true" />
			Plane
		</RadioButtonSolid>
	</RadioButtonGroupSolid>
	<p class="mt-8 text-core-grey-500 dark:text-core-grey-200 italic">Selected id: {selectedId}</p>
</Story>

<Story name="RadioGroup with Icons below">
	<RadioButtonGroupSolid name="station-type" bind:selectedId>
		<RadioButtonSolid id="bus" name="station-type-bus">
			Bus
			<FilterIcon class="w-6 h-6 mt-1" aria-hidden="true" />
		</RadioButtonSolid>
		<RadioButtonSolid id="train" name="station-type-train">
			Train
			<MapIcon class="w-6 h-6 mt-1" aria-hidden="true" />
		</RadioButtonSolid>
		<RadioButtonSolid id="plane" name="station-type-plane">
			Plane
			<PresentationChartLineIcon class="w-6 h-6 mt-1" aria-hidden="true" />
		</RadioButtonSolid>
	</RadioButtonGroupSolid>
	<p class="mt-8 text-core-grey-500 dark:text-core-grey-200 italic">Selected id: {selectedId}</p>
</Story>
