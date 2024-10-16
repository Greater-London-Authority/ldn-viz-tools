<script context="module">
	import PairArrowCell from './PairArrowCell.svelte';

	export const meta = {
		title: 'Tables/Renderers/PairArrowCell',
		component: PairArrowCell,

		args: {
			value: 0.5,
			contextVals: [0.1]
		}
	};
</script>

<script lang="ts">
	import { Story, Template } from '@storybook/addon-svelte-csf';
</script>

<Template let:args>
	<PairArrowCell {...args} />
</Template>

<Story name="Default" source />
