<script lang="ts">
	import { Button } from '@ldn-viz/ui';
	import { MinusSmall, PlusSmall } from '@steeze-ui/heroicons';
	import { Icon } from '@steeze-ui/svelte-icon';
	import { getContext } from 'svelte';
	import { ZOOM_ANIMATION_OPTIONS } from '../themes/animations';

	import type { MapStore } from '../map/Map.svelte';

	type Handler = () => void;
	type ClickEvent = MouseEvent | TouchEvent;

	const mapStore: MapStore = getContext('mapStore');

	const zoomIn = () => $mapStore?.zoomIn(ZOOM_ANIMATION_OPTIONS);
	const zoomOut = () => $mapStore?.zoomOut(ZOOM_ANIMATION_OPTIONS);

	const newHandler = (handle: Handler) => {
		return (event: ClickEvent) => {
			if (!$mapStore) {
				return;
			}

			handle();

			if (event.detail > 0) {
				$mapStore?.getCanvas().focus();
			}
		};
	};
</script>

<div class="flex flex-col space-y-1 invisible sm:visible">
	<Button
		variant="square"
		emphasis="secondary"
		title="Zoom in"
		class="pointer-events-auto shadow dark:border dark:border-color-ui-border-primary"
		onclick={newHandler(zoomIn)}
	>
		<Icon src={PlusSmall} class="w-8 h-8 p-0.5" />
	</Button>
	<Button
		variant="square"
		emphasis="secondary"
		title="Zoom out"
		class="pointer-events-auto shadow dark:border dark:border-color-ui-border-primary"
		onclick={newHandler(zoomOut)}
	>
		<Icon src={MinusSmall} class="w-8 h-8 p-0.5" />
	</Button>
</div>
