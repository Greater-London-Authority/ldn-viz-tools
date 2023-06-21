<script lang="ts">
	import { Meta, Story } from '@storybook/addon-svelte-csf';

	import TabList from "./TabList.svelte";
	import TabLabel from "./TabLabel.svelte";

	let selectedValue = 'aggregates';
</script>

<Meta title="Ui/TabList" component={TabList} />

<Story name="Default">

	<TabList bind:selectedValue>
		<TabLabel tabId="aggregates">Aggregated counts across London</TabLabel>
		<TabLabel tabId="chargers">Details of chargers</TabLabel>
		<TabLabel tabId="averages">Averages of charge events</TabLabel>
		<TabLabel tabId="histograms">Histograms of charge events</TabLabel>
	</TabList>

	<div class="text-black dark:text-white">
			<p>Selected value is: <code>{selectedValue}</code></p>
	</div>

</Story>
