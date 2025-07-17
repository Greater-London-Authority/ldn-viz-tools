<script module lang="ts">
	import { defineMeta } from '@storybook/addon-svelte-csf';
	import Overlay from '../overlay/Overlay.svelte';
	import { theme } from '../theme/themeState.svelte';
	import RadioButtonGroup from './RadioButtonGroup.svelte';

	/**
	 * This provides a (round) radio-button component that can also be coloured and act as both a categorical color legend, and a control for which categories of things are displayed on a map or visualization.
	 *
	 * **Alternatives**: if representing a set of options that are not mutually exclusive, use the [Checkbox](./?path=/docs/ui-components-checkboxes-checkbox--documentation)/[CheckboxGroup](./?path=/docs/ui-components-checkboxes-checkboxgroup--documentation) rather than the [RadioButton](./?path=/docs/ui-components-radiobuttons-radiobutton--documentation)/[RadioButtonGroup](./?path=/docs/ui-components-radiobuttons-radiobuttongroup--documentation).
	 */

	const { Story } = defineMeta({
		title: 'Ui/Components/RadioButtons/RadioButtonGroup',
		component: RadioButtonGroup,
		tags: ['autodocs'],
		args: {
			label: 'Label'
		}
	});

	let selectedId: string = $state('');
	let selectedIdForError: string = $state('');

	let optionsForGroup = [
		{ id: 'bus', label: 'Bus stops' },
		{
			id: 'train',
			label: 'Train stations',
			hint: 'Excluding underground stations'
		},
		{ id: 'underground', label: 'Underground stations' },
		{ id: 'taxi', label: 'Taxi ranks', disabled: true }
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
</script>

<Story name="Default">
	{#snippet template(args)}
		<RadioButtonGroup {...args} options={optionsForGroup} name="station-type" bind:selectedId />
		<p class="text-color-text-secondary mt-8">Selected id: {selectedId}</p>
	{/snippet}
</Story>

<Story name="With hint">
	{#snippet template(args)}
		<div class="w-96">
			<RadioButtonGroup
				{...args}
				options={optionsForGroup}
				name="station-type"
				bind:selectedId
				hint="Radio ga ga"
			/>
		</div>
		<p class="text-color-text-secondary mt-8">Selected id: {selectedId}</p>
	{/snippet}
</Story>

<Story name="With custom overlay">
	{#snippet template(args)}
		<div class="w-96">
			<RadioButtonGroup {...args} options={optionsForGroup} name="station-type" bind:selectedId>
				{#snippet customOverlay()}
					<Overlay
						overlayType="modal"
						modalTitle="Modal title"
						modalDescription="This is a modal description"
					>
						This is the modal content
					</Overlay>
				{/snippet}</RadioButtonGroup
			>
		</div>
		<p class="text-color-text-secondary mt-8">Selected id: {selectedId}</p>
	{/snippet}
</Story>

<Story name="With description">
	{#snippet template(args)}
		<RadioButtonGroup
			{...args}
			options={optionsForGroup}
			name="station-type"
			bind:selectedId
			label="Transport method"
			description="Pick you preferred method of transport - taxis are currently not available"
		/>
		<p class="text-color-text-secondary mt-8">Selected id: {selectedId}</p>
	{/snippet}
</Story>

<Story name="Colored options">
	{#snippet template(args)}
		<RadioButtonGroup
			{...args}
			options={optionsWithColor}
			name="station-type"
			bind:selectedId
			label="Transport method"
			description="Pick you preferred method of transport - taxis are currently not available"
		/>
		<p class="text-color-text-secondary mt-8">Selected id: {selectedId}</p>
	{/snippet}
</Story>

<Story name="No clear button">
	{#snippet template(args)}
		<RadioButtonGroup
			{...args}
			options={optionsForGroup}
			name="station-type"
			bind:selectedId
			label="Transport method"
			description="Pick you preferred method of transport - taxis are currently not available"
			allowClear={false}
		/>
		<p class="text-color-text-secondary mt-8">Selected id: {selectedId}</p>
	{/snippet}
</Story>

<Story name="Horizontal">
	{#snippet template(args)}
		<RadioButtonGroup
			{...args}
			options={optionsForGroup}
			name="station-type"
			bind:selectedId
			label="Transport method"
			allowClear={false}
			orientation="horizontal"
		/>
		<p class="text-color-text-secondary mt-8">Selected id: {selectedId}</p>
	{/snippet}
</Story>

<Story name="Disabled (global)">
	{#snippet template(args)}
		<RadioButtonGroup
			{...args}
			options={optionsForGroup}
			name="station-type"
			bind:selectedId
			label="Transport method"
			allowClear={false}
			disabled
		/>
		<p class="text-color-text-secondary mt-8">Selected id: {selectedId}</p>
	{/snippet}
</Story>

<Story name="With error">
	{#snippet template(args)}
		<RadioButtonGroup
			{...args}
			options={optionsForGroup}
			name="station-type"
			bind:selectedId={selectedIdForError}
			label="Transport method"
			allowClear={false}
			error={!selectedIdForError ? 'You must select an option' : undefined}
		/>
		<p class="text-color-text-secondary mt-8">Selected id: {selectedId}</p>
	{/snippet}
</Story>
