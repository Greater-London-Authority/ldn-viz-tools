<script context="module">
	import GeoJSONMapLayerSource from './GeoJSONMapLayerSource.svelte';

	export const meta = {
		title: 'Maps/MapLayerSource/adaptations/GeoJSONMapLayerSource',
		component: GeoJSONMapLayerSource,
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
	};
</script>

<script lang="ts">
	import { Story, Template } from '@storybook/addon-svelte-csf';

	import colors from '@ldn-viz/themes/colors.json';
	import { Button } from '@ldn-viz/ui';

	import Map from '../../../map/Map.svelte';
	import { appendOSKeyToUrl } from '../../../map/util';
	import MapLayerView from '../../../mapLayerView/MapLayerView.svelte';
	import testData from '../../../testData.json';

	import tokens from '@ldn-viz/themes/styles/js/theme-tokens';

	const theme = (mode: 'light' | 'dark' = 'light') => {
		return tokens.theme[mode];
	};

	const OS_KEY = 'vmRzM4mAA1Ag0hkjGh1fhA2hNLEM6PYP';
	const sourceId = 'gla/ldn-viz-tools/test-data';

	let dataStore;

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
</script>

<Template let:args>
	<GeoJSONMapLayerSource {...args} />
</Template>

<Story name="Default">
	<div class="relative w-[100dvw] h-[100dvh]">
		<Map
			options={{
				transformRequest: appendOSKeyToUrl(OS_KEY)
			}}
		>
			<GeoJSONMapLayerSource id={sourceId} initialData={testData}>
				<MapLayerView
					id="{sourceId}/polygon"
					spec={{
						type: 'fill',
						filter: ['==', '$type', 'Polygon'],
						paint: {
							'fill-color': colors.core.green['500'],
							'fill-outline-color': colors.core.green['800'],
							'fill-opacity': 0.6
						}
					}}
				/>
				<MapLayerView
					id="{sourceId}/line"
					spec={{
						type: 'line',
						filter: ['==', '$type', 'LineString'],
						paint: {
							'line-color': colors.core.darkPink['400'],
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
					id="{sourceId}/point"
					spec={{
						type: 'circle',
						filter: ['==', '$type', 'Point'],
						paint: {
							'circle-color': colors.core.blue['700'],
							'circle-radius': 6,
							'circle-stroke-width': 1,
							'circle-stroke-color': '#000'
						}
					}}
				/>
			</GeoJSONMapLayerSource>
		</Map>
	</div>
</Story>

<Story name="Updating via dataStore">
	<div class="relative w-[100dvw] h-[100dvh]">
		<div class="absolute top-4 left-4 z-40 flex gap-2">
			<Button on:click={() => dataStore.set(geojsonPoints)}>Points</Button>
			<Button on:click={() => dataStore.set(geojsonLineStrings)}>Lines</Button>
			<Button on:click={() => dataStore.set(geojsonPolygons)}>Polygons</Button>
		</div>
		<Map
			options={{
				transformRequest: appendOSKeyToUrl(OS_KEY)
			}}
		>
			<GeoJSONMapLayerSource id={sourceId} initialData={geojsonPoints} bind:dataStore>
				<MapLayerView
					id="{sourceId}/polygon"
					spec={{
						type: 'fill',
						filter: ['==', '$type', 'Polygon'],
						paint: {
							'fill-color': theme().color.palette.green['500'],
							'fill-outline-color': theme().color.palette.green['800'],
							'fill-opacity': 0.6
						}
					}}
				/>
				<MapLayerView
					id="{sourceId}/line"
					spec={{
						type: 'line',
						filter: ['==', '$type', 'LineString'],
						paint: {
							'line-color': theme().color.palette.darkpink['400'],
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
					id="{sourceId}/point"
					spec={{
						type: 'circle',
						filter: ['==', '$type', 'Point'],
						paint: {
							'circle-color': theme().color.palette.blue['700'],
							'circle-radius': 6,
							'circle-stroke-width': 1,
							'circle-stroke-color': '#000'
						}
					}}
				/>
			</GeoJSONMapLayerSource>
		</Map>
	</div>
</Story>
