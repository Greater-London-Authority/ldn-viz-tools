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

<div class="flex flex-wrap items-center">
	<div class="w-4/6 px-2 sm:w-1/2 md:w-1/3 md:pl-6">
		<!-- TODO: this is a p as it might not always want to be the H1 -->
		<p class="prose headline responsive format">{title}</p>
		{#if subTitle}
			<p class="prose subhead responsive max-w-[24ch]">{subTitle}</p>
		{/if}
	</div>
	<div class="flex w-2/6 text-color-ui-border-secondary sm:w-1/2 md:w-2/3">
		<BackgroundOne />
		<BackgroundTwo />
		<BackgroundThree />
	</div>
</div>
