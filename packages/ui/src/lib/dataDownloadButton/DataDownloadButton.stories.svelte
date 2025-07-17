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

	const { Story } = defineMeta({
		title: 'Ui/Components/Buttons/DataDownloadButton',
		component: DataDownloadButton,
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
			<Icon
				src={ArrowDownTray}
				theme="mini"
				class="ml-2 h-5 w-5"
				aria-hidden="true"
				slot="afterLabel"
			/>
		</DataDownloadButton>
	{/snippet}
</Story>

<!-- <Story name="Without Icon">
	<DataDownloadButton {data} filename="download" />
</Story>

<Story name="Full width">
	<DataDownloadButton {data} filename="download" fullWidth />
</Story>

<Story name="With Icon before label">
	<DataDownloadButton {data} filename="download">
		<Icon
			src={ArrowDownTray}
			theme="mini"
			class="mr-2 w-5 h-5"
			aria-hidden="true"
			slot="beforeLabel"
		/>
	</DataDownloadButton>
</Story>

<Story name="Rename Columns">
	<DataDownloadButton {data} filename="download" columnMapping={{ A: 'foo', B: 'bar', C: 'baz' }} />
</Story>

<Story name="Button types">
	<div class="flex flex-col space-y-2">
		<DataDownloadButton {data} filename="download" emphasis="primary">
			<Icon
				src={ArrowDownTray}
				theme="mini"
				class="ml-2 w-5 h-5"
				aria-hidden="true"
				slot="afterLabel"
			/>
		</DataDownloadButton>
		<DataDownloadButton {data} filename="download" emphasis="secondary">
			<Icon
				src={ArrowDownTray}
				theme="mini"
				class="ml-2 w-5 h-5"
				aria-hidden="true"
				slot="afterLabel"
			/>
		</DataDownloadButton>
		<DataDownloadButton {data} filename="download" variant="outline" size="sm">
			<Icon
				src={ArrowDownTray}
				theme="mini"
				class="ml-2 w-5 h-5"
				aria-hidden="true"
				slot="afterLabel"
			/>
		</DataDownloadButton>
	</div>
</Story>

<Story name="Download as JSON - no choice">
	<DataDownloadButton {data} filename="download" formats={['JSON']}>
		<Icon
			src={ArrowDownTray}
			theme="mini"
			class="ml-2 w-5 h-5"
			aria-hidden="true"
			slot="afterLabel"
		/>
	</DataDownloadButton>
</Story>

<Story name="Download as CSV - no choice">
	<DataDownloadButton {data} filename="download" formats={['CSV']}>
		<Icon
			src={ArrowDownTray}
			theme="mini"
			class="ml-2 w-5 h-5"
			aria-hidden="true"
			slot="afterLabel"
		/>
	</DataDownloadButton>
</Story>

<Story name="Disabled">
	<DataDownloadButton {data} disabled={true} filename="download">
		<Icon
			src={ArrowDownTray}
			theme="mini"
			class="ml-2 w-5 h-5"
			aria-hidden="true"
			slot="afterLabel"
		/>
	</DataDownloadButton>
</Story>

<Story name="Data obtained from function">
	<DataDownloadButton
		dataFn={() =>
			Array.from({ length: 10 }, () => ({
				a: Math.floor(Math.random() * 100),
				b: Math.floor(Math.random() * 100)
			}))}
		filename="random data"
		formats={['JSON']}
	></DataDownloadButton>
</Story>

<Story name="Data obtained from async function">
	<DataDownloadButton
		dataFn={async () =>
			Array.from({ length: 10 }, () => ({
				a: Math.floor(Math.random() * 100),
				b: Math.floor(Math.random() * 100)
			}))}
		filename="random data"
		formats={['JSON']}
	></DataDownloadButton>
</Story> -->
