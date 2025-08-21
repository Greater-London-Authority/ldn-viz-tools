<script context="module">
	import { Story, Template } from '@storybook/addon-svelte-csf';
	import MapControlFullscreen from '../mapControlFullscreen/MapControlFullscreen.svelte';

	const OS_KEY = 'vmRzM4mAA1Ag0hkjGh1fhA2hNLEM6PYP';

	export const meta = {
		title: 'Maps/Components/MapControls/MapControlFullscreen',
		component: MapControlFullscreen,
		parameters: {
			layout: 'full'
		}
	};
</script>

<script lang="ts">
	import Map from '../map/Map.svelte';
	import { appendOSKeyToUrl } from '../map/util';
	import MapControlGroup from '../mapControlGroup/MapControlGroup.svelte';
</script>

<Template let:args>
	<MapControlFullscreen {...args} />
</Template>

<Story name="Fullscreen Button">
	<div class="w-[100dvw] h-[100dvh]">
		<div class="text-color-text-primary space-y-4 m-2">
			<p>
				The fullscreen button is usually positioned in the bottom left corner above the refresh page
				button.
			</p>

			<p>
				If this page is embedded then clicking the button takes the user to the map page else the <a
					class="underline"
					href="https://developer.mozilla.org/en-US/docs/Web/API/Fullscreen_API">Fullscreen API</a
				> is invoked. The button icon will change depending on the mode.
			</p>
		</div>

		<Map
			options={{
				transformRequest: appendOSKeyToUrl(OS_KEY)
			}}
		>
			<MapControlGroup position="BottomLeft">
				<MapControlFullscreen />
			</MapControlGroup>
		</Map>
	</div>
</Story>
