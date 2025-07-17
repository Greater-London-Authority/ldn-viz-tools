<script context="module" lang="ts">
	import { defineMeta } from '@storybook/addon-svelte-csf';
	import MapControlZoom from '../mapControlZoom/MapControlZoom.svelte';

	const OS_KEY = 'vmRzM4mAA1Ag0hkjGh1fhA2hNLEM6PYP';

	const { Story } = defineMeta({
		title: 'Maps/Components/MapControls/MapControlZoom',
		component: MapControlZoom,
		render: defaultTemplate,
		tags: ['autodocs'],

		parameters: {
			layout: 'full'
		}
	});
</script>

<script>
	import Map from '../map/Map.svelte';
	import { appendOSKeyToUrl } from '../map/util';

	import MapControlGroup from '../mapControlGroup/MapControlGroup.svelte';
</script>

{#snippet defaultTemplate({ args })}
	<MapControlZoom {...args} />
{/snippet}

<!--
The zoom buttons are usually positioned in the top left corner under the location search.
They enable [zoomin](https://maplibre.org/maplibre-gl-js/docs/API/classes/Map/#zoomin) and
[zoomout](https://maplibre.org/maplibre-gl-js/docs/API/classes/Map/#zoomout) by one zoom level per click.
-->
<Story name="Zoom Buttons">
	{#snippet template()}
		<div class="h-[100dvh] w-[100dvw]">
			<div class="text-color-text-primary m-2 space-y-4">
				<p>
					The zoom buttons are usually positioned in the top left corner under the location search.
					They enable <a
						class="underline"
						href="https://maplibre.org/maplibre-gl-js/docs/API/classes/maplibregl.Map/#zoomin"
					>
						zoom in
					</a>
					and
					<a
						class="underline"
						href="https://maplibre.org/maplibre-gl-js/docs/API/classes/maplibregl.Map/#zoomout"
					>
						zoom out
					</a> by one zoom level per click.
				</p>
			</div>

			<Map
				options={{
					transformRequest: appendOSKeyToUrl(OS_KEY)
				}}
			>
				<MapControlGroup position="TopLeft">
					<MapControlZoom />
				</MapControlGroup>
			</Map>
		</div>
	{/snippet}
</Story>
