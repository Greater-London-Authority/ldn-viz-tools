<script module lang="ts">
	import { defineMeta } from '@storybook/addon-svelte-csf';
	import Card from './Card.svelte';

	const { Story } = defineMeta({
		title: 'Ui/Components - Layout And Themes/Card',
		component: Card
	});
</script>

<Story name="Default">
	{#snippet template(args)}
		<Card {...args} />
	{/snippet}
</Story>

<Story name="With Label">
	{#snippet template(args)}
		<Card {...args} label="Label" />
	{/snippet}
</Story>

<Story name="With Title">
	{#snippet template(args)}
		<Card {...args} title="Card title" />
	{/snippet}
</Story>

<Story name="With Content">
	{#snippet template(args)}
		<Card {...args} title="Card title">
			<p class="product responsive body-md">
				Lorem ipsum dolor sit amet, consectetur adipiscing elit. Vestibulum non dignissim odio.
				Morbi at sollicitudin magna, viverra dapibus libero. Etiam finibus malesuada mi, in
				tristique nulla suscipit ut. In imperdiet leo nec faucibus luctus. Fusce nec mattis velit,
				sed vestibulum dolor. Aenean semper tempus ipsum, at pulvinar quam posuere et.
			</p>
		</Card>
	{/snippet}
</Story>
