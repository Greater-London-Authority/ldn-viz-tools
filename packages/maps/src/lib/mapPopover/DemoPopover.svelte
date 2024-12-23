<script lang="ts">
	import { getContext } from 'svelte';
	import MapMarkerStyledContainer from '../mapMarker/elements/mapMarkerStyledContainer/MapMarkerStyledContainer.svelte';

	const feature = getContext('mapMarkerFeature');
</script>

<MapMarkerStyledContainer>
	<div>
		<h1>{feature.properties.site_name}</h1>
	</div>
</MapMarkerStyledContainer>
