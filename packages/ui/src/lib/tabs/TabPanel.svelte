<script lang="ts">
	import { randomId } from '../utils/randomId';

	export let tabId: string;

	export let tabPanelId = randomId();
</script>

<div id={tabPanelId} role="tabpanel" aria-labelledby={tabId}>
	<slot />
</div>
