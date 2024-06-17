<script>
	import { Meta, Template, Story } from '@storybook/addon-svelte-csf';

	import * as os_light_vts from '../themes/os_light_vts.json';
	import MapApp from '../map/MapApp.svelte';
	import Map, { appendOSKeyToUrl } from '../map/Map.svelte';

	import MapControlGroup from '../mapControlGroup/MapControlGroup.svelte';
	import MapControlRefresh from '../mapControlRefresh/MapControlRefresh.svelte';

	const OS_KEY = 'vmRzM4mAA1Ag0hkjGh1fhA2hNLEM6PYP';
</script>

<Meta
	title="Maps/Controls/MapControlRefresh"
	component={MapControlRefresh}
	parameters={{
		layout: 'fullscreen'
	}}
/>

<Template let:args>
	<MapControlRefresh {...args} />
</Template>

<Story name="Refresh Button">
	<MapApp>
		<div class="text-white space-y-4 m-2">
			<p>
				The refresh page button is usually positioned in the bottom left corner under the fullscreen
				button.
			</p>
		</div>

		<Map
			options={{
				style: os_light_vts,
				transformRequest: appendOSKeyToUrl(OS_KEY)
			}}
		>
			<MapControlGroup position="BottomLeft">
				<MapControlRefresh />
			</MapControlGroup>
		</Map>
	</MapApp>
</Story>
