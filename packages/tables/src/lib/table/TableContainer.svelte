<script lang="ts">
	/**
	 * `TableContainer` wraps a table with the shared chrome primitives: a `ChromeHeader`
	 * (title / subtitle / optional hint) above the table, and a `ChromeFooter` row
	 * (source / byline / note + data/image download buttons) below it — the same pieces
	 * used by `Card` and `ChartContainer`, so the three read and construct identically.
	 *
	 * It has **no surface of its own** — no border, padding or shadow. When a surface is
	 * wanted, compose it inside a `Card`, which supplies those. This is what lets several
	 * tables share one `Card`: the Card title takes `emphasis="secondary"` (an eyebrow
	 * labelling the group) while each `TableContainer` keeps its own dominant title — the
	 * primary-slot rule.
	 *
	 * **Accessibility**: always provide `alt` (a short text alternative). `description`
	 * (a longer account) is optional but recommended and, when given, is exposed to both
	 * screen readers (`aria-describedby`) and sighted users (a "View description" Modal).
	 *
	 * The table is supplied via the `table` snippet; `beforeTable`, `numRowsControlSlot`
	 * and `paginationControls` snippets remain for content and pagination controls.
	 *
	 * **Note** Mirrors [ChartContainer](./?path=/docs/charts-components-chartcontainer--documentation)
	 * in @ldn-viz/charts.
	 * 	@component
	 */

	import {
		Button,
		ChromeFooter,
		ChromeHeader,
		ExportButtons,
		Modal,
		classNames,
		randomId
	} from '@ldn-viz/ui';
	import type { Snippet } from 'svelte';

	// export let title: string | null = null;

	// export let subTitle: string | null = null;

	// export let alt: string | null = null;

	interface Props {
		/**
		 * Title that is displayed in large text above the table.
		 */
		title?: string;
		/**
		 * Subtitle that is displayed below the title, but above the table.
		 */
		subtitle?: string;
		/**
		 * @deprecated Use `subtitle` (lowercase) instead. Retained as an alias for one release.
		 */
		subTitle?: string;
		/**
		 * Optional help affordance shown beside the title. A string opens an `Overlay`
		 * (`hintType` selects tooltip / popover / modal).
		 */
		hint?: string;
		/** Overlay form used when `hint` is a string. */
		hintType?: 'tooltip' | 'popover' | 'modal';
		/** Modal heading when `hintType="modal"`. */
		hintTitle?: string;
		/**
		 * Short text alternative naming what the table shows. Required for accessibility.
		 */
		alt?: string;
		/**
		 * A longer description of the table. Optional but recommended. When provided it is exposed to
		 * screen readers (visually hidden, `aria-describedby`) and to sighted users via a
		 * "View description" Modal in the footer. Accepts a string or a snippet.
		 */
		description?: string | Snippet;
		/**
		 * What appears in the footer:
		 *
		 * * `byline` (string) - statement of who created the visualization
		 * * `source` (string) - statement of where the data came from
		 * * `note` (string) - any additional footnotes
		 */
		source?: string;
		byline?: string;
		note?: string;
		/**
		 * Data Download Button in the footer
		 *
		 * Defaults to true which allows user to select download in either 'CSV' or 'JSON' format.
		 * Supply a custom list of formats as an array of strings. Current options either 'CSV', or 'JSON'.
		 * If set to `false`, then the button is hidden.
		 *
		 */
		dataDownloadButton?: true | false | ('CSV' | 'JSON')[];
		/**
		 * The Data passed to the data Download Button(s) in the footer
		 */
		data?: { [key: string]: any }[] | undefined;
		/**
		 * Image Download Button in the footer
		 *
		 * Defaults to true which allows user to select download in either 'PNG' or 'SVG' format.
		 * Supply a custom list of formats as an array of strings. Current options either 'PNG', or 'SVG'.
		 * If set to `false`, then the button is hidden.
		 *
		 */
		imageDownloadButton?: true | false | ('PNG' | 'SVG')[];
		filename?: string;
		/**
		 * Tailwind class to set table area height
		 */
		tableHeight?: string;
		overrideClass?: string;
		/**
		 * Tailwind class to set overall table width
		 */
		tableWidth?: string;
		/**
		 * An optional object defining a mapping from the names of attributes in the `data` prop to the names of columns in the generated file.
		 */
		columnMapping?: undefined | { [oldName: string]: string };
		numRowsControlSlot?: Snippet;
		beforeTable?: Snippet;
		table?: Snippet<[any]>;
		paginationControls?: Snippet;
	}

	let {
		title = '',
		subtitle = '',
		subTitle = '',
		hint = undefined,
		hintType = 'tooltip',
		hintTitle = undefined,
		alt = '',
		description = undefined,
		source = '',
		byline = '',
		note = '',
		dataDownloadButton = true,
		data = undefined,
		imageDownloadButton = ['PNG'],
		filename = '',
		tableHeight = 'h-auto',
		overrideClass = '',
		tableWidth = 'w-full',
		columnMapping = undefined,
		numRowsControlSlot,
		beforeTable,
		table,
		paginationControls
	}: Props = $props();

	let tableClass = $derived(classNames('relative', tableHeight, overrideClass));

	// `subtitle` is the current name; `subTitle` is a deprecated alias kept for one release.
	let resolvedSubtitle = $derived(subtitle || subTitle);

	// Long description, exposed to both audiences from one source.
	let descriptionOpen = $state(false);
	let descId = randomId();
	let hasDescription = $derived(!!description);
	let descriptionIsString = $derived(typeof description === 'string');

	// For save as image
	let tableToCapture: HTMLDivElement | undefined = $state();
</script>

{@render numRowsControlSlot?.()}

<div
	class={`table-container not-prose product ${tableWidth}`}
	bind:this={tableToCapture}
	id="captureElement"
>
	{#if title || resolvedSubtitle || hint}
		<div class="mb-2">
			<ChromeHeader {title} subtitle={resolvedSubtitle} {hint} {hintType} {hintTitle} />
		</div>
	{/if}

	{#if alt}
		<h5 class="sr-only">{alt}</h5>
	{/if}

	{#if beforeTable}
		<!-- Content to be inserted below the title and subtitle, but above the table itself. -->
		{@render beforeTable?.()}
	{/if}

	<!-- Viz element goes here -->
	<div class={tableClass} aria-describedby={hasDescription ? descId : undefined}>
		{@render table?.({ data })}
	</div>

	<!-- long description, visually hidden — the screen-reader copy referenced by aria-describedby -->
	{#if hasDescription}
		<div id={descId} class="sr-only">
			{@render descriptionBody()}
		</div>
	{/if}

	{@render paginationControls?.()}

	{#if source || byline || note || hasDescription || dataDownloadButton || imageDownloadButton}
		<div class="mt-2">
			<ChromeFooter
				{source}
				{byline}
				{note}
				footnoteExtra={hasDescription ? descriptionTrigger : undefined}
				actions={exportBtns}
			/>
		</div>
	{/if}
</div>

{#snippet descriptionBody()}
	{#if descriptionIsString}
		{description}
	{:else if description}
		{@render (description as Snippet)()}
	{/if}
{/snippet}

{#snippet descriptionTrigger()}
	<Modal bind:open={descriptionOpen}>
		{#snippet trigger()}
			<li data-capture-ignore>
				<Button
					variant="text"
					size="xs"
					emphasis="secondary"
					class="!p-0"
					onclick={() => (descriptionOpen = true)}>View description</Button
				>
			</li>
		{/snippet}

		{#snippet title()}
			Description
		{/snippet}

		{#snippet description()}
			{@render descriptionBody()}
		{/snippet}
	</Modal>
{/snippet}

{#snippet exportBtns()}
	{#if tableToCapture}
		<ExportButtons
			elementToCapture={tableToCapture}
			{columnMapping}
			dataForDownload={data}
			{dataDownloadButton}
			{imageDownloadButton}
			{filename}
		/>
	{/if}
{/snippet}

<style lang="postcss">
	.table-container {
		@apply flex flex-col;
	}
</style>
