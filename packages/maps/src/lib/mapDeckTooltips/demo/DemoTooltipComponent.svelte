<script lang="ts">
	import type { Feature } from 'geojson';

	interface Props {
		feature?: undefined | Feature;
	}

	let { feature = undefined }: Props = $props();
</script>

{#if feature}
	<div>
		<p>This feature has properties:</p>
		<pre>{JSON.stringify(feature.properties, null, 2)}</pre>
	</div>
{/if}
