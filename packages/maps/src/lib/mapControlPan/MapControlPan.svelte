<script>
	import { Button } from '@ldn-viz/ui';
	import { ChevronDown, ChevronLeft, ChevronRight, ChevronUp } from '@steeze-ui/heroicons';
	import { Icon } from '@steeze-ui/svelte-icon';
	import { FLY_ANIMATION_OPTIONS } from '../themes/animations';

	export let map;

	const newClickHandler = (handler) => {
		return (e) => {
			if (map) {
				handler();
				map.getCanvas().focus();
			}
		};
	};

	const newKeyHandler = (handler) => {
		return (e) => {
			if (e.key === 'Enter') {
				if (map) {
					handler();
				}
			}
		};
	};

	const panUp = () => panHandler('up');
	const panDown = () => panHandler('down');
	const panLeft = () => panHandler('left');
	const panRight = () => panHandler('right');

	const panHandler = (direction) => {
		const moveAmount = calcMoveAmount(direction);
		map.panBy(moveAmount, FLY_ANIMATION_OPTIONS);
	};

	const calcMoveAmount = (direction) => {
		const rect = map.getContainer().getBoundingClientRect();
		const calcDistance = (size) => size * 0.14;

		switch (direction) {
			case 'left':
				return [-calcDistance(rect.width), 0];
			case 'right':
				return [calcDistance(rect.width), 0];
			case 'up':
				return [0, -calcDistance(rect.height)];
			case 'down':
				return [0, calcDistance(rect.height)];
		}
	};
</script>

<div class="flex flex-col space-y-1 invisible sm:visible">
	<div class="flex justify-center">
		<Button
			variant="square"
			emphasis="secondary"
			title="Pan up"
			class="dark:bg-core-grey-800 dark:text-white hover:dark:bg-core-grey-500"
			on:click={newClickHandler(panUp)}
			on:keypress={newKeyHandler(panUp)}
		>
			<Icon src={ChevronUp} class="w-8 h-8" />
		</Button>
	</div>

	<div class="flex space-x-1">
		<Button
			variant="square"
			emphasis="secondary"
			title="Pan left"
			class="dark:bg-core-grey-800 dark:text-white hover:dark:bg-core-grey-500"
			on:click={newClickHandler(panLeft)}
			on:keypress={newKeyHandler(panLeft)}
		>
			<Icon src={ChevronLeft} class="w-8 h-8" />
		</Button>

		<Button
			variant="square"
			emphasis="secondary"
			title="Pan down"
			class="dark:bg-core-grey-800 dark:text-white hover:dark:bg-core-grey-500"
			on:click={newClickHandler(panDown)}
			on:keypress={newKeyHandler(panDown)}
		>
			<Icon src={ChevronDown} class="w-8 h-8" />
		</Button>

		<Button
			variant="square"
			emphasis="secondary"
			title="Pan right"
			class="dark:bg-core-grey-800 dark:text-white hover:dark:bg-core-grey-500"
			on:click={newClickHandler(panRight)}
			on:keypress={newKeyHandler(panRight)}
		>
			<Icon src={ChevronRight} class="w-8 h-8" />
		</Button>
	</div>
</div>
