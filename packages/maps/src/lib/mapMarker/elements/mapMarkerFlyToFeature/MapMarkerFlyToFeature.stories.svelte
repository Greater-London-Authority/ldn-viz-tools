<script context="module">
	import MapMarkerFlyToFeature from './MapMarkerFlyToFeature.svelte';

	export const meta = {
		title: 'Maps/MapMarker/elements/MapMarkerFlyToFeature',
		component: MapMarkerFlyToFeature,
		parameters: {
			layout: 'full'
		},
		argTypes: {
			disabled: {
				type: 'boolean',
				control: 'none'
			}
		}
	};
</script>

<script>
	import { setContext } from 'svelte';
	import { Story, Template } from '@storybook/addon-svelte-csf';

	import Map, { appendOSKeyToUrl } from '../../../map/Map.svelte';
	import loadTestLayers from '../../../loadTestLayers';
	import MapMarker from '../../MapMarker.svelte';

	const OS_KEY = 'vmRzM4mAA1Ag0hkjGh1fhA2hNLEM6PYP';

	setContext('mapMarkerFeature', {});
</script>

<Template let:args>
	<MapMarkerFlyToFeature {...args} />
</Template>

<Story name="Interactive Example">
	<div class="w-[100dvw] h-[100dvh]">
		<Map
			whenMapLoads={loadTestLayers}
			options={{
				transformRequest: appendOSKeyToUrl(OS_KEY)
			}}
		>
			<MapMarker layerId="gla/ldn-viz-tools/test-data/polygon" popup={MapMarkerFlyToFeature} />
			<MapMarker layerId="gla/ldn-viz-tools/test-data/line" popup={MapMarkerFlyToFeature} />
			<MapMarker layerId="gla/ldn-viz-tools/test-data/point" popup={MapMarkerFlyToFeature} />
		</Map>
	</div>
</Story>
