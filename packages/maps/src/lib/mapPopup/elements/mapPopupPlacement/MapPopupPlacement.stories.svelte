<script context="module">
	import MapPopupPlacement from './MapPopupPlacement.svelte';

	export const meta = {
		title: 'Maps/MapPopup/elements/MapPopupPlacement',
		component: MapPopupPlacement,
		parameters: {
			layout: 'full'
		},
		argTypes: {
			placement: {
				options: ['center', 'follow', 'none'],
				type: 'string',
				control: 'none'
			}
		}
	};
</script>

<script>
	import { setContext } from 'svelte';
	import { writable } from 'svelte/store';
	import { Story, Template } from '@storybook/addon-svelte-csf';

	import Map, { appendOSKeyToUrl } from '../../../map/Map.svelte';
	import loadTestLayers from '../../../loadTestLayers';
	import MapPopup from '../../MapPopup.svelte';
	import TestTooltipCenterAboveFeature from './TestTooltipCenterAboveFeature.svelte';
	import TestTooltipFollowMouse from './TestTooltipFollowMouse.svelte';
	const OS_KEY = 'vmRzM4mAA1Ag0hkjGh1fhA2hNLEM6PYP';

	setContext('mapPopupFeature', {});
	setContext('mapStore', writable(null));
</script>

<Template let:args>
	<MapPopupPlacement {...args} />
</Template>

<Story name="Default">
	<div class="w-[100dvw] h-[100dvh]">
		<Map
			whenMapLoads={loadTestLayers}
			options={{
				transformRequest: appendOSKeyToUrl(OS_KEY)
			}}
		>
			<MapPopup layerId="gla/ldn-viz-tools/test-data/polygon" tooltip={TestTooltipFollowMouse} />
			<MapPopup layerId="gla/ldn-viz-tools/test-data/line" tooltip={TestTooltipFollowMouse} />
			<MapPopup
				layerId="gla/ldn-viz-tools/test-data/point"
				tooltip={TestTooltipCenterAboveFeature}
			/>
		</Map>
	</div>
</Story>

<Story name="Center above feature">
	<div class="w-[100dvw] h-[100dvh]">
		<Map
			whenMapLoads={loadTestLayers}
			options={{
				transformRequest: appendOSKeyToUrl(OS_KEY)
			}}
		>
			<MapPopup
				layerId="gla/ldn-viz-tools/test-data/polygon"
				tooltip={TestTooltipCenterAboveFeature}
			/>
			<MapPopup
				layerId="gla/ldn-viz-tools/test-data/line"
				tooltip={TestTooltipCenterAboveFeature}
			/>
			<MapPopup
				layerId="gla/ldn-viz-tools/test-data/point"
				tooltip={TestTooltipCenterAboveFeature}
			/>
		</Map>
	</div>
</Story>

<Story name="Follow mouse">
	<div class="w-[100dvw] h-[100dvh]">
		<Map
			whenMapLoads={loadTestLayers}
			options={{
				transformRequest: appendOSKeyToUrl(OS_KEY)
			}}
		>
			<MapPopup layerId="gla/ldn-viz-tools/test-data/polygon" tooltip={TestTooltipFollowMouse} />
			<MapPopup layerId="gla/ldn-viz-tools/test-data/line" tooltip={TestTooltipFollowMouse} />
			<MapPopup layerId="gla/ldn-viz-tools/test-data/point" tooltip={TestTooltipFollowMouse} />
		</Map>
	</div>
</Story>
