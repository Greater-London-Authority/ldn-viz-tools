<script context="module" lang="ts">
	import { defineMeta } from '@storybook/addon-svelte-csf';
	import MapMarkerFlyToFeature from './MapMarkerFlyToFeature.svelte';

	const { Story } = defineMeta({
		title: 'Maps/Components/MapMarker/elements/MapMarkerFlyToFeature',
		component: MapMarkerFlyToFeature,
		tags: ['autodocs'],
		render: defaultTemplate,

		parameters: {
			layout: 'full'
		},
		argTypes: {
			disabled: {
				type: 'boolean',
				control: 'none'
			}
		}
	});
</script>

<script>
	import { setContext } from 'svelte';

	import Map from '../../../map/Map.svelte';
	import { appendOSKeyToUrl } from '../../../map/util';

	import loadTestLayers from '../../../loadTestLayers';
	import MapMarker from '../../MapMarker.svelte';

	const OS_KEY = 'vmRzM4mAA1Ag0hkjGh1fhA2hNLEM6PYP';

	setContext('mapMarkerFeature', {});
</script>

{#snippet defaultTemplate({ args })}
	<MapMarkerFlyToFeature {...args} />
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
				<MapMarker layerId="gla/ldn-viz-tools/test-data/polygon" popup={MapMarkerFlyToFeature} />
				<MapMarker layerId="gla/ldn-viz-tools/test-data/line" popup={MapMarkerFlyToFeature} />
				<MapMarker layerId="gla/ldn-viz-tools/test-data/point" popup={MapMarkerFlyToFeature} />
			</Map>
		</div>
	{/snippet}
</Story>
