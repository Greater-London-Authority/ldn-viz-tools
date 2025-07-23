<script lang="ts">
	import { Map, appendOSKeyToUrl } from '@ldn-viz/maps';

	const OS_KEY = 'vmRzM4mAA1Ag0hkjGh1fhA2hNLEM6PYP';
</script>

<div class="prose dark:prose-invert px-4 py-6">
	<h3>If you liked it...</h3>
	<p class="lead">...then you should have put a map in it.</p>
	<p>
		Lorem ipsum dolor sit amet, consectetur adipiscing elit. Cras feugiat interdum quam faucibus
		gravida. Nunc in odio nec eros sodales consequat. Donec id est sapien. Mauris sit amet semper
		odio, commodo aliquam quam. Vestibulum volutpat efficitur varius.
	</p>
</div>
<div class="h-96 w-full">
	<Map
		options={{
			transformRequest: appendOSKeyToUrl(OS_KEY)
		}}
	/>
</div>
