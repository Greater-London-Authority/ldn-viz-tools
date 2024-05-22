<script>
	import { Meta, Template, Story } from '@storybook/addon-svelte-csf';

	import * as os_light_vts from '../themes/os_light_vts.json';
	import MapApp from '../map/MapApp.svelte';
	import Map, { appendOSKeyToUrl } from '../map/Map.svelte';

	import MapControlGroup from '../mapControlGroup/MapControlGroup.svelte';
	import MapControlPan from '../mapControlPan/MapControlPan.svelte';

	const OS_KEY = 'vmRzM4mAA1Ag0hkjGh1fhA2hNLEM6PYP';
</script>

<Meta
	title="Maps/MapControlPan"
	component={MapControlPan}
	parameters={{
		layout: 'fullscreen'
	}}
/>

<Template let:args>
	<MapControlPan {...args} />
</Template>

<Story name="Pan Buttons">
	<MapApp>
		<Map
			options={{
				style: os_light_vts,
				transformRequest: appendOSKeyToUrl(OS_KEY)
			}}
		>
			<MapControlGroup position="BottomRight">
				<MapControlPan />
			</MapControlGroup>
		</Map>
	</MapApp>
</Story>
