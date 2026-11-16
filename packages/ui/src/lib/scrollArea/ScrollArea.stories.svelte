<script module lang="ts">
	import { defineMeta } from '@storybook/addon-svelte-csf';
	import ScrollArea from './ScrollArea.svelte';

	/**
	 * The `<ScrollArea>` component scrolls its content and draws its own scrollbars over the content,
	 * so the scrollbars take no space. The scrollbars fade in while the pointer is over the area and
	 * fade out when it leaves. It is built on the `bits-ui` `ScrollArea` primitive, and is internal
	 * to `@ldn-viz/ui`.
	 *
	 * Its styles match the `.scroll-area` class in `@ldn-viz/themes`. Use that class for a scrolling
	 * element that doesn't need a component.
	 *
	 */

	const { Story } = defineMeta({
		title: 'Ui/Components/ScrollArea',
		component: ScrollArea,
		tags: ['autodocs'],
		argTypes: {
			orientation: {
				control: { type: 'radio' },
				options: ['vertical', 'horizontal', 'both']
			}
		},
		args: {
			orientation: 'vertical'
		}
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

<Story name="Horizontal" args={{ orientation: 'horizontal' }}>
	{#snippet template(args)}
		<ScrollArea {...args} class="w-[300px]">
			<div class="flex gap-4 p-4">
				{#each Array.from({ length: 12 }, (_, i) => i + 1) as n (n)}
					<div class="h-24 w-24 shrink-0 bg-color-surface-muted p-2">Item {n}</div>
				{/each}
			</div>
		</ScrollArea>
	{/snippet}
</Story>

<Story name="Both" args={{ orientation: 'both' }}>
	{#snippet template(args)}
		<ScrollArea {...args} class="h-[300px] w-[300px]">
			<div class="typeset-product flow-standard w-[600px] p-4">
				<h1 class="headline-sm">A wide, long page</h1>
				{#each Array.from({ length: 30 }, (_, i) => i + 1) as n (n)}
					<p>Paragraph {n} of the page content, which is wider than the scroll area.</p>
				{/each}
			</div>
		</ScrollArea>
	{/snippet}
</Story>
