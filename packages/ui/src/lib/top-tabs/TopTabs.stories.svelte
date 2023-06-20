<script lang="ts">
	import { Meta, Story } from '@storybook/addon-svelte-csf';

	import TopTabList from "./TopTabList.svelte";
	import TopTabLabel from "./TopTabLabel.svelte";

	let selectedValue = 'aggregates';
</script>

<Meta title="Ui/TopTabList" component={TopTabList} />

<Story name="Default">

	<TopTabList bind:selectedValue>
		<TopTabLabel tabId="aggregates">Aggregated counts across London</TopTabLabel>
		<TopTabLabel tabId="chargers">Details of chargers</TopTabLabel>
		<TopTabLabel tabId="averages">Averages of charge events</TopTabLabel>
		<TopTabLabel tabId="histograms">Histograms of charge events</TopTabLabel>
	</TopTabList>

	<div class="text-black dark:text-white">
			<p>Selected value is: <code>{selectedValue}</code></p>
	</div>

</Story>
