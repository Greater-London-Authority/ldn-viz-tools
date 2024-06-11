<script context="module">
	import MapPopupMarker from './MapPopupMarker.svelte';

	export const meta = {
		title: 'Maps/MapPopup/elements/MapPopupMarker',
		component: MapPopupMarker,
		argTypes: {
			placement: {
				options: ['center', 'follow', 'none'],
				type: 'string',
				control: 'none'
			},
			noTip: {
				type: 'boolean',
				control: 'boolean'
			},
			noPad: {
				type: 'boolean',
				control: 'boolean'
			}
		}
	};
</script>

<script>
	import { setContext } from 'svelte';
	import { writable } from 'svelte/store';
	import { Story, Template } from '@storybook/addon-svelte-csf';

	//import Map, { appendOSKeyToUrl } from '../../../map/Map.svelte';
	//import MapPopup from '../../MapPopup.svelte';
	//const OS_KEY = 'vmRzM4mAA1Ag0hkjGh1fhA2hNLEM6PYP';

	setContext('mapPopupFeature', {});
	setContext('mapStore', writable(null));
</script>

<Template let:args>
	<div class="flex justify-center items-center mt-32">
		<MapPopupMarker {...args}>
			<div class="w-auto max-w-44">
				{#if args.noPad}
					<p>Suitable for edge-to-edge images. Any padding will need to be applied manually.</p>
				{:else}
					<p>Content goes here. Content goes here. Content goes here. Content goes here.</p>
				{/if}
			</div>
		</MapPopupMarker>
	</div>
</Template>

<Story name="Default" source />

<!--
<Story name="Follow mouse">
	<div class="w-[100dvw] h-[100dvh]">
		<Map
			options={{
				transformRequest: appendOSKeyToUrl(OS_KEY)
			}}
		>
				<MapPopup layerId="gla/ldn-viz-tools/test-data/poly" marker={TestFollowMouseTooltip} />	
				<MapPopup layerId="gla/ldn-viz-tools/test-data/line" marker={TestFollowMouseTooltip} />	
				<MapPopup layerId="gla/ldn-viz-tools/test-data/point" marker={TestFollowMouseTooltip} />	
		</Map>
	</div>
</Story>
-->
