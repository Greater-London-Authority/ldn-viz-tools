<script>
	import TabbedSidebar from './TabbedSidebar.svelte';

	import {
		ChartBarIcon,
		FilterIcon,
		LocationMarkerIcon,
		MapIcon
	} from '@rgossiaux/svelte-heroicons/solid';

	const tabs = [
		{ id: 'markers', label: 'Data Markers', icon: LocationMarkerIcon },
		{ id: 'filters', label: 'Filters', icon: FilterIcon },
		{ id: 'analysis', label: 'Analysis', icon: ChartBarIcon },
		{ id: 'layers', label: 'Layers', icon: MapIcon }
	];
</script>

<TabbedSidebar initialTabId="markers" {tabs}>
	<div data-tab-id="markers" class="text-white">
		Markers is selected, so we'd render a
		<code> &lt;Marker /&gt;</code>
		component
	</div>
	<div data-tab-id="filters" class="text-white">
		Filter is selected, so we'd render a
		<code> &lt;Filters /&gt;</code>
		component
	</div>
	<div data-tab-id="analysis" class="text-white">
		Analysis is selected, so we'd render a
		<code> &lt;Analysis /&gt;</code>
		component
	</div>
	<div data-tab-id="layers" class="text-white">
		Layers is selected, so we'd render a
		<code> &lt;Layer /&gt;</code>
		component
	</div>
</TabbedSidebar>
