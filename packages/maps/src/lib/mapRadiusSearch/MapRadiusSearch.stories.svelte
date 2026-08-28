<script module lang="ts">
	import { theme } from '@ldn-viz/ui';
	import { defineMeta } from '@storybook/addon-svelte-csf';
	import loadTestLayers from '../loadTestLayers';
	import { default as Map } from '../map/Map.svelte';
	import { appendOSKeyToUrl } from '../map/util';
	import MapControlGroup from '../mapControlGroup/MapControlGroup.svelte';
	import MapLayerSource from '../mapLayerSource/MapLayerSource.svelte';
	import MapLayerView from '../mapLayerView/MapLayerView.svelte';
	import TestPopup from '../mapMarker/TestPopup.svelte';
	import TestTooltip from '../mapMarker/TestTooltip.svelte';
	import testData from '../testData.json';
	import MapRadiusSearch from './MapRadiusSearch.svelte';

	const OS_KEY = 'vmRzM4mAA1Ag0hkjGh1fhA2hNLEM6PYP';
	const sourceId = 'gla/ldn-viz-tools/test-data';

	const { Story } = defineMeta({
		title: 'Maps/Components/MapRadiusSearch',
		component: MapRadiusSearch,
		tags: ['autodocs']
	});
</script>

<Story name="Default">
	{#snippet template()}
		<div class="h-[100dvh] w-[100dvw]">
			<Map
				whenMapLoads={loadTestLayers}
				options={{
					transformRequest: appendOSKeyToUrl(OS_KEY)
				}}
			>
				<MapControlGroup position="TopLeft">
					<MapRadiusSearch maxRadius={500} onCTA={(point, radius) => console.log(point, radius)} />
				</MapControlGroup>
			</Map>
		</div>
	{/snippet}
</Story>

<Story name="Tooltips">
	{#snippet template()}
		<div class="h-[100dvh] w-[100dvw]">
			<Map
				whenMapLoads={loadTestLayers}
				options={{
					transformRequest: appendOSKeyToUrl(OS_KEY)
				}}
			>
				<MapLayerSource
					id={sourceId}
					spec={{
						type: 'geojson',
						data: testData
					}}
				>
					<MapLayerView
						id={`${sourceId}/polygon`}
						tooltip={TestTooltip}
						popup={TestPopup}
						spec={{
							type: 'fill',
							filter: ['==', '$type', 'Polygon'],
							paint: {
								'fill-color': theme.tokenNameToValue('geo.interactive.selected'),
								'fill-outline-color': theme.tokenNameToValue('geo.interactive.selected'),
								'fill-opacity': 0.6
							}
						}}
					/>
				</MapLayerSource>

				<MapControlGroup position="TopLeft">
					<MapRadiusSearch maxRadius={500} onCTA={(point, radius) => console.log(point, radius)} />
				</MapControlGroup>
			</Map>
		</div>
	{/snippet}
</Story>
