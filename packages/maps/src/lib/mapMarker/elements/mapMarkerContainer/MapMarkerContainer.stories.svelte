<script module lang="ts">
	import { defineMeta } from '@storybook/addon-svelte-csf';
	import MapMarkerContainer from './MapMarkerContainer.svelte';

	/**
	 * The `<MapMarkerContainer>` component is a wrapping container for use
	 * within markers components. It encapsulates the standardised map
	 * styling and behaviour.
	 */
	const { Story } = defineMeta({
		title: 'Maps/Components/MapMarker/elements/MapMarkerContainer',
		component: MapMarkerContainer,
		tags: ['autodocs'],
		render: defaultTemplate,

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
	});
</script>

<script>
	import { setContext } from 'svelte';
	import { writable } from 'svelte/store';

	import Map from '../../../map/Map.svelte';
	import { appendOSKeyToUrl } from '../../../map/util';

	import loadTestLayers from '../../../loadTestLayers';
	import MapMarker from '../../MapMarker.svelte';
	import PlacementCenterMarker from './PlacementCenterMarker.svelte';
	import PlacementFollowMarker from './PlacementFollowMarker.svelte';
	import PlacementNoneMarker from './PlacementNoneMarker.svelte';
	import TestPopup from './TestPopup.svelte';
	import TestTooltip from './TestTooltip.svelte';

	const OS_KEY = 'vmRzM4mAA1Ag0hkjGh1fhA2hNLEM6PYP';

	setContext('mapMarkerFeature', {});
	setContext('mapStore', writable(null));
</script>

{#snippet defaultTemplate({ args })}
	<MapMarkerContainer {...args} />
{/snippet}

<Story name="Interactive Example">
	{#snippet template()}
		<div class="h-[100dvh] w-[100dvw]">
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
	{/snippet}
</Story>

<!-- The default `placement="center"` positions the container centred above its feature. -->
<Story name="Placement: center">
	{#snippet template()}
		<div class="h-[100dvh] w-[100dvw]">
			<Map
				whenMapLoads={loadTestLayers}
				options={{
					transformRequest: appendOSKeyToUrl(OS_KEY)
				}}
			>
				<MapMarker layerId="gla/ldn-viz-tools/test-data/polygon" tooltip={PlacementCenterMarker} />
			</Map>
		</div>
	{/snippet}
</Story>

<!-- `placement="follow"` makes the container track the mouse pointer as it moves over the feature. -->
<Story name="Placement: follow">
	{#snippet template()}
		<div class="h-[100dvh] w-[100dvw]">
			<Map
				whenMapLoads={loadTestLayers}
				options={{
					transformRequest: appendOSKeyToUrl(OS_KEY)
				}}
			>
				<MapMarker layerId="gla/ldn-viz-tools/test-data/polygon" tooltip={PlacementFollowMarker} />
			</Map>
		</div>
	{/snippet}
</Story>

<!-- `placement="none"` applies no automatic positioning, leaving the container wherever it is placed by MapLibre (the point where the feature was first hovered). -->
<Story name="Placement: none">
	{#snippet template()}
		<div class="h-[100dvh] w-[100dvw]">
			<Map
				whenMapLoads={loadTestLayers}
				options={{
					transformRequest: appendOSKeyToUrl(OS_KEY)
				}}
			>
				<MapMarker layerId="gla/ldn-viz-tools/test-data/polygon" tooltip={PlacementNoneMarker} />
			</Map>
		</div>
	{/snippet}
</Story>

<!-- Passing `noTip` hides the arrow/tip drawn at the bottom of the container. -->
<Story name="No tip">
	{#snippet template()}
		<div class="mb-4 mt-32 flex items-center justify-center">
			<MapMarkerContainer noTip>
				<p>This container has no tip.</p>
			</MapMarkerContainer>
		</div>
	{/snippet}
</Story>

<!-- Passing `noPad` removes the standard container padding, which is useful for edge-to-edge content such as images. -->
<Story name="No padding">
	{#snippet template()}
		<div class="mb-4 mt-32 flex items-center justify-center">
			<MapMarkerContainer noPad>
				<div class="h-20 w-40 bg-color-data-categorical-blue"></div>
			</MapMarkerContainer>
		</div>
	{/snippet}
</Story>

<!-- Passing `flyToFeature` makes the map fly to (and centre on) the feature after the container is mounted, via `MapMarkerFlyToFeature`. -->
<Story name="Fly to feature">
	{#snippet template()}
		<div class="h-[100dvh] w-[100dvw]">
			<Map
				whenMapLoads={loadTestLayers}
				options={{
					transformRequest: appendOSKeyToUrl(OS_KEY)
				}}
			>
				<MapMarker layerId="gla/ldn-viz-tools/test-data/polygon" popup={TestPopup} />
				<MapMarker layerId="gla/ldn-viz-tools/test-data/line" popup={TestPopup} />
				<MapMarker layerId="gla/ldn-viz-tools/test-data/point" popup={TestPopup} />
			</Map>
		</div>
	{/snippet}
</Story>
