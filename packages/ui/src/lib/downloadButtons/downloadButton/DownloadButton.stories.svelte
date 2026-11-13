<script module lang="ts">
	import { defineMeta } from '@storybook/addon-svelte-csf';
	import DownloadButton from './DownloadButton.svelte';

	const data = [
		{ A: 1, B: 2, C: 3 },
		{ A: 4, B: 5, C: 6 },
		{ A: 7, B: 8, C: 9 }
	];

	/**
	 * The `<DownloadButton>` component renders one button that opens a menu of download formats.
	 * The menu has a Data group (CSV, JSON) and an Image group (PNG, SVG). Choosing a format downloads the file.
	 *
	 * The Data group shows when `data` or `dataFn` is set. The Image group shows when `htmlNode` is set.
	 * Set `compact` for an icon-only button, for example in a chart footer.
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
			},
			compact: { control: { type: 'boolean' } }
		},
		args: {
			data,
			filename: 'download'
		}
	});
</script>

<script lang="ts">
	import LogoByCiu from '../../logos/LogoByCIU.svelte';

	let htmlNode: HTMLElement = $state() as HTMLElement;
</script>

<div
	bind:this={htmlNode}
	class="typeset-product flow-standard w-fit bg-color-surface pb-8 text-color-text"
>
	<h2 class="title-md">A title</h2>
	<p class="body-md text-color-text-muted" data-capture-ignore>
		This paragraph has <code>data-capture-ignore</code>, so it is left out of the image.
	</p>
	<LogoByCiu class="w-80" />
</div>

<Story name="Default">
	{#snippet template(args)}
		<DownloadButton {...args} {htmlNode} />
	{/snippet}
</Story>

<!-- A compact button shows only the download icon. `label` sets its accessible name. -->
<Story name="Compact">
	{#snippet template(args)}
		<DownloadButton {...args} {htmlNode} compact />
	{/snippet}
</Story>

<!-- Without `htmlNode`, the menu has only the Data group. -->
<Story name="Data Only">
	{#snippet template(args)}
		<DownloadButton {...args} filename="data-export" />
	{/snippet}
</Story>

<!-- Without `data` or `dataFn`, the menu has only the Image group. -->
<Story name="Image Only">
	{#snippet template(args)}
		<DownloadButton {...args} data={undefined} {htmlNode} filename="chart-export" />
	{/snippet}
</Story>

<!-- `dataFormats` and `imageFormats` choose which formats each group lists. -->
<Story name="Custom Format Selection">
	{#snippet template(args)}
		<DownloadButton
			{...args}
			{htmlNode}
			dataFormats={['JSON']}
			imageFormats={['SVG']}
			filename="custom-export"
		/>
	{/snippet}
</Story>

<!-- `columnMapping` renames the columns in CSV and JSON files. -->
<Story name="With Column Mapping">
	{#snippet template(args)}
		<DownloadButton
			{...args}
			{htmlNode}
			columnMapping={{ A: 'Column X', B: 'Column Y', C: 'Column Z' }}
			filename="renamed-columns"
		/>
	{/snippet}
</Story>

<!-- `dataFn` is called when a data format is chosen. It can return a promise. -->
<Story name="Data From Function">
	{#snippet template(args)}
		<DownloadButton
			{...args}
			data={undefined}
			dataFn={async () => {
				await new Promise((resolve) => setTimeout(resolve, 100));
				return [
					{ name: 'Item 1', value: 100 },
					{ name: 'Item 2', value: 200 },
					{ name: 'Item 3', value: 300 }
				];
			}}
			{htmlNode}
			filename="async-data-export"
		/>
	{/snippet}
</Story>

<!-- `padding` and `scaleFactor` set the margin and resolution of PNG files. -->
<Story name="Custom Image Settings">
	{#snippet template(args)}
		<DownloadButton
			{...args}
			data={undefined}
			{htmlNode}
			imageFormats={['PNG']}
			padding={50}
			scaleFactor={3}
			filename="high-res-export"
		/>
	{/snippet}
</Story>

<Story name="Disabled">
	{#snippet template(args)}
		<div class="flex items-center gap-4">
			<DownloadButton {...args} {htmlNode} disabled />
			<DownloadButton {...args} {htmlNode} compact disabled />
		</div>
	{/snippet}
</Story>
