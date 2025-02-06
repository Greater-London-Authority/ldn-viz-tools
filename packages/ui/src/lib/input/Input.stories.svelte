<script context="module" lang="ts">
	import { Story, Template } from '@storybook/addon-svelte-csf';

	import Overlay from '../overlay/Overlay.svelte';
	import Input from './Input.svelte';

	const newStringArg = (defaultValue = '') => ({
		control: { type: 'text' },
		table: {
			defaultValue: { summary: defaultValue },
			type: { summary: 'string' }
		}
	});

	const newSelectedStringArg = (options: string[], defaultValue = '') => ({
		control: { type: 'select' },
		options: options,
		table: {
			defaultValue: { summary: defaultValue },
			type: { summary: 'string' }
		}
	});

	const newFunctionArg = (detail = '') => ({
		type: 'function',
		control: 'none',
		table: {
			type: {
				summary: 'function',
				detail: detail
			}
		}
	});

	export const meta = {
		title: 'Ui/Input',
		component: Input,
		argTypes: {
			// this is a module export, not a prop, so don't include it in table
			trimInput: {
				table: {
					disable: true
				}
			},
			id: newStringArg('// random ID'),
			name: newStringArg("// 'id' prop"),
			type: newSelectedStringArg(
				[
					'text',
					'textarea',
					'number',
					'email',
					'password',
					'search',
					'tel',
					'url',
					'time',
					'date',
					'datetime-local',
					'file',
					'range'
				],
				'text'
			),
			inputmode: newSelectedStringArg(
				[
					'none',
					'text',
					'decimal',
					'numeric',
					'tel',
					'search',
					'email',
					'url',
					'search',
					'tel',
					'url'
				],
				'text'
			),
			descriptionAlignment: {
				control: { type: 'select' },
				options: ['left', 'right']
			},
			format: newFunctionArg('(value: string) => string')
		}
	};
</script>

<script lang="ts">
	let value = '';
	const round = (x: string) => Math.round(+x * 100) / 100;

	let age: string;
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

<Template let:args>
	<div class="w-96">
		{#key args}
			<Input {...args} />
		{/key}
	</div>
</Template>

<Story name="Default" source />

<Story name="Binding on value">
	<div class="w-96 flex flex-col gap-4">
		<Input name="bind-value-input" bind:value placeholder="Type here..." />
		<div class="h-4">
			<span class="font-medium dark:text-white">Value:</span>
			{value}
		</div>
	</div>
</Story>

<Story name="With Label">
	<div class="w-96 flex flex-col gap-4">
		<Input name="labelled-input-required" label="Label" />
	</div>
</Story>

<Story name="With Label (As optional)">
	<div class="w-96 flex flex-col gap-4">
		<Input name="labelled-input-optional" label="Label" optional />
	</div>
</Story>

<Story name="With placeholder">
	<div class="w-96">
		<Input label="Placeholder" name="placeholder-input" placeholder="This is placeholder text" />
	</div>
</Story>

<!--Exposes a hint slot into which one can pass an overlay component to provide contextual help-->

<Story name="With hint tooltip from props">
	<div class="w-96">
		<Input label="Tooltip" name="tooltip-input" hint="I am some hint text" />
	</div>
</Story>

<Story name="With hint tooltip - default hintLabel">
	<div class="w-96">
		<Input label="Tooltip" name="tooltip-input">
			<Overlay slot="hint">Contextual help text</Overlay>
		</Input>
	</div>
</Story>

<Story name="With hint tooltip - custom hintLabel">
	<div class="w-96">
		<Input label="Tooltip" name="custom-tooltip-input">
			<Overlay slot="hint" hintLabel="optional hint label">Contextual help text</Overlay>
		</Input>
	</div>
</Story>

<Story name="With hint modal">
	<div class="w-96">
		<Input label="Modal" name="modal-input">
			<Overlay
				slot="hint"
				hintLabel="optional hint label"
				overlayType="modal"
				modalTitle="It's a modal!"
				modalDescription="A modal that shows contextual help"
				modalWidth="sm"
			>
				Contextual help text
			</Overlay>
		</Input>
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

<!-- This demonstrates how an input behaves when error state changes. Try entering some numbers! -->

<Story name="With error">
	<div class="w-96">
		<Input
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

<Story name="Custom format function">
	<div class="w-96">
		<Input
			label="Type a number"
			description="It will be rounded to 2 d.p. when the input loses focus"
			format={round}
		/>
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
		<Input type="time" label="Time" name="time-input" />
		<Input type="date" label="Date" name="date-input" />
		<Input type="datetime-local" label="Datetime local" name="datetime-local-input" />
		<Input type="file" label="File" name="file-input" />
		<Input type="range" label="Range" name="range" />
	</div>
</Story>

<!-- You can facilitate autocompletion of input values by setting the `autocomplete` attribute
([docs on MDN](https://developer.mozilla.org/en-US/docs/Web/HTML/Attributes/autocomplete)).  -->
<Story name="With autocomplete">
	<div class="w-96">
		<Input autocomplete="shipping street-address" />
	</div>
</Story>
