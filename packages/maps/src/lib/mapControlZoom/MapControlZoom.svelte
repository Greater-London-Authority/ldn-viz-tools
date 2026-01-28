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

<div class="invisible flex flex-col space-y-1 sm:visible">
	<Button
		variant="square"
		emphasis="secondary"
		title="Zoom in"
		class="dark:border-color-border pointer-events-auto shadow dark:border"
		onclick={newHandler(zoomIn)}
	>
		<Icon src={PlusSmall} class="h-8 w-8 p-0.5" />
	</Button>
	<Button
		variant="square"
		emphasis="secondary"
		title="Zoom out"
		class="dark:border-color-border pointer-events-auto shadow dark:border"
		onclick={newHandler(zoomOut)}
	>
		<Icon src={MinusSmall} class="h-8 w-8 p-0.5" />
	</Button>
</div>
