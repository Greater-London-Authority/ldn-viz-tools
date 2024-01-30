<script context="module">
	import Input from './Input.svelte';

	export const meta = {
		title: 'Ui/Input',
		component: Input,
		argTypes: {
			id: {
				control: { type: 'text' }
			},
			label: {
				control: { type: 'text' }
			}
		}
		// argTypes: {
		// 	emphasis: {
		// 		options: ['primary', 'secondary'],
		// 		control: { type: 'radio' }
		// 	},
		// 	variant: {
		// 		options: ['brand', 'solid', 'outline', 'text'], //square
		// 		control: { type: 'select' }
		// 	},
		// 	condition: {
		// 		options: ['default', 'success', 'error', 'warning'],
		// 		control: { type: 'select' }
		// 	},
		// 	size: {
		// 		options: ['sm', 'md', 'lg'],
		// 		control: { type: 'radio' }
		// 	},
		// 	type: {
		// 		options: ['button', 'submit'],
		// 		control: { type: 'radio' }
		// 	}
		// },
		// args: {
		// 	id: 'storybook button'
		// }
	};
</script>

<script>
	import { Story } from '@storybook/addon-svelte-csf';
</script>

<Story name="Default">
	<div class="w-96">
		<Input id="default" />
	</div>
</Story>

<Story name="With Label">
	<div class="w-96">
		<Input label="Label" id="labelled-input" />
	</div>
</Story>

<Story name="More Chrome">
	<div class="w-96">
		<Input
			label="Label"
			id="labelled-input"
			placeholder="Placeholder text"
			hint
			hintText="Tooltip text"
			hintTooltipContent="A brief contextual help message"
			description="descriptive text"
			optional
		/>
	</div>
</Story>

<Story name="Description alignment">
	<div class="w-96">
		<Input
			label="Label"
			id="labelled-input"
			placeholder="Placeholder text"
			hint
			hintText="Tooltip text"
			hintTooltipContent="A brief contextual help message"
			description="descriptive text"
			descriptionAlignment="right"
			optional
		/>
	</div>
</Story>

<Story name="Error">
	<div class="w-96">
		<Input
			label="Label"
			id="labelled-input"
			placeholder="Placeholder text"
			hint
			hintText="Tooltip text"
			hintTooltipContent="A brief contextual help message"
			description="descriptive text"
			optional
			error
			errorMessage="something has gone wrong here"
		/>
	</div>
</Story>

<Story name="Disabled">
	<div class="w-96">
		<Input
			label="Label"
			id="labelled-input"
			placeholder="Placeholder text"
			hint
			hintText="Tooltip text"
			hintTooltipContent="A brief contextual help message"
			description="descriptive text"
			disabled
			optional
		/>
	</div>
</Story>
