<script lang="ts">
	/**
	 * @deprecated Compose `ChromeActions` (from `@ldn-viz/ui`) directly instead.
	 * `ChartContainer` and `TableContainer` no longer use this wrapper; it collides
	 * in name with the page-level `Footer` and is retained only for one release.
	 *
	 * The chart `Footer` composes the shared `ChromeActions` row — footnotes
	 * (byline / source / note) plus an optional "View description" modal trigger on
	 * the left, and the export buttons on the right.
	 */
	import { Button, ChromeActions, Modal } from '@ldn-viz/ui';

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

{#snippet description()}
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
{/snippet}

<div class="mt-1">
	<ChromeActions
		{byline}
		{source}
		{note}
		description={chartDescription ? description : undefined}
		actions={exportBtns}
	/>
</div>
