<script lang="ts">
	import { classNames } from '../utils/classNames';

	/**
	 * Unique identifier of `TabLabel` that controls this panel. Required.
	 */
	export let tabId: string;

	/**
	 * Unique identifier of this panel, used to connect `TabPanel` and `TabLabel` with `aria-controls`. Required.
	 */
	export let tabPanelId: string;

	/**
	 * Allows keyboard users to tab into the contents of the panel when
	 * the first element of the panel is not interactive. In cases where
	 * it is interactive, set this to -1.
	 */
	export let tabIndex = 0;

	const tabPanelClasses = classNames('bg-color-container-level-0 px-4 py-6', $$props.class);
</script>

<div
	id={tabPanelId}
	class={tabPanelClasses}
	role="tabpanel"
	aria-labelledby={tabId}
	tabindex={tabIndex}
>
	<slot />
</div>
