<script module lang="ts">
	import { defineMeta } from '@storybook/addon-svelte-csf';
	import MarkdownPre from './MarkdownPre.svelte';

	/**
	 * `MarkdownPre` is rendered instead of the `<pre>` HTML element in markdown processed by mdsvex.
	 * It adds a [CopyButton](./?path=/docs/ui-components-buttons-copybutton--documentation)
	 * that copies the text of the code block.
	 *
	 * Other props, such as the `class` and `style` that a syntax highlighter adds, are passed through to the `<pre>`.
	 */
	const { Story } = defineMeta({
		title: 'Ui/Components/Markdown/MarkdownPre',
		component: MarkdownPre,
		tags: ['autodocs']
	});
</script>

<Story name="Default">
	{#snippet template()}
		<div class="typeset-longform">
			<MarkdownPre
				><code
					>{`import { Button } from '@ldn-viz/ui';

let count = $state(0);`}</code
				></MarkdownPre
			>
		</div>
	{/snippet}
</Story>

<!-- A line wider than the `<pre>` scrolls horizontally inside it. -->
<Story name="Long line">
	{#snippet template()}
		<div class="typeset-longform">
			<MarkdownPre
				><code
					>const url =
					'https://data.london.gov.uk/api/action/package_search?q=population&amp;rows=100&amp;sort=metadata_modified+desc';</code
				></MarkdownPre
			>
		</div>
	{/snippet}
</Story>
