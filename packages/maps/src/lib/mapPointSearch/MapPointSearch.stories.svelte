<script module lang="ts">
	import { theme } from '@ldn-viz/ui';
	import { defineMeta } from '@storybook/addon-svelte-csf';
	import { default as Map } from '../map/Map.svelte';
	import { appendOSKeyToUrl } from '../map/util';
	import MapControlGroup from '../mapControlGroup/MapControlGroup.svelte';
	import MapDeckOverlay from '../mapDeckOverlay/MapDeckOverlay.svelte';
	import MapLayerSource from '../mapLayerSource/MapLayerSource.svelte';
	import MapLayerView from '../mapLayerView/MapLayerView.svelte';
	import TestPopup from '../mapMarker/TestPopup.svelte';
	import TestTooltip from '../mapMarker/TestTooltip.svelte';
	import testData from '../testData.json';
	import MapPointSearch from './MapPointSearch.svelte';

	const OS_KEY = 'vmRzM4mAA1Ag0hkjGh1fhA2hNLEM6PYP';
	const sourceId = 'gla/ldn-viz-tools/test-data';

	/**
	 * The `MapPointSearch` component allows you to add a point/radius search as a `MapControl` within a `Map` component.
	 * By default, it exposes a `searchActive` prop to allow you to disable tooltips/popovers when the search is active.
	 * It also has a `maxRadius` which defaults to 500 metres if not set.
	 */
	const { Story } = defineMeta({
		title: 'Maps/Components/MapPointSearch',
		component: MapPointSearch,
		tags: ['autodocs']
	});

	let layer: any = $state();
	let searchActive = $state(false);
</script>

{#snippet testLayers(searchActive: boolean)}
	<MapLayerSource
		id={sourceId}
		spec={{
			type: 'geojson',
			data: testData
		}}
	>
		<MapLayerView
			id={`${sourceId}/polygon`}
			tooltip={!searchActive ? TestTooltip : undefined}
			popup={!searchActive ? TestPopup : undefined}
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
{/snippet}

{#snippet overlay()}
	<MapDeckOverlay layers={[layer]} />
{/snippet}

<Story name="Default">
	{#snippet template()}
		<div class="h-[100dvh] w-[100dvw]">
			<Map
				options={{
					transformRequest: appendOSKeyToUrl(OS_KEY)
				}}
			>
				{@render overlay()}

				{@render testLayers(searchActive)}

				<MapControlGroup position="TopLeft">
					<MapPointSearch
						bind:layer
						bind:searchActive
						onCTA={(point, radius) => console.log(point, radius)}
					/>
				</MapControlGroup>
			</Map>
		</div>
	{/snippet}
</Story>

<!-- Set `searchType` to `point` to disable radius search. -->
<Story name="Point only">
	{#snippet template()}
		<div class="h-[100dvh] w-[100dvw]">
			<Map
				options={{
					transformRequest: appendOSKeyToUrl(OS_KEY)
				}}
			>
				{@render overlay()}

				{@render testLayers(searchActive)}

				<MapControlGroup position="TopLeft">
					<MapPointSearch
						bind:layer
						searchType="point"
						onCTA={(point, radius) => console.log(point, radius)}
					/>
				</MapControlGroup>
			</Map>
		</div>
	{/snippet}
</Story>

<!-- Set `searchType` to `radius` to disable point search. By default, if no radius is set, when the radius is drawn it will render a circle at the maxRadius. Set a radius to override this. -->
<Story name="Radius only">
	{#snippet template()}
		<div class="h-[100dvh] w-[100dvw]">
			<Map
				options={{
					transformRequest: appendOSKeyToUrl(OS_KEY)
				}}
			>
				{@render overlay()}

				{@render testLayers(searchActive)}

				<MapControlGroup position="TopLeft">
					<MapPointSearch
						bind:layer
						searchType="radius"
						onCTA={(point, radius) => console.log(point, radius)}
					/>
				</MapControlGroup>
			</Map>
		</div>
	{/snippet}
</Story>

<Story name="Fixed radius - no custom radius set">
	{#snippet template()}
		<div class="h-[100dvh] w-[100dvw]">
			<Map
				options={{
					transformRequest: appendOSKeyToUrl(OS_KEY)
				}}
			>
				{@render overlay()}

				{@render testLayers(searchActive)}

				<MapControlGroup position="TopLeft">
					<MapPointSearch
						bind:layer
						searchType="radius"
						fixRadius={true}
						onCTA={(point, radius) => console.log(point, radius)}
					/>
				</MapControlGroup>
			</Map>
		</div>
	{/snippet}
</Story>

<Story name="Fixed radius - custom radius set">
	{#snippet template()}
		<div class="h-[100dvh] w-[100dvw]">
			<Map
				options={{
					transformRequest: appendOSKeyToUrl(OS_KEY)
				}}
			>
				{@render overlay()}

				{@render testLayers(searchActive)}

				<MapControlGroup position="TopLeft">
					<MapPointSearch
						bind:layer
						searchType="radius"
						radius={200}
						fixRadius={true}
						onCTA={(point, radius) => console.log(point, radius)}
					/>
				</MapControlGroup>
			</Map>
		</div>
	{/snippet}
</Story>
