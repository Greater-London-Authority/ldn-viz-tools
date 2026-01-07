<script module lang="ts">
	import { defineMeta } from '@storybook/addon-svelte-csf';
	import MapControlPan from '../mapControlPan/MapControlPan.svelte';

	const OS_KEY = 'vmRzM4mAA1Ag0hkjGh1fhA2hNLEM6PYP';

	const { Story } = defineMeta({
		title: 'Maps/Components/MapControls/MapControlPan',
		component: MapControlPan,
		tags: ['autodocs'],

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

<!--
The pan controls are usually positioned in the bottom right corner.
-->

<Story name="Pan Buttons">
	{#snippet template()}
		<div class="h-[100dvh] w-[100dvw]">
			<Map
				options={{
					transformRequest: appendOSKeyToUrl(OS_KEY)
				}}
			>
				<MapControlGroup position="BottomRight">
					<MapControlPan />
				</MapControlGroup>
			</Map>
		</div>
	{/snippet}
</Story>
