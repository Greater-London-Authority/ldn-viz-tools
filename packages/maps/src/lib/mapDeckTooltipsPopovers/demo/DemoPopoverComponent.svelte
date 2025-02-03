<script lang="ts">
	import { getContext } from 'svelte';
	import MapMarkerStyledContainer from '../../mapMarker/elements/mapMarkerStyledContainer/MapMarkerStyledContainer.svelte';

	const feature = getContext('mapMarkerFeature');
</script>

<MapMarkerStyledContainer>
	<div>
		<p>This feature has properties:</p>
		<pre>{JSON.stringify(feature.properties, null, 2)}</pre>
	</div>
</MapMarkerStyledContainer>
