<script module lang="ts">
	import { defineMeta } from '@storybook/addon-svelte-csf';

	import Overlay from '../overlay/Overlay.svelte';
	import Input from './Input.svelte';
	/**
	 * The `Input` component renders a labelled form input (or, if `type` is `textarea`, a `<textarea>`), with support for a `description`, `hint`, `error` message, and `optional`/required state.
	 * The value can be reformatted on blur (for example, trimming whitespace) via the `format` prop.
	 */

	const { Story } = defineMeta({
		title: 'Ui/Components/Input',
		component: Input,
		tags: ['autodocs'],
		args: {
			label: 'A Label is required'
		}
	});

	let value = $state('');
	const round = (x: string) => Math.round(+x * 100) / 100;

	let age = $state('');
	const validateAge = (age: string) => {
		const ageNum = parseInt(age);

		if (!ageNum && ageNum !== 0) {
			return 'Please enter your age.';
		} else if (ageNum < 0 || ageNum > 116) {
			return 'Age must be between 0 and 116.';
		} else if (ageNum <= 18) {
			return 'You must be over 18 to use this.';
		} else return undefined;
	};
</script>

<Story name="Default">
	{#snippet template(args)}
		<div class="w-96">
			<Input {...args} />
		</div>
	{/snippet}
</Story>

<Story name="Binding on value">
	{#snippet template(args)}
		<div class="flex w-96 flex-col gap-4">
			<Input {...args} name="bind-value-input" bind:value placeholder="Type here..." />
			<div class="h-4">
				<span class="font-medium dark:text-white">Value:</span>
				{value}
			</div>
		</div>
	{/snippet}
</Story>

<Story name="With Label">
	{#snippet template(args)}
		<div class="flex w-96 flex-col gap-4">
			<Input {...args} name="labelled-input-required" label="Label" />
		</div>
	{/snippet}
</Story>

<Story name="With Label (As optional)">
	{#snippet template(args)}
		<div class="flex w-96 flex-col gap-4">
			<Input {...args} name="labelled-input-optional" label="Label" optional />
		</div>
	{/snippet}
</Story>

<Story name="With placeholder">
	{#snippet template(args)}
		<div class="w-96">
			<Input
				{...args}
				label="Placeholder"
				name="placeholder-input"
				placeholder="This is placeholder text"
			/>
		</div>
	{/snippet}
</Story>

<!--Exposes a hint slot into which one can pass an overlay component to provide contextual help-->

<Story name="With hint tooltip from props">
	{#snippet template(args)}
		<div class="w-96">
			<Input {...args} label="Tooltip" name="tooltip-input" hint="I am some hint text" />
		</div>
	{/snippet}
</Story>

<Story name="With hint tooltip - default hintLabel">
	{#snippet template(args)}
		<div class="w-96">
			<Input {...args} label="Tooltip" name="tooltip-input">
				{#snippet customOverlay()}
					<Overlay>Contextual help text</Overlay>
				{/snippet}
			</Input>
		</div>
	{/snippet}
</Story>

<Story name="With hint tooltip - custom hintLabel">
	{#snippet template(args)}
		<div class="w-96">
			{#snippet customOverlay()}
				<Overlay hintLabel="optional hint label">Contextual help text</Overlay>
			{/snippet}
			<Input {...args} label="Tooltip" name="custom-tooltip-input" {customOverlay}></Input>
		</div>
	{/snippet}
</Story>

<Story name="With hint modal">
	{#snippet template(args)}
		<div class="w-96">
			<Input {...args} label="Modal" name="modal-input">
				{#snippet customOverlay()}
					<Overlay
						hintLabel="optional hint label"
						overlayType="modal"
						modalTitle="It's a modal!"
						modalDescription="A modal that shows contextual help"
						modalWidth="sm"
					>
						Contextual help text
					</Overlay>
				{/snippet}
			</Input>
		</div>
	{/snippet}
</Story>

<Story name="With description">
	{#snippet template(args)}
		<div class="flex w-96 flex-col gap-4">
			<Input
				{...args}
				label="Label"
				name="left-aligned-description-input"
				description="Left aligned descriptive text (default)."
			/>
			<Input
				{...args}
				label="Label"
				name="right-aligned-description-input"
				description="Right aligned descriptive text."
				descriptionAlignment="right"
			/>
		</div>
	{/snippet}
</Story>

<!-- This demonstrates how an input behaves when error state changes. Try entering some numbers! -->

<Story name="With error">
	{#snippet template(args)}
		<div class="w-96">
			<Input
				{...args}
				bind:value={age}
				label="Enter your age (required)"
				name="age-input"
				type="number"
				optional={false}
				description="Try entering a number below 18."
				min="0"
				max="116"
				error={validateAge(age)}
			/>
		</div>
	{/snippet}
</Story>

<Story name="With custom input mode">
	{#snippet template(args)}
		<div class="w-96">
			<Input
				{...args}
				type="number"
				label="Input mode"
				inputmode="decimal"
				name="input-mode-input"
				hint="Using 'decimal' input mode here rather than 'numeric'"
			/>
		</div>
	{/snippet}
</Story>

<Story name="Disabled">
	{#snippet template(args)}
		<div class="flex w-96 flex-col gap-4">
			<Input {...args} label="Disabled" name="disabled-input" disabled />
			<Input
				{...args}
				label="Disabled with value"
				name="disabled-value-input"
				value="Prefilled value"
				disabled
			/>
			<Input
				{...args}
				label="Disabled with placeholder"
				name="disabled-placeholder-input"
				placeholder="Placeholder text"
				disabled
			/>
		</div>
	{/snippet}
</Story>

<Story name="Custom format function">
	{#snippet template(args)}
		<div class="w-96">
			<Input
				{...args}
				label="Type a number"
				description="It will be rounded to 2 d.p. when the input loses focus"
				format={round}
			/>
		</div>
	{/snippet}
</Story>

<Story name="Alternative types">
	{#snippet template(args)}
		<div class="flex w-96 flex-col gap-4">
			<Input
				{...args}
				type="textarea"
				label="Textarea"
				name="textarea-input"
				rows={5}
				hint="Three rows by default"
			/>
			<Input
				{...args}
				type="number"
				label="Number"
				name="number-input"
				hint="Brings up the numeric keypad on touch screens"
			/>
			<Input
				{...args}
				type="password"
				label="Password"
				name="password-input"
				hint="No formatting by default"
			/>
			<Input
				{...args}
				type="url"
				label="URL"
				name="url-input"
				hint="Brings up the URL keypad on touch screens"
			/>
			<Input
				{...args}
				type="tel"
				label="Phone"
				name="tel-input"
				hint="Brings up the telephone keypad on touch screens"
			/>
			<Input
				{...args}
				type="email"
				label="Email"
				name="email-input"
				hint="Brings up the email keypad on touch screens"
			/>
			<Input {...args} type="time" label="Time" name="time-input" />
			<Input {...args} type="date" label="Date" name="date-input" />
			<Input {...args} type="datetime-local" label="Datetime local" name="datetime-local-input" />
			<Input {...args} type="file" label="File" name="file-input" />
			<Input {...args} type="range" label="Range" name="range" />
		</div>
	{/snippet}
</Story>

<!-- Long label, description and error text (all rendered via `{@html}`) to exercise wrapping
	of the label row and the description/error paragraphs. -->
<Story name="Long label / long error overflow">
	{#snippet template(args)}
		<div class="w-96">
			<Input
				{...args}
				label="This is an unusually long label that should wrap onto multiple lines within the fixed-width container to demonstrate how the label row behaves"
				name="long-label-input"
				value="some value"
				error="This is a deliberately long error message that keeps going in order to show how the error paragraph wraps across several lines when the text is far longer than the width of the input."
			/>
		</div>
	{/snippet}
</Story>

<!-- An input with `type='textarea'` using the `rows` (set to 4),
  `cols` (set to 40) and `wrap` attributes,
	to show scrolling behaviour with long content. -->
<Story name="Textarea with rows/wrap">
	{#snippet template(args)}
		<div class="w-96">
			<Input
				{...args}
				type="textarea"
				label="Comments"
				name="textarea-wrap-input"
				rows={4}
				cols={40}
				wrap="hard"
				value="This is a long piece of pre-filled content that stretches well beyond the visible height of the textarea so that its internal scrolling can be observed. Wrapping is set to 'hard', so line breaks are preserved in the submitted value."
			/>
		</div>
	{/snippet}
</Story>

<!-- With `format={null}` no formatting is applied on blur, so leading and trailing whitespace
	is preserved (by default a text field trims it). -->
<Story name="No-format field">
	{#snippet template(args)}
		<div class="w-96">
			<Input
				{...args}
				label="Raw value"
				name="no-format-input"
				format={null}
				description="Trailing and leading whitespace is preserved."
			/>
		</div>
	{/snippet}
</Story>

<!-- You can facilitate autocompletion of input values by setting the `autocomplete` attribute
([docs on MDN](https://developer.mozilla.org/en-US/docs/Web/HTML/Attributes/autocomplete))
to indicate the type of value that should be entered.  -->
<Story name="With autocomplete">
	{#snippet template(args)}
		<div class="w-96">
			<Input {...args} autocomplete="shipping street-address" />
		</div>
	{/snippet}
</Story>
