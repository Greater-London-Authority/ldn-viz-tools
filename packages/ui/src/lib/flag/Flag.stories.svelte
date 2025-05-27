<script context="module" lang="ts">
	import { defineMeta } from '@storybook/addon-svelte-csf';
	import Flag, { type FlagCondition } from './Flag.svelte';

	const { Story } = defineMeta({
		title: 'Ui/Components - Layout And Themes/Flag',
		component: Flag,
		tags: ['autodocs'],
		argTypes: {
			condition: {
				options: ['alpha', 'beta', 'alert', 'warning', 'positive', 'notice'],
				control: { type: 'select' }
			}
		}
	});

	const conditions: FlagCondition[] = ['alpha', 'beta', 'alert', 'warning', 'positive', 'notice'];
</script>

<Story name="Default" />

<Story name="Default Messages" asChild>
	<div class="flex flex-col gap-4">
		{#each conditions.filter((d) => d === 'alpha' || d === 'beta') as condition (condition)}
			<Flag {condition} />
		{/each}
	</div>
</Story>

<Story name="Levels" asChild>
	<div class="flex flex-col gap-4">
		{#each conditions as condition (condition)}
			<Flag {condition}>
				{condition}
			</Flag>
		{/each}
	</div>
</Story>

<Story name="Links" asChild>
	<Flag condition="alpha" link="https://apps.london.gov.uk">This site is in beta.</Flag>
</Story>
