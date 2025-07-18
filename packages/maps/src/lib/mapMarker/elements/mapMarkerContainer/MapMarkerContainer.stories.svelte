<script context="module" lang="ts">
	import { defineMeta } from '@storybook/addon-svelte-csf';
	import MapMarkerContainer from './MapMarkerContainer.svelte';

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
