<script context="module">
	import MapMarker from './MapMarker.svelte';

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
		title: 'Maps/MapMarker',
		component: MapMarker,
		parameters: {
			layout: 'full'
		},
		argTypes: {
			layerId: {
				type: 'string',
				control: 'none'
			},
			noCursorStyle: {
				type: 'boolean',
				control: 'none'
			},
			tooltip: componentType,
			popup: componentType
		}
	};
</script>

<script>
	import { Story, Template } from '@storybook/addon-svelte-csf';

	import Map, { appendOSKeyToUrl } from '../map/Map.svelte';
	import loadTestLayers from '../loadTestLayers';
	import TestTooltip from './TestTooltip.svelte';
	import TestPopup from './TestPopup.svelte';

	const OS_KEY = 'vmRzM4mAA1Ag0hkjGh1fhA2hNLEM6PYP';
</script>

<Template let:args>
	<MapMarker {...args} />
</Template>

<Story name="Interactive Example">
	<div class="w-[100dvw] h-[100dvh]">
		<Map
			whenMapLoads={loadTestLayers}
			options={{
				transformRequest: appendOSKeyToUrl(OS_KEY)
			}}
		>
			<MapMarker
				layerId="gla/ldn-viz-tools/test-data/polygon"
				tooltip={TestTooltip}
				popup={TestPopup}
			/>
			<MapMarker
				layerId="gla/ldn-viz-tools/test-data/line"
				tooltip={TestTooltip}
				popup={TestPopup}
			/>
			<MapMarker
				layerId="gla/ldn-viz-tools/test-data/point"
				tooltip={TestTooltip}
				popup={TestPopup}
			/>
		</Map>
	</div>
</Story>
