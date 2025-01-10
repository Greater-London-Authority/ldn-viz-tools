<script context="module">
	import BarCell from './BarCell.svelte';

	export const meta = {
		title: 'Tables/Renderers/BarCell',
		component: BarCell,

		args: {
			value: 0.5
		}
	};
</script>

<script lang="ts">
	import { Story, Template } from '@storybook/addon-svelte-csf';
</script>

<Template let:args>
	<BarCell {...args} />
</Template>

<Story name="Default" source />
