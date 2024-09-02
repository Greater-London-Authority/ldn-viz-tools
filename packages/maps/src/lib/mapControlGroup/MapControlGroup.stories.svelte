<script lang="ts">
	import { Meta, Story, Template } from '@storybook/addon-svelte-csf';

	import Map, { appendOSKeyToUrl } from '../map/Map.svelte';
	import MapApp from '../map/MapApp.svelte';
	import * as os_light_vts from '../themes/os_light_vts.json';

	import MapControlFullscreen from '../mapControlFullscreen/MapControlFullscreen.svelte';
	import MapControlLocationSearch from '../mapControlLocationSearch/MapControlLocationSearch.svelte';
	import { MapGeocoderAdapterMapBox } from '../mapControlLocationSearch/MapGeocoderAdapterMapBox';
	import MapControlPan from '../mapControlPan/MapControlPan.svelte';
	import MapControlRefresh from '../mapControlRefresh/MapControlRefresh.svelte';
	import MapControlZoom from '../mapControlZoom/MapControlZoom.svelte';
	import MapControlGroup from './MapControlGroup.svelte';
	import type {
		MapControlGroupPositionX,
		MapControlGroupPositionY
	} from './MapControlGroup.svelte';

	import { Button } from '@ldn-viz/ui';

	const OS_KEY = 'vmRzM4mAA1Ag0hkjGh1fhA2hNLEM6PYP';

	const xPositions: MapControlGroupPositionX[] = ['left', 'center', 'right'];
	const yPositions: MapControlGroupPositionY[] = ['top', 'center', 'bottom'];

	const newSelectedStringArg = (options, defaultValue = '') => ({
		control: { type: 'select' },
		options: options,
		table: {
			defaultValue: { summary: defaultValue },
			type: { summary: 'string' }
		}
	});
</script>

<Meta
	title="Maps/MapControls/MapControlGroup"
	component={MapControlGroup}
	parameters={{
		layout: 'fullscreen'
	}}
	argTypes={{
		x: newSelectedStringArg(['left', 'center', 'right'], 'left'),
		y: newSelectedStringArg(['top', 'center', 'bottom'], 'top'),
		xOffset: newSelectedStringArg(['md', 'lg'], 'md'),
		yOffset: newSelectedStringArg(['md', 'lg'], 'md')
	}}
/>

<Template let:args>
	<div class="w-[100dvw] h-[100dvh] bg-color-bg-primary relative">
		<MapControlGroup {...args}>
			<Button variant="square" emphasis="secondary" class="pointer-events-auto">🗺️</Button>
		</MapControlGroup>
	</div>
</Template>

<Story name="Default" source />

<Story name="Positions">
	<div class="w-[100dvw] h-[100dvh] bg-color-bg-primary relative">
		{#each yPositions as yPos (yPos)}
			{#each xPositions as xPos (xPos)}
				<MapControlGroup y={yPos} x={xPos}>
					<p class="bg-color-container-level-1 text-color-text-primary p-2 capitalize">
						{yPos}
						{xPos}
					</p>
				</MapControlGroup>
			{/each}
		{/each}
	</div>
</Story>

<Story name="Offsets">
	<div class="w-[100dvw] h-[100dvh] bg-color-bg-primary relative">
		<Button variant="square" emphasis="secondary" class="pointer-events-auto absolute top-0 left-0">
			❌
		</Button>
		<MapControlGroup xOffset="lg">
			<p class="bg-color-container-level-1 text-color-text-primary p-2">Offset X (lg)</p>
		</MapControlGroup>

		<Button
			variant="square"
			emphasis="secondary"
			class="pointer-events-auto absolute top-0 right-0"
		>
			❌
		</Button>
		<MapControlGroup x="right" yOffset="lg">
			<p class="bg-color-container-level-1 text-color-text-primary p-2">Offset Y (lg)</p>
		</MapControlGroup>

		<Button
			variant="square"
			emphasis="secondary"
			class="pointer-events-auto absolute bottom-0 left-0"
		>
			❌
		</Button>
		<MapControlGroup y="bottom">
			<p class="bg-color-container-level-1 text-color-text-primary p-2">Default (md)</p>
		</MapControlGroup>
	</div>
</Story>

<Story name="Content alignment">
	<MapApp>
		<Map
			options={{
				style: os_light_vts,
				transformRequest: appendOSKeyToUrl(OS_KEY)
			}}
		>
			{#each yPositions as yPos (yPos)}
				{#each xPositions as xPos (xPos)}
					<MapControlGroup y={yPos} x={xPos}>
						<MapControlLocationSearch
							adapter={new MapGeocoderAdapterMapBox(
								'pk.eyJ1IjoiZ2xhLWdpcyIsImEiOiJjanBvNGh1bncwOTkzNDNueWt5MGU1ZGtiIn0.XFxLdq2dXttcXSXTiREPTA'
							)}
						/>
						<MapControlZoom />
					</MapControlGroup>
				{/each}
			{/each}
		</Map>
	</MapApp>
</Story>

<Story name="Standard layout">
	<MapApp>
		<Map
			options={{
				style: os_light_vts,
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

			<MapControlGroup>
				<MapControlLocationSearch
					adapter={new MapGeocoderAdapterMapBox(
						'pk.eyJ1IjoiZ2xhLWdpcyIsImEiOiJjanBvNGh1bncwOTkzNDNueWt5MGU1ZGtiIn0.XFxLdq2dXttcXSXTiREPTA'
					)}
				/>
				<MapControlZoom />
			</MapControlGroup>

			<MapControlGroup y="bottom">
				<MapControlFullscreen />
				<MapControlRefresh />
			</MapControlGroup>

			<MapControlGroup x="right">
				<p
					class="bg-color-container-level-1 text-color-text-primary p-2 text-center pointer-events-auto"
				>
					Bespoke controls<br />E.g. Drawing
				</p>
			</MapControlGroup>

			<MapControlGroup y="bottom" x="right">
				<MapControlPan />
			</MapControlGroup>
		</Map>
	</MapApp>
</Story>
