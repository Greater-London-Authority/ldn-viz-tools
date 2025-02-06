<script lang="ts">
	import { Button, Modal } from '@ldn-viz/ui';
	import { writable } from 'svelte/store';

	export let byline = '';
	export let source = '';
	export let note = '';
	export let chartDescription = '';

	/**
	 * Controls whether the Modal is open or closed
	 */
	let isOpen = writable(false);
</script>

<div class="w-full flex flex-wrap justify-between mt-1 items-end">
	{#if byline || source || note || chartDescription}
		<ul
			title="Chart footnotes and description"
			class="flex flex-col space-y-0.5 text-color-text-secondary text-xs min-w-40 max-w-xl mr-4"
		>
			{#if byline}<li>{byline}</li>{/if}
			{#if source}<li><span class="font-bold mr-1">Source:</span>{source}</li>{/if}
			{#if note}<li><span class="font-bold mr-1">Note:</span>{note}</li>{/if}
			{#if chartDescription}
				<li data-capture-ignore>
					<Button
						variant="text"
						on:click={() => ($isOpen = true)}
						class="font-bold text-xs !py-0 !px-0">View description</Button
					>
				</li>
				<Modal bind:isOpen title="Description" description={chartDescription}></Modal>
			{/if}
		</ul>
	{/if}
	{#if $$slots.exportBtns}
		<div class={`${byline || source || note ? '' : 'ml-auto'}`}>
			<slot name="exportBtns" />
		</div>
	{/if}
</div>
