<script>
	import { Meta, Story } from '@storybook/addon-svelte-csf';

	import Input from './Input.svelte';
</script>

<Meta title="Ui/Input" component={Input} />

<Story name="Default">
	<Input id="default" />
</Story>

<Story name="With Label">
	<Input label="Label" id="labelled-input" />
</Story>

<Story name="More suff">
	<Input
		label="Label"
		id="labelled-input"
		placeholder="Placeholder text"
		hint
		hintText="Tooltip text"
		hintTooltipContent="A brief contextual help text"
		description="descriptive text"
		optional
	/>
</Story>

<Story name="Description alignment">
	<Input
		label="Label"
		id="labelled-input"
		placeholder="Placeholder text"
		hint
		hintText="Tooltip text"
		hintTooltipContent="A brief contextual help text"
		description="descriptive text"
		descriptionAlignment="right"
		optional
	/>
</Story>

<Story name="Error">
	<Input
		label="Label"
		id="labelled-input"
		placeholder="Placeholder text"
		hint
		hintText="Tooltip text"
		hintTooltipContent="A brief contextual help text"
		description="descriptive text"
		optional
		error
		errorMessage="something has gone wrong here"
	/>
</Story>

<Story name="Disabled">
	<Input
		label="Label"
		id="labelled-input"
		placeholder="Placeholder text"
		hint
		hintText="Tooltip text"
		hintTooltipContent="A brief contextual help text"
		description="descriptive text"
		disabled
		optional
	/>
</Story>
