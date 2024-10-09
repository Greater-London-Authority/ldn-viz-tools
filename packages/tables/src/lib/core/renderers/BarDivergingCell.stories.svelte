<script context="module">
	import BarDivergingCell from './BarDivergingCell.svelte';

	export const meta = {
		title: 'Tables/Encodings/BarDivergingCell',
		component: BarDivergingCell,

		args: {
			value: 0.5
		}
	};
</script>

<script lang="ts">
	import { Story, Template } from '@storybook/addon-svelte-csf';
</script>

<Template let:args>
	<BarDivergingCell {...args} />
</Template>

<Story name="Default" source />
