<script context="module">
	import MapLayerSource from './MapLayerSource.svelte';

	const loadHandlerArgType = {
		type: 'function',
		control: 'none',
		table: {
			type: {
				summary: 'function',
				detail: '({\n  id: string,\n  spec: SourceSpecification\n}) => void'
			}
		}
	};

	export const meta = {
		title: 'Maps/Components/MapLayerSource',
		component: MapLayerSource,
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
			spec: {
				type: 'object',
				control: 'none',
				table: {
					type: {
						summary: 'SourceSpecification'
					}
				}
			},
			onLoad: loadHandlerArgType,
			onUnload: loadHandlerArgType
		}
	};
</script>

<script lang="ts">
	import { Story, Template } from '@storybook/addon-svelte-csf';

	import Map from '../map/Map.svelte';
	import { appendOSKeyToUrl } from '../map/util';
	import MapLayerView from '../mapLayerView/MapLayerView.svelte';
	import testData from '../testData.json';

	import tokens from '@ldn-viz/themes/styles/js/theme-tokens';

	const theme = (mode: 'light' | 'dark' = 'light') => {
		return tokens.theme[mode];
	};

	const OS_KEY = 'vmRzM4mAA1Ag0hkjGh1fhA2hNLEM6PYP';
	const sourceId = 'gla/ldn-viz-tools/test-data';
</script>

<Template let:args>
	<MapLayerSource {...args} />
</Template>

<Story name="Default">
	<div class="relative w-[100dvw] h-[100dvh]">
		<Map
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
			</MapLayerSource>
		</Map>
	</div>
</Story>
