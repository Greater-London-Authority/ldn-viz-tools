<script>
	import {
		FilterIcon,
		MapIcon,
		PresentationChartLineIcon
	} from '@rgossiaux/svelte-heroicons/solid';
	import { Meta, Story } from '@storybook/addon-svelte-csf';

	import TabList from './TabList.svelte';
	import TabLabel from './TabLabel.svelte';

	let selectedValue = 'filter';
</script>

<Meta title="Ui/TabList" component={TabList} />

<Story name="Icons above labels">
	<div class="pb-8 dark:text-white">
		Selected value: <b>{selectedValue}</b>
	</div>

	<div class="w-[300px]">
		<TabList bind:selectedValue>
			<TabLabel value="filter">
				<FilterIcon class="w-6 h-6" aria-hidden="true" />
				Filters
			</TabLabel>

			<TabLabel value="analysis">
				<PresentationChartLineIcon class="w-6 h-6" aria-hidden="true" />
				Analysis
			</TabLabel>

			<TabLabel value="layers">
				<MapIcon class="w-6 h-6" aria-hidden="true" />
				Layers
			</TabLabel>
		</TabList>
	</div>
</Story>

<Story name="Icons below labels">
	<div class="pb-8 dark:text-white">
		Selected value: <b>{selectedValue}</b>
	</div>

	<div style="width: 300px">
		<TabList bind:selectedValue>
			<TabLabel value="filter">
				Filters
				<FilterIcon class="w-6 h-6 mt-1" aria-hidden="true" />
			</TabLabel>

			<TabLabel value="analysis">
				Analysis
				<PresentationChartLineIcon class="w-6 h-6 mt-1" aria-hidden="true" />
			</TabLabel>

			<TabLabel value="layers">
				Layers
				<MapIcon class="w-6 h-6 mt-1" aria-hidden="true" />
			</TabLabel>
		</TabList>
	</div>
</Story>
