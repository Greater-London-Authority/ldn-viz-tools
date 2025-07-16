<script lang="ts">
	import { Button, Modal } from '@ldn-viz/ui';

	interface Props {
		byline?: string;
		source?: string;
		note?: string;
		chartDescription?: string;
		exportBtns?: import('svelte').Snippet;
	}

	let {
		byline = '',
		source = '',
		note = '',
		chartDescription = '',
		exportBtns
	}: Props = $props();

	/**
	 * Controls whether the Modal is open or closed
	 */
	let isOpen = $state(false);
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
						size="xs"
						emphasis="secondary"
						class="!p-0"
						on:click={() => (isOpen = true)}>View description</Button
					>
				</li>
				<Modal bind:isOpen title="Description" description={chartDescription}></Modal>
			{/if}
		</ul>
	{/if}
	{#if exportBtns}
		<div class={`${byline || source || note ? '' : 'ml-auto'}`}>
			{@render exportBtns?.()}
		</div>
	{/if}
</div>
