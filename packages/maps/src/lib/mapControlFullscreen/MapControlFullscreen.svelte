<script module lang="ts">
	import { ArrowsPointingIn, ArrowsPointingOut, ArrowTopRightOnSquare } from '@steeze-ui/heroicons';
	import { writable } from 'svelte/store';

	const isFullscreen = writable(false);

	const isPageEmbedded = () => window !== window.top;

	const isFullscreenAllowed = () => {
		return isPageEmbedded() || document.fullscreenEnabled;
	};

	const MODE_EMBED = {
		titleOut: 'View as full page',
		iconOut: ArrowTopRightOnSquare,
		enterFullscreen: () => (window.top.location.href = window.location.href)
	};

	const MODE_API = {
		titleOut: 'Enter fullscreen',
		titleIn: 'Exit fullscreen',
		iconOut: ArrowsPointingOut,
		iconIn: ArrowsPointingIn,
		enterFullscreen: (element = document.body) => {
			const updateState = () => isFullscreen.set(true);

			if (element.requestFullscreen) {
				element.requestFullscreen().then(updateState);
				return;
			}

			if (element.webkitRequestFullscreen) {
				element.webkitRequestFullscreen().then(updateState); // Safari
			}
		},
		exitFullscreen: () => {
			const updateState = () => isFullscreen.set(false);

			if (document.exitFullscreen) {
				document.exitFullscreen().then(updateState);
				return;
			}

			if (document.webkitExitFullscreen) {
				document.webkitExitFullscreen().then(updateState); // Safari
			}
		}
	};
</script>

<script lang="ts">
	import type { MapStore } from '$lib/map/Map.svelte';
	import { Button } from '@ldn-viz/ui';
	import { Icon } from '@steeze-ui/svelte-icon';
	import { getContext, onMount } from 'svelte';

	const mapStore: MapStore = getContext('mapStore');

	let mode: any = $state(null);

	onMount(() => {
		if (isFullscreenAllowed()) {
			mode = isPageEmbedded() ? MODE_EMBED : MODE_API;
		}
	});

	const handle = (event: UIEvent) => {
		if (!$mapStore || !mode) {
			return;
		}

		// eslint-disable-next-line @typescript-eslint/no-unused-expressions
		$isFullscreen ? mode.exitFullscreen() : mode.enterFullscreen();

		if (event.detail > 0) {
			$mapStore.getCanvas().focus();
		}
	};
</script>

{#if mode}
	<div
		class="dark:border-color-border invisible flex flex-col space-y-1 shadow sm:visible dark:border"
	>
		<Button
			variant="square"
			emphasis="muted"
			title={$isFullscreen ? mode.titleIn : mode.titleOut}
			class="pointer-events-auto"
			onclick={handle}
		>
			<Icon src={$isFullscreen ? mode.iconIn : mode.iconOut} class="h-8 w-8 p-1" />
		</Button>
	</div>
{/if}
