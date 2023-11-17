<script>
	import { onMount } from 'svelte';
	import { Button } from '@ldn-viz/ui';
	import { PlusSmall, MinusSmall } from '@steeze-ui/heroicons';
	import { Icon } from '@steeze-ui/svelte-icon';
 
// https://easings.net/
export const easeOutQuart = (t) => 1 - Math.pow(1 - t, 4);


export const SLOW_ANIMATION_OPTIONS = Object.freeze({
	animate: true,
	freezeElevation: true,
	duration: 1000,
	easing: easeOutQuart
});


	export let map = null

	const handler = (e, func) => {
		if (map) {
			map[func](SLOW_ANIMATION_OPTIONS);
			map.getCanvas().focus();
		}
	};

	const zoomIn = (e) => handler(e, 'zoomIn');
	const zoomOut = (e) => handler(e, 'zoomOut');

	const newKeyHandler = (handler) => {
		return (e) => {
			if (e.key === 'Enter') {
				handler(e);
			}
		};
	};
</script>

<div class="flex flex-col space-y-1">
	<Button
		variant="square"
		emphasis="secondary"
		title="Zoom in"
					on:click={zoomIn}
			on:keypress={newKeyHandler(zoomIn)}
	>
		<Icon src={PlusSmall} class="w-8 h-8" />
	</Button>
	<Button
		variant="square"
		emphasis="secondary"
		title="Zoom out"
					on:click={zoomOut}
			on:keypress={newKeyHandler(zoomOut)}
	>
		<Icon src={MinusSmall} class="w-8 h-8" />
	</Button>
</div>
