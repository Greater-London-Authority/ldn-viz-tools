<script>
	import { Button } from '@ldn-viz/ui';
	import { ChevronDown, ChevronLeft, ChevronRight, ChevronUp } from '@steeze-ui/heroicons';
	import { Icon } from '@steeze-ui/svelte-icon';
	import { getContext } from 'svelte';
	import { FLY_ANIMATION_OPTIONS } from '../themes/animations';

	const mapStore = getContext('mapStore');

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

	const panUp = () => panHandler('up');
	const panDown = () => panHandler('down');
	const panLeft = () => panHandler('left');
	const panRight = () => panHandler('right');

	const panHandler = (direction) => {
		const moveAmount = calcMoveAmount(direction);
		$mapStore.panBy(moveAmount, FLY_ANIMATION_OPTIONS);
	};

	const calcMoveAmount = (direction) => {
		const rect = $mapStore.getContainer().getBoundingClientRect();
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

<div class="flex flex-col invisible sm:visible">
	<div class="flex justify-center">
		<Button
			variant="square"
			emphasis="secondary"
			title="Pan up"
			class="pointer-events-auto shadow dark:border dark:border-color-ui-border-primary"
			on:click={newHandler(panUp)}
		>
			<Icon src={ChevronUp} class="w-8 h-8 pb-1 pt-0.5" />
		</Button>
	</div>

	<div class="flex">
		<Button
			variant="square"
			emphasis="secondary"
			title="Pan left"
			class="pointer-events-auto shadow dark:border dark:border-color-ui-border-primary"
			on:click={newHandler(panLeft)}
		>
			<Icon src={ChevronLeft} class="w-8 h-8 pr-1 pl-0.5" />
		</Button>

		<div class="w-[38px]" />

		<Button
			variant="square"
			emphasis="secondary"
			title="Pan right"
			class="pointer-events-auto shadow dark:border dark:border-color-ui-border-primary"
			on:click={newHandler(panRight)}
		>
			<Icon src={ChevronRight} class="w-8 h-8 pl-1 pr-0.5" />
		</Button>
	</div>

	<div class="flex justify-center">
		<Button
			variant="square"
			emphasis="secondary"
			title="Pan down"
			class="pointer-events-auto shadow dark:border dark:border-color-ui-border-primary"
			on:click={newHandler(panDown)}
		>
			<Icon src={ChevronDown} class="w-8 h-8 pt-1 pb-0.5" />
		</Button>
	</div>
</div>
