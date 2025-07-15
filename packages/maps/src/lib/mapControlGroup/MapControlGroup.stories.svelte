<script context="module" lang="ts">
	import { defineMeta } from '@storybook/addon-svelte-csf';
	import MapControlGroup, { MapControlGroupPositions } from './MapControlGroup.svelte';

	const OS_KEY = 'vmRzM4mAA1Ag0hkjGh1fhA2hNLEM6PYP';

	const { Story } = defineMeta({
		title: 'Maps/Components/MapControls/MapControlGroup',
		component: MapControlGroup,
		tags: ['autodocs'],
		render: defaultTemplate,

		parameters: {
			layout: 'full'
		}
	});
</script>

<script lang="ts">
	import Map from '../map/Map.svelte';
	import { appendOSKeyToUrl } from '../map/util';

	import MapControlFullscreen from '../mapControlFullscreen/MapControlFullscreen.svelte';
	// import MapControlLocationSearch from '../mapControlLocationSearch/MapControlLocationSearch.svelte';
	// import { MapGeocoderAdapterMapBox } from '../mapControlLocationSearch/MapGeocoderAdapterMapBox';
	import MapControlPan from '../mapControlPan/MapControlPan.svelte';
	import MapControlRefresh from '../mapControlRefresh/MapControlRefresh.svelte';
	import MapControlZoom from '../mapControlZoom/MapControlZoom.svelte';
</script>

{#snippet defaultTemplate({ args })}
	<MapControlGroup {...args} />
{/snippet}

<!--
Group and position map controls using `<MapControlGroup position="...">`.
The named layout positions are shown around the edges of this map.
If using typescript you can import the `MapControlGroupPositions`enum.
-->
<Story name="Positioning labels">
	{#snippet template(args)}
		<div class="h-[100dvh] w-[100dvw]">
			<Map
				options={{
					transformRequest: appendOSKeyToUrl(OS_KEY)
				}}
			>
				{#each Object.keys(MapControlGroupPositions) as position}
					<MapControlGroup {position}>
						<p
							class="bg-color-container-level-0 text-color-text-primary border-color-ui-border-secondary border p-2 shadow"
						>
							{position}
						</p>
					</MapControlGroup>
				{/each}
			</Map>
		</div>
	{/snippet}
</Story>

<!-- The alignment of elements within a `MapControlGroup` depends on its position. -->
<Story name="Positioning controls">
	{#snippet template(args)}
		<div class="h-[100dvh] w-[100dvw]">
			<Map
				options={{
					transformRequest: appendOSKeyToUrl(OS_KEY)
				}}
			>
				{#each Object.keys(MapControlGroupPositions) as position}
					{#if position != 'TopRightOffset'}
						<MapControlGroup {position}>
							<!--
						TODO: re-enable
						<MapControlLocationSearch
							adapter={new MapGeocoderAdapterMapBox(
								'pk.eyJ1IjoiZ2xhLWdpcyIsImEiOiJjanBvNGh1bncwOTkzNDNueWt5MGU1ZGtiIn0.XFxLdq2dXttcXSXTiREPTA'
							)}
						/>
						-->
							<MapControlZoom />
						</MapControlGroup>
					{/if}
				{/each}
			</Map>
		</div>
	{/snippet}
</Story>

<!--
Typically, controls on the left are standard for every map, whereas controls on the right are context or map dependent.
On small devices most controls will hide themselves.
-->
<Story name="Standard Layout">
	{#snippet template(args)}
		<div class="h-[100dvh] w-[100dvw]">
			<Map
				options={{
					transformRequest: appendOSKeyToUrl(OS_KEY)
				}}
			>
				<MapControlGroup position="TopLeft">
					<!--
				TODO: re-enable once componenet is migrated
				<MapControlLocationSearch
					adapter={new MapGeocoderAdapterMapBox(
						'pk.eyJ1IjoiZ2xhLWdpcyIsImEiOiJjanBvNGh1bncwOTkzNDNueWt5MGU1ZGtiIn0.XFxLdq2dXttcXSXTiREPTA'
					)}
				/>
				-->
					<MapControlZoom />
				</MapControlGroup>

				<MapControlGroup position="BottomLeft">
					<MapControlFullscreen />
					<MapControlRefresh />
				</MapControlGroup>

				<MapControlGroup position="TopRight">
					<p
						class="bg-color-container-level-0 text-color-text-primary border-color-ui-border-secondary pointer-events-auto border p-2 text-center shadow"
					>
						Bespoke controls<br />E.g. Drawing
					</p>
				</MapControlGroup>

				<MapControlGroup position="BottomRight">
					<MapControlPan />
				</MapControlGroup>
			</Map>
		</div>
	{/snippet}
</Story>
