<script context="module" lang="ts">
	import { ArrowsPointingIn, ArrowsPointingOut, ArrowTopRightOnSquare } from '@steeze-ui/heroicons';
	import { writable } from 'svelte/store';
	import type { IconSource } from '@steeze-ui/heroicons';

	interface HTMLFullscreenElement {
		requestFullscreen?: () => Promise<void>;
		exitFullscreen?: () => Promise<void>;
		webkitRequestFullscreen?: () => Promise<void>;
		webkitExitFullscreen?: () => Promise<void>;
	}

	interface FullscreenControlMode {
		enterTitle: string;
		enterIcon: IconSource;
		enterFullscreen: () => void;

		exitTitle?: string;
		exitIcon?: IconSource;
		exitFullscreen?: () => void;
	}

	const isFullscreen = writable(false);

	const isPageEmbedded = () => window !== window.top;

	const isFullscreenAllowed = () => {
		return isPageEmbedded() || document.fullscreenEnabled;
	};

	const MODE_EMBED: FullscreenControlMode = {
		enterTitle: 'View as full page',
		enterIcon: ArrowTopRightOnSquare,
		enterFullscreen: () => {
			if (window.top) {
				window.top.location.href = window.location.href;
			}
		}
	};

	const MODE_API: FullscreenControlMode = {
		enterTitle: 'Enter fullscreen',
		enterIcon: ArrowsPointingOut,
		enterFullscreen: () => {
			const updateState = () => isFullscreen.set(true);
			const element = document.body as unknown as HTMLFullscreenElement;

			if (element.requestFullscreen) {
				element.requestFullscreen().then(updateState);
				return;
			}

			if (element.webkitRequestFullscreen) {
				element.webkitRequestFullscreen().then(updateState);
			}
		},

		exitTitle: 'Exit fullscreen',
		exitIcon: ArrowsPointingIn,
		exitFullscreen: () => {
			const updateState = () => isFullscreen.set(false);
			const element = document as unknown as HTMLFullscreenElement;

			if (element.exitFullscreen) {
				element.exitFullscreen().then(updateState);
				return;
			}

			if (element.webkitExitFullscreen) {
				element.webkitExitFullscreen().then(updateState);
			}
		}
	};
</script>

<script lang="ts">
	import { Button } from '@ldn-viz/ui';
	import { Icon } from '@steeze-ui/svelte-icon';
	import { getContext, onMount } from 'svelte';

	import type { MapStore } from '../map/Map.svelte';

	type ClickEvent = MouseEvent | TouchEvent;

	const mapStore: MapStore = getContext('mapStore');

	let mode: null | FullscreenControlMode = null;

	onMount(() => {
		if (isFullscreenAllowed()) {
			mode = isPageEmbedded() ? MODE_EMBED : MODE_API;
		}
	});

	const handle = (event: ClickEvent) => {
		if (!$mapStore || !mode) {
			return;
		}

		if (!$isFullscreen) {
			mode.enterFullscreen();
		} else if (mode.exitFullscreen) {
			mode.exitFullscreen();
		}

		if (event.detail > 0) {
			$mapStore?.getCanvas().focus();
		}
	};
</script>

{#if mode}
	<div class="flex flex-col space-y-1 invisible sm:visible">
		<Button
			variant="square"
			emphasis="secondary"
			title={$isFullscreen && mode.exitTitle ? mode.exitTitle : mode.enterTitle}
			class="pointer-events-auto"
			on:click={handle}
		>
			<Icon
				src={$isFullscreen && mode.exitIcon ? mode.exitIcon : mode.enterIcon}
				class="w-8 h-8 p-1"
			/>
		</Button>
	</div>
{/if}
