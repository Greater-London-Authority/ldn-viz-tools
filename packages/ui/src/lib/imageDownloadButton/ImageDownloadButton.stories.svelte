<script context="module" lang="ts">
	import ImageDownloadButton from './ImageDownloadButton.svelte';

	export const meta = {
		title: 'Ui/ImageDownloadButton',
		component: ImageDownloadButton,
		argTypes: {
			format: {
				options: ['PNG', 'SVG'],
				control: { type: 'radio' },
				table: {
					defaultValue: { summary: '' },
					type: { summary: 'string' }
				}
			}
		}
	};
</script>

<script lang="ts">
	import { Camera } from '@steeze-ui/heroicons';
	import { Icon } from '@steeze-ui/svelte-icon';
	import { Story, Template } from '@storybook/addon-svelte-csf';
	import LogoByCiu from '../logos/LogoByCIU.svelte';


	let htmlNode: HTMLElement;
</script>

<div
	bind:this={htmlNode}
	class="flex flex-col gap-2 w-fit pb-8 text-color-text-primary bg-color-container-level-0"
>
	<h2 class="font-bold text-lg">A title</h2>
	<p class="text-color-text-secondary" data-capture-ignore>A paragraph of text...</p>
	<LogoByCiu class="w-80" />
</div>

<Template let:args>
	<ImageDownloadButton {...args} {htmlNode}>
		<Icon src={Camera} theme="mini" class="ml-2 w-5 h-5" aria-hidden="true" slot="afterLabel" />
	</ImageDownloadButton>
</Template>

<Story name="Default" source />

<Story name="Disabled" source args={{ disabled: true }} />

<Story name="Download as an SVG - no option">
	<ImageDownloadButton {htmlNode} formats={['SVG']}>
		<Icon src={Camera} theme="mini" class="ml-2 w-5 h-5" aria-hidden="true" slot="afterLabel" />
	</ImageDownloadButton>
</Story>

<Story name="Download as an PNG - no option">
	<ImageDownloadButton {htmlNode} formats={['PNG']}>
		<Icon src={Camera} theme="mini" class="ml-2 w-5 h-5" aria-hidden="true" slot="afterLabel" />
	</ImageDownloadButton>
</Story>
