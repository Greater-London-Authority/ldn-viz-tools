<script lang="ts">
	import { Meta, Story, Template } from '@storybook/addon-svelte-csf';

	import Map, { appendOSKeyToUrl } from '../map/Map.svelte';
	import MapApp from '../map/MapApp.svelte';
	import * as os_light_vts from '../themes/os_light_vts.json';

	import MapControlGroup from '../mapControlGroup/MapControlGroup.svelte';
	import MapControlPan from '../mapControlPan/MapControlPan.svelte';

	const OS_KEY = 'vmRzM4mAA1Ag0hkjGh1fhA2hNLEM6PYP';
</script>

<Meta
	title="Maps/MapControls/MapControlPan"
	component={MapControlPan}
	parameters={{
		layout: 'fullscreen'
	}}
/>

<Template let:args>
	<MapControlPan {...args} />
</Template>

<!--
The pan buttons are usually positioned in the bottom right corner. They allow the user to pan up, down, left, and right by the same amount as the keyboard arrow buttons.

They are not included on maps by default as the keyboard arrow buttons are easier, more natural, and seem to be sufficient usability.
-->
<Story name="Pan Buttons">
	<MapApp>
		<Map
			options={{
				style: os_light_vts,
				transformRequest: appendOSKeyToUrl(OS_KEY)
			}}
		>
			<MapControlGroup y="bottom" x="right">
				<MapControlPan />
			</MapControlGroup>
		</Map>
	</MapApp>
</Story>
