<script>
	import { getContext } from 'svelte';
	import { Button } from '@ldn-viz/ui';
	import { PlusSmall, MinusSmall } from '@steeze-ui/heroicons';
	import { Icon } from '@steeze-ui/svelte-icon';
	import { ZOOM_ANIMATION_OPTIONS } from '../themes/animations';

	const mapStore = getContext('mapStore');

	const zoomIn = () => $mapStore.zoomIn(ZOOM_ANIMATION_OPTIONS);
	const zoomOut = () => $mapStore.zoomOut(ZOOM_ANIMATION_OPTIONS);

	const newHandler = (handle) => {
		return (event) => {
			if (!$mapStore) {
				return;
			}

			handle();

			if (event.detail > 0) {
				$mapStore.getCanvas().focus();
			}
		};
	};
</script>

<div class="flex flex-col space-y-1 invisible sm:visible">
	<Button
		variant="square"
		emphasis="secondary"
		title="Zoom in"
		class="dark:bg-core-grey-800 dark:text-white hover:dark:bg-core-grey-500 pointer-events-auto"
		on:click={newHandler(zoomIn)}
	>
		<Icon src={PlusSmall} class="w-8 h-8 p-0.5" />
	</Button>
	<Button
		variant="square"
		emphasis="secondary"
		title="Zoom out"
		class="dark:bg-core-grey-800 dark:text-white hover:dark:bg-core-grey-500 pointer-events-auto"
		on:click={newHandler(zoomOut)}
	>
		<Icon src={MinusSmall} class="w-8 h-8 p-0.5" />
	</Button>
</div>
