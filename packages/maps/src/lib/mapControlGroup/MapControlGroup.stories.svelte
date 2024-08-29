<script>
	import { Meta, Story, Template } from '@storybook/addon-svelte-csf';

	import Map from '../map/Map.svelte';
	import { appendOSKeyToUrl } from '../map/util';
	import MapApp from '../map/MapApp.svelte';

	import MapControlFullscreen from '../mapControlFullscreen/MapControlFullscreen.svelte';
	import MapControlLocationSearch from '../mapControlLocationSearch/MapControlLocationSearch.svelte';
	import { MapGeocoderAdapterMapBox } from '../mapControlLocationSearch/MapGeocoderAdapterMapBox';
	import MapControlPan from '../mapControlPan/MapControlPan.svelte';
	import MapControlRefresh from '../mapControlRefresh/MapControlRefresh.svelte';
	import MapControlZoom from '../mapControlZoom/MapControlZoom.svelte';
	import MapControlGroup, { MapControlGroupPositions } from './MapControlGroup.svelte';

	const OS_KEY = 'vmRzM4mAA1Ag0hkjGh1fhA2hNLEM6PYP';
</script>

<Meta
	title="Maps/MapControls/MapControlGroup"
	component={MapControlGroup}
	parameters={{
		layout: 'fullscreen'
	}}
/>

<Template let:args>
	<MapControlGroup {...args} />
</Template>

<Story name="Positioning labels">
	<MapApp>
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

			<div
				class="max-w-sm absolute top-1/2 -translate-y-1/2 left-1/2 -translate-x-1/2 transform z-10 bg-color-container-level-1 text-color-text-primary text-center p-4 space-y-4"
			>
				<p>
					Group and position map controls using
					<code>{'<MapControlGroup position="...">'}</code>.
				</p>

				<p>
					The named layout positions are shown around the edges of this map. If using typescript you
					can import the <code>MapControlGroupPositions</code> enum.
				</p>
			</div>
		</Map>
	</MapApp>
</Story>

<Story name="Positioning controls">
	<MapApp>
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

			<div
				class="max-w-sm absolute top-1/2 -translate-y-1/2 left-1/2 -translate-x-1/2 transform z-10 bg-color-container-level-1 text-color-text-primary text-center p-4 space-y-4"
			>
				<p>
					The alignment of elements within a <code>MapControlGroup</code> depends on its position.
				</p>
			</div>
		</Map>
	</MapApp>
</Story>

<Story name="Standard Layout">
	<MapApp>
		<Map
			options={{
				transformRequest: appendOSKeyToUrl(OS_KEY)
			}}
		>
			<div
				class="max-w-md absolute top-1/2 -translate-y-1/2 left-1/2 -translate-x-1/2 transform z-10 bg-color-container-level-1 text-color-text-primary p-4 space-y-8"
			>
				<p class="w-52">⮜ Controls on the left are standard for every map</p>
				<p class="ml-auto w-52">Those on the right are context or map dependent ⮞</p>
				<p class="text-center">On small devices most controls will hide themselves.</p>
			</div>

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
	</MapApp>
</Story>
