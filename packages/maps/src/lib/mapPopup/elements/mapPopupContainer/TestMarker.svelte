<script>
	import { getContext } from 'svelte';
	import MapPopupContainer from './MapPopupContainer.svelte';

	const feature = getContext('mapPopupFeature');
	const props = feature.properties;
</script>

<MapPopupContainer flyToFeature>
	<h1 class="text-lg font-medium text-center">
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
</MapPopupContainer>
