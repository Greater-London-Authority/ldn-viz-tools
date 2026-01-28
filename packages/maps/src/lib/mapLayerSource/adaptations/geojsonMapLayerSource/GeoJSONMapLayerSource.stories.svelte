<script module lang="ts">
	import { defineMeta } from '@storybook/addon-svelte-csf';
	import GeoJSONMapLayerSource from './GeoJSONMapLayerSource.svelte';

	const { Story } = defineMeta({
		title: 'Maps/Components/MapLayerSource/adaptations/GeoJSONMapLayerSource',
		component: GeoJSONMapLayerSource,
		tags: ['autodocs'],
		render: defaultTemplate,

		parameters: {
			layout: 'full'
		},
		argTypes: {
			id: {
				type: 'string',
				control: 'none',
				table: {
					type: {
						summary: 'string'
					}
				}
			},
			url: {
				type: 'string',
				control: 'none',
				table: {
					type: {
						summary: 'URL'
					}
				}
			},
			initialData: {
				type: 'object',
				control: 'none',
				table: {
					type: {
						summary: 'GeoJSON'
					}
				}
			},
			dataStore: {
				control: 'none',
				table: {
					type: {
						summary: 'Writable Svelte store',
						detail: 'writable<GeoJSON>'
					}
				}
			},
			transform: {
				type: 'function',
				control: 'none',
				table: {
					type: {
						summary: 'function',
						detail: '(geojson: GeoJSON) => GeoJSON'
					}
				}
			},
			onLoad: {
				type: 'function',
				control: 'none',
				table: {
					type: {
						summary: 'function',
						detail:
							'({\n  id: string,\n  spec: SourceSpecification,\n  geojson: GeoJSON\n}) => void'
					}
				}
			},
			onUnload: {
				type: 'function',
				control: 'none',
				table: {
					type: {
						summary: 'function',
						detail: '({\n  id: string,\n  spec: SourceSpecification\n}) => void'
					}
				}
			},
			onError: {
				type: 'function',
				control: 'none',
				table: {
					type: {
						summary: 'function',
						detail: '(error: any, {\n  id: string,\n  spec: SourceSpecification\n}) => void'
					}
				}
			}
		}
	});
</script>

<script lang="ts">
	import { Button, theme } from '@ldn-viz/ui';

	import { writable } from 'svelte/store';
	import Map from '../../../map/Map.svelte';
	import { appendOSKeyToUrl } from '../../../map/util';
	import MapLayerView from '../../../mapLayerView/MapLayerView.svelte';
	import testData from '../../../testData.json';

	const OS_KEY = 'vmRzM4mAA1Ag0hkjGh1fhA2hNLEM6PYP';
	const sourceId = 'gla/ldn-viz-tools/test-data';

	let dataStore = writable(undefined);

	const getTestGeoJSONByGeometryType = (type) => {
		const newData = structuredClone(testData);

		newData.features = newData.features.filter((f) => {
			return f.geometry.type === type;
		});

		return newData;
	};

	const geojsonPoints = getTestGeoJSONByGeometryType('Point');
	const geojsonLineStrings = getTestGeoJSONByGeometryType('LineString');
	const geojsonPolygons = getTestGeoJSONByGeometryType('Polygon');

	let initialData = geojsonPoints;
</script>

{#snippet defaultTemplate({ args })}
	<GeoJSONMapLayerSource {...args} />
{/snippet}

<Story name="Default">
	{#snippet template()}
		<div class="relative h-[100dvh] w-[100dvw]">
			<Map
				options={{
					transformRequest: appendOSKeyToUrl(OS_KEY)
				}}
			>
				<GeoJSONMapLayerSource id={sourceId} initialData={testData}>
					<MapLayerView
						id={`${sourceId}/polygon`}
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
					<MapLayerView
						id={`${sourceId}/line`}
						spec={{
							type: 'line',
							filter: ['==', '$type', 'LineString'],
							paint: {
								'line-color': theme.tokenNameToValue('geo.feature'),
								'line-width': 4,
								'line-opacity': 0.8
							},
							layout: {
								'line-join': 'round',
								'line-cap': 'round'
							}
						}}
					/>
					<MapLayerView
						id={`${sourceId}/point`}
						spec={{
							type: 'circle',
							filter: ['==', '$type', 'Point'],
							paint: {
								'circle-color': theme.tokenNameToValue('data.primary'),
								'circle-radius': 6,
								'circle-stroke-width': 1,
								'circle-stroke-color': '#000'
							}
						}}
					/>
				</GeoJSONMapLayerSource>
			</Map>
		</div>
	{/snippet}
</Story>

<Story name="Updating data by externally updating store">
	{#snippet template()}
		<div class="pointer-events-auto relative h-[100dvh] w-[100dvw]">
			<div class="pointer-events-auto absolute left-4 top-4 z-40 flex gap-2">
				<Button onclick={() => (initialData = geojsonPoints)}>Points</Button>
				<Button
					onclick={() => {
						console.log('LINES!');
						initialData = geojsonLineStrings;
					}}>Lines</Button
				>
				<Button onclick={() => (initialData = geojsonPolygons)}>Polygons</Button>
			</div>
			<Map
				options={{
					transformRequest: appendOSKeyToUrl(OS_KEY)
				}}
			>
				<GeoJSONMapLayerSource id={sourceId} {initialData} bind:dataStore>
					<MapLayerView
						id={`${sourceId}/polygon`}
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
					<MapLayerView
						id={`${sourceId}/line`}
						spec={{
							type: 'line',
							filter: ['==', '$type', 'LineString'],
							paint: {
								'line-color': theme.tokenNameToValue('geo.feature'),
								'line-width': 4,
								'line-opacity': 0.8
							},
							layout: {
								'line-join': 'round',
								'line-cap': 'round'
							}
						}}
					/>
					<MapLayerView
						id={`${sourceId}/point`}
						spec={{
							type: 'circle',
							filter: ['==', '$type', 'Point'],
							paint: {
								'circle-color': theme.tokenNameToValue('data.primary'),
								'circle-radius': 6,
								'circle-stroke-width': 1,
								'circle-stroke-color': '#000'
							}
						}}
					/>
				</GeoJSONMapLayerSource>
			</Map>
		</div>
	{/snippet}
</Story>
