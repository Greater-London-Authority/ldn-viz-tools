<script lang="ts">
	/**
	 * The `<PlaceholderImage>` component shows a generic placeholder image as an
	 * `<svg>` element. This can be used in place of a real image or whilst one
	 * is loading. This avoids the layout of a page or widget changing suddenly
	 * due to a slow or user initiated image loads.
	 *
	 * **Alternatives**: if you need a placeholder that can display a message, consider using the [NonIdealState](./?path=/docs/ui-components-nonidealstate--documentation) component.
	 *
	 * @component
	 */

	import { Photo } from '@steeze-ui/heroicons';
	import { Icon } from '@steeze-ui/svelte-icon';
</script>

<div
	class="bg-color-ui-background-empty text-color-text-secondary w-full h-full flex items-center justify-center"
>
	<Icon src={Photo} class="h-8 w-8" />
</div>
