<script lang="ts">
	import ExportBtns from '../shared/ExportBtns.svelte';
	import Footer from '../shared/Footer.svelte';
	import SubTitle from '../shared/SubTitle.svelte';
	import Title from '../shared/Title.svelte';

	export let title: string | null = null;
	export let subTitle: string | null = null;
	export let alt: string | null = null;
	export let footer: boolean = false;
	export let exportBtns: boolean = false;
</script>

<div class="chart-container">
	{#if title}
		<Title>{title}</Title>
	{/if}
	{#if subTitle}
		<SubTitle>{subTitle}</SubTitle>
	{/if}

	{#if alt}
		<h5 class="sr-only">{alt}</h5>
	{/if}

	<!-- Viz element goes here -->
	<slot />

	{#if footer === true}
		<Footer />
	{/if}
	{#if exportBtns === true}
		<ExportBtns />
	{/if}
</div>
