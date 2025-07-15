<script context="module" lang="ts">
	import { defineMeta } from '@storybook/addon-svelte-csf';
	import MapMarkerStyledContainer from './MapMarkerStyledContainer.svelte';

	const { Story } = defineMeta({
		title: 'Maps/Components/MapMarker/elements/MapMarkerStyledContainer',
		component: MapMarkerStyledContainer,
		tags: ['autodocs'],
		render: defaultTemplate,

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
	});
</script>

<script>
	import { setContext } from 'svelte';
	import { writable } from 'svelte/store';

	import Map from '../../../map/Map.svelte';
	import { appendOSKeyToUrl } from '../../../map/util';

	import loadTestLayers from '../../../loadTestLayers';
	import MapMarker from '../../MapMarker.svelte';
	import TestTooltip from './TestTooltip.svelte';

	const OS_KEY = 'vmRzM4mAA1Ag0hkjGh1fhA2hNLEM6PYP';

	setContext('mapMarkerFeature', {});
	setContext('mapStore', writable(null));
</script>

{#snippet defaultTemplate({ args })}
	<div class="mb-4 mt-32 flex items-center justify-center">
		<MapMarkerStyledContainer {...args}>
			<div class="w-auto max-w-44">
				{#if args?.noPad}
					<!-- TODO: args is undefined? -->
					<p>Suitable for edge-to-edge images. Any padding will need to be applied manually.</p>
				{:else}
					<p>Content goes here. Content goes here. Content goes here. Content goes here.</p>
				{/if}
			</div>
		</MapMarkerStyledContainer>
	</div>
{/snippet}

<Story name="Default" source />

<Story name="Mapping Context">
	{#snippet template(args)}
		<div class="h-[100dvh] w-[100dvw]">
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
	{/snippet}
</Story>
