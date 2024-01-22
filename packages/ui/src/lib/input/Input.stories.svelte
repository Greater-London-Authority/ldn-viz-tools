<script>
	import { Meta, Story } from '@storybook/addon-svelte-csf';

	import Input from './Input.svelte';
</script>

<Meta title="Ui/Input" component={Input} />

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
