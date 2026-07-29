<script module lang="ts">
	import { defineMeta } from '@storybook/addon-svelte-csf';

	import MapControlBorough from './MapControlBorough.svelte';

	/**
	 * The `MapControlBorough` component lets the user select a borough, and zooms the map to the selected borough.
	 */
	const { Story } = defineMeta({
		title: 'Maps/Components/MapControls/MapControlBorough',
		component: MapControlBorough,
		render: defaultTemplate,
		tags: ['autodocs'],

		parameters: {
			layout: 'fullscreen'
		}
	});
</script>

<script lang="ts">
	import Map from '../map/Map.svelte';
	import type { MapLibreStore } from '../map/types';
	import { appendOSKeyToUrl } from '../map/util';

	import { writable } from 'svelte/store';
	import BoroughsContextLayer from '../mapContextLayers/boroughsContextLayer/BoroughsContextLayer.svelte';
	import MapControlGroup from '../mapControlGroup/MapControlGroup.svelte';

	const transformRequest = appendOSKeyToUrl('vmRzM4mAA1Ag0hkjGh1fhA2hNLEM6PYP');

	let mapStore: MapLibreStore = $state(writable());
	let mapStorePreselected: MapLibreStore = $state(writable());
	let mapStoreGreaterLondon: MapLibreStore = $state(writable());

	let preselectedBorough = $state('London Borough of Hackney');
	let greaterLondon = $state('GREATER LONDON');
</script>

{#snippet defaultTemplate({ args })}
	<MapControlBorough {...args} />
{/snippet}

<!--
 When the map loads, the control's effect runs `map.fitBounds(...)` so the map opens already zoomed to the preselected borough.
 Subsequent changes cause a zoom to the newly selected borough.
-->
<Story name="Zooming to borough">
	{#snippet template()}
		<div class="h-[100dvh] w-[100dvw]">
			<Map
				options={{
					transformRequest
				}}
				bind:mapStore={mapStorePreselected}
			>
				<MapControlGroup position="TopLeft">
					<MapControlBorough map={$mapStorePreselected} bind:selectedBorough={preselectedBorough} />
				</MapControlGroup>

				<BoroughsContextLayer />
			</Map>
		</div>
	{/snippet}
</Story>

<!--
Selecting the special `'GREATER LONDON'` option (labelled "Show all of Greater
London") zooms the map to `GREATER_LONDON_BOUNDS` rather than an individual
borough. Here it is preselected so the map opens showing all of Greater London.
-->
<Story name="Show all of Greater London">
	{#snippet template()}
		<div class="h-[100dvh] w-[100dvw]">
			<Map
				options={{
					transformRequest
				}}
				bind:mapStore={mapStoreGreaterLondon}
			>
				<MapControlGroup position="TopLeft">
					<MapControlBorough map={$mapStoreGreaterLondon} bind:selectedBorough={greaterLondon} />
				</MapControlGroup>

				<BoroughsContextLayer />
			</Map>
		</div>
	{/snippet}
</Story>
