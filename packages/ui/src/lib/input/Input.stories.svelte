<script>
	import { Meta, Story, Template } from '@storybook/addon-svelte-csf';
	import Input from './Input.svelte';

	let value = '';
</script>

<Meta title="Ui/Input" component={Input} />

<Template let:args>
	<div class="w-96">
		<Input {...args} />
	</div>
</Template>

<Story name="Default" source />

<Story name="Binding on value">
	<div class="w-96 flex flex-col gap-4">
		<Input name="bind-value-input" bind:value placeholder="Type here..." />
		<div class="h-4">
			<span class="font-medium">Value:</span>
			{value}
		</div>
	</div>
</Story>

<Story name="With Label">
	<div class="w-96 flex flex-col gap-4">
		<Input name="labelled-input-required" label="Label" />
		<Input name="labelled-input-optional" label="Label" optional />
	</div>
</Story>

<Story name="With tooltip">
	<div class="w-96">
		<Input
			label="Tooltip"
			name="tooltip-input"
			hint="Contextual help text"
			hintLabel="optional hint label"
		/>
	</div>
</Story>

<Story name="With description">
	<div class="w-96 flex flex-col gap-4">
		<Input
			label="Label"
			name="left-aligned-description-input"
			description="Left aligned descriptive text (default)."
		/>
		<Input
			label="Label"
			name="right-aligned-description-input"
			description="Right aligned descriptive text."
			descriptionAlignment="right"
		/>
	</div>
</Story>

<Story name="With error">
	<div class="w-96">
		<Input label="Description" name="description-input" error="Error text" />
	</div>
</Story>

<Story name="With custom input mode">
	<div class="w-96">
		<Input
			type="number"
			label="Input mode"
			inputmode="decimal"
			name="input-mode-input"
			hint="Using 'decimal' input mode here rather than 'numeric'"
		/>
	</div>
</Story>

<Story name="Disabled">
	<div class="w-96">
		<Input label="Disabled" name="disabled-input" disabled />
	</div>
</Story>

<Story name="Alternative types">
	<div class="w-96 flex flex-col gap-4">
		<Input
			type="textarea"
			label="Textarea"
			name="textarea-input"
			rows="5"
			hint="Three rows by default"
		/>
		<Input
			type="number"
			label="Number"
			name="number-input"
			hint="Brings up the numeric keypad on touch screens"
		/>
		<Input type="password" label="Password" name="password-input" hint="No formatting by default" />
		<Input
			type="url"
			label="URL"
			name="url-input"
			hint="Brings up the URL keypad on touch screens"
		/>
		<Input
			type="tel"
			label="Phone"
			name="tel-input"
			hint="Brings up the telephone keypad on touch screens"
		/>
		<Input
			type="email"
			label="Email"
			name="email-input"
			hint="Brings up the email keypad on touch screens"
		/>
		<Input type="range" label="Range" name="range-input" value="0" min="-10" max="10" />
		<Input type="time" label="Time" name="time-input" />
		<Input type="date" label="Date" name="date-input" />
		<Input type="datetime-local" label="Datetime local" name="datetime-local-input" />
		<Input type="file" label="File" name="file-input" />
	</div>
</Story>
