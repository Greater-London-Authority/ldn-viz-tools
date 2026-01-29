<script module lang="ts">
	import { defineMeta } from '@storybook/addon-svelte-csf';
	import Button from '../button/Button.svelte';
	import { theme } from '../theme/themeState.svelte';
	import CheckboxGroup from './CheckboxGroup.svelte';
	import CheckBoxGroupDemo from './CheckBoxGroupDemo.svelte';

	/**
	 * The `<CheckboxGroup>` component provides a way to create a set of `<Checkbox>` components defined by an array of objects.
	 *
	 * **Alternatives**: if representing a set of options that are mutually exclusive, use the [RadioButton](./?path=/docs/ui-components-radiobuttons-radiobutton--documentation)/[RadioButtonGroup](./?path=/docs/ui-components-radiobuttons-radiobuttongroup--documentation) component rather than the [Checkbox](./?path=/docs/ui-components-checkboxes-checkbox--documentation)/[CheckboxGroup](./?path=/docs/ui-components-checkboxes-checkboxgroup--documentation).
	 */

	let selectedOptions: string[] = $state(['bus', 'underground']);

	let optionsForGroup = [
		{ id: 'bus', name: 'bus', label: 'Bus stops' },
		{
			id: 'train',
			name: 'train',
			label: 'Train stations',
			hint: 'Excluding underground stations'
		},
		{ id: 'underground', name: 'underground', label: 'Underground stations' },
		{ id: 'taxi', name: 'taxi', label: 'Taxi ranks', disabled: true }
	];

	let colors: { [key: string]: string } = {
		bus: 'data.categorical.blue',
		train: 'data.categorical.green',
		underground: 'data.categorical.red',
		taxi: 'data.categorical.purple'
	};

	let optionsWithColor = optionsForGroup.map((option) => ({
		...option,
		color: theme.tokenNameToValue(colors[option.id])
	}));

	const { Story } = defineMeta({
		title: 'Ui/Components/Checkboxes/CheckboxGroup',
		component: CheckboxGroup,
		tags: ['autodocs'],
		args: {
			options: optionsForGroup,
			ariaLabel: 'Select transport methods'
		}
	});
</script>

<Story name="Default">
	{#snippet template(args)}
		<CheckboxGroup {...args} bind:selectedOptions />

		<p class="text-color-text-muted mt-4">
			selectedOptions: {JSON.stringify(selectedOptions)}
		</p>
	{/snippet}
</Story>

<Story name="With title">
	{#snippet template(args)}
		<CheckboxGroup {...args} bind:selectedOptions label="Transport method" />
		<p class="text-color-text-muted mt-4">
			selectedOptions: {JSON.stringify(selectedOptions)}
		</p>
	{/snippet}
</Story>

<Story name="With hint">
	{#snippet template(args)}
		<CheckboxGroup
			{...args}
			bind:selectedOptions
			label="Transport method"
			hint="contextual hint text"
		/>
		<p class="text-color-text-muted mt-4">
			selectedOptions: {JSON.stringify(selectedOptions)}
		</p>
	{/snippet}
</Story>

<Story name="With description">
	{#snippet template(args)}
		<CheckboxGroup
			{...args}
			bind:selectedOptions
			label="Transport method"
			hint="contextual hint text"
			description="Pick your preferred method of transport - taxis are currently not available"
		/>
		<p class="text-color-text-muted mt-4">
			selectedOptions: {JSON.stringify(selectedOptions)}
		</p>
	{/snippet}
</Story>

<Story name="Hide Select all">
	{#snippet template(args)}
		<CheckboxGroup {...args} bind:selectedOptions hideSelectAll />
		<p class="text-color-text-muted mt-4">
			selectedOptions: {JSON.stringify(selectedOptions)}
		</p>
	{/snippet}
</Story>

<Story name="Externally updated">
	{#snippet template(args)}
		<Button onclick={() => (selectedOptions = ['bus', 'train'])}>Select bus and train!</Button>

		<CheckboxGroup {...args} bind:selectedOptions />
		<p class="text-color-text-muted mt-4">
			selectedOptions: {JSON.stringify(selectedOptions)}
		</p>
	{/snippet}
</Story>

<Story name="Disabled (global)">
	{#snippet template(args)}
		<CheckboxGroup {...args} bind:selectedOptions disabled />
		<p class="text-color-text-muted mt-4">
			selectedOptions: {JSON.stringify(selectedOptions)}
		</p>
	{/snippet}
</Story>

<Story name="With error">
	{#snippet template(args)}
		<CheckboxGroup
			{...args}
			bind:selectedOptions
			error={!selectedOptions.length ? 'You must select an option' : undefined}
		/>
		<p class="text-color-text-muted mt-4">
			selectedOptions: {JSON.stringify(selectedOptions)}
		</p>
	{/snippet}
</Story>

<Story name="Options with color">
	{#snippet template(args)}
		<CheckboxGroup {...args} options={optionsWithColor} bind:selectedOptions />
		<p class="text-color-text-muted mt-4">
			selectedOptions: {JSON.stringify(selectedOptions)}
		</p>
	{/snippet}
</Story>

<Story name="With custom overlay">
	{#snippet template()}
		<CheckBoxGroupDemo />
	{/snippet}
</Story>
