<script>
	import { Button } from '@ldn-viz/ui';
	import { PlusSmall, MinusSmall } from '@steeze-ui/heroicons';
	import { Icon } from '@steeze-ui/svelte-icon';
	import { ZOOM_ANIMATION_OPTIONS } from '../themes/animations';

	export let map;

	const zoomIn = () => map.zoomIn(ZOOM_ANIMATION_OPTIONS);
	const zoomOut = () => map.zoomOut(ZOOM_ANIMATION_OPTIONS);

	const newClickHandler = (handler) => {
		return () => {
			if (map) {
				handler();
				map.getCanvas().focus();
			}
		};
	};

	const newKeyHandler = (handler) => {
		return (e) => {
			if (map && e.key === 'Enter') {
				handler();
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
		on:click={newClickHandler(zoomIn)}
		on:keypress={newKeyHandler(zoomIn)}
	>
		<Icon src={PlusSmall} class="w-8 h-8 p-0.5" />
	</Button>
	<Button
		variant="square"
		emphasis="secondary"
		title="Zoom out"
		class="dark:bg-core-grey-800 dark:text-white hover:dark:bg-core-grey-500"
		on:click={newClickHandler(zoomOut)}
		on:keypress={newKeyHandler(zoomOut)}
	>
		<Icon src={MinusSmall} class="w-8 h-8 p-0.5" />
	</Button>
</div>
