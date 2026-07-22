<script lang="ts">
	/**
	 * The `Footer` renders the content that appears below a chart (the `byline`,
	 * `source`, `note`, trigger for a description modal, and image/data download buttons).
	 *
	 * It is normally used only indirectly via the [ChartContainer](./?path=/docs/charts-components-chartcontainer--documentation).
	 * @component
	 */

	import { Button, Modal } from '@ldn-viz/ui';

	interface Props {
		byline?: string;
		source?: string;
		note?: string;
		chartDescription?: string;
		exportBtns?: import('svelte').Snippet;
	}

	let { byline = '', source = '', note = '', chartDescription = '', exportBtns }: Props = $props();

	/**
	 * Controls whether the Modal is open or closed
	 */
	let isOpen = $state(false);
</script>

<div class="mt-1 flex w-full flex-wrap items-end justify-between">
	{#if byline || source || note || chartDescription}
		<ul
			title="Chart footnotes and description"
			class="footer-ul text-color-text-muted mr-4 flex min-w-40 max-w-xl flex-col space-y-0.5 text-xs"
		>
			<!-- eslint-disable svelte/no-at-html-tags -->
			{#if byline}<li>{@html byline}</li>{/if}
			{#if source}<li><span class="mr-1 font-bold">Source:</span>{@html source}</li>{/if}
			{#if note}<li><span class="mr-1 font-bold">Note:</span>{@html note}</li>{/if}
			<!-- eslint-enable svelte/no-at-html-tags -->

			{#if chartDescription}
				<Modal bind:open={isOpen}>
					{#snippet trigger()}
						<li data-capture-ignore>
							<Button
								variant="text"
								size="xs"
								emphasis="secondary"
								class="!p-0"
								onclick={() => (isOpen = true)}>View description</Button
							>
						</li>
					{/snippet}

					{#snippet title()}
						Description
					{/snippet}

					{#snippet description()}
						{chartDescription}
					{/snippet}
				</Modal>
			{/if}
		</ul>
	{/if}
	{#if exportBtns}
		<div class={`${byline || source || note ? '' : 'ml-auto'}`}>
			{@render exportBtns?.()}
		</div>
	{/if}
</div>

<style>
	.footer-ul :global(a) {
		@apply hover:text-color-interactive-primary-hover underline hover:no-underline;
	}
</style>
