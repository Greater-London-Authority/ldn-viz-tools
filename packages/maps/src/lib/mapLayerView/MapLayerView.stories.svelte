<script module lang="ts">
	import { defineMeta } from '@storybook/addon-svelte-csf';
	import MapLayerView from './MapLayerView.svelte';

	const loadHandlerArgType = {
		type: 'function',
		control: undefined,
		table: {
			type: {
				summary: 'function',
				detail: '({\n  id: string,\n  spec: LayerSpecification\n}) => void'
			}
		}
	};

	const componentType = {
		control: undefined,
		table: {
			type: {
				summary: 'Svelte component'
			}
		}
	};

	const { Story } = defineMeta({
		title: 'Maps/Components/MapLayerView',
		component: MapLayerView,
		tags: ['autodocs'],
		parameters: {
			layout: 'full'
		},
		argTypes: {
			id: {
				type: 'string',
				control: undefined,
				table: {
					type: {
						summary: 'string'
					}
				}
			},
			beforeId: {
				type: 'string',
				control: undefined,
				table: {
					type: {
						summary: 'string'
					}
				}
			},
			spec: {
				control: undefined,
				table: {
					type: {
						summary: 'LayerSpecification'
					}
				}
			},
			tooltip: componentType,
			popup: componentType,
			onLoad: loadHandlerArgType,
			onUnload: loadHandlerArgType
		}
	});
</script>

<script lang="ts">
	import { Select } from '@ldn-viz/ui';

	import Map from '../map/Map.svelte';
	import { appendOSKeyToUrl } from '../map/util';
	import MapLayerSource from '../mapLayerSource/MapLayerSource.svelte';
	import testData from '../testData.json';

	import tokens from '@ldn-viz/themes/styles/js/mode-tokens';

	const theme = (mode: 'light' | 'dark' = 'light') => {
		return tokens.theme[mode];
	};

	const OS_KEY = 'vmRzM4mAA1Ag0hkjGh1fhA2hNLEM6PYP';
	const sourceId = 'gla/ldn-viz-tools/test-data';

	const colorOptions = [
		{ label: 'Red', value: 'red' },
		{ label: 'Blue', value: 'blue' }
	];
	let selectedColor = $state('red');
</script>

<Story name="Default">
	{#snippet template()}
		<div class="relative h-[100dvh] w-[100dvw]">
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
						id={`${sourceId}/polygon`}
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
						id={`${sourceId}/line`}
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
						id={`${sourceId}/point`}
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
	{/snippet}
</Story>

<!--
This demonstrates updating the styling of a layer.
Note that the MapViewLayer does not update when the `spec` prop changes,
so it is necessary to use a `#key` block to force the component to be recreated.
-->
<Story name="Updating">
	{#snippet template()}
		<div class="w-96">
			<Select label="Point color" options={colorOptions} bind:value={selectedColor} />
		</div>

		<div class="relative h-[100dvh] w-[100dvw]">
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
					{#key selectedColor}
						<MapLayerView
							id={`${sourceId}/point`}
							spec={{
								type: 'circle',
								filter: ['==', '$type', 'Point'],
								paint: {
									'circle-color':
										selectedColor === 'red'
											? theme().color.palette.red['700']
											: theme().color.palette.blue['700'],
									'circle-radius': 6,
									'circle-stroke-width': 1,
									'circle-stroke-color': '#000'
								}
							}}
						/>
					{/key}
				</MapLayerSource>
			</Map>
		</div>
	{/snippet}
</Story>
