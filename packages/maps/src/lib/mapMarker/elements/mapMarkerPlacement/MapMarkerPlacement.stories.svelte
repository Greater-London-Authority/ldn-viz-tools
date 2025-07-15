<script context="module" lang="ts">
	import { defineMeta } from '@storybook/addon-svelte-csf';
	import MapMarkerPlacement from './MapMarkerPlacement.svelte';

	const { Story } = defineMeta({
		title: 'Maps/Components/MapMarker/elements/MapMarkerPlacement',
		component: MapMarkerPlacement,
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
	});
</script>

<script>
	import { setContext } from 'svelte';
	import { writable } from 'svelte/store';

	import Map from '../../../map/Map.svelte';
	import { appendOSKeyToUrl } from '../../../map/util';

	import loadTestLayers from '../../../loadTestLayers';
	import MapMarker from '../../MapMarker.svelte';
	import TestTooltipCenterAboveFeature from './TestTooltipCenterAboveFeature.svelte';
	import TestTooltipFollowMouse from './TestTooltipFollowMouse.svelte';
	import TestTooltipNone from './TestTooltipNone.svelte';

	const OS_KEY = 'vmRzM4mAA1Ag0hkjGh1fhA2hNLEM6PYP';

	setContext('mapMarkerFeature', {});
	setContext('mapStore', writable(null));
</script>

{#snippet defaultTemplate({ args })}
	<MapMarkerPlacement {...args} />
{/snippet}

<Story name="Default">
	{#snippet template(args)}
		<div class="h-[100dvh] w-[100dvw]">
			<Map
				whenMapLoads={loadTestLayers}
				options={{
					transformRequest: appendOSKeyToUrl(OS_KEY)
				}}
			>
				<MapMarker layerId="gla/ldn-viz-tools/test-data/polygon" tooltip={TestTooltipFollowMouse} />
				<MapMarker layerId="gla/ldn-viz-tools/test-data/line" tooltip={TestTooltipFollowMouse} />
				<MapMarker
					layerId="gla/ldn-viz-tools/test-data/point"
					tooltip={TestTooltipCenterAboveFeature}
				/>
			</Map>
		</div>
	{/snippet}
</Story>

<Story name="Center above feature">
	{#snippet template(args)}
		<div class="h-[100dvh] w-[100dvw]">
			<Map
				whenMapLoads={loadTestLayers}
				options={{
					transformRequest: appendOSKeyToUrl(OS_KEY)
				}}
			>
				<MapMarker
					layerId="gla/ldn-viz-tools/test-data/polygon"
					tooltip={TestTooltipCenterAboveFeature}
				/>
				<MapMarker
					layerId="gla/ldn-viz-tools/test-data/line"
					tooltip={TestTooltipCenterAboveFeature}
				/>
				<MapMarker
					layerId="gla/ldn-viz-tools/test-data/point"
					tooltip={TestTooltipCenterAboveFeature}
				/>
			</Map>
		</div>
	{/snippet}
</Story>

<!-- To see how this differs from centering on a feature, try moving your mouse across an area feature. -->
<Story name="Follow mouse">
	{#snippet template(args)}
		<div class="h-[100dvh] w-[100dvw]">
			<Map
				whenMapLoads={loadTestLayers}
				options={{
					transformRequest: appendOSKeyToUrl(OS_KEY)
				}}
			>
				<MapMarker layerId="gla/ldn-viz-tools/test-data/polygon" tooltip={TestTooltipFollowMouse} />
				<MapMarker layerId="gla/ldn-viz-tools/test-data/line" tooltip={TestTooltipFollowMouse} />
				<MapMarker layerId="gla/ldn-viz-tools/test-data/point" tooltip={TestTooltipFollowMouse} />
			</Map>
		</div>
	{/snippet}
</Story>

<Story name="No placement">
	{#snippet template(args)}
		<div class="h-[100dvh] w-[100dvw]">
			<Map
				whenMapLoads={loadTestLayers}
				options={{
					transformRequest: appendOSKeyToUrl(OS_KEY)
				}}
			>
				<MapMarker layerId="gla/ldn-viz-tools/test-data/polygon" tooltip={TestTooltipNone} />
				<MapMarker layerId="gla/ldn-viz-tools/test-data/line" tooltip={TestTooltipNone} />
				<MapMarker layerId="gla/ldn-viz-tools/test-data/point" tooltip={TestTooltipNone} />
			</Map>
		</div>
	{/snippet}
</Story>
