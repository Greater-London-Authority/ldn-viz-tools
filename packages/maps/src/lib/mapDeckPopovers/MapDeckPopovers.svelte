<script lang="ts">
	/**
	 * The `MapDeckPopovers` component renders a popover for features rendered by Deck.gl, when they are clicked on.
	 * It accepts a configuration object, the keys are the layer ids for which Popovers should be rendered, and the  values specify how they should be rendered.
	 * For each layer, the output can be specified as a string constant, a function that is passed a feature and returns a string, or a custom Svelte component.
	 * @component
	 */
	import type { Layer } from '@deck.gl/core/typed';
	import { clickedFeature, clickedLayer } from './stores';
	import DefaultPopover from './DefaultPopover.svelte';
	import MapPopover from '../mapPopover/MapPopover.svelte';

	interface Props {
		spec?: Record<string, any>;
		/**
		 * List of layers, as provided to deck.gl.
		 */
		layers?: Layer[];
	}

	let { spec = {}, layers = [] }: Props = $props();
	let tooltipSpec: any = $derived(spec[$clickedLayer]);

	function isConstructor(obj: any) {
		return !!obj.prototype && !!obj.prototype.constructor.name;
	}
	let layerObj = $derived(layers.find((l) => l.id === $clickedLayer));
	// layers.find(l => l.id === $clickedLayer)?.visible;
</script>

{#if layerObj && layerObj.visible !== false && $clickedFeature && $clickedLayer}
	{#if typeof tooltipSpec === 'string'}
		<MapPopover
			feature={$clickedFeature}
			layer={$clickedLayer}
			popup={DefaultPopover}
			msgString={tooltipSpec}
		>
			{tooltipSpec}
		</MapPopover>
	{:else if tooltipSpec && isConstructor(tooltipSpec)}
		<MapPopover feature={$clickedFeature} layer={$clickedLayer} popup={tooltipSpec} />
	{:else if typeof tooltipSpec === 'function'}
		<MapPopover
			feature={$clickedFeature}
			layer={$clickedLayer}
			popup={DefaultPopover}
			msgString={tooltipSpec($clickedFeature)}
		/>
	{/if}
{/if}
