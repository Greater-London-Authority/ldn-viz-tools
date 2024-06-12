<script context="module">
	import MapPopupFlyToFeature from './MapPopupFlyToFeature.svelte';

	export const meta = {
		title: 'Maps/MapPopup/elements/MapPopupFlyToFeature',
		component: MapPopupFlyToFeature,
		parameters: {
			layout: 'full'
		}
	};
</script>

<script>
	import { setContext } from 'svelte';
	import { Story, Template } from '@storybook/addon-svelte-csf';

	import Map, { appendOSKeyToUrl } from '../../../map/Map.svelte';
	import loadTestLayers from '../../../loadTestLayers';
	import MapPopup from '../../MapPopup.svelte';
	const OS_KEY = 'vmRzM4mAA1Ag0hkjGh1fhA2hNLEM6PYP';

	setContext('mapPopupFeature', {});
</script>

<Template let:args>
	<MapPopupFlyToFeature {...args} />
</Template>

<Story name="Interactive Example">
	<div class="w-[100dvw] h-[100dvh]">
		<Map
			whenMapLoads={loadTestLayers}
			options={{
				transformRequest: appendOSKeyToUrl(OS_KEY)
			}}
		>
			<MapPopup layerId="gla/ldn-viz-tools/test-data/polygon" marker={MapPopupFlyToFeature} />
			<MapPopup layerId="gla/ldn-viz-tools/test-data/line" marker={MapPopupFlyToFeature} />
			<MapPopup layerId="gla/ldn-viz-tools/test-data/point" marker={MapPopupFlyToFeature} />
		</Map>
	</div>
</Story>
