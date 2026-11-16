<script module lang="ts">
	import { defineMeta } from '@storybook/addon-svelte-csf';
	import { Plus } from '@steeze-ui/heroicons';
	import AccordionGroup from './AccordionGroup.svelte';
	import AccordionItem from './AccordionItem.svelte';

	/**
	 * Prototype. `AccordionGroup` holds a stack of `AccordionItem`s, each a title row that
	 * opens the content below it. One item is open at a time unless `type="multiple"`.
	 *
	 * Built on the base parts in [Expandable](./?path=/docs/ui-components-expandable-base-parts--documentation).
	 */
	const { Story } = defineMeta({
		title: 'Ui/Components/Expandable/Accordion',
		component: AccordionGroup,
		tags: ['autodocs'],
		argTypes: {
			type: { control: 'radio', options: ['single', 'multiple'] }
		},
		args: { type: 'single' }
	});

	const items = [
		{ title: 'Who collects the data', body: 'Transport for London and the 33 London boroughs.' },
		{ title: 'How often it is updated', body: 'Monthly, on the first working day.' },
		{ title: 'What the figures cover', body: 'All journeys that start or end in Greater London.' },
		{ title: 'How to cite it', body: 'GLA City Intelligence, London Datastore.' }
	];
</script>

{#snippet template(args: any)}
	<div class="max-w-md">
		<AccordionGroup {...args}>
			{#each items as item (item.title)}
				<AccordionItem title={item.title} headingLevel={3}>{item.body}</AccordionItem>
			{/each}
		</AccordionGroup>
	</div>
{/snippet}

<Story name="Default" {template} />

<!-- With `type="multiple"`, each item opens on its own. -->
<Story name="Multiple" args={{ type: 'multiple' }} {template} />

<!-- `icon` takes another icon source. `iconPosition="start"` puts it before the title. -->
<Story name="Custom icon">
	{#snippet template(args)}
		<div class="max-w-md">
			<AccordionGroup {...args}>
				{#each items as item (item.title)}
					<AccordionItem title={item.title} icon={Plus} iconPosition="start">
						{item.body}
					</AccordionItem>
				{/each}
			</AccordionGroup>
		</div>
	{/snippet}
</Story>

<!-- `icon` also takes a snippet given `{ open }`, for an icon that changes with the state. -->
<Story name="Icon snippet">
	{#snippet template(args)}
		{#snippet plusMinus({ open }: { open: boolean })}
			<span class="label-md w-5 text-center">{open ? '−' : '+'}</span>
		{/snippet}
		<div class="max-w-md">
			<AccordionGroup {...args}>
				{#each items as item (item.title)}
					<AccordionItem title={item.title} icon={plusMinus}>{item.body}</AccordionItem>
				{/each}
			</AccordionGroup>
		</div>
	{/snippet}
</Story>
