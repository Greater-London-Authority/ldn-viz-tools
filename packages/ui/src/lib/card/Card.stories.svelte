<script module lang="ts">
	import { defineMeta } from '@storybook/addon-svelte-csf';
	import Input from '../input/Input.svelte';
	import Card from './Card.svelte';

	/**
	 * `Card` — a titled container composing a `ChromeHeader` above the content
	 * and an optional `ChromeFooter` row below. The `children` snippet holds the
	 * content: a single element, or several panels arranged together.
	 *
	 * `Card` and `ChartContainer` share the same chrome pieces (`ChromeHeader` +
	 * `ChromeFooter`) but are distinct components so they can nest — a
	 * `ChartContainer` can sit inside a `Card`.
	 *
	 * Title emphasis follows the primary-slot rule: the card title is `primary`
	 * when it owns the primary slot, and steps down to an eyebrow
	 * (`emphasis="secondary"`) when a titled element inside owns it.
	 *
	 * Surface construction (border, padding, shadow) lives on the card.
	 *
	 * Header and Footer snippets are provided as an escape hatch where fine grained
	 * control is required for adding contols or other novel elements.
	 *
	 */
	const { Story } = defineMeta({
		title: 'Ui/Components/Card',
		component: Card,
		tags: ['autodocs'],
		argTypes: {
			emphasis: { control: 'select', options: ['primary', 'secondary'] }
		}
	});
</script>

{#snippet body()}
	<p class="body text-color-text-muted">
		Maecenas ut libero vel nibh maximus feugiat non sed tortor. Card content sits between the header
		and the actions row.
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
					<span class="label text-color-text-muted">actions snippet</span>
				{/snippet}
			</Card>
		</div>
	{/snippet}
</Story>

<Story
	name="With custom header snippet"
	args={{ title: 'Card title', subtitle: 'A supporting subtitle' }}
>
	{#snippet template(args)}
		<div class="max-w-xl">
			<Card>
				{#snippet header()}
					<div class="flex items-end justify-between">
						<div>
							<p class="eyebrow">Fully custom</p>
							<h3 class="title">Head snippet</h3>
						</div>

						<Input type="range" name="range" label="Header control" />
					</div>
				{/snippet}
				{@render body()}</Card
			>
		</div>
	{/snippet}
</Story>

<Story
	name="With custom footer snippet"
	args={{ title: 'Card title', subtitle: 'A supporting subtitle' }}
>
	{#snippet template(args)}
		<div class="max-w-xl">
			<Card {...args}>
				{@render body()}
				{#snippet footer()}
					<div class="flex items-center justify-between">
						<div>
							<p class="caption">Fully custom footer snippet</p>
						</div>

						<Input type="range" name="range" label="Header control" />
					</div>
				{/snippet}
			</Card>
		</div>
	{/snippet}
</Story>
