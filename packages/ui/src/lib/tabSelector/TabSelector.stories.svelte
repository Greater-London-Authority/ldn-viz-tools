<script>
	import {
		FilterIcon,
		MapIcon,
		PresentationChartLineIcon
	} from '@rgossiaux/svelte-heroicons/solid';
	import { Meta, Story } from '@storybook/addon-svelte-csf';

	import TabSelector from './TabSelector.svelte';
	import TabSelectorEntry from './TabSelectorEntry.svelte';

	let selectedValue = 'filter';
</script>

<Meta title="Ui/TabSelector" component={TabSelector} />

<Story name="Icons above labels">
	<div class="pb-8 dark:text-white">
		Selected value: <b>{selectedValue}</b>
	</div>

	<div class="w-[300px]">
		<TabSelector bind:selectedValue>
			<TabSelectorEntry value="filter">
				<FilterIcon class="w-6 h-6" aria-hidden="true" />
				Filters
			</TabSelectorEntry>

			<TabSelectorEntry value="analysis">
				<PresentationChartLineIcon class="w-6 h-6" aria-hidden="true" />
				Analysis
			</TabSelectorEntry>

			<TabSelectorEntry value="layers">
				<MapIcon class="w-6 h-6" aria-hidden="true" />
				Layers
			</TabSelectorEntry>
		</TabSelector>
	</div>
</Story>

<Story name="Icons below labels">
	<div class="pb-8 dark:text-white">
		Selected value: <b>{selectedValue}</b>
	</div>

	<div style="width: 300px">
		<TabSelector bind:selectedValue>
			<TabSelectorEntry value="filter">
				Filters
				<FilterIcon class="w-6 h-6 mt-1" aria-hidden="true" />
			</TabSelectorEntry>

			<TabSelectorEntry value="analysis">
				Analysis
				<PresentationChartLineIcon class="w-6 h-6 mt-1" aria-hidden="true" />
			</TabSelectorEntry>

			<TabSelectorEntry value="layers">
				Layers
				<MapIcon class="w-6 h-6 mt-1" aria-hidden="true" />
			</TabSelectorEntry>
		</TabSelector>
	</div>
</Story>
