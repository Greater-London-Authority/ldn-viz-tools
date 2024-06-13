<script context="module">
	import MapMarkerStyledContainer from './MapMarkerStyledContainer.svelte';

	export const meta = {
		title: 'Maps/MapMarker/elements/MapMarkerStyledContainer',
		component: MapMarkerStyledContainer,
		parameters: {
			layout: 'full'
		},
		argTypes: {
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

	import Map, { appendOSKeyToUrl } from '../../../map/Map.svelte';
	import loadTestLayers from '../../../loadTestLayers';
	import MapMarker from '../../MapMarker.svelte';
	import TestTooltip from './TestTooltip.svelte';

	const OS_KEY = 'vmRzM4mAA1Ag0hkjGh1fhA2hNLEM6PYP';

	setContext('mapMarkerFeature', {});
	setContext('mapStore', writable(null));
</script>

<Template let:args>
	<div class="flex justify-center items-center mt-32 mb-4">
		<MapMarkerStyledContainer {...args}>
			<div class="w-auto max-w-44">
				{#if args.noPad}
					<p>Suitable for edge-to-edge images. Any padding will need to be applied manually.</p>
				{:else}
					<p>Content goes here. Content goes here. Content goes here. Content goes here.</p>
				{/if}
			</div>
		</MapMarkerStyledContainer>
	</div>
</Template>

<Story name="Default" source />

<Story name="Mapping Context">
	<div class="w-[100dvw] h-[100dvh]">
		<Map
			whenMapLoads={loadTestLayers}
			options={{
				transformRequest: appendOSKeyToUrl(OS_KEY)
			}}
		>
			<MapMarker layerId="gla/ldn-viz-tools/test-data/polygon" tooltip={TestTooltip} />
			<MapMarker layerId="gla/ldn-viz-tools/test-data/line" tooltip={TestTooltip} />
			<MapMarker layerId="gla/ldn-viz-tools/test-data/point" tooltip={TestTooltip} />
		</Map>
	</div>
</Story>
