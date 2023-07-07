<script>
	// Not ideal pathing but Storybook doesn't support Svelte aliases
	import bgMap from '../../../static/background-map-of-london.png';
</script>

<div style:background-image="url({bgMap})" class="story-app-container">
	<slot />
</div>

<style>
	.story-app-container {
		position: relative;

		width: 600px;
		height: 600px;

		border: 2px solid goldenrod;
		background-position: center;
		background-size: 1200px 800px;
		background-repeat: no-repeat;

		overflow: hidden;
	}
</style>
