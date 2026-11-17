<script lang="ts">
	// A map application: the map fills the canvas, the controls that move the map
	// sit on it, and the layer controls sit in the sidebar.
	import {
		appendOSKeyToUrl,
		GeoJSONMapLayerSource,
		Map,
		MapControlGroup,
		MapControlLocationSearch,
		MapControlZoom,
		MapGeocoderAdapterMapBox,
		MapLayerView,
		type MapStore
	} from '@ldn-viz/maps';
	import {
		AppShell,
		Header,
		HeaderTitle,
		LayerControlGroup,
		Sidebar,
		SidebarHeader,
		SidebarSection,
		theme
	} from '@ldn-viz/ui';
	import { get } from 'svelte/store';
	import { workshops, type Workshop } from '../DemoData/designSystemUsage';

	// Public demo keys, as used in the Maps stories.
	const OS_KEY = 'vmRzM4mAA1Ag0hkjGh1fhA2hNLEM6PYP';
	const geocoder = new MapGeocoderAdapterMapBox(
		'pk.eyJ1IjoiZ2xhLWdpcyIsImEiOiJjanBvNGh1bncwOTkzNDNueWt5MGU1ZGtiIn0.XFxLdq2dXttcXSXTiREPTA'
	);

	let mapStore: MapStore | undefined = $state();

	const sourceId = 'example/design-system-sessions';
	const geojson = {
		type: 'FeatureCollection',
		features: workshops.map((w) => ({
			type: 'Feature',
			properties: { name: w.name, type: w.type, team: w.team, attendees: w.attendees },
			geometry: { type: 'Point', coordinates: w.coordinates }
		}))
	};

	// Each session type is a layer. The layer control shows its colour, so it
	// doubles as the legend.
	const layerOptions: { id: Workshop['type']; label: string; hint?: string }[] = [
		{ id: 'workshop', label: 'Workshops' },
		{ id: 'drop-in', label: 'Drop-in sessions' },
		{ id: 'research', label: 'User research', hint: 'Sessions with people outside the teams' }
	];

	// Three layers take the data roles in order: primary, secondary, tertiary.
	let layersState = $state({
		workshop: { colorName: 'data.primary', visible: true, opacity: 1, size: 1 },
		'drop-in': { colorName: 'data.secondary', visible: true, opacity: 1, size: 1 },
		research: { colorName: 'data.tertiary', visible: true, opacity: 1, size: 1 }
	});

	const circleSpec = (type: string, state: (typeof layersState)['workshop']) => ({
		type: 'circle',
		filter: ['==', ['get', 'type'], type],
		paint: {
			'circle-color': theme.tokenNameToValue(state.colorName),
			'circle-opacity': state.opacity,
			'circle-radius': ['*', state.size, ['+', 4, ['/', ['get', 'attendees'], 3]]],
			'circle-stroke-color': theme.tokenNameToValue('geo.annotation'),
			'circle-stroke-width': 1
		}
	});

	const flyTo = (location: { center: [number, number] }) => {
		// mapStore holds the MapLibre map once it has loaded.
		if (mapStore) get(mapStore)?.flyTo({ center: location.center, zoom: 14 });
	};
</script>

<div class="flex h-dvh flex-col">
	<Header>
		<HeaderTitle>Design system sessions</HeaderTitle>
	</Header>

	<!-- The sidebar sits below the map on small screens, where a side panel would
	cover most of it, and beside it from lg. sidebarPush moves the map aside
	instead of covering it. -->
	<AppShell
		heightClass="grow"
		sidebarPush
		sidebarPlacement={{ initial: 'bottom', lg: 'left' }}
		sidebarAlwaysOpen={{ initial: false, lg: true }}
	>
		{#snippet main()}
			<!-- A map application has no canvas padding: the map fills the canvas. -->
			<div class="relative h-full w-full">
				<Map options={{ transformRequest: appendOSKeyToUrl(OS_KEY) }} bind:mapStore>
					<GeoJSONMapLayerSource id={sourceId} initialData={geojson}>
						{#each layerOptions as layer (layer.id)}
							{@const state = layersState[layer.id]}
							{#if state.visible}
								<!-- MapLayerView reads its spec once, so a new key remounts the layer
								when its colour, opacity or size changes. -->
								{#key `${state.colorName}-${state.opacity}-${state.size}-${theme.currentMode}`}
									<MapLayerView id={`${sourceId}/${layer.id}`} spec={circleSpec(layer.id, state)} />
								{/key}
							{/if}
						{/each}
					</GeoJSONMapLayerSource>

					<!-- Controls that move the map go on the map. -->
					<MapControlGroup position="TopLeft">
						<MapControlLocationSearch adapter={geocoder} onLocationFound={flyTo} />
					</MapControlGroup>
					<MapControlGroup position="TopRight">
						<MapControlZoom />
					</MapControlGroup>
				</Map>
			</div>
		{/snippet}

		{#snippet sidebar()}
			<Sidebar>
				{#snippet header()}
					<SidebarHeader title="Design system sessions">
						{#snippet subTitle()}
							<p>Fictional workshops, drop-in sessions and research sessions in central London.</p>
						{/snippet}
					</SidebarHeader>
				{/snippet}

				{#snippet sections()}
					<SidebarSection>
						<LayerControlGroup
							label="Session types"
							description="Circle size shows the number of people who attended."
							options={layerOptions}
							bind:layersState
							disableFillControl
						/>
					</SidebarSection>
				{/snippet}
			</Sidebar>
		{/snippet}
	</AppShell>
</div>
