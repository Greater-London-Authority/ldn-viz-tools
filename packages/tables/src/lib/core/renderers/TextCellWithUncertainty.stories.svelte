<script context="module">
	import TextCellWithUncertainty from './TextCellWithUncertainty.svelte';
	export const meta = {
		title: 'Tables/Renderers/TextCellWithUncertainty',
		component: TextCellWithUncertainty,

		argTypes: {
			alignText: {
				options: ['left', 'right', 'center'],
				control: { type: 'radio' }
			}
		},

		args: {
			alignText: 'left'
		}
	};
</script>

<script lang="ts">
	import { Story, Template } from '@storybook/addon-svelte-csf';
</script>

<Template let:args>
	<TextCellWithUncertainty value={'500 cars'} colorScale={() => 'red'} {...args} />
</Template>

<Story name="Default" source />

<Story name="Example" source>
	<TextCellWithUncertainty value={'Value that is known'} contextVals={[true]} />
	<TextCellWithUncertainty value={'Value that is merely estimated'} contextVals={[false]} />
</Story>
