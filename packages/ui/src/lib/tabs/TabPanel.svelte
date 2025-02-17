<script lang="ts">
	import { randomId } from '../utils/randomId';

	export let tabId: string;

	export let tabPanelId = randomId();
</script>

<div id={tabPanelId} class={$$props.class} role="tabpanel" aria-labelledby={tabId}>
	<slot />
</div>
