<script module lang="ts">
	import { defineMeta } from '@storybook/addon-svelte-csf';
	import MapControlRefresh from '../mapControlRefresh/MapControlRefresh.svelte';

	const OS_KEY = 'vmRzM4mAA1Ag0hkjGh1fhA2hNLEM6PYP';

	const { Story } = defineMeta({
		title: 'Maps/Components/MapControls/MapControlRefresh',
		component: MapControlRefresh,
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
The refresh page button is usually positioned in the bottom left corner under the
					fullscreen button.
-->
<Story name="Refresh Button">
	{#snippet template()}
		<div class="h-[100dvh] w-[100dvw]">
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
