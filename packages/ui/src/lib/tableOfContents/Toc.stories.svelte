<script module lang="ts">
	import { Callout } from '@ldn-viz/ui';
	import { defineMeta } from '@storybook/addon-svelte-csf';
	import Toc from './Toc.svelte';
	/**
	 * The `Toc` componenent renders a table of contents for navigating between sections on a page.
	 */

	const { Story } = defineMeta({
		title: 'Ui/Components/TableOfContents',
		component: Toc,
		tags: ['autodocs']
	});

	const tocItems = [
		{
			title: 'Introduction',
			url: '',
			items: []
		},
		{
			title: 'Key results',
			url: '',
			items: []
		},
		{
			title: 'Accessing the projections',
			url: '',
			items: []
		},
		{
			title: 'Updates to the projections and reporting',
			url: '',
			items: []
		}
	];
</script>

<Story name="Default">
	{#snippet template()}
		<div class="flex flex-col gap-flow-loose">
			<Callout status="notice" size="sm">
				{#snippet body()}
					<p>Table of Contents component is only visible on viewports 1024px or wider.</p>
				{/snippet}
			</Callout>
			<Toc toc={{ items: tocItems }} />
		</div>
	{/snippet}
</Story>
