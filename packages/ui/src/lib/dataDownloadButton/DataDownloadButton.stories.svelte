<script context="module" lang="ts">
	import DataDownloadButton from './DataDownloadButton.svelte';

	export const meta = {
		title: 'Ui/DataDownloadButton',
		component: DataDownloadButton,
		argTypes: {
			filename: {
				table: {
					defaultValue: { summary: '' },
					type: { summary: 'string' }
				}
			}
		}
	};
</script>

<script>
	import { ArrowDownTray } from '@steeze-ui/heroicons';
	import { Icon } from '@steeze-ui/svelte-icon';

	import { Story, Template } from '@storybook/addon-svelte-csf';

	const data = [
		{ A: 1, B: 2, C: 3 },
		{ A: 4, B: 5, C: 6 },
		{ A: 7, B: 8, C: 9 }
	];
</script>

<Template let:args>
	<DataDownloadButton {data} {...args}>
		<Icon
			src={ArrowDownTray}
			theme="mini"
			class="ml-2 w-5 h-5"
			aria-hidden="true"
			slot="afterLabel"
		/>
	</DataDownloadButton>
</Template>

<Story
	name="Default"
	args={{ filename: 'download' }}
	source
	parameters={{
		options: {
			showPanel: true
		}
	}}
/>

<Story name="Without Icon">
	<DataDownloadButton {data} filename="download" />
</Story>

<Story name="Wit Icon before label">
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
		<DataDownloadButton {data} filename="download" format="CSV" emphasis="primary">
			<Icon
				src={ArrowDownTray}
				theme="mini"
				class="ml-2 w-5 h-5"
				aria-hidden="true"
				slot="afterLabel"
			/>
		</DataDownloadButton>
		<DataDownloadButton {data} filename="download" format="CSV" emphasis="secondary">
			<Icon
				src={ArrowDownTray}
				theme="mini"
				class="ml-2 w-5 h-5"
				aria-hidden="true"
				slot="afterLabel"
			/>
		</DataDownloadButton>
		<DataDownloadButton {data} filename="download" format="CSV" variant="outline" size="sm">
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
