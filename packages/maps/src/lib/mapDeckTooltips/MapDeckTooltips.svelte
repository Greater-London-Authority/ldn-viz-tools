<script lang="ts">
	/**
	 * The `MapDeckTooltips` component renders a tooltip for features rendered by Deck.gl, when they are hovered over.
	 * It accepts a configuration object, the keys are the layer ids for which Popovers should be rendered, and the  values specify how they should be rendered.
	 * For each layer, the output can be specified as a string constant, a function that is passed a feature and returns a string, or a custom Svelte component.
	 * @component
	 */

	import { mousedOverObject } from './stores';

	import { arrow } from 'svelte-floating-ui';
	import type { ClientRectObject } from 'svelte-floating-ui/core';
	import { offset, flip, shift } from 'svelte-floating-ui/dom';
	import { createFloatingActions } from 'svelte-floating-ui';
	import { type Writable, writable } from 'svelte/store';

	const [floatingRef, floatingContent] = createFloatingActions({
		strategy: 'fixed', //or absolute
		middleware: [offset(0), flip(), shift()]
	});

	let x = 0;
	let y = 0;

	const mousemove = (ev: MouseEvent) => {
		x = ev.clientX;
		y = ev.clientY;
	};

	$: getBoundingClientRect = (): ClientRectObject => {
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
	};

	const virtualElement = writable({ getBoundingClientRect });

	$: virtualElement.set({ getBoundingClientRect });

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
	/**
	 * List of layers. We need this so that we can remove a popover when the correpsodning layer is removed.
	 */
	export let layers = [];

	export let spec = {};

	let tooltipSpec: any;
	let layerObj: any;
	$: {
		if ($mousedOverObject && $mousedOverObject.feature) {
			tooltipSpec = spec[$mousedOverObject.layer.id];
			layerObj = layers.find((l) => l.id === $mousedOverObject?.layer?.id);
		} else {
			tooltipSpec = undefined;
			layerObj = undefined;
		}
	}

	function isConstructor(obj: any) {
		return !!obj.prototype && !!obj.prototype.constructor.name;
	}

	$: console.log({ layerObj, layers, feat: $mousedOverObject });
</script>

<svelte:window on:mousemove={mousemove} />

{#if layerObj && layerObj.visible !== false && $mousedOverObject && tooltipSpec}
	<div
		use:floatingContent={dynamicOptions}
		class:width={'100px'}
		style:z-index={9999}
		class="bg-core-grey-800 text-white p-3.5 pointer-events-none"
	>
		{#if typeof tooltipSpec === 'string'}
			{tooltipSpec}
		{:else if tooltipSpec && isConstructor(tooltipSpec)}
			<svelte:component this={tooltipSpec} feature={$mousedOverObject.feature} />
		{:else if typeof tooltipSpec === 'function'}
			{tooltipSpec($mousedOverObject.feature)}
		{/if}
	</div>
{/if}
