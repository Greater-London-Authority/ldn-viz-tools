<script context="module">
	import MapCursorEvent from './MapCursorEvent.svelte';

	const handlerArgType = {
		type: 'function',
		control: 'none',
		table: {
			type: {
				summary: 'function',
				detail:
					'function(event: MouseEvent | TouchEvent, {\n  feature: GeoJSONFeature,\n  features: GeoJSONFeature[],\n  isTouchEvent: boolean\n}) => void'
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
					'function(event: MouseEvent | TouchEvent, {\n  feature: null,\n  features: GeoJSONFeature[],\n  isTouchEvent: boolean\n}) => void'
			}
		}
	};

	export const meta = {
		title: 'Maps/MapCursorEvent',
		component: MapCursorEvent,
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
	};
</script>

<script>
	import { Story, Template } from '@storybook/addon-svelte-csf';

	import Map, { appendOSKeyToUrl } from '../map/Map.svelte';
	const OS_KEY = 'vmRzM4mAA1Ag0hkjGh1fhA2hNLEM6PYP';
</script>

<Template let:args>
	<MapCursorEvent {...args} />
</Template>

<Story name="Default" source />

<Story name="Events">
	<div class="w-[100dvw] h-[100dvh]">
		<Map
			options={{
				transformRequest: appendOSKeyToUrl(OS_KEY)
			}}
		>
			<!--TODO: Add loadTestLayers.js when merged in-->
		</Map>
	</div>
</Story>
