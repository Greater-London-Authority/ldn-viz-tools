<script>
	import { Button } from '@ldn-viz/ui';
	import { ChevronDown, ChevronLeft, ChevronRight, ChevronUp } from '@steeze-ui/heroicons';
	import { Icon } from '@steeze-ui/svelte-icon';
	import { FLY_ANIMATION_OPTIONS } from '../themes/animations';

	export let map;

	const newHandler = (handle) => {
		return (event) => {
			if (!map) {
				return;
			}

			handle();

			if (event.detail > 0) {
				map.getCanvas().focus();
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
			on:click={newHandler(panUp)}
		>
			<Icon src={ChevronUp} class="w-8 h-8 p-0.5" />
		</Button>
	</div>

	<div class="flex space-x-1">
		<Button
			variant="square"
			emphasis="secondary"
			title="Pan left"
			class="dark:bg-core-grey-800 dark:text-white hover:dark:bg-core-grey-500"
			on:click={newHandler(panLeft)}
		>
			<Icon src={ChevronLeft} class="w-8 h-8 p-0.5" />
		</Button>

		<Button
			variant="square"
			emphasis="secondary"
			title="Pan down"
			class="dark:bg-core-grey-800 dark:text-white hover:dark:bg-core-grey-500"
			on:click={newHandler(panDown)}
		>
			<Icon src={ChevronDown} class="w-8 h-8 p-0.5" />
		</Button>

		<Button
			variant="square"
			emphasis="secondary"
			title="Pan right"
			class="dark:bg-core-grey-800 dark:text-white hover:dark:bg-core-grey-500"
			on:click={newHandler(panRight)}
		>
			<Icon src={ChevronRight} class="w-8 h-8 p-0.5" />
		</Button>
	</div>
</div>
