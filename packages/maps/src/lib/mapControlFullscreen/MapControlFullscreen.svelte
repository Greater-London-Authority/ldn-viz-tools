<script context="module">
	const isPageEmbedded = () => window !== window.top;

	const fullscreenIsAllowed = () => {
		return isPageEmbedded() || document.fullscreenEnabled;
	};

	const enterFullscreen = (element = document.body) => {
		if (element.requestFullscreen) {
			element.requestFullscreen();
			return;
		}

		if (element.webkitRequestFullscreen) {
			element.webkitRequestFullscreen(); // Safari
		}
	};

	const exitFullscreen = () => {
		if (document.exitFullscreen) {
			document.exitFullscreen();
			return;
		}

		if (document.webkitExitFullscreen) {
			document.webkitExitFullscreen(); // Safari
		}
	};

	const toggleFullscreen = () => {
		document.fullscreen ? exitFullscreen() : enterFullscreen();
	};

	const MODE_EMBED = {
		title: 'Full page map',
		icon: ArrowTopRightOnSquare,
		apply: () => (window.top.location.href = window.location.href)
	};

	const MODE_API = {
		title: 'Toggle fullscreen',
		icon: ArrowsPointingOut,
		apply: toggleFullscreen
	};
</script>

<script>
	import { onMount } from 'svelte';
	import { Button } from '@ldn-viz/ui';
	import { ArrowsPointingOut, ArrowTopRightOnSquare } from '@steeze-ui/heroicons';
	import { Icon } from '@steeze-ui/svelte-icon';

	export let map;
	let mode = null;

	onMount(() => {
		if (fullscreenIsAllowed()) {
			mode = isPageEmbedded() ? MODE_EMBED : MODE_API;
		}
	});

	const clickHandler = () => {
		if (map && mode) {
			mode.apply();
			map.getCanvas().focus();
		}
	};

	const keyHandler = (e) => {
		if (e.key === 'Enter' && mode) {
			mode.apply();
		}
	};
</script>

{#if mode}
	<div class="flex flex-col space-y-1 invisible sm:visible">
		<Button
			variant="square"
			emphasis="secondary"
			title={mode.title}
			class="dark:bg-core-grey-800 dark:text-white hover:dark:bg-core-grey-500"
			on:click={clickHandler}
			on:keypress={keyHandler}
		>
			<Icon src={mode.icon} class="w-8 h-8" />
		</Button>
	</div>
{/if}
