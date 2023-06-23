<script>
	import { ArrowCircleDownIcon, DocumentDownloadIcon } from '@rgossiaux/svelte-heroicons/solid';
	import { Meta, Story, Template } from '@storybook/addon-svelte-csf';
	import DataDownloadButton from './DataDownloadButton.svelte';

	const data = [
		{ A: 1, B: 2, C: 3 },
		{ A: 4, B: 5, C: 6 },
		{ A: 7, B: 8, C: 9 }
	];
</script>

<Meta title="Ui/DataDownloadButton" component={DataDownloadButton} />

<Template let:args>
	<DataDownloadButton {...args}>I'm a button from UI!</DataDownloadButton>
</Template>

<Story name="Default">
	<DataDownloadButton {data} filename="download" format="CSV">
		<ArrowCircleDownIcon class="w-6 h-6" aria-hidden="true" />
	</DataDownloadButton>
</Story>

<Story name="Button types">
	<DataDownloadButton {data} filename="download" format="CSV" variant="primary">
		Primary<ArrowCircleDownIcon class="ml-2 w-6 h-6" aria-hidden="true" />
	</DataDownloadButton>
	<DataDownloadButton {data} filename="download" format="CSV" variant="secondary">
		Secondary<DocumentDownloadIcon class="ml-2 w-6 h-6" aria-hidden="true" />
	</DataDownloadButton>
	<DataDownloadButton {data} filename="download" format="CSV" variant="ghost">
		Ghost<svg
			xmlns="http://www.w3.org/2000/svg"
			fill="none"
			viewBox="0 0 24 24"
			stroke-width="1.5"
			stroke="currentColor"
			class="ml-2 w-6 h-6"
			aria-hidden="true"
		>
			<path
				stroke-linecap="round"
				stroke-linejoin="round"
				d="M19.5 14.25v-2.625a3.375 3.375 0 00-3.375-3.375h-1.5A1.125 1.125 0 0113.5 7.125v-1.5a3.375 3.375 0 00-3.375-3.375H8.25m.75 12l3 3m0 0l3-3m-3 3v-6m-1.5-9H5.625c-.621 0-1.125.504-1.125 1.125v17.25c0 .621.504 1.125 1.125 1.125h12.75c.621 0 1.125-.504 1.125-1.125V11.25a9 9 0 00-9-9z"
			/>
		</svg>
	</DataDownloadButton>
</Story>

<Story name="Download as JSON">
	<DataDownloadButton {data} filename="download" format="JSON">
		<ArrowCircleDownIcon class="w-6 h-6" aria-hidden="true" />
	</DataDownloadButton>
</Story>

<Story name="Label on button and custom data">
	<DataDownloadButton {data} filename="download" format="CSV">
		Download<ArrowCircleDownIcon class="w-6 h-6 ml-2" aria-hidden="true" />
	</DataDownloadButton>
</Story>

<Story name="Disabled">
	<DataDownloadButton {data} disabled={true} filename="download" format="CSV">
		<ArrowCircleDownIcon class="w-6 h-" aria-hidden="true" />
	</DataDownloadButton>
</Story>
