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

<div class="invisible flex flex-col sm:visible">
	<div class="flex justify-center">
		<Button
			variant="square"
			emphasis="muted"
			title="Pan up"
			class="dark:border-color-border pointer-events-auto shadow dark:border"
			onclick={newHandler(panUp)}
		>
			<Icon src={ChevronUp} class="h-8 w-8 pb-1 pt-0.5" />
		</Button>
	</div>

	<div class="flex">
		<Button
			variant="square"
			emphasis="muted"
			title="Pan left"
			class="dark:border-color-border pointer-events-auto shadow dark:border"
			onclick={newHandler(panLeft)}
		>
			<Icon src={ChevronLeft} class="h-8 w-8 pl-0.5 pr-1" />
		</Button>

		<div class="w-[38px]"></div>

		<Button
			variant="square"
			emphasis="muted"
			title="Pan right"
			class="dark:border-color-border pointer-events-auto shadow dark:border"
			onclick={newHandler(panRight)}
		>
			<Icon src={ChevronRight} class="h-8 w-8 pl-1 pr-0.5" />
		</Button>
	</div>

	<div class="flex justify-center">
		<Button
			variant="square"
			emphasis="muted"
			title="Pan down"
			class="dark:border-color-border pointer-events-auto shadow dark:border"
			onclick={newHandler(panDown)}
		>
			<Icon src={ChevronDown} class="h-8 w-8 pb-0.5 pt-1" />
		</Button>
	</div>
</div>
