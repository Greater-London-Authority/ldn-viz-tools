<script lang="ts">
	/**
	 * The `ChartContainer` is a wrapper around a plot that adds a title, subtitle, footnotes and
	 * export controls.
	 *
	 * **Accessibility**: always provide `alt` — a short text alternative naming what the chart shows.
	 * `description` (a longer account of the data/trends) is optional but recommended; when given it
	 * is exposed to **both** audiences from one source — screen readers (a visually-hidden copy wired
	 * via `aria-describedby`) and sighted users (a "View description" Modal in the footer).
	 *
	 * **Alternatives**: normally the [ObservablePlot](./?path=/docs/charts-components-observableplot--documentation) or other plot component would be used rather than using `ChartContainer` directly.
	 * 	@component
	 */

	import { Button, ChromeFooter, ChromeHeader, ExportButtons, Modal, classNames } from '@ldn-viz/ui';

	/** Controls whether the chart-description Modal is open. */
	let descriptionOpen = $state(false);

	// For save as image
	let chartToCapture: HTMLDivElement = $state() as HTMLDivElement;

	interface Props {
		/**
		 * Title that is displayed in large text above the plot.
		 */
		title?: string;
		/**
		 * Subtitle that is displayed below the title, but above the plot.
		 */
		subtitle?: string;
		/**
		 * @deprecated Use `subtitle` (lowercase) instead. Retained as an alias for one release.
		 */
		subTitle?: string;
		/**
		 * Optional help affordance shown beside the title. A string opens an `Overlay`
		 * (`hintType` selects tooltip / popover / modal); pass a snippet via `ChromeHeader` for full control.
		 */
		hint?: string;
		/** Overlay form used when `hint` is a string. */
		hintType?: 'tooltip' | 'popover' | 'modal';
		/** Modal heading when `hintType="modal"`. */
		hintTitle?: string;
		/**
		 * Alt-text for the plot.
		 */
		alt?: string;
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
		 * Set to false to hide completely.
		 * Supply a custom list of formats as an array of strings. Current options either 'CSV', or 'JSON'
		 *
		 */
		dataDownloadButton?: true | false | ('CSV' | 'JSON')[];
		/**
		 * The file name to be used for the downloaded data or image file.
		 */
		filename?: string;
		/**
		 * The Data passed to the data Download Button(s) in the footer
		 */
		data?: { [key: string]: any }[] | undefined;
		/**
		 * Image Download Button in the footer
		 *
		 * Defaults to true which allows user to select download in either 'PNG' or 'SVG' format.
		 * Set to false to hide completely.
		 * Supply a custom list of formats as an array of strings. Current options either 'PNG', or 'SVG'
		 *
		 */
		imageDownloadButton?: true | false | ('PNG' | 'SVG')[];
		/**
		 * Tailwind class to set chart area height
		 */
		chartHeight?: string;
		overrideClass?: string;
		/**
		 * Tailwind class to set overall chart width
		 */
		chartWidth?: string;
		/**
		 * If set to `true`, set `display: contents` on the top-level `ChartContainer` div,
		 * so that a grid layout can be applied to align parts of charts across two columns
		 */
		alignMultiple?: boolean;
		/**
		 * A longer description of the chart (data, trends). Optional but recommended. When provided
		 * it is exposed to screen readers (visually hidden, `aria-describedby`) and to sighted users
		 * via a "View description" Modal in the footer. Accepts a string or a snippet.
		 */
		description?: string | import('svelte').Snippet;
		/**
		 * @deprecated Renamed to `description`. Retained as an alias for one release.
		 */
		chartDescription?: string;
		controls?: import('svelte').Snippet;
		legend?: import('svelte').Snippet;
		children?: import('svelte').Snippet;

		/**
		 * Optional id to apply to the chart container div.
		 * This can be ueful if you are mebedding multiple charts in a report
		 * page, and want to be able to directly link to individual charts.
		 */
		id?: string;

		/**
		 * An optional object defining a mapping from the names of attributes in the `data` prop to the names of columns in the downloaded file.
		 */
		columnMapping?: undefined | { [oldName: string]: string };
	}

	let {
		title = '',
		subtitle = '',
		subTitle = '',
		hint = undefined,
		hintType = 'tooltip',
		hintTitle = undefined,
		alt = '',
		source = '',
		byline = '',
		note = '',
		dataDownloadButton = true,
		filename = '',
		data = undefined,
		imageDownloadButton = true,
		chartHeight = 'h-60',
		overrideClass = '',
		chartWidth = 'w-full',
		alignMultiple = false,
		description = undefined,
		chartDescription = '',
		controls,
		legend,
		children,
		id = 'captureElement',
		columnMapping = undefined
	}: Props = $props();

	let chartClass = $derived(
		classNames('relative', chartHeight, overrideClass, alignMultiple ? 'min-w-0' : '')
	);
	let classes = $derived(
		classNames(
			chartWidth,
			alignMultiple ? 'contents not-prose chart' : 'flex flex-col not-prose chart'
		)
	);

	// `subtitle` is the current name; `subTitle` is a deprecated alias kept for one release.
	let resolvedSubtitle = $derived(subtitle || subTitle);
	// `description` is the current name; `chartDescription` (string) is a deprecated alias.
	let resolvedDescription = $derived(description || chartDescription || undefined);
	let hasDescription = $derived(!!resolvedDescription);
	let descriptionIsString = $derived(typeof resolvedDescription === 'string');
	let hasActions = $derived(
		!!(source || byline || note || hasDescription || dataDownloadButton || imageDownloadButton)
	);
</script>

<div class={classes} {id}>
	{#if alt}
		<p class="sr-only">{alt}</p>
	{/if}

	{#if title || resolvedSubtitle || hint}
		<div class="mb-2">
			<ChromeHeader {title} subtitle={resolvedSubtitle} {hint} {hintType} {hintTitle} />
		</div>
	{/if}

	<!-- any controls to be displayed below the title and subTitle, but above the chart itself -->
	{@render controls?.()}

	<!-- separate snippet for the legend, so the main chart can be aligned if legends wrap over a different number of lines-->
	{@render legend?.()}

	<!-- Visualisation goes here -->
	<div
		class={chartClass}
		bind:this={chartToCapture}
		aria-describedby={hasDescription ? `${id}-description` : undefined}
	>
		{@render children?.()}
	</div>

	<!-- long description, visually hidden — the screen-reader copy referenced by aria-describedby -->
	{#if hasDescription}
		<div id="{id}-description" class="sr-only">
			{@render descriptionBody()}
		</div>
	{/if}

	{#if hasActions}
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

{#snippet exportBtns()}
	<ExportButtons
		elementToCapture={chartToCapture}
		{filename}
		dataForDownload={data}
		{dataDownloadButton}
		{imageDownloadButton}
		{columnMapping}
	/>
{/snippet}

{#snippet descriptionBody()}
	{#if descriptionIsString}
		{resolvedDescription}
	{:else if resolvedDescription}
		{@render (resolvedDescription as import('svelte').Snippet)()}
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
