<script lang="ts">
	/**
	 * The `<ScrollArea>` component scrolls its content and draws its own scrollbars over the content,
	 * so the scrollbars take no space. The scrollbars fade in while the pointer is over the area and
	 * fade out when it leaves. It is built on the `bits-ui` `ScrollArea` primitive, and is internal
	 * to `@ldn-viz/ui`.
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
		/**
		 * The direction the content scrolls in. `both` draws a vertical and a horizontal scrollbar.
		 */
		orientation?: 'vertical' | 'horizontal' | 'both';
		children?: Snippet;
	}

	let { class: classes = '', orientation = 'vertical', children }: Props = $props();

	const scrollbars = $derived(
		orientation === 'both' ? (['vertical', 'horizontal'] as const) : ([orientation] as const)
	);
</script>

<ScrollArea.Root type="hover" class={classNames('overflow-hidden', classes)}>
	<ScrollArea.Viewport class="h-full w-full">
		{@render children?.()}
	</ScrollArea.Viewport>
	{#each scrollbars as bar (bar)}
		<ScrollArea.Scrollbar
			orientation={bar}
			class={classNames(
				'scroll-area-bar flex touch-none select-none rounded-full bg-color-surface-muted p-px',
				bar === 'vertical' ? 'w-2' : 'h-2 flex-col'
			)}
		>
			<ScrollArea.Thumb
				class="flex-1 rounded-full bg-color-border-muted hover:bg-color-border active:bg-color-border"
			/>
		</ScrollArea.Scrollbar>
	{/each}
	{#if orientation === 'both'}
		<ScrollArea.Corner />
	{/if}
</ScrollArea.Root>

<style>
	/* bits-ui keeps the scrollbar mounted until its animations finish, so the fade-out plays. */
	:global(.scroll-area-bar[data-state='visible']) {
		animation: scroll-area-fade-in 150ms ease-out;
	}

	:global(.scroll-area-bar[data-state='hidden']) {
		animation: scroll-area-fade-out 150ms ease-in forwards;
	}

	@media (prefers-reduced-motion: reduce) {
		:global(.scroll-area-bar[data-state]) {
			animation: none;
		}
	}

	@keyframes -global-scroll-area-fade-in {
		from {
			opacity: 0;
		}
	}

	@keyframes -global-scroll-area-fade-out {
		to {
			opacity: 0;
		}
	}
</style>
