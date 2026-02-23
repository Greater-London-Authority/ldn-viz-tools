<script module lang="ts">
	import { ArrowDownTray } from '@steeze-ui/heroicons';
	import { Icon } from '@steeze-ui/svelte-icon';
	import { defineMeta } from '@storybook/addon-svelte-csf';
	import DownloadButton from './DownloadButton.svelte';

	const data = [
		{ A: 1, B: 2, C: 3 },
		{ A: 4, B: 5, C: 6 },
		{ A: 7, B: 8, C: 9 }
	];

	/**
	 * The `<DownloadButton>` component renders a button that combines both data and image download options.
	 * It uses a MultipleActionButton to allow users to select between CSV, JSON, PNG, and SVG formats.
	 *
	 * This component is useful when you want to provide multiple download options (both data and images) in a single button.
	 */

	const { Story } = defineMeta({
		title: 'Ui/Components/Buttons/DownloadButton',
		component: DownloadButton,
		tags: ['autodocs'],
		argTypes: {
			filename: {
				table: {
					defaultValue: { summary: 'download' },
					type: { summary: 'string' }
				}
			},
			dataFormats: {
				control: { type: 'check' },
				options: ['CSV', 'JSON'],
				table: {
					defaultValue: { summary: "['CSV', 'JSON']" },
					type: { summary: 'array' }
				}
			},
			imageFormats: {
				control: { type: 'check' },
				options: ['PNG', 'SVG'],
				table: {
					defaultValue: { summary: "['PNG', 'SVG']" },
					type: { summary: 'array' }
				}
			}
		},
		args: {
			data: data
		}
	});
</script>

<script lang="ts">
	import LogoByCiu from '../../logos/LogoByCIU.svelte';

	let htmlNode: HTMLElement = $state() as HTMLElement;
</script>

<div
	bind:this={htmlNode}
	class="flex w-fit flex-col gap-2 bg-color-container-level-0 pb-8 text-color-text-primary"
>
	<h2 class="text-lg font-bold">A title</h2>
	<p class="text-color-text-secondary" data-capture-ignore>A paragraph of text...</p>
	<p data-capture-ignore>Something that will not be included in the downloaded image.</p>
	<LogoByCiu class="w-80" />
</div>

<Story
	name="Default (All Formats)"
	args={{ filename: 'download', data: data, htmlNode: htmlNode }}
	parameters={{
		options: {
			showPanel: true
		}
	}}
>
	{#snippet template(args)}
		<DownloadButton {...args} {htmlNode}>
			{#snippet afterLabel()}
				<Icon src={ArrowDownTray} theme="mini" class="ml-2 h-5 w-5" aria-hidden="true" />
			{/snippet}
		</DownloadButton>
	{/snippet}
</Story>

<Story name="Data Only (CSV and JSON)">
	{#snippet template(args)}
		<DownloadButton {...args} {data} filename="data-export">
			{#snippet afterLabel()}
				<Icon src={ArrowDownTray} theme="mini" class="ml-2 h-5 w-5" aria-hidden="true" />
			{/snippet}
		</DownloadButton>
	{/snippet}
</Story>

<Story name="Image Only (PNG and SVG)">
	{#snippet template(args)}
		<DownloadButton {...args} data={undefined} {htmlNode} filename="chart-export">
			{#snippet afterLabel()}
				<Icon src={ArrowDownTray} theme="mini" class="ml-2 h-5 w-5" aria-hidden="true" />
			{/snippet}
		</DownloadButton>
	{/snippet}
</Story>

<Story name="All Data and Image Formats">
	{#snippet template(args)}
		<DownloadButton {...args} {data} {htmlNode} filename="combined-export">
			{#snippet afterLabel()}
				<Icon src={ArrowDownTray} theme="mini" class="ml-2 h-5 w-5" aria-hidden="true" />
			{/snippet}
		</DownloadButton>
	{/snippet}
</Story>

<Story name="Custom Format Selection">
	{#snippet template(args)}
		<DownloadButton
			{...args}
			{data}
			{htmlNode}
			dataFormats={['JSON']}
			imageFormats={['SVG']}
			filename="custom-export"
		>
			{#snippet afterLabel()}
				<Icon src={ArrowDownTray} theme="mini" class="ml-2 h-5 w-5" aria-hidden="true" />
			{/snippet}
		</DownloadButton>
	{/snippet}
</Story>

<Story name="CSV Only">
	{#snippet template(args)}
		<DownloadButton {...args} {data} dataFormats={['CSV']} filename="csv-export">
			{#snippet afterLabel()}
				<Icon src={ArrowDownTray} theme="mini" class="ml-2 h-5 w-5" aria-hidden="true" />
			{/snippet}
		</DownloadButton>
	{/snippet}
</Story>

<Story name="PNG Only">
	{#snippet template(args)}
		<DownloadButton
			{...args}
			{htmlNode}
			data={undefined}
			imageFormats={['PNG']}
			filename="png-export"
		>
			{#snippet afterLabel()}
				<Icon src={ArrowDownTray} theme="mini" class="ml-2 h-5 w-5" aria-hidden="true" />
			{/snippet}
		</DownloadButton>
	{/snippet}
</Story>

<Story name="With Column Mapping">
	{#snippet template(args)}
		<DownloadButton
			{...args}
			{data}
			{htmlNode}
			columnMapping={{ A: 'Column X', B: 'Column Y', C: 'Column Z' }}
			filename="renamed-columns"
		>
			{#snippet afterLabel()}
				<Icon src={ArrowDownTray} theme="mini" class="ml-2 h-5 w-5" aria-hidden="true" />
			{/snippet}
		</DownloadButton>
	{/snippet}
</Story>

<Story name="Full Width">
	{#snippet template(args)}
		<div class="w-full">
			<DownloadButton {...args} {data} {htmlNode} filename="download" fullWidth>
				{#snippet afterLabel()}
					<Icon src={ArrowDownTray} theme="mini" class="ml-2 h-5 w-5" aria-hidden="true" />
				{/snippet}
			</DownloadButton>
		</div>
	{/snippet}
</Story>

<Story name="Different Button Styles">
	{#snippet template(args)}
		<div class="flex flex-col space-y-2">
			<DownloadButton {...args} {data} {htmlNode} filename="download" emphasis="primary">
				{#snippet afterLabel()}
					<Icon src={ArrowDownTray} theme="mini" class="ml-2 h-5 w-5" aria-hidden="true" />
				{/snippet}
			</DownloadButton>
			<DownloadButton {...args} {data} {htmlNode} filename="download" emphasis="secondary">
				{#snippet afterLabel()}
					<Icon src={ArrowDownTray} theme="mini" class="ml-2 h-5 w-5" aria-hidden="true" />
				{/snippet}
			</DownloadButton>
			<DownloadButton {...args} {data} {htmlNode} filename="download" variant="outline" size="sm">
				{#snippet afterLabel()}
					<Icon src={ArrowDownTray} theme="mini" class="ml-2 h-5 w-5" aria-hidden="true" />
				{/snippet}
			</DownloadButton>
		</div>
	{/snippet}
</Story>

<Story name="Disabled">
	{#snippet template(args)}
		<DownloadButton {...args} {data} {htmlNode} disabled={true} filename="download">
			{#snippet afterLabel()}
				<Icon src={ArrowDownTray} theme="mini" class="ml-2 h-5 w-5" aria-hidden="true" />
			{/snippet}
		</DownloadButton>
	{/snippet}
</Story>

<Story name="With Icon Before Label">
	{#snippet template(args)}
		<DownloadButton {...args} {data} {htmlNode} filename="download">
			{#snippet beforeLabel()}
				<Icon src={ArrowDownTray} theme="mini" class="mr-2 h-5 w-5" aria-hidden="true" />
			{/snippet}
		</DownloadButton>
	{/snippet}
</Story>

<Story name="Data from Function">
	{#snippet template(args)}
		<DownloadButton
			{...args}
			dataFn={() =>
				Array.from({ length: 10 }, () => ({
					value: Math.floor(Math.random() * 100),
					category: ['A', 'B', 'C'][Math.floor(Math.random() * 3)]
				}))}
			{htmlNode}
			filename="random-data"
		>
			{#snippet afterLabel()}
				<Icon src={ArrowDownTray} theme="mini" class="ml-2 h-5 w-5" aria-hidden="true" />
			{/snippet}
		</DownloadButton>
	{/snippet}
</Story>

<Story name="Custom Image Settings">
	{#snippet template(args)}
		<DownloadButton
			{...args}
			{htmlNode}
			imageFormats={['PNG']}
			padding={50}
			scaleFactor={3}
			filename="high-res-export"
		>
			{#snippet afterLabel()}
				<Icon src={ArrowDownTray} theme="mini" class="ml-2 h-5 w-5" aria-hidden="true" />
			{/snippet}
		</DownloadButton>
	{/snippet}
</Story>

<Story name="All Formats with Data Function">
	{#snippet template(args)}
		<DownloadButton
			{...args}
			dataFn={async () => {
				// Simulate async data fetching
				await new Promise((resolve) => setTimeout(resolve, 100));
				return [
					{ name: 'Item 1', value: 100 },
					{ name: 'Item 2', value: 200 },
					{ name: 'Item 3', value: 300 }
				];
			}}
			{htmlNode}
			dataFormats={['CSV', 'JSON']}
			imageFormats={['PNG', 'SVG']}
			filename="async-data-export"
		>
			{#snippet afterLabel()}
				<Icon src={ArrowDownTray} theme="mini" class="ml-2 h-5 w-5" aria-hidden="true" />
			{/snippet}
		</DownloadButton>
	{/snippet}
</Story>
