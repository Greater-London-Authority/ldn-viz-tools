<script context="module">
	import Flag from './Flag.svelte';

	export const meta = {
		title: 'Ui/Flag',
		component: Flag
	};

	const types = ['alpha', 'beta', 'alert', 'warning', 'positive', 'notice'];
</script>

<script lang="ts">
	import { Story, Template } from '@storybook/addon-svelte-csf';
</script>

<Template let:args>
	<Flag {...args} />
</Template>

<Story name="Default" source />

<Story name="Default Messages">
	<div class="flex flex-col gap-4">
		{#each ['alpha', 'beta'] as type}
			<Flag level={type} />
		{/each}
	</div>
</Story>

<Story name="Levels">
	<div class="flex flex-col gap-4">
		{#each types as type}
			<Flag level={type}>
				{type}
			</Flag>
		{/each}
	</div>
</Story>

<Story name="Links">
	<Flag level="alpha" link="https://apps.london.gov.uk">This site is in beta.</Flag>
</Story>
