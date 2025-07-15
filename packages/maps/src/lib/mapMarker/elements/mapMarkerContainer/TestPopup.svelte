<script>
	import { getContext } from 'svelte';
	import MapMarkerContainer from './MapMarkerContainer.svelte';

	const feature = getContext('mapMarkerFeature');
	const props = feature.properties;
</script>

<MapMarkerContainer flyToFeature>
	<h1 class="text-center text-lg font-medium">
		{props.site_name}
	</h1>
	<div>
		<p>
			<span class="font-medium">Feature ID:</span>
			{feature.id}
		</p>
		<p>
			<span class="font-medium">Object ID:</span>
			{props.objectid}
		</p>
	</div>
</MapMarkerContainer>
