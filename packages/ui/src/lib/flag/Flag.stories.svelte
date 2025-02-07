<script context="module">
	import Flag from './Flag.svelte';

	export const meta = {
		title: 'Ui/Components - Layout And ThemesFlag',
		component: Flag,

		argTypes: {
			condition: {
				options: ['alpha', 'beta', 'alert', 'warning', 'positive', 'notice'],
				control: { type: 'select' }
			}
		}
	};

	const conditions = ['alpha', 'beta', 'alert', 'warning', 'positive', 'notice'];
</script>

<script lang="ts">
	import { Story, Template } from '@storybook/addon-svelte-csf';
</script>

<Template let:args>
	<Flag {...args}>This is a flag</Flag>
</Template>

<Story name="Default" source />

<Story name="Default Messages">
	<div class="flex flex-col gap-4">
		{#each ['alpha', 'beta'] as condition}
			<Flag {condition} />
		{/each}
	</div>
</Story>

<Story name="Levels">
	<div class="flex flex-col gap-4">
		{#each conditions as condition}
			<Flag {condition}>
				{condition}
			</Flag>
		{/each}
	</div>
</Story>

<Story name="Links">
	<Flag condition="alpha" link="https://apps.london.gov.uk">This site is in beta.</Flag>
</Story>
