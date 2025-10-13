<script lang="ts">
	import { appendOSKeyToUrl, Map } from '@ldn-viz/maps';

	const OS_KEY = 'vmRzM4mAA1Ag0hkjGh1fhA2hNLEM6PYP';
</script>

<Map
	options={{
		transformRequest: appendOSKeyToUrl(OS_KEY),
		minZoom: 9,
		maxZoom: 18
	}}
/>
