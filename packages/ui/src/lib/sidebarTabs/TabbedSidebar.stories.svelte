<script>
	import { Meta, Story, Template } from '@storybook/addon-svelte-csf';

	import { ChartBar, Funnel, Map, MapPin } from '@steeze-ui/heroicons';

	import TabbedSidebarWrapper from './TabbedSidebarWrapper.svelte';

	let selectedValue = 'filters';

	let tabs = [
		{ id: 'markers', label: 'Data Markers', icon: MapPin },
		{ id: 'filters', label: 'Filters', icon: Funnel },
		{ id: 'analysis', label: 'Analysis', icon: ChartBar },
		{ id: 'layers', label: 'Layers', icon: Map }
	];
</script>

<Meta title="Ui/SidebarTabs" component={TabbedSidebarWrapper} />

<Template let:args>
	<TabbedSidebarWrapper {...args} />
</Template>

<Story name="Constructed from list">
	<div class="my-4 text-core-grey-500 dark:text-core-grey-200 space-y-2">
		<p>This example constructs the sidebar from an array of options.</p>
		<p>
			Curently selected: {selectedValue}
		</p>
	</div>

	<TabbedSidebarWrapper {tabs} bind:selectedValue>
		{#if selectedValue === 'markers'}
			<div class="text-white">
				Markers is selected, so we'd render a
				<code> &lt;Marker /&gt;</code>
				component
			</div>
		{:else if selectedValue === 'filters'}
			<div class="text-white">
				Filter is selected, so we'd render a
				<code> &lt;Filters /&gt;</code>
				component
			</div>
		{:else if selectedValue === 'analysis'}
			<div class="text-white">
				Analysis is selected, so we'd render a
				<code> &lt;Analysis /&gt;</code>
				component
			</div>
		{:else if selectedValue === 'layers'}
			<div class="text-white">
				Layers is selected, so we'd render a
				<code> &lt;Layer /&gt;</code>
				component
			</div>
		{/if}
	</TabbedSidebarWrapper>
</Story>
