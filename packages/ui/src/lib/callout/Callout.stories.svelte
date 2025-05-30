<script module lang="ts">
	import { defineMeta } from '@storybook/addon-svelte-csf';
	import Callout from './Callout.svelte';
	import Button from '../button/Button.svelte';

	/**
	 * The `Callout` component is used to display a short message in a coloured banner.
	 */

	const { Story } = defineMeta({
		title: 'Ui/Components/Callout/Callout',
		component: Callout,
		tags: ['autodocs']
	});
</script>

<Story name="Default">
	{#snippet template(args)}
		<Callout {...args}>
			{#snippet title()}The title!{/snippet}
			{#snippet body()}The body!{/snippet}
		</Callout>
	{/snippet}
</Story>

<Story name="With Action">
	{#snippet template(args)}
		<Callout {...args}>
			{#snippet title()}The title!{/snippet}
			{#snippet body()}The body!{/snippet}
			{#snippet more()}<Button>More info</Button>{/snippet}
		</Callout>
	{/snippet}
</Story>

<Story name="Statuses">
	{#snippet template(args)}
		<div class="space-y-4">
			<Callout {...args} status="notice">
				{#snippet title()}Notice{/snippet}
				{#snippet body()}Lorem ipsum dolor sit amet, consectetur adipiscing elit. Aenean eu ex
					justo. Nulla tristique molestie turpis id vestibulum. Proin sapien elit, accumsan a tellus
					eleifend, convallis elementum justo. Mauris luctus fermentum mauris nec euismod. Vivamus
					ut ultricies eros. Integer vel velit arcu.{/snippet}
			</Callout>

			<Callout {...args} status="positive">
				{#snippet title()}Positive{/snippet}
				{#snippet body()}Lorem ipsum dolor sit amet, consectetur adipiscing elit. Aenean eu ex
					justo. Nulla tristique molestie turpis id vestibulum. Proin sapien elit, accumsan a tellus
					eleifend, convallis elementum justo. Mauris luctus fermentum mauris nec euismod. Vivamus
					ut ultricies eros. Integer vel velit arcu.{/snippet}
			</Callout>

			<Callout {...args} status="caution">
				{#snippet title()}Caution{/snippet}
				{#snippet body()}Lorem ipsum dolor sit amet, consectetur adipiscing elit. Aenean eu ex
					justo. Nulla tristique molestie turpis id vestibulum. Proin sapien elit, accumsan a tellus
					eleifend, convallis elementum justo. Mauris luctus fermentum mauris nec euismod. Vivamus
					ut ultricies eros. Integer vel velit arcu.{/snippet}
			</Callout>

			<Callout {...args} status="negative">
				{#snippet title()}Negative{/snippet}
				{#snippet body()}Lorem ipsum dolor sit amet, consectetur adipiscing elit. Aenean eu ex
					justo. Nulla tristique molestie turpis id vestibulum. Proin sapien elit, accumsan a tellus
					eleifend, convallis elementum justo. Mauris luctus fermentum mauris nec euismod. Vivamus
					ut ultricies eros. Integer vel velit arcu.{/snippet}
			</Callout>
		</div>
	{/snippet}
</Story>

<Story name="Sizes">
	{#snippet template(args)}
		<div class="space-y-4">
			<Callout {...args} size="sm">
				{#snippet title()}Size: sm{/snippet}
				{#snippet body()}Lorem ipsum dolor sit amet, consectetur adipiscing elit. Aenean eu ex
					justo. Nulla tristique molestie turpis id vestibulum. Proin sapien elit, accumsan a tellus
					eleifend, convallis elementum justo. Mauris luctus fermentum mauris nec euismod. Vivamus
					ut ultricies eros. Integer vel velit arcu.{/snippet}
			</Callout>

			<Callout {...args} size="md">
				{#snippet title()}Size: md{/snippet}
				{#snippet body()}Lorem ipsum dolor sit amet, consectetur adipiscing elit. Aenean eu ex
					justo. Nulla tristique molestie turpis id vestibulum. Proin sapien elit, accumsan a tellus
					eleifend, convallis elementum justo. Mauris luctus fermentum mauris nec euismod. Vivamus
					ut ultricies eros. Integer vel velit arcu.{/snippet}
			</Callout>

			<Callout {...args} size="lg">
				{#snippet title()}Size: lg{/snippet}
				{#snippet body()}Lorem ipsum dolor sit amet, consectetur adipiscing elit. Aenean eu ex
					justo. Nulla tristique molestie turpis id vestibulum. Proin sapien elit, accumsan a tellus
					eleifend, convallis elementum justo. Mauris luctus fermentum mauris nec euismod. Vivamus
					ut ultricies eros. Integer vel velit arcu.{/snippet}
			</Callout>
		</div>
	{/snippet}
</Story>

<!-- When there is no heading in the callout (that is, no title slot in use), you must define an
`ariaTitle` for screen-reader use.

```html
	<Callout ariaTitle="Learn about chart methodology">
		<div slot="body">
			<p>
				You can find out more about <a href="www.example.com" class="underline hover:no-underline"
					>the chart methodology</a
				>.
			</p>
		</div>
	</Callout>
```
-->
<Story name="No title">
	{#snippet template(args)}
		<Callout {...args} ariaTitle="Learn about chart methodology">
			{#snippet body()}
				<p>
					You can find out more about
					<a href="www.example.com" class="underline hover:no-underline">
						the chart methodology
					</a>.
				</p>
			{/snippet}
		</Callout>
	{/snippet}
</Story>
