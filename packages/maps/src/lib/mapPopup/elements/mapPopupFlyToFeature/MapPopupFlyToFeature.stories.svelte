<script context="module">
	import MapPopupFlyToFeature from './MapPopupFlyToFeature.svelte';

	export const meta = {
		title: 'Maps/MapPopup/elements/MapPopupFlyToFeature',
		component: MapPopupFlyToFeature
	};
</script>

<script>
	import { setContext } from 'svelte';
	import { Story, Template } from '@storybook/addon-svelte-csf';

	import Map, { appendOSKeyToUrl } from '../../../map/Map.svelte';
	//import MapPopup from '../../MapPopup.svelte';
	//import TestMarker from './TestMarker.svelte';
	const OS_KEY = 'vmRzM4mAA1Ag0hkjGh1fhA2hNLEM6PYP';

	setContext('mapPopupFeature', {});
</script>

<Template let:args>
	<MapPopupFlyToFeature {...args} />
</Template>

<Story name="Default" source />

<Story name="Fly on click">
	<div class="w-[100dvw] h-[100dvh]">
		<Map
			options={{
				transformRequest: appendOSKeyToUrl(OS_KEY)
			}}
		>
			<!--TODO:
				Add loadTestLayers.js when merged in.

				<MapPopup layerId="gla/ldn-viz-tools/test-data/point" marker={TestMarker} />	
			-->
		</Map>
	</div>
</Story>
