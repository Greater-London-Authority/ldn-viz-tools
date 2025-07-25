<script lang="ts">
	/**
	 * The `MapDeckTooltips` component renders a tooltip for features rendered by Deck.gl, when they are hovered over.
	 * It accepts a configuration object, the keys are the layer ids for which Popovers should be rendered, and the  values specify how they should be rendered.
	 * For each layer, the output can be specified as a string constant, a function that is passed a feature and returns a string, or a custom Svelte component.
	 * @component
	 */

	import type { Layer } from '@deck.gl/core/typed';
	import { mousedOverObject } from './stores';

	import { arrow, createFloatingActions } from 'svelte-floating-ui';
	import type { ClientRectObject } from 'svelte-floating-ui/core';
	import { flip, offset, shift } from 'svelte-floating-ui/dom';
	import { type Writable, writable } from 'svelte/store';

	const [floatingRef, floatingContent] = createFloatingActions({
		strategy: 'fixed', //or absolute
		middleware: [offset(0), flip(), shift()]
	});

	let x = $state(0);
	let y = $state(0);

	const mousemove = (ev: MouseEvent) => {
		x = ev.clientX;
		y = ev.clientY;
	};

	let getBoundingClientRect = $derived((): ClientRectObject => {
		return {
			x,
			y,
			top: y,
			left: x,
			bottom: y,
			right: x,
			width: 0,
			height: 0
		};
	});

	const virtualElement = writable({ getBoundingClientRect });

	$effect(() => {
		virtualElement.set({ getBoundingClientRect });
	});

	floatingRef(virtualElement);

	const arrowRef: Writable<HTMLElement> = writable();

	let dynamicOptions = {
		middleware: [offset(10), flip(), shift(), arrow({ element: arrowRef })],
		onComputed({ placement, middlewareData }: { placement: string; middlewareData }) {
			const { x, y } = middlewareData.arrow || {};
			const staticSide = {
				top: 'bottom',
				right: 'left',
				bottom: 'top',
				left: 'right'
			}[placement.split('-')[0]];

			// eslint-disable-next-line @typescript-eslint/no-unused-expressions
			$arrowRef &&
				Object.assign($arrowRef.style, {
					left: x != null ? `${x}px` : '',
					top: y != null ? `${y}px` : '',
					[staticSide!.toString()]: '-8px'
				});
		}
	};

	///

	interface Props {
		/**
		 * List of layers. We need this so that we can remove a popover when the correpsodning layer is removed.
		 */
		layers?: Layer[];
		spec?: Record<string, any>;
	}

	let { layers = [], spec = {} }: Props = $props();

	let tooltipSpec: any = $derived(
		$mousedOverObject && $mousedOverObject.feature && $mousedOverObject.layer
			? spec[$mousedOverObject.layer.id]
			: undefined
	);

	let layerObj: any = $derived(
		$mousedOverObject && $mousedOverObject.feature && $mousedOverObject.layer
			? layers.find((l) => l.id === $mousedOverObject?.layer?.id)
			: undefined
	);

	function isConstructor(obj: any) {
		return !!obj.prototype && !!obj.prototype.constructor.name;
	}
</script>

<svelte:window onmousemove={mousemove} />

{#if layerObj && layerObj.visible !== false && $mousedOverObject && tooltipSpec}
	<div
		use:floatingContent={dynamicOptions}
		class:width={'100px'}
		style:z-index={9999}
		class="border-color-ui-border-secondary bg-color-container-level-0 pointer-events-none border p-2 text-sm shadow-lg"
	>
		{#if typeof tooltipSpec === 'string'}
			{tooltipSpec}
		{:else if tooltipSpec && isConstructor(tooltipSpec)}
			{@const SvelteComponent = tooltipSpec}
			<SvelteComponent feature={$mousedOverObject.feature} />
		{:else if typeof tooltipSpec === 'function'}
			{tooltipSpec($mousedOverObject.feature)}
		{/if}
	</div>
{/if}
