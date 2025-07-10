<script module lang="ts">
	import { defineMeta } from '@storybook/addon-svelte-csf';
	import Overlay from '../overlay/Overlay.svelte';
	import Checkbox from './Checkbox.svelte';

	/**
	 * The `<Checkbox>` component provides a checkbox control as a Boolean input.
	 * It creates an `<input type="checkbox">`HTML element ([MDN docs](https://developer.mozilla.org/en-US/docs/Web/HTML/Element/input/checkbox)), but enhances this with the ability to easily change the checkbox color, and add tooltips providing explanatory text.
	 * The `<CheckboxGroup>` component provides a way to create a set of `<Checkbox>` components defined by an array of objects.
	 *
	 * **Alternatives**: if representing a set of options that are mutually exclusive, use the [RadioButton](./?path=/docs/ui-components-radiobuttons-radiobutton--documentation)/[RadioButtonGroup](./?path=/docs/ui-components-radiobuttons-radiobuttongroup--documentation) component rather than the [Checkbox](./?path=/docs/ui-components--checkboxes-checkbox--documentation)/[CheckboxGroup](./?path=/docs/ui-components-checkboxes-checkboxgroup--documentation).
	 * Consider using a [Switch](./?path=/docs/ui-components-switch--documentation).
	 */

	const { Story } = defineMeta({
		title: 'Ui/Components/Checkboxes/Checkbox',
		component: Checkbox,
		tags: ['autodocs'],
		args: {
			label: 'Label'
		}
	});

	let checked = $state(false);
</script>

<Story name="Default">
	{#snippet template(args)}
		<Checkbox {...args} />
	{/snippet}
</Story>

<Story name="With bound state">
	{#snippet template(args)}
		<Checkbox {...args} bind:checked />

		<p class="text-color-text-secondary mt-8">Checked: {checked}</p>
	{/snippet}
</Story>

<Story name="Disabled">
	{#snippet template(args)}
		<Checkbox {...args} bind:checked disabled />
	{/snippet}
</Story>

<Story name="With hint">
	{#snippet template(args)}
		<Checkbox {...args} hint="A hint" />
	{/snippet}
</Story>

<Story name="With custom overlay">
	{#snippet template(args)}
		{#snippet customOverlay()}
			<Overlay
				overlayType="modal"
				modalTitle="Modal title"
				modalDescription="This is a modal description"
				hintLabel=""
			>
				This is the modal content
			</Overlay>
		{/snippet}
		<Checkbox {...args} {customOverlay} />
	{/snippet}
</Story>

<Story name="Colored checkbox">
	{#snippet template(args)}
		<Checkbox {...args} color="#008D48" />
		<p class="text-color-text-secondary mt-8">Checked: {checked}</p>
	{/snippet}
</Story>
