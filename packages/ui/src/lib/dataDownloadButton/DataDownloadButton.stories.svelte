<script context="module" lang="ts">
	import DataDownloadButton from './DataDownloadButton.svelte';

	export const meta = {
		title: 'Ui/DataDownloadButton',
		component: DataDownloadButton,
		argTypes: {
			format: {
				options: ['CSV', 'JSON'],
				control: { type: 'radio' },
				table: {
					defaultValue: { summary: '' },
					type: { summary: 'string' }
				}
			},
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
	<DataDownloadButton {...args}>
		Download <Icon src={ArrowDownTray} theme="mini" class="ml-2 w-5 h-5" aria-hidden="true" />
	</DataDownloadButton>
</Template>

<Story
	name="Default"
	args={{ filename: 'download', format: 'CSV' }}
	source
	parameters={{
		options: {
			showPanel: true
		}
	}}
/>

<Story name="Rename Columns">
	<DataDownloadButton
		{data}
		filename="download"
		format="CSV"
		columnMapping={{ A: 'foo', B: 'bar', C: 'baz' }}
	>
		<Icon src={ArrowDownTray} theme="solid" class="w-6 h-6" aria-hidden="true" />
	</DataDownloadButton>
</Story>

<Story name="Button types">
	<div class="flex flex-col space-y-2">
		<DataDownloadButton {data} filename="download" format="CSV" emphasis="primary">
			Primary <Icon src={ArrowDownTray} theme="mini" class="ml-2 w-5 h-5" aria-hidden="true" />
		</DataDownloadButton>
		<DataDownloadButton {data} filename="download" format="CSV" emphasis="secondary">
			Secondary <Icon src={ArrowDownTray} theme="mini" class="ml-2 w-5 h-5" aria-hidden="true" />
		</DataDownloadButton>
		<DataDownloadButton {data} filename="download" format="CSV" variant="text">
			Text <Icon src={ArrowDownTray} theme="mini" class="ml-2 w-5 h-5" aria-hidden="true" />
		</DataDownloadButton>
	</div>
</Story>

<Story name="Download as JSON">
	<DataDownloadButton {data} filename="download" format="JSON">
		Download as JSON
		<Icon src={ArrowDownTray} theme="mini" class="ml-2 w-5 h-5" aria-hidden="true" />
	</DataDownloadButton>
</Story>

<Story name="Disabled">
	<DataDownloadButton {data} disabled={true} filename="download" format="CSV">
		Download
		<Icon src={ArrowDownTray} theme="mini" class="ml-2 w-5 h-5" aria-hidden="true" />
	</DataDownloadButton>
</Story>
