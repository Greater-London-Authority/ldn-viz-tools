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
			data: {
				type: 'object',
				control: 'none',
				table: {
					type: {
						summary: 'GeoJSON'
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
			geojsonStore: {
				control: 'none',
				table: {
					type: {
						summary: 'Svelte store',
						detail: 'writable<GeoJSON>'
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

	import Map, { appendOSKeyToUrl } from '../../../map/Map.svelte';
	import MapLayerView from '../../../mapLayerView/MapLayerView.svelte';
	import testData from '../../../testData.json';

	import tokens from '@ldn-viz/themes/styles/js/theme-tokens';

	const theme = (mode: 'light' | 'dark' = 'light') => {
		return tokens.theme[mode];
	};

	const OS_KEY = 'vmRzM4mAA1Ag0hkjGh1fhA2hNLEM6PYP';
	const sourceId = 'gla/ldn-viz-tools/test-data';
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
			<GeoJSONMapLayerSource id={sourceId} data={testData}>
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
