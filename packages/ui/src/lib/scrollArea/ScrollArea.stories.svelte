<script module lang="ts">
	import { defineMeta } from '@storybook/addon-svelte-csf';
	import ScrollArea from './ScrollArea.svelte';

	/**
	 * A block with a tinted fill and no border, for a short message that needs less attention than a `Callout`.
	 */

	const { Story } = defineMeta({
		title: 'Ui/Components/ScrollArea',
		component: ScrollArea,
		tags: ['autodocs']
	});
</script>

<Story name="Default">
	{#snippet template(args)}
		<ScrollArea {...args} class="h-[300px] w-[300px]">
			<div class="typeset-product flow-standard p-4">
				<h1 class="headline-sm">A long page</h1>
				{#each Array.from({ length: 30 }, (_, i) => i + 1) as n (n)}
					<p>Paragraph {n} of the page content.</p>
				{/each}
			</div>
		</ScrollArea>
	{/snippet}
</Story>

<Story name="Constrained by parent">
	{#snippet template(args)}
		<div class="h-[300px] w-[300px]">
			<ScrollArea {...args} class="h-full">
				<div class="typeset-product flow-standard p-4">
					<h1 class="headline-sm">A long page</h1>
					{#each Array.from({ length: 30 }, (_, i) => i + 1) as n (n)}
						<p>Paragraph {n} of the page content.</p>
					{/each}
				</div>
			</ScrollArea>
		</div>
	{/snippet}
</Story>
