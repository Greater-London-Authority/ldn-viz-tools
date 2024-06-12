<script context="module">
	import MapPopupContainer from './MapPopupContainer.svelte';

	export const meta = {
		title: 'Maps/MapPopup/elements/MapPopupContainer',
		component: MapPopupContainer,
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
	import MapPopup from '../../MapPopup.svelte';
	import TestTooltip from './TestTooltip.svelte';
	import TestMarker from './TestMarker.svelte';

	const OS_KEY = 'vmRzM4mAA1Ag0hkjGh1fhA2hNLEM6PYP';

	setContext('mapPopupFeature', {});
	setContext('mapStore', writable(null));
</script>

<Template let:args>
	<MapPopupContainer {...args} />
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
