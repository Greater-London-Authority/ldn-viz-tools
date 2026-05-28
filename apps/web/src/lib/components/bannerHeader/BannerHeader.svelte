<script lang="ts">
	import BackgroundOne from './BackgroundOne.svelte';
	import BackgroundThree from './BackgroundThree.svelte';
	import BackgroundTwo from './BackgroundTwo.svelte';

	interface BannerProps {
		title: string;
		subTitle?: string;
	}

	let { title, subTitle }: BannerProps = $props();
</script>

<div class=" bg-color-canvas">
	<!--dark-->
	<div class="relative mx-auto flex aspect-[2/1] max-h-[513px] items-center lg:aspect-[9/3]">
		<div class="z-10 flex h-full bg-gradient-to-r from-color-canvas pt-12">
			<div class="container">
				<p class="prose headline responsive format">{title}</p>
				{#if subTitle}
					<p class="prose subhead responsive max-w-[24ch]">{subTitle}</p>
				{/if}
			</div>
		</div>

		<div class="absolute inset-0 flex w-full text-color-border-muted">
			<BackgroundOne />
			<BackgroundTwo />
			<BackgroundThree />
		</div>
	</div>
</div>
