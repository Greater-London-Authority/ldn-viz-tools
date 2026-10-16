<script>
	import { getContext } from 'svelte';
	import MapMarkerContainer from './MapMarkerContainer.svelte';

	const feature = getContext('mapMarkerFeature');
	const props = feature.properties;
</script>

<MapMarkerContainer flyToFeature>
	<h1 class="label-lg text-center">
		{props.site_name}
	</h1>
	<div>
		<p>
			<span class="text-strong">Feature ID:</span>
			{feature.id}
		</p>
		<p>
			<span class="text-strong">Object ID:</span>
			{props.objectid}
		</p>
	</div>
</MapMarkerContainer>
