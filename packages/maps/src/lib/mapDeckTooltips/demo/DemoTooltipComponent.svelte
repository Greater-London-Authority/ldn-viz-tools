<script lang="ts">
	import type { Feature } from 'geojson';

	export let feature: undefined | Feature = undefined;
</script>

{#if feature}
	<div>
		<p>This feature has properties:</p>
		<pre>{JSON.stringify(feature.properties, null, 2)}</pre>
	</div>
{/if}
