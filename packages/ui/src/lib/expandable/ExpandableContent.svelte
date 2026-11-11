<script lang="ts">
	/**
	 * `Expandable.Content` — the part of an item shown when it is open. The item's `mount`
	 * sets when its children are in the DOM. Height animates on open and close, except
	 * under `prefers-reduced-motion`.
	 *
	 * @component
	 */
	import { Accordion } from 'bits-ui';
	import type { Snippet } from 'svelte';
	import { getItemContext } from './context.js';

	interface Props {
		/** Classes on the inner content box. Put padding here so the closed height is zero. */
		class?: string;
		children?: Snippet;
	}

	let { class: classes = '', children }: Props = $props();

	const item = getItemContext();
	const DURATION = 200;

	let rendered = $state(false);

	$effect(() => {
		if (item.open) rendered = true;
	});

	const show = $derived(item.mount === 'always' || item.open || rendered);

	// No visible change: keeps the content in the DOM until the close animation ends.
	const hold = (_node: Element) => ({ duration: DURATION });
</script>

<!--
	bits-ui sets transition-duration to 0s on its content element while it measures, so the
	transition is on an inner element.
-->
<Accordion.Content forceMount={item.mount !== 'always'} hiddenUntilFound={item.mount === 'always'}>
	<div
		class="grid transition-[grid-template-rows,visibility] ease-out motion-reduce:transition-none"
		style:grid-template-rows={item.open ? '1fr' : '0fr'}
		style:visibility={item.open ? 'visible' : 'hidden'}
		style:transition-duration="{DURATION}ms"
		inert={!item.open}
	>
		<div class="min-h-0 overflow-hidden">
			<div class={classes}>
				{#if item.mount === 'open'}
					{#if item.open}<div out:hold>{@render children?.()}</div>{/if}
				{:else if show}
					{@render children?.()}
				{/if}
			</div>
		</div>
	</div>
</Accordion.Content>
