<script module lang="ts">
	import { defineMeta } from '@storybook/addon-svelte-csf';
	import Card from './Card.svelte';

	/**
	 * The `Card` is a titled container composing a `ChromeHeader` (a `TitleGroup`
	 * plus an optional hint) above a content slot, and an optional `ChromeActions`
	 * row (footnotes + actions) below. `Card` and `ChartContainer` share the same
	 * chrome pieces, so they read and construct identically across surfaces.
	 */
	const { Story } = defineMeta({
		title: 'Ui/Card',
		component: Card,
		tags: ['autodocs'],
		argTypes: {
			emphasis: { control: 'select', options: ['primary', 'secondary'] }
		}
	});
</script>

{#snippet body()}
	<p class="body text-color-text-muted">
		Maecenas ut libero vel nibh maximus feugiat non sed tortor. Card content sits in the slot
		between the header and actions.
	</p>
{/snippet}

<Story name="Default" args={{ title: 'Card title', subtitle: 'A supporting subtitle' }}>
	{#snippet template(args)}
		<div class="max-w-xl">
			<Card {...args}>{@render body()}</Card>
		</div>
	{/snippet}
</Story>

<Story
	name="With eyebrow"
	args={{ eyebrow: 'Category', title: 'Card title', subtitle: 'A supporting subtitle' }}
>
	{#snippet template(args)}
		<div class="max-w-xl">
			<Card {...args}>{@render body()}</Card>
		</div>
	{/snippet}
</Story>

<Story name="With hint" args={{ title: 'Card title', hint: 'What does this card show?' }}>
	{#snippet template(args)}
		<div class="max-w-xl">
			<Card {...args}>{@render body()}</Card>
		</div>
	{/snippet}
</Story>

<Story
	name="Secondary emphasis (demoted title)"
	args={{ emphasis: 'secondary', title: 'Section label' }}
>
	{#snippet template(args)}
		<div class="max-w-xl">
			<Card {...args}>{@render body()}</Card>
		</div>
	{/snippet}
</Story>

<Story
	name="With actions"
	args={{
		title: 'Card title',
		subtitle: 'A supporting subtitle',
		byline: 'GLA City Intelligence',
		source: 'LDN Viz Tools Demo Data'
	}}
>
	{#snippet template(args)}
		<div class="max-w-xl">
			<Card {...args}>
				{@render body()}
				{#snippet actions()}
					<span class="label text-color-text-muted">actions slot</span>
				{/snippet}
			</Card>
		</div>
	{/snippet}
</Story>
