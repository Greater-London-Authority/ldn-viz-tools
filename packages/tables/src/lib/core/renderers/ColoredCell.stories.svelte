<script context="module">
	import ColoredCell from './ColoredCell.svelte';

	export const meta = {
		title: 'Tables/Encodings/ColoredCell',
		component: ColoredCell
	};
</script>

<script lang="ts">
	import { Story, Template } from '@storybook/addon-svelte-csf';
</script>

<Template let:args>
	<ColoredCell value={0.5} colorScale={() => 'red'} {...args} />
</Template>

<Story name="Default" source />
