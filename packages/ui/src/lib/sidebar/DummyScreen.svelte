<script>
	import bgMap from '../../../static/background-map-of-london.png'
</script>

<div class="dummy-screen" style:background-image="url({bgMap})">
	<slot />
</div>

<style>
	.dummy-screen {
		position: relative;

		width: 600px;
		height: 400px;

		border: 2px solid goldenrod;
		background-position: center;
		background-size: 1000px 700px;
		background-repeat: no-repeat;

		overflow: hidden;
	}
</style>