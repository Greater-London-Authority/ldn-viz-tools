<script lang="ts">
	/**
	 * The `<ScrollArea>` component scrolls its content vertically and draws its own scrollbar over the
	 * content, so the scrollbar takes no width. The scrollbar shows while the pointer is over the area.
	 * It is built on the `bits-ui` `ScrollArea` primitive, and is internal to `@ldn-viz/ui`.
	 *
	 * Its styles match the `.scroll-area` class in `@ldn-viz/themes`. Use that class for a scrolling
	 * element that doesn't need a component.
	 *
	 * @component
	 */

	import { ScrollArea } from 'bits-ui';
	import type { Snippet } from 'svelte';
	import { classNames } from '../utils/classNames.js';

	interface Props {
		/**
		 * Classes for the outer element. It needs a height, usually from `h-full` or a flex parent.
		 */
		class?: string;
		children?: Snippet;
	}

	let { class: classes = '', children }: Props = $props();
</script>

<ScrollArea.Root type="hover" class={classNames('overflow-hidden', classes)}>
	<ScrollArea.Viewport class="h-full w-full">
		{@render children?.()}
	</ScrollArea.Viewport>
	<ScrollArea.Scrollbar orientation="vertical" class="flex w-2 touch-none select-none p-px">
		<ScrollArea.Thumb
			class="flex-1 rounded-full bg-color-border-muted hover:bg-color-border active:bg-color-border"
		/>
	</ScrollArea.Scrollbar>
</ScrollArea.Root>
