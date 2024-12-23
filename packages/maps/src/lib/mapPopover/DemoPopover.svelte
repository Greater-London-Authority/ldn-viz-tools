<script lang="ts">
	import { getContext } from 'svelte';
	import { MapMarkerStyledContainer } from '@ldn-viz/maps';

	const feature = getContext('mapMarkerFeature');
</script>

<MapMarkerStyledContainer class="z-50">
	<div>
		<h1>{feature.properties.site_name}</h1>
	</div>
</MapMarkerStyledContainer>
