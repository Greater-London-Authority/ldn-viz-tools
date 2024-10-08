<script context="module">
	import DoubleBarCell from './DoubleBarCell.svelte';

	export const meta = {
		title: 'Tables/Encodings/DoubleBarCell',
		component: DoubleBarCell,

		args: {
			value: 0.5
		}
	};
</script>

<script lang="ts">
	import { Story, Template } from '@storybook/addon-svelte-csf';
</script>

<Template let:args>
	<DoubleBarCell {...args} />
</Template>

<Story name="Default" source />
