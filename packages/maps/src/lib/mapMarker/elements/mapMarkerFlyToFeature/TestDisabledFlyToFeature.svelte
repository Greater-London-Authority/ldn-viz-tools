<script>
	import { getContext } from 'svelte';
	import MapMarkerFlyToFeature from './MapMarkerFlyToFeature.svelte';

	const feature = getContext('mapMarkerFeature');
</script>

<MapMarkerFlyToFeature disabled>
	<div class="body-sm rounded bg-color-surface p-2 text-color-text shadow">
		Fly-to is disabled: the map will not move. ({feature?.properties?.site_name})
	</div>
</MapMarkerFlyToFeature>
