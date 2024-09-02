<script lang="ts">
	import { Button } from '@ldn-viz/ui';
	import { ChevronDown, ChevronLeft, ChevronRight, ChevronUp } from '@steeze-ui/heroicons';
	import { Icon } from '@steeze-ui/svelte-icon';
	import { getContext } from 'svelte';
	import { FLY_ANIMATION_OPTIONS } from '../themes/animations';
	import type { MapStore } from '../map/Map.svelte';

	type ClickEvent = MouseEvent | TouchEvent;
	type Handler = () => void;
	type Direction = 'left' | 'right' | 'up' | 'down';
	type MoveAmount = [number, number];

	const mapStore: MapStore = getContext('mapStore');

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

	const panUp = () => panHandler('up');
	const panDown = () => panHandler('down');
	const panLeft = () => panHandler('left');
	const panRight = () => panHandler('right');

	const panHandler = (direction: Direction) => {
		const moveAmount: MoveAmount = calcMoveAmount(direction);
		$mapStore?.panBy(moveAmount, FLY_ANIMATION_OPTIONS);
	};

	const calcMoveAmount = (direction: Direction): MoveAmount => {
		const rect = $mapStore?.getContainer().getBoundingClientRect();
		if (!rect) {
			return [0, 0];
		}

		const calcDistance = (size: number): number => size * 0.14;

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

		return [0, 0];
	};
</script>

<div class="flex flex-col invisible sm:visible">
	<div class="flex justify-center">
		<Button
			variant="square"
			emphasis="secondary"
			title="Pan up"
			class="pointer-events-auto"
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
			class="pointer-events-auto"
			on:click={newHandler(panLeft)}
		>
			<Icon src={ChevronLeft} class="w-8 h-8 pr-1 pl-0.5" />
		</Button>

		<div class="w-10" />

		<Button
			variant="square"
			emphasis="secondary"
			title="Pan right"
			class="pointer-events-auto"
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
			class="pointer-events-auto"
			on:click={newHandler(panDown)}
		>
			<Icon src={ChevronDown} class="w-8 h-8 pt-1 pb-0.5" />
		</Button>
	</div>
</div>
