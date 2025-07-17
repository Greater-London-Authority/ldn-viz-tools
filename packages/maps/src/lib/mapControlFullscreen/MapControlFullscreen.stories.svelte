<script context="module" lang="ts">
	import { defineMeta } from '@storybook/addon-svelte-csf';
	import MapControlFullscreen from '../mapControlFullscreen/MapControlFullscreen.svelte';

	const OS_KEY = 'vmRzM4mAA1Ag0hkjGh1fhA2hNLEM6PYP';

	const { Story } = defineMeta({
		title: 'Maps/Components/MapControls/MapControlFullscreen',
		component: MapControlFullscreen,
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
	import MapControlGroup from '../mapControlGroup/MapControlGroup.svelte';
</script>

{#snippet defaultTemplate({ args })}
	<MapControlFullscreen {...args} />
{/snippet}

<Story name="Fullscreen Button">
	{#snippet template()}
		<div class="h-[100dvh] w-[100dvw]">
			<div class="text-color-text-primary m-2 space-y-4">
				<p>
					The fullscreen button is usually positioned in the bottom left corner above the refresh
					page button.
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
	{/snippet}
</Story>
