<script context="module">
	import MapPopup from './MapPopup.svelte';

	const componentType = {
		type: 'object',
		control: 'none',
		table: {
			type: {
				summary: 'Svelte component'
			}
		}
	};

	export const meta = {
		title: 'Maps/MapPopup',
		component: MapPopup,
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
			noCursorStyle: {
				type: 'boolean',
				control: 'boolean',
				table: {
					type: {
						summary: 'boolean'
					}
				}
			},
			tooltip: componentType,
			marker: componentType
		}
	};
</script>

<script>
	import { Story, Template } from '@storybook/addon-svelte-csf';

	import Map, { appendOSKeyToUrl } from '../map/Map.svelte';
	import loadTestLayers from '../loadTestLayers';
	import TestTooltip from './TestTooltip.svelte';
	import TestMarker from './TestMarker.svelte';
	const OS_KEY = 'vmRzM4mAA1Ag0hkjGh1fhA2hNLEM6PYP';
</script>

<Template let:args>
	<MapPopup {...args} />
</Template>

<Story name="Interactive Example">
	<div class="w-[100dvw] h-[100dvh]">
		<Map
			whenMapLoads={loadTestLayers}
			options={{
				transformRequest: appendOSKeyToUrl(OS_KEY)
			}}
		>
			<MapPopup
				layerId="gla/ldn-viz-tools/test-data/polygon"
				tooltip={TestTooltip}
				marker={TestMarker}
			/>
			<MapPopup
				layerId="gla/ldn-viz-tools/test-data/line"
				tooltip={TestTooltip}
				marker={TestMarker}
			/>
			<MapPopup
				layerId="gla/ldn-viz-tools/test-data/point"
				tooltip={TestTooltip}
				marker={TestMarker}
			/>
		</Map>
	</div>
</Story>
