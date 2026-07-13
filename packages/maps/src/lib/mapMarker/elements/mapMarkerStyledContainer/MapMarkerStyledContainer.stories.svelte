<script module lang="ts">
	import { defineMeta } from '@storybook/addon-svelte-csf';
	import MapMarkerStyledContainer from './MapMarkerStyledContainer.svelte';

	/**
	 * The `<MapMarkerStyledContainer>` component is a wrapping container for use
	 * within marker components. It provides standardised styling that is
	 * suitable for the vast majority of map tooltips and popups.
	 */
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
	{#snippet template()}
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

<!-- 
When content is taller than the container's constrained height, the `overflow-y-auto` styling makes it scroll.
The container's `preventZoom` handler stops scroll events from being interpreted as map zoom when the content itself can scroll.
 -->
<Story name="Overflowing content">
	{#snippet template()}
		<div class="mb-4 mt-32 flex items-center justify-center">
			<MapMarkerStyledContainer class="max-h-48">
				<div class="w-auto max-w-64">
					<h1 class="mb-2 text-lg font-medium">Scrollable content</h1>
					{#each Array(15) as _, i (i)}
						<p>Line {i + 1}: content goes here. Content goes here. Content goes here.</p>
					{/each}
				</div>
			</MapMarkerStyledContainer>
		</div>
	{/snippet}
</Story>

<!-- Passing `noPad` removes the standard container padding, which is useful for edge-to-edge content such as images that should reach the container's borders. -->
<Story name="No padding (edge-to-edge image)">
	{#snippet template()}
		<div class="mb-4 mt-32 flex items-center justify-center">
			<MapMarkerStyledContainer noPad>
				<div class="h-32 w-56 bg-color-data-categorical-blue"></div>
			</MapMarkerStyledContainer>
		</div>
	{/snippet}
</Story>
