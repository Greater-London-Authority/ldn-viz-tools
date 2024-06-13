<script context="module">
	import MapMarkerContainer from './MapMarkerContainer.svelte';

	export const meta = {
		title: 'Maps/MapMarker/elements/MapMarkerContainer',
		component: MapMarkerContainer,
		parameters: {
			layout: 'full'
		},
		argTypes: {
			placement: {
				options: ['center', 'follow', 'none'],
				type: 'string',
				control: 'none'
			},
			noTip: {
				type: 'boolean',
				control: 'none'
			},
			noPad: {
				type: 'boolean',
				control: 'none'
			},
			flyToFeature: {
				type: 'boolean',
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
	import MapMarker from '../../MapMarker.svelte';
	import TestTooltip from './TestTooltip.svelte';
	import TestPopup from './TestPopup.svelte';

	const OS_KEY = 'vmRzM4mAA1Ag0hkjGh1fhA2hNLEM6PYP';

	setContext('mapMarkerFeature', {});
	setContext('mapStore', writable(null));
</script>

<Template let:args>
	<MapMarkerContainer {...args} />
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
