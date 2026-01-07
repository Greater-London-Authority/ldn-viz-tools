<script lang="ts">
	import Overlay from '../overlay/Overlay.svelte';
	import Trigger from '../overlay/Trigger.svelte';

	import { randomId } from '../utils/randomId';
	import type { CheckboxProps } from './types.js';

	/**
	 * The `<Checkbox>` component provides a checkbox control as a Boolean input.
	 * It creates an `<input type="checkbox">`HTML element ([MDN docs](https://developer.mozilla.org/en-US/docs/Web/HTML/Element/input/checkbox)), but enhances this with the ability to easily change the checkbox color, and add tooltips providing explanatory text.
	 * The `<CheckboxGroup>` component provides a way to create a set of `<Checkbox>` components defined by an array of objects.
	 *
	 * **Alternatives**: if representing a set of options that are mutually exclusive, use the [RadioButton](./?path=/docs/ui-components-radiobuttons-radiobutton--documentation)/[RadioButtonGroup](./?path=/docs/ui-components-radiobuttons-radiobuttongroup--documentation) component rather than the [Checkbox](./?path=/docs/ui-components--checkboxes-checkbox--documentation)/[CheckboxGroup](./?path=/docs/ui-components-checkboxes-checkboxgroup--documentation).
	 * Consider using a [Switch](./?path=/docs/ui-components-switch--documentation).
	 * @component
	 */

	let {
		id = randomId(),
		name = '',
		color = '',
		checked = $bindable(false),
		indeterminate = false,
		label = '',
		disabled = false,
		hint = '',
		hintLabel = '',
		customOverlay = undefined,
		...restProps
	}: CheckboxProps = $props();
</script>

<div class="flex items-center">
	<input
		{id}
		{name}
		class="form-checkbox"
		type="checkbox"
		bind:checked
		{disabled}
		{indeterminate}
		style={color
			? `--theme-input-border: ${color}; --theme-input-background-active: ${color}; --theme-input-background-color: ${color}; --tw-ring-color: ${color};`
			: ''}
		{...restProps}
	/>

	{#if label}
		<label class="form-label ml-2 font-normal" for={id}>{label}</label>
	{/if}

	{#if hint}
		<Overlay>
			{#snippet trigger(props)}
				<Trigger {...props} size="xs" {hintLabel} />
			{/snippet}
			{hint}
		</Overlay>
	{/if}

	{#if customOverlay}
		{@render customOverlay()}
	{/if}
</div>
