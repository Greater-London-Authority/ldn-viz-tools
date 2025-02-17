<script lang="ts">
	import { classNames } from '../utils/classNames';
	import { randomId } from '../utils/randomId';

	export let tabId: string;

	export let tabPanelId = randomId();

	const tabPanelClasses = classNames('bg-color-container-level-0 px-4 py-6', $$props.class);
</script>

<div id={tabPanelId} class={tabPanelClasses} role="tabpanel" aria-labelledby={tabId}>
	<slot />
</div>
