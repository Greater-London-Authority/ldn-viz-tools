<script module lang="ts">
	import { defineMeta } from '@storybook/addon-svelte-csf';
	import Button from '../button/Button.svelte';
	import Well from './Well.svelte';

	/**
	 * A block with a tinted fill and no border, for a short message that needs less attention than a `Callout`.
	 */

	const { Story } = defineMeta({
		title: 'Ui/Components/Well',
		component: Well,
		tags: ['autodocs']
	});
</script>

<Story name="Default">
	{#snippet template(args)}
		<Well {...args}>
			{#snippet title()}The title!{/snippet}
			{#snippet body()}The body!{/snippet}
		</Well>
	{/snippet}
</Story>

<Story name="With Action">
	{#snippet template(args)}
		<Well {...args}>
			{#snippet title()}The title!{/snippet}
			{#snippet body()}The body!{/snippet}
			{#snippet more()}<Button>More info</Button>{/snippet}
		</Well>
	{/snippet}
</Story>

<Story name="Statuses">
	{#snippet template(args)}
		<div class="space-y-4">
			<Well {...args} status="neutral">
				{#snippet title()}Neutral{/snippet}
				{#snippet body()}Lorem ipsum dolor sit amet, consectetur adipiscing elit. Aenean eu ex
					justo. Nulla tristique molestie turpis id vestibulum. Proin sapien elit, accumsan a tellus
					eleifend, convallis elementum justo. Mauris luctus fermentum mauris nec euismod. Vivamus
					ut ultricies eros. Integer vel velit arcu.{/snippet}
			</Well>

			<Well {...args} status="notice">
				{#snippet title()}Notice{/snippet}
				{#snippet body()}Lorem ipsum dolor sit amet, consectetur adipiscing elit. Aenean eu ex
					justo. Nulla tristique molestie turpis id vestibulum. Proin sapien elit, accumsan a tellus
					eleifend, convallis elementum justo. Mauris luctus fermentum mauris nec euismod. Vivamus
					ut ultricies eros. Integer vel velit arcu.{/snippet}
			</Well>

			<Well {...args} status="positive">
				{#snippet title()}Positive{/snippet}
				{#snippet body()}Lorem ipsum dolor sit amet, consectetur adipiscing elit. Aenean eu ex
					justo. Nulla tristique molestie turpis id vestibulum. Proin sapien elit, accumsan a tellus
					eleifend, convallis elementum justo. Mauris luctus fermentum mauris nec euismod. Vivamus
					ut ultricies eros. Integer vel velit arcu.{/snippet}
			</Well>

			<Well {...args} status="caution">
				{#snippet title()}Caution{/snippet}
				{#snippet body()}Lorem ipsum dolor sit amet, consectetur adipiscing elit. Aenean eu ex
					justo. Nulla tristique molestie turpis id vestibulum. Proin sapien elit, accumsan a tellus
					eleifend, convallis elementum justo. Mauris luctus fermentum mauris nec euismod. Vivamus
					ut ultricies eros. Integer vel velit arcu.{/snippet}
			</Well>

			<Well {...args} status="negative">
				{#snippet title()}Negative{/snippet}
				{#snippet body()}Lorem ipsum dolor sit amet, consectetur adipiscing elit. Aenean eu ex
					justo. Nulla tristique molestie turpis id vestibulum. Proin sapien elit, accumsan a tellus
					eleifend, convallis elementum justo. Mauris luctus fermentum mauris nec euismod. Vivamus
					ut ultricies eros. Integer vel velit arcu.{/snippet}
			</Well>
		</div>
	{/snippet}
</Story>

<Story name="Sizes">
	{#snippet template(args)}
		<div class="space-y-4">
			<Well {...args} size="sm">
				{#snippet title()}Size: sm{/snippet}
				{#snippet body()}Lorem ipsum dolor sit amet, consectetur adipiscing elit. Aenean eu ex
					justo. Nulla tristique molestie turpis id vestibulum. Proin sapien elit, accumsan a tellus
					eleifend, convallis elementum justo. Mauris luctus fermentum mauris nec euismod. Vivamus
					ut ultricies eros. Integer vel velit arcu.{/snippet}
			</Well>

			<Well {...args} size="md">
				{#snippet title()}Size: md{/snippet}
				{#snippet body()}Lorem ipsum dolor sit amet, consectetur adipiscing elit. Aenean eu ex
					justo. Nulla tristique molestie turpis id vestibulum. Proin sapien elit, accumsan a tellus
					eleifend, convallis elementum justo. Mauris luctus fermentum mauris nec euismod. Vivamus
					ut ultricies eros. Integer vel velit arcu.{/snippet}
			</Well>

			<Well {...args} size="lg">
				{#snippet title()}Size: lg{/snippet}
				{#snippet body()}Lorem ipsum dolor sit amet, consectetur adipiscing elit. Aenean eu ex
					justo. Nulla tristique molestie turpis id vestibulum. Proin sapien elit, accumsan a tellus
					eleifend, convallis elementum justo. Mauris luctus fermentum mauris nec euismod. Vivamus
					ut ultricies eros. Integer vel velit arcu.{/snippet}
			</Well>
		</div>
	{/snippet}
</Story>

<!-- When there is no heading in the Well (that is, no title slot in use), you must define an
`ariaTitle` for screen-reader use.

```html
	<Well ariaTitle="Learn about chart methodology">
		<div slot="body">
			<p>
				You can find out more about <a href="www.example.com" class="underline hover:no-underline"
					>the chart methodology</a
				>.
			</p>
		</div>
	</Well>
```
-->
<Story name="No title">
	{#snippet template(args)}
		<Well {...args} ariaTitle="Learn about chart methodology">
			{#snippet body()}
				<p>
					You can find out more about
					<a href="https://www.example.com" class="underline hover:no-underline">
						the chart methodology
					</a>.
				</p>
			{/snippet}
		</Well>
	{/snippet}
</Story>
