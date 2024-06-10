<script context="module">
	import MapCursorEvent from './MapCursorEvent.svelte';

	const handlerArgType = {
		type: 'function',
		control: 'none',
		table: {
			type: {
				summary: 'function',
				detail: 'function(event: MouseEvent | TouchEvent, {\n  feature: GeoJSONFeature,\n  features: GeoJSONFeature[],\n  isTouchEvent: boolean\n}) => void'
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
			clickMap: handlerArgType,
			clickFeature: handlerArgType
		}
	};
</script>

<script>
	import { Story, Template } from '@storybook/addon-svelte-csf';
</script>

<Template let:args>
	<MapCursorEvent {...args} />
</Template>

<Story name="Default" source />
