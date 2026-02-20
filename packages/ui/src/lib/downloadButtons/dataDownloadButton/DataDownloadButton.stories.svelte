<script module lang="ts">
	import { ArrowDownTray } from '@steeze-ui/heroicons';
	import { Icon } from '@steeze-ui/svelte-icon';
	import { defineMeta } from '@storybook/addon-svelte-csf';
	import DataDownloadButton from './DataDownloadButton.svelte';

	const data = [
		{ A: 1, B: 2, C: 3 },
		{ A: 4, B: 5, C: 6 },
		{ A: 7, B: 8, C: 9 }
	];
	/**
	 * The `<DataDownloadButton>` component renders a button which, when clicked on, triggers the download of a file containing data that was passed as a prop.
	 */

	const { Story } = defineMeta({
		title: 'Ui/Components/Buttons/DataDownloadButton',
		component: DataDownloadButton,
		tags: ['autodocs'],
		argTypes: {
			filename: {
				table: {
					defaultValue: { summary: '' },
					type: { summary: 'string' }
				}
			}
		},
		args: {
			data: data
		}
	});
</script>

<Story
	name="Default"
	args={{ filename: 'download' }}
	parameters={{
		options: {
			showPanel: true
		}
	}}
>
	{#snippet template(args)}
		<DataDownloadButton {...args}>
			{#snippet afterLabel()}
				<Icon src={ArrowDownTray} theme="mini" class="mr-2 h-5 w-5" aria-hidden="true" />
			{/snippet}
		</DataDownloadButton>
	{/snippet}
</Story>

<Story name="Without Icon">
	{#snippet template(args)}
		<DataDownloadButton {...args} {data} filename="download" />
	{/snippet}
</Story>

<Story name="Full width">
	{#snippet template(args)}
		<div class="w-full">
			<DataDownloadButton {...args} {data} filename="download" fullWidth />
		</div>
	{/snippet}
</Story>

<Story name="With Icon before label">
	{#snippet template(args)}
		<DataDownloadButton {...args} {data} filename="download">
			{#snippet beforeLabel()}
				<Icon src={ArrowDownTray} theme="mini" class="mr-2 h-5 w-5" aria-hidden="true" />
			{/snippet}
		</DataDownloadButton>
	{/snippet}
</Story>

<Story name="Rename Columns">
	{#snippet template(args)}
		<DataDownloadButton
			{...args}
			{data}
			filename="download"
			columnMapping={{ A: 'foo', B: 'bar', C: 'baz' }}
		/>
	{/snippet}
</Story>

<Story name="Button types">
	{#snippet template(args)}
		<div class="flex flex-col space-y-2">
			<DataDownloadButton {...args} {data} filename="download" emphasis="primary">
				{#snippet afterLabel()}
					<Icon src={ArrowDownTray} theme="mini" class="mr-2 h-5 w-5" aria-hidden="true" />
				{/snippet}
			</DataDownloadButton>
			<DataDownloadButton {...args} {data} filename="download" emphasis="secondary">
				{#snippet afterLabel()}
					<Icon src={ArrowDownTray} theme="mini" class="mr-2 h-5 w-5" aria-hidden="true" />
				{/snippet}
			</DataDownloadButton>
			<DataDownloadButton {...args} {data} filename="download" variant="outline" size="sm">
				{#snippet afterLabel()}
					<Icon src={ArrowDownTray} theme="mini" class="mr-2 h-5 w-5" aria-hidden="true" />
				{/snippet}
			</DataDownloadButton>
		</div>
	{/snippet}
</Story>

<Story name="Download as JSON - no choice">
	{#snippet template(args)}
		<DataDownloadButton {...args} {data} filename="download" formats={['JSON']}>
			{#snippet afterLabel()}
				<Icon src={ArrowDownTray} theme="mini" class="mr-2 h-5 w-5" aria-hidden="true" />
			{/snippet}
		</DataDownloadButton>
	{/snippet}
</Story>

<Story name="Download as CSV - no choice">
	{#snippet template(args)}
		<DataDownloadButton {...args} {data} filename="download" formats={['CSV']}>
			{#snippet afterLabel()}
				<Icon src={ArrowDownTray} theme="mini" class="mr-2 h-5 w-5" aria-hidden="true" />
			{/snippet}
		</DataDownloadButton>
	{/snippet}
</Story>

<Story name="Disabled">
	{#snippet template(args)}
		<DataDownloadButton {...args} {data} disabled={true} filename="download">
			{#snippet afterLabel()}
				<Icon src={ArrowDownTray} theme="mini" class="mr-2 h-5 w-5" aria-hidden="true" />
			{/snippet}
		</DataDownloadButton>
	{/snippet}
</Story>

<Story name="Data obtained from function">
	{#snippet template(args)}
		<DataDownloadButton
			{...args}
			dataFn={() =>
				Array.from({ length: 10 }, () => ({
					a: Math.floor(Math.random() * 100),
					b: Math.floor(Math.random() * 100)
				}))}
			filename="random data"
			formats={['JSON']}
		></DataDownloadButton>
	{/snippet}
</Story>

<Story name="Data obtained from async function">
	{#snippet template(args)}
		<DataDownloadButton
			{...args}
			dataFn={async () =>
				Array.from({ length: 10 }, () => ({
					a: Math.floor(Math.random() * 100),
					b: Math.floor(Math.random() * 100)
				}))}
			filename="random data"
			formats={['JSON']}
		></DataDownloadButton>
	{/snippet}
</Story>
