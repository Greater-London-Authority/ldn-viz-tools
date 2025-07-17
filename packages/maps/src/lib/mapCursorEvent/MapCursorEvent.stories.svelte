<script context="module">
	import { defineMeta } from '@storybook/addon-svelte-csf';
	import MapCursorEvent from './MapCursorEvent.svelte';

	const handlerArgType = {
		type: 'function',
		control: 'none',
		table: {
			type: {
				summary: 'function',
				detail:
					'function(event: MouseEvent | TouchEvent, {\n  feature: GeoJSON.Feature,\n  features: GeoJSON.Feature[],\n  isTouchEvent: boolean\n}) => void'
			}
		}
	};

	const clickMapHandlerArgType = {
		type: 'function',
		control: 'none',
		table: {
			type: {
				summary: 'function',
				detail:
					'function(event: MouseEvent | TouchEvent, {\n  feature: null,\n  features: GeoJSON.Feature[],\n  isTouchEvent: boolean\n}) => void'
			}
		}
	};

	const { Story } = defineMeta({
		title: 'Maps/Components/MapCursorEvent',
		component: MapCursorEvent,
		tags: ['autodocs'],
		render: defaultTemplate,

		parameters: {
			layout: 'full'
		},
		argTypes: {
			layerId: {
				type: 'string',
				control: 'text',
				table: {
					type: {
						summary: 'string'
					}
				}
			},
			leaveFeature: handlerArgType,
			leaveTopFeature: handlerArgType,
			enterFeature: handlerArgType,
			enterTopFeature: handlerArgType,
			clickMap: clickMapHandlerArgType,
			clickFeature: handlerArgType
		}
	});
</script>

<script>
	import loadTestLayers from '../loadTestLayers';
	import Map from '../map/Map.svelte';
	import { appendOSKeyToUrl } from '../map/util';

	const OS_KEY = 'vmRzM4mAA1Ag0hkjGh1fhA2hNLEM6PYP';

	let init = false;

	const whenMapLoads = (map) => {
		loadTestLayers(map);
		init = true;
		map.getCanvas().style.cursor = 'pointer';
	};

	let eventLog = [];
	const logEvent = (eventName, layerName, siteName = '') => {
		if (eventLog.length >= 8) {
			eventLog.splice(0, 1);
		}
		eventLog.push({
			eventName,
			layerName,
			siteName
		});
		eventLog = eventLog;
	};

	const newLogEvent = (eventName) => {
		return (event, { feature }) => {
			logEvent(eventName, feature.layer.id, feature.properties.site_name);
		};
	};
</script>

{#snippet defaultTemplate({ args })}
	<MapCursorEvent {...args} />
{/snippet}

<Story name="Default">
	{#snippet template()}
		<div class="relative h-[100dvh] w-[100dvw]">
			<Map
				{whenMapLoads}
				options={{
					transformRequest: appendOSKeyToUrl(OS_KEY)
				}}
			>
				{#if init}
					<MapCursorEvent
						layerId="gla/ldn-viz-tools/test-data/polygon"
						enterFeature={newLogEvent('enterFeature')}
						leaveFeature={newLogEvent('leaveFeature')}
						enterTopFeature={newLogEvent('enterTopFeature')}
						leaveTopFeature={newLogEvent('leaveTopFeature')}
						clickFeature={newLogEvent('clickFeature')}
						clickMap={() => logEvent('clickMap', 'gla/ldn-viz-tools/test-data/polygon')}
					/>
					<MapCursorEvent
						layerId="gla/ldn-viz-tools/test-data/line"
						enterFeature={newLogEvent('enterFeature')}
						leaveFeature={newLogEvent('leaveFeature')}
						enterTopFeature={newLogEvent('enterTopFeature')}
						leaveTopFeature={newLogEvent('leaveTopFeature')}
						clickFeature={newLogEvent('clickFeature')}
						clickMap={() => logEvent('clickMap', 'gla/ldn-viz-tools/test-data/line')}
					/>
					<MapCursorEvent
						layerId="gla/ldn-viz-tools/test-data/point"
						enterFeature={newLogEvent('enterFeature')}
						leaveFeature={newLogEvent('leaveFeature')}
						enterTopFeature={newLogEvent('enterTopFeature')}
						leaveTopFeature={newLogEvent('leaveTopFeature')}
						clickFeature={newLogEvent('clickFeature')}
						clickMap={() => logEvent('clickMap', 'gla/ldn-viz-tools/test-data/point')}
					/>
				{/if}
			</Map>

			<div
				class="bg-color-container-level-0 text-color-text-primary dark absolute left-0 top-0 h-[16em] w-full bg-opacity-75 p-2"
			>
				<table>
					<tbody>
						<tr class="font-medium">
							<th>Event</th>
							<th class="px-4">Layer</th>
							<th>Site</th>
						</tr>
						{#each eventLog as { eventName, layerName, siteName }, i (i)}
							<tr>
								<td>{eventName}</td>
								<td class="px-4">{layerName}</td>
								<td>{siteName}</td>
							</tr>
						{/each}
					</tbody>
				</table>
			</div>
		</div>
	{/snippet}
</Story>
