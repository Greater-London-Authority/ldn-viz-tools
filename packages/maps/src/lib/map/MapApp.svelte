<script>
	import { onMount } from 'svelte';

	export let classes = '';

	const dev = import.meta.env.DEV;
	let noscript = true;

	onMount(() => {
		noscript = false;
	});
</script>

<div
	class="bg-color-container-background-level-1 w-[100dvw] h-[100dvh] overflow-hidden flex flex-col dark {classes}"
>
	<slot name="header" />

	<main class="grow overflow-hidden flex flex-col">
		{#if noscript}
			<section
				class="bg-color-container-background-level-1 w-full h-full flex justify-center items-center text-center ldn-viz-map-app-noscript-animation"
			>
				{#if dev}
					<p>
						<b>Dev mode:</b> Please wait as the initial load is the longest. Reloading may occur due
						to dependency optimisation. Please ensure JavaScript is enabled.
					</p>
				{:else}
					<p>Please enable JavaScript to explore this map.</p>
				{/if}
			</section>
		{:else}
			<slot />
		{/if}
	</main>

	<slot name="footer" />
</div>

<style>
	.ldn-viz-map-app-noscript-animation {
		color: rgba(255, 255, 255, 0);

		animation-name: ldn-viz-map-app-noscript-animation;
		animation-delay: 3s;
		animation-duration: 100ms;
		animation-timing-function: ease-in;
		animation-iteration-count: 1;
		animation-fill-mode: forwards;
	}

	@keyframes ldn-viz-map-app-noscript-animation {
		from {
			color: rgba(255, 255, 255, 0);
		}
		to {
			color: rgba(255, 255, 255, 1);
		}
	}
</style>
