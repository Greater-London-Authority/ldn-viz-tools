<script context="module" lang="ts">
</script>

<script lang="ts">
	import { classNames } from '../../utils/utilityFns';
	//	import type { ReadOrWritable } from 'svelte-headless-table/lib/utils/store';
	import ExportBtns from './ExportBtns.svelte';
	import Footer from './Footer.svelte';
	import SubTitle from './SubTitle.svelte';
	import Title from './Title.svelte';

	// export props to popultae the container
	export let title: string | null = null;
	export let subTitle: string | null = null;
	export let alt: string | null = null;
	export let footer = false;
	export let exportBtns = false;
	let tableClass = classNames('w-full relative');

	// export props for table
	export let data;

	// For save as image
	let tableToCapture: HTMLDivElement;
</script>

<slot name="numRowsControlSlot" />

<div class="table-container" bind:this={tableToCapture} id="captureElement">
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
	<div class={tableClass}>
		<slot name="table" {data} />
	</div>

	{#if footer === true}
		<Footer />
	{/if}

	<slot name="paginationControls" />

	{#if exportBtns === true}
		<ExportBtns chartToCapture={tableToCapture} {data} />
	{/if}
</div>

<style>
	.table-container {
		@apply flex flex-col w-full overflow-auto;
	}
</style>
