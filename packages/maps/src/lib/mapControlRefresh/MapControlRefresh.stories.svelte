<script>
	import { Meta, Story, Template } from '@storybook/addon-svelte-csf';

	import Map from '../map/Map.svelte';
	import { appendOSKeyToUrl } from '../map/util';

	import MapControlGroup from '../mapControlGroup/MapControlGroup.svelte';
	import MapControlRefresh from '../mapControlRefresh/MapControlRefresh.svelte';

	const OS_KEY = 'vmRzM4mAA1Ag0hkjGh1fhA2hNLEM6PYP';
</script>

<Meta
	title="Maps/MapControls/MapControlRefresh"
	component={MapControlRefresh}
	parameters={{
		layout: 'fullscreen'
	}}
/>

<Template let:args>
	<MapControlRefresh {...args} />
</Template>

<Story name="Refresh Button">
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
</Story>
