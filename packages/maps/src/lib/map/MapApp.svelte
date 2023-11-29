<script>
	import { onMount } from 'svelte';
	import { dev } from '$app/environment';

	let noscript = true;

	onMount(() => {
		noscript = false;
	});
</script>

<main class="bg-core-grey-800 w-[100dvw] h-[100dvh] overflow-hidden">
	{#if noscript}
		<section
			class="bg-core-grey-800 w-full h-full flex justify-center items-center text-center ldn-viz-map-app-noscript-animation"
		>
			{#if dev}
				<p>
					<b>Dev mode:</b> Please wait while optimising dependencies.
				</p>
			{/if}
			<p>Please enable JavaScript to explore this map.</p>
		</section>
	{:else}
		<slot />
	{/if}
</main>

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
