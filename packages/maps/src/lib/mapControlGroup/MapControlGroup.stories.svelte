<script context="module">
	import { Story, Template } from '@storybook/addon-svelte-csf';
	import MapControlGroup, { MapControlGroupPositions } from './MapControlGroup.svelte';

	const OS_KEY = 'vmRzM4mAA1Ag0hkjGh1fhA2hNLEM6PYP';

	export const meta = {
		title: 'Maps/Components/MapControls/MapControlGroup',
		component: MapControlGroup,
		parameters: {
			layout: 'full'
		}
	};
</script>

<script lang="ts">
	import Map from '../map/Map.svelte';
	import { appendOSKeyToUrl } from '../map/util';

	import MapControlFullscreen from '../mapControlFullscreen/MapControlFullscreen.svelte';
	import MapControlLocationSearch from '../mapControlLocationSearch/MapControlLocationSearch.svelte';
	import { MapGeocoderAdapterMapBox } from '../mapControlLocationSearch/MapGeocoderAdapterMapBox';
	import MapControlPan from '../mapControlPan/MapControlPan.svelte';
	import MapControlRefresh from '../mapControlRefresh/MapControlRefresh.svelte';
	import MapControlZoom from '../mapControlZoom/MapControlZoom.svelte';
</script>

<Template let:args>
	<MapControlGroup {...args} />
</Template>

<!--
Group and position map controls using `<MapControlGroup position="...">`.
The named layout positions are shown around the edges of this map.
If using typescript you can import the `MapControlGroupPositions`enum.
-->
<Story name="Positioning labels">
	<div class="w-[100dvw] h-[100dvh]">
		<Map
			options={{
				transformRequest: appendOSKeyToUrl(OS_KEY)
			}}
		>
			{#each Object.keys(MapControlGroupPositions) as position}
				<MapControlGroup {position}>
					<p class="bg-color-container-level-1 text-color-text-primary p-2">
						{position}
					</p>
				</MapControlGroup>
			{/each}
		</Map>
	</div>
</Story>

<!-- The alignment of elements within a `MapControlGroup` depends on its position. -->
<Story name="Positioning controls">
	<div class="w-[100dvw] h-[100dvh]">
		<Map
			options={{
				transformRequest: appendOSKeyToUrl(OS_KEY)
			}}
		>
			{#each Object.keys(MapControlGroupPositions) as position}
				{#if position != 'TopRightOffset'}
					<MapControlGroup {position}>
						<MapControlLocationSearch
							adapter={new MapGeocoderAdapterMapBox(
								'pk.eyJ1IjoiZ2xhLWdpcyIsImEiOiJjanBvNGh1bncwOTkzNDNueWt5MGU1ZGtiIn0.XFxLdq2dXttcXSXTiREPTA'
							)}
						/>
						<MapControlZoom />
					</MapControlGroup>
				{/if}
			{/each}
		</Map>
	</div>
</Story>

<!--
Typically, controls on the left are standard for every map, whereas controls on the right are context or map dependent.
On small devices most controls will hide themselves.
-->
<Story name="Standard Layout">
	<div class="w-[100dvw] h-[100dvh]">
		<Map
			options={{
				transformRequest: appendOSKeyToUrl(OS_KEY)
			}}
		>
			<MapControlGroup position="TopLeft">
				<MapControlLocationSearch
					adapter={new MapGeocoderAdapterMapBox(
						'pk.eyJ1IjoiZ2xhLWdpcyIsImEiOiJjanBvNGh1bncwOTkzNDNueWt5MGU1ZGtiIn0.XFxLdq2dXttcXSXTiREPTA'
					)}
				/>
				<MapControlZoom />
			</MapControlGroup>

			<MapControlGroup position="BottomLeft">
				<MapControlFullscreen />
				<MapControlRefresh />
			</MapControlGroup>

			<MapControlGroup position="TopRight">
				<p
					class="bg-color-container-level-1 text-color-text-primary p-2 text-center pointer-events-auto"
				>
					Bespoke controls<br />E.g. Drawing
				</p>
			</MapControlGroup>

			<MapControlGroup position="BottomRight">
				<MapControlPan />
			</MapControlGroup>
		</Map>
	</div>
</Story>
