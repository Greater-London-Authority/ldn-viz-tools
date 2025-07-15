<script context="module" lang="ts">
	import { defineMeta } from '@storybook/addon-svelte-csf';
	import MapControlRefresh from '../mapControlRefresh/MapControlRefresh.svelte';

	const OS_KEY = 'vmRzM4mAA1Ag0hkjGh1fhA2hNLEM6PYP';

			const { Story } = defineMeta({
		title: 'Maps/Components/MapControls/MapControlRefresh',
		component: MapControlRefresh,
		tags: ['autodocs'],
		render: defaultTemplate,

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
	{#snippet children({ args })}
		<MapControlRefresh {...args} />
	{/snippet}
{/snippet}


<Story name="Refresh Button">
	{#snippet template(args)}
	<div class="w-[100dvw] h-[100dvh]">
		<div class="text-color-text-primary space-y-4 m-2">
			<p>
				The refresh page button is usually positioned in the bottom left corner under the fullscreen
				button.
			</p>
		</div>

		<Map
			options={{
				transformRequest: appendOSKeyToUrl(OS_KEY)
			}}
		>
			<MapControlGroup position="BottomLeft">
				<MapControlRefresh />
			</MapControlGroup>
		</Map>
	</div>
	{/snippet}
</Story>
