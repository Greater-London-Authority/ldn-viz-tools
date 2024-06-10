<script context="module">
	import { writable } from 'svelte/store';
	import { ArrowsPointingIn, ArrowsPointingOut, ArrowTopRightOnSquare } from '@steeze-ui/heroicons';

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

<script>
	import { onMount, getContext } from 'svelte';
	import { Button } from '@ldn-viz/ui';
	import { Icon } from '@steeze-ui/svelte-icon';

	const mapStore = getContext('mapStore');

	let mode = null;

	onMount(() => {
		if (isFullscreenAllowed()) {
			mode = isPageEmbedded() ? MODE_EMBED : MODE_API;
		}
	});

	const handle = (event) => {
		if (!$mapStore || !mode) {
			return;
		}

		$isFullscreen ? mode.exitFullscreen() : mode.enterFullscreen();

		if (event.detail > 0) {
			$mapStore.getCanvas().focus();
		}
	};
</script>

{#if mode}
	<div class="flex flex-col space-y-1 invisible sm:visible">
		<Button
			variant="square"
			emphasis="secondary"
			title={$isFullscreen ? mode.titleIn : mode.titleOut}
			class="dark:bg-core-grey-800 dark:text-white hover:dark:bg-core-grey-500 pointer-events-auto"
			on:click={handle}
		>
			<Icon src={$isFullscreen ? mode.iconIn : mode.iconOut} class="w-8 h-8 p-1" />
		</Button>
	</div>
{/if}
