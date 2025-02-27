<script context="module">
	import { SidebarLeftContext, SidebarTopContext } from '@ldn-viz/docs';
	import SidebarTabList from './SidebarTabList.svelte';

	export const meta = {
		title: 'Ui/Components - Layout And Themes/Sidebar/elements/SidebarTabs',
		component: SidebarTabList,
		decorators: [() => SidebarLeftContext],
		subcomponents: { SidebarTabLabel }
	};
</script>

<script lang="ts">
	import { ChartBar, Funnel, Map, MapPin } from '@steeze-ui/heroicons';
	import { Icon } from '@steeze-ui/svelte-icon';
	import { Story, Template } from '@storybook/addon-svelte-csf';
	import SidebarSection from '../sidebarSection/SidebarSection.svelte';
	import SidebarTabLabel from './SidebarTabLabel.svelte';

	let selectedValue = 'markers';
</script>

<Template let:args>
	<SidebarTabList bind:selectedValue {...args}>
		<SidebarTabLabel sidebarSectionId="markers-section" tabId="markers">Markers</SidebarTabLabel>
		<SidebarTabLabel sidebarSectionId="filters-section" tabId="filters">Filters</SidebarTabLabel>
		<SidebarTabLabel sidebarSectionId="analysis-section" tabId="analysis">Analysis</SidebarTabLabel>
		<SidebarTabLabel sidebarSectionId="layers-section" tabId="layers">Layers</SidebarTabLabel>
	</SidebarTabList>
	<div>
		{#if selectedValue === 'markers'}
			<SidebarSection id="markers-section">
				Markers is selected, so we'd render a
				<code> &lt;Marker /&gt;</code>
				component
			</SidebarSection>
		{:else if selectedValue === 'filters'}
			<SidebarSection id="filters-section">
				Filter is selected, so we'd render a
				<code> &lt;Filters /&gt;</code>
				component
			</SidebarSection>
		{:else if selectedValue === 'analysis'}
			<SidebarSection id="analysis-section">
				Analysis is selected, so we'd render a
				<code> &lt;Analysis /&gt;</code>
				component
			</SidebarSection>
		{:else if selectedValue === 'layers'}
			<SidebarSection id="layers-section">
				Layers is selected, so we'd render a
				<code> &lt;Layer /&gt;</code>
				component
			</SidebarSection>
		{/if}
	</div>
</Template>

<Story name="Default (Vertical)">
	<SidebarTabList bind:selectedValue>
		<SidebarTabLabel sidebarSectionId="markers-section" tabId="markers">Markers</SidebarTabLabel>
		<SidebarTabLabel sidebarSectionId="filters-section" tabId="filters">Filters</SidebarTabLabel>
		<SidebarTabLabel sidebarSectionId="analysis-section" tabId="analysis">Analysis</SidebarTabLabel>
		<SidebarTabLabel sidebarSectionId="layers-section" tabId="layers">Layers</SidebarTabLabel>
	</SidebarTabList>
	<div>
		{#if selectedValue === 'markers'}
			<SidebarSection id="markers-section">
				Markers is selected, so we'd render a
				<code> &lt;Marker /&gt;</code>
				component
			</SidebarSection>
		{:else if selectedValue === 'filters'}
			<SidebarSection id="filters-section">
				Filter is selected, so we'd render a
				<code> &lt;Filters /&gt;</code>
				component
			</SidebarSection>
		{:else if selectedValue === 'analysis'}
			<SidebarSection id="analysis-section">
				Analysis is selected, so we'd render a
				<code> &lt;Analysis /&gt;</code>
				component
			</SidebarSection>
		{:else if selectedValue === 'layers'}
			<SidebarSection id="layers-section">
				Layers is selected, so we'd render a
				<code> &lt;Layer /&gt;</code>
				component
			</SidebarSection>
		{/if}
	</div>
</Story>

<Story name="Vertical with Icons">
	<SidebarTabList bind:selectedValue>
		<SidebarTabLabel sidebarSectionId="markers-section" tabId="markers">
			<Icon src={MapPin} theme="mini" class="h-5 w-5 mb-1" aria-hidden="true" />
			Data Markers
		</SidebarTabLabel>
		<SidebarTabLabel sidebarSectionId="filters-section" tabId="filters">
			<Icon src={Funnel} theme="mini" class="h-5 w-5 mb-1" aria-hidden="true" />
			Filters
		</SidebarTabLabel>
		<SidebarTabLabel sidebarSectionId="analysis-section" tabId="analysis">
			<Icon src={ChartBar} theme="mini" class="h-5 w-5 mb-1" aria-hidden="true" />
			Analysis
		</SidebarTabLabel>
		<SidebarTabLabel sidebarSectionId="layers-section" tabId="layers">
			<Icon src={Map} theme="mini" class="h-5 w-5 mb-1" aria-hidden="true" />
			Layers
		</SidebarTabLabel>
	</SidebarTabList>
	<div>
		{#if selectedValue === 'markers'}
			<SidebarSection id="markers-section">
				Markers is selected, so we'd render a
				<code> &lt;Marker /&gt;</code>
				component
			</SidebarSection>
		{:else if selectedValue === 'filters'}
			<SidebarSection id="filters-section">
				Filter is selected, so we'd render a
				<code> &lt;Filters /&gt;</code>
				component
			</SidebarSection>
		{:else if selectedValue === 'analysis'}
			<SidebarSection id="analysis-section">
				Analysis is selected, so we'd render a
				<code> &lt;Analysis /&gt;</code>
				component
			</SidebarSection>
		{:else if selectedValue === 'layers'}
			<SidebarSection id="layers-section">
				Layers is selected, so we'd render a
				<code> &lt;Layer /&gt;</code>
				component
			</SidebarSection>
		{/if}
	</div>
</Story>

<Story name="Horizontal with Icons" decorators={[() => SidebarTopContext]}>
	<SidebarTabList orientation="horizontal" bind:selectedValue>
		<SidebarTabLabel sidebarSectionId="markers-section" tabId="markers">
			<Icon src={MapPin} theme="mini" class="h-5 w-5 mb-1" aria-hidden="true" />
			Data Markers
		</SidebarTabLabel>
		<SidebarTabLabel sidebarSectionId="filters-section" tabId="filters">
			<Icon src={Funnel} theme="mini" class="h-5 w-5 mb-1" aria-hidden="true" />
			Filters
		</SidebarTabLabel>
		<SidebarTabLabel sidebarSectionId="analysis-section" tabId="analysis">
			<Icon src={ChartBar} theme="mini" class="h-5 w-5 mb-1" aria-hidden="true" />
			Analysis
		</SidebarTabLabel>
		<SidebarTabLabel sidebarSectionId="layers-section" tabId="layers">
			<Icon src={Map} theme="mini" class="h-5 w-5 mb-1" aria-hidden="true" />
			Layers
		</SidebarTabLabel>
	</SidebarTabList>
	<div>
		{#if selectedValue === 'markers'}
			<SidebarSection id="markers-section">
				Markers is selected, so we'd render a
				<code> &lt;Marker /&gt;</code>
				component
			</SidebarSection>
		{:else if selectedValue === 'filters'}
			<SidebarSection id="filters-section">
				Filter is selected, so we'd render a
				<code> &lt;Filters /&gt;</code>
				component
			</SidebarSection>
		{:else if selectedValue === 'analysis'}
			<SidebarSection id="analysis-section">
				Analysis is selected, so we'd render a
				<code> &lt;Analysis /&gt;</code>
				component
			</SidebarSection>
		{:else if selectedValue === 'layers'}
			<SidebarSection id="layers-section">
				Layers is selected, so we'd render a
				<code> &lt;Layer /&gt;</code>
				component
			</SidebarSection>
		{/if}
	</div>
</Story>
