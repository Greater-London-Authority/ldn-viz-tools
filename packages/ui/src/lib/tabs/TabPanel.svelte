<script lang="ts">
	import { classNames } from '../utils/classNames';

	interface Props {
		/**
		 * Unique identifier of `TabLabel` that controls this panel. Required.
		 */
		tabId: string;
		/**
		 * Unique identifier of this panel, used to connect `TabPanel` and `TabLabel` with `aria-controls`. Required.
		 */
		tabPanelId: string;
		/**
		 * Allows keyboard users to tab into the contents of the panel when
		 * the first element of the panel is not interactive. In cases where
		 * it is interactive, set this to -1.
		 */
		tabIndex?: number;
		class?: string;
		children?: import('svelte').Snippet;
	}

	let { tabId, tabPanelId, tabIndex = 0, class: classes = '', children }: Props = $props();

	const tabPanelClasses = classNames('bg-color-container-level-0 w-full', classes);
</script>

<div
	id={tabPanelId}
	class={tabPanelClasses}
	role="tabpanel"
	aria-labelledby={tabId}
	tabindex={tabIndex}
>
	{@render children?.()}
</div>
