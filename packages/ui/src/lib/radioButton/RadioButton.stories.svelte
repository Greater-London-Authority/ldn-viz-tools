<script module lang="ts">
	import { defineMeta } from '@storybook/addon-svelte-csf';
	import Overlay from '../overlay/Overlay.svelte';
	import { theme } from '../theme/themeState.svelte';
	import RadioButton from './RadioButton.svelte';

	/**
	 * This provides a (round) radio-button component that can also be coloured and act as both a categorical color legend, and a control for which categories of things are displayed on a map or visualization.
	 *
	 * **Alternatives**: if representing a set of options that are not mutually exclusive, use the [Checkbox](./?path=/docs/ui-components-checkboxes-checkbox--documentation)/[CheckboxGroup](./?path=/docs/ui-components-checkboxes-checkboxgroup--documentation) rather than the [RadioButton](./?path=/docs/ui-components-radiobuttons-radiobutton--documentation)/[RadioButtonGroup](./?path=/docs/ui-components-radiobuttons-radiobuttongroup--documentation).
	 */

	const { Story } = defineMeta({
		title: 'Ui/Components/RadioButtons/RadioButton',
		component: RadioButton,
		tags: ['autodocs'],
		args: {
			label: 'Foo'
		}
	});

	let selectedId: string = $state('');
</script>

<Story name="Default">
	{#snippet template(args)}
		<RadioButton {...args} label="Foo" id="foo" bind:selectedId />

		<div class="text-color-text-secondary mt-8 space-y-2">
			<p>selectedId: {selectedId}</p>
			<p>Checked: {!!selectedId}</p>
		</div>
	{/snippet}
</Story>

<Story name="Single RadioButton (disabled)">
	{#snippet template(args)}
		<RadioButton {...args} label="Foo" id="foo" name="isolated" disabled />
	{/snippet}
</Story>

<Story name="With hint">
	{#snippet template(args)}
		<RadioButton {...args} label="Foo" id="foo" name="isolated" hint="Radio Ga Ga" />
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
		<RadioButton {...args} label="Foo" id="foo" name="isolated" {customOverlay} />
	{/snippet}
</Story>

<Story name="Single Colored RadioButton">
	{#snippet template(args)}
		<RadioButton
			{...args}
			color={theme.tokenNameToValue('data.categorical.orange')}
			label="Foo"
			id="foo"
			name="isolated"
		/>
	{/snippet}
</Story>

<Story name="Single Colored RadioButton (disabled)">
	{#snippet template(args)}
		<RadioButton
			{...args}
			color={theme.tokenNameToValue('data.categorical.orange')}
			label="Foo"
			id="foo"
			name="isolated"
			disabled
		/>
	{/snippet}
</Story>

<Story name="Multiple RadioButtons not in group">
	{#snippet template()}
		<p class="text-color-text-secondary my-8">
			The Radio button is intended for use when only one option can be selected at a time. For this
			behaviour to work correctly for a set of <code>Radio</code> components, assign them the same
			<code>name</code> attribute, and bind their <code>selectedID</code> prop to the same variable.
		</p>

		<RadioButton
			color={theme.tokenNameToValue('data.categorical.blue')}
			label="Foo"
			id="foo"
			name="group1"
			bind:selectedId
		/>
		<RadioButton
			color={theme.tokenNameToValue('data.categorical.darkpink')}
			label="Bar"
			id="bar"
			name="group1"
			bind:selectedId
		/>
		<RadioButton
			color={theme.tokenNameToValue('data.categorical.orange')}
			label="Baz"
			id="baz"
			name="group1"
			bind:selectedId
		/>
		<p class="text-color-text-secondary mt-8">Selected id: {selectedId}</p>
	{/snippet}
</Story>
