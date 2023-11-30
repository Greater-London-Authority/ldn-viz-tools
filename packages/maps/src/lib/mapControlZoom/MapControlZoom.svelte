<script>
	import { Button } from '@ldn-viz/ui';
	import { PlusSmall, MinusSmall } from '@steeze-ui/heroicons';
	import { Icon } from '@steeze-ui/svelte-icon';
	import { ZOOM_ANIMATION_OPTIONS } from '../themes/animations';

	export let map;

	const zoomIn = (e) => {
		if (map) {
			map.zoomIn(ZOOM_ANIMATION_OPTIONS);
			map.getCanvas().focus();
		}
	};

	const zoomOut = (e) => {
		if (map) {
			map.zoomOut(ZOOM_ANIMATION_OPTIONS);
			map.getCanvas().focus();
		}
	};

	const newKeyHandler = (handler) => {
		return (e) => {
			if (e.key === 'Enter') {
				handler(e);
			}
		};
	};
</script>

<div class="flex flex-col space-y-1 invisible sm:visible">
	<Button
		variant="square"
		emphasis="secondary"
		title="Zoom in"
		class="dark:bg-core-grey-800 dark:text-white hover:dark:bg-core-grey-500"
		on:click={zoomIn}
		on:keypress={newKeyHandler(zoomIn)}
	>
		<Icon src={PlusSmall} class="w-8 h-8" />
	</Button>
	<Button
		variant="square"
		emphasis="secondary"
		title="Zoom out"
		class="dark:bg-core-grey-800 dark:text-white hover:dark:bg-core-grey-500"
		on:click={zoomOut}
		on:keypress={newKeyHandler(zoomOut)}
	>
		<Icon src={MinusSmall} class="w-8 h-8" />
	</Button>
</div>
