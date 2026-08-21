<script module lang="ts">
	import { defineMeta } from '@storybook/addon-svelte-csf';
	import { default as Map } from '../map/Map.svelte';
	import { appendOSKeyToUrl } from '../map/util';
	import MapControlGroup from '../mapControlGroup/MapControlGroup.svelte';
	import MapRadiusSearch from './MapRadiusSearch.svelte';

	const OS_KEY = 'vmRzM4mAA1Ag0hkjGh1fhA2hNLEM6PYP';

	const { Story } = defineMeta({
		title: 'Maps/Components/MapRadiusSearch',
		component: MapRadiusSearch,
		tags: ['autodocs']
	});
</script>

<Story name="Default">
	{#snippet template()}
		<div class="h-[100dvh] w-[100dvw]">
			<Map
				options={{
					transformRequest: appendOSKeyToUrl(OS_KEY)
				}}
			>
				<MapControlGroup position="TopLeft">
					<MapRadiusSearch />
				</MapControlGroup>
			</Map>
		</div>
	{/snippet}
</Story>
