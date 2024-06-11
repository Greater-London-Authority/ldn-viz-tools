<script context="module">
	import MapPopupPlacement from './MapPopupPlacement.svelte';

	export const meta = {
		title: 'Maps/MapPopup/elements/MapPopupPlacement',
		component: MapPopupPlacement,
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
	//import MapPopup from '../../MapPopup.svelte';
	//import TestCenterOnFeatureTooltip from './TestCenterOnFeatureTooltip.svelte';
	//import TestFollowMouseTooltip from './TestFollowMouseTooltip.svelte';
	const OS_KEY = 'vmRzM4mAA1Ag0hkjGh1fhA2hNLEM6PYP';

	setContext('mapPopupFeature', {});
	setContext('mapStore', writable(null));
</script>

<Template let:args>
	<MapPopupPlacement {...args} />
</Template>

<Story name="Default" source />

<Story name="Center on feature">
	<div class="w-[100dvw] h-[100dvh]">
		<Map
			options={{
				transformRequest: appendOSKeyToUrl(OS_KEY)
			}}
		>
			<!--TODO:
				Add loadTestLayers.js when merged in.

				<MapPopup layerId="gla/ldn-viz-tools/test-data/poly" marker={TestCenterOnFeatureTooltip} />	
				<MapPopup layerId="gla/ldn-viz-tools/test-data/line" marker={TestCenterOnFeatureTooltip} />	
				<MapPopup layerId="gla/ldn-viz-tools/test-data/point" marker={TestCenterOnFeatureTooltip} />	
			-->
		</Map>
	</div>
</Story>

<Story name="Follow mouse">
	<div class="w-[100dvw] h-[100dvh]">
		<Map
			options={{
				transformRequest: appendOSKeyToUrl(OS_KEY)
			}}
		>
			<!--TODO:
				Add loadTestLayers.js when merged in.

				<MapPopup layerId="gla/ldn-viz-tools/test-data/poly" marker={TestFollowMouseTooltip} />	
				<MapPopup layerId="gla/ldn-viz-tools/test-data/line" marker={TestFollowMouseTooltip} />	
				<MapPopup layerId="gla/ldn-viz-tools/test-data/point" marker={TestFollowMouseTooltip} />	
			-->
		</Map>
	</div>
</Story>
