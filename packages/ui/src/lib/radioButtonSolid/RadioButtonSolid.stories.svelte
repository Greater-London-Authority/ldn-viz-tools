<script>
	import {
		FilterIcon,
		MapIcon,
		PresentationChartLineIcon
	} from '@rgossiaux/svelte-heroicons/solid';
	import { Meta, Story } from '@storybook/addon-svelte-csf';

	import RadioButtonGroupSolid from './RadioButtonGroupSolid.svelte';
	import RadioButtonSolid from './RadioButtonSolid.svelte';

	let selectedValue = 'filter';
</script>

<Meta title="Ui/RadioButtonSolid" component={RadioButtonGroupSolid} />

<Story name="No icons">
	<div class="pb-8 dark:text-white">
		Selected value: <b>{selectedValue}</b>
	</div>

	<div class="w-[300px]">
		<RadioButtonGroupSolid bind:selectedValue>
			<RadioButtonSolid value="filter" style="radio">
				Filters
			</RadioButtonSolid>

			<RadioButtonSolid value="analysis" style="radio">
				Analysis
			</RadioButtonSolid>

			<RadioButtonSolid value="layers" style="radio">
				Layers
			</RadioButtonSolid>
		</RadioButtonGroupSolid>
	</div>
</Story>

<Story name="No icons - tab style">
	<div class="pb-8 dark:text-white">
		Selected value: <b>{selectedValue}</b>
	</div>

	<div class="w-[300px]">
		<RadioButtonGroupSolid bind:selectedValue>
			<RadioButtonSolid value="filter">
				Filters
			</RadioButtonSolid>

			<RadioButtonSolid value="analysis">
				Analysis
			</RadioButtonSolid>

			<RadioButtonSolid value="layers">
				Layers
			</RadioButtonSolid>
		</RadioButtonGroupSolid>
	</div>
</Story>

<Story name="Icons above labels">
	<div class="pb-8 dark:text-white">
		Selected value: <b>{selectedValue}</b>
	</div>

	<div class="w-[300px]">
		<RadioButtonGroupSolid bind:selectedValue>
			<RadioButtonSolid value="filter">
				<FilterIcon class="w-6 h-6" aria-hidden="true" />
				Filters
			</RadioButtonSolid>

			<RadioButtonSolid value="analysis">
				<PresentationChartLineIcon class="w-6 h-6" aria-hidden="true" />
				Analysis
			</RadioButtonSolid>

			<RadioButtonSolid value="layers">
				<MapIcon class="w-6 h-6" aria-hidden="true" />
				Layers
			</RadioButtonSolid>
		</RadioButtonGroupSolid>
	</div>
</Story>

<Story name="Icons below labels">
	<div class="pb-8 dark:text-white">
		Selected value: <b>{selectedValue}</b>
	</div>

	<div style="width: 300px">
		<RadioButtonGroupSolid bind:selectedValue>
			<RadioButtonSolid value="filter">
				Filters
				<FilterIcon class="w-6 h-6 mt-1" aria-hidden="true" />
			</RadioButtonSolid>

			<RadioButtonSolid value="analysis">
				Analysis
				<PresentationChartLineIcon class="w-6 h-6 mt-1" aria-hidden="true" />
			</RadioButtonSolid>

			<RadioButtonSolid value="layers">
				Layers
				<MapIcon class="w-6 h-6 mt-1" aria-hidden="true" />
			</RadioButtonSolid>
		</RadioButtonGroupSolid>
	</div>
</Story>
