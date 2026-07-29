<script>
	import { getContext } from 'svelte';
	import MapMarkerFlyToFeature from './MapMarkerFlyToFeature.svelte';

	const feature = getContext('mapMarkerFeature');
</script>

<MapMarkerFlyToFeature disabled>
	<div class="rounded bg-color-container p-2 text-sm text-color-text shadow">
		Fly-to is disabled: the map will not move. ({feature?.properties?.site_name})
	</div>
</MapMarkerFlyToFeature>
