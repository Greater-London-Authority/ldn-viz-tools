<script>
	import MapMarkerStyledContainer from '../mapMarker/elements/mapMarkerStyledContainer/MapMarkerStyledContainer.svelte';
	import { getContext } from 'svelte';

	const msg = getContext('mapMarkerString');
</script>

<MapMarkerStyledContainer>
	<div>
		{msg}
	</div>
</MapMarkerStyledContainer>
