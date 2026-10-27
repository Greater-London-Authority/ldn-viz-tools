<script lang="ts">
	/**
	 * The `<PlaceholderImage>` component fills its container with a muted panel and a photo icon, to stand in for an image that hasn't loaded or isn't available yet.
	 * It is decorative: the icon is hidden from screen readers, so give the surrounding content any text a reader needs.
	 *
	 * @component
	 */

	import { Photo } from '@steeze-ui/heroicons';
	import { Icon } from '@steeze-ui/svelte-icon';
</script>

<div
	class="flex h-full w-full items-center justify-center bg-color-surface-empty-muted text-color-text-muted"
>
	<Icon src={Photo} class="h-8 w-8" aria-hidden="true" />
</div>
