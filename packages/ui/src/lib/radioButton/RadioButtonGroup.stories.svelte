<script module lang="ts">
	import { defineMeta } from '@storybook/addon-svelte-csf';
	import Overlay from '../overlay/Overlay.svelte';
	import { theme } from '../theme/themeState.svelte';
	import RadioButtonGroup from './RadioButtonGroup.svelte';

	/**
	 * The `<RadioButtonGroup>` provides a way to create a set of `<RadioButton>` components defined by an array of objects.
	 *
	 * **Alternatives**: if representing a set of options that are not mutually exclusive, use the [Checkbox](./?path=/docs/ui-components-checkboxes-checkbox--documentation)/[CheckboxGroup](./?path=/docs/ui-components-checkboxes-checkboxgroup--documentation) rather than the [RadioButton](./?path=/docs/ui-components-radiobuttons-radiobutton--documentation)/[RadioButtonGroup](./?path=/docs/ui-components-radiobuttons-radiobuttongroup--documentation).
	 * If the number of alternatives is small and one must be selected, consider using the [RadioButtonSolid](./?path=/docs/ui-components-radiobuttons-radiobuttongroupsolid--documentation).
	 */

	const { Story } = defineMeta({
		title: 'Ui/Components/RadioButtons/RadioButtonGroup',
		component: RadioButtonGroup,
		tags: ['autodocs'],
		args: {
			label: 'Label'
		}
	});

	// N.B Seperate selectedIds required when bound
	let selectedId: string = $state('');
	let selectedId2: string = $state('');
	let selectedId3: string = $state('');
	let selectedId4: string = $state('');
	let selectedId5: string = $state('');
	let selectedId6: string = $state('');
	let selectedId7: string = $state('');
	let selectedId8: string = $state('');
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
		<p class="mt-8 text-color-text-secondary">Selected id: {selectedId}</p>
	{/snippet}
</Story>

<Story name="With hint">
	{#snippet template(args)}
		<div class="w-96">
			<RadioButtonGroup
				{...args}
				options={optionsForGroup}
				name="station-type"
				bind:selectedId={selectedId2}
				hint="Radio ga ga"
			/>
		</div>
		<p class="mt-8 text-color-text-secondary">Selected id: {selectedId2}</p>
	{/snippet}
</Story>

<Story name="With custom overlay">
	{#snippet template(args)}
		<div class="w-96">
			<RadioButtonGroup
				{...args}
				options={optionsForGroup}
				name="station-type"
				bind:selectedId={selectedId3}
			>
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
		<p class="mt-8 text-color-text-secondary">Selected id: {selectedId3}</p>
	{/snippet}
</Story>

<Story name="With description">
	{#snippet template(args)}
		<RadioButtonGroup
			{...args}
			options={optionsForGroup}
			name="station-type"
			bind:selectedId={selectedId4}
			label="Transport method"
			description="Pick you preferred method of transport - taxis are currently not available"
		/>
		<p class="mt-8 text-color-text-secondary">Selected id: {selectedId4}</p>
	{/snippet}
</Story>

<Story name="Colored options">
	{#snippet template(args)}
		<RadioButtonGroup
			{...args}
			options={optionsWithColor}
			name="station-type"
			bind:selectedId={selectedId5}
			label="Transport method"
			description="Pick you preferred method of transport - taxis are currently not available"
		/>
		<p class="mt-8 text-color-text-secondary">Selected id: {selectedId5}</p>
	{/snippet}
</Story>

<Story name="No clear button">
	{#snippet template(args)}
		<RadioButtonGroup
			{...args}
			options={optionsForGroup}
			name="station-type"
			bind:selectedId={selectedId6}
			label="Transport method"
			description="Pick you preferred method of transport - taxis are currently not available"
			allowClear={false}
		/>
		<p class="mt-8 text-color-text-secondary">Selected id: {selectedId6}</p>
	{/snippet}
</Story>

<Story name="Horizontal">
	{#snippet template(args)}
		<RadioButtonGroup
			{...args}
			options={optionsForGroup}
			name="station-type"
			bind:selectedId={selectedId7}
			label="Transport method"
			allowClear={false}
			orientation="horizontal"
		/>
		<p class="mt-8 text-color-text-secondary">Selected id: {selectedId7}</p>
	{/snippet}
</Story>

<Story name="Disabled (global)">
	{#snippet template(args)}
		<RadioButtonGroup
			{...args}
			options={optionsForGroup}
			name="station-type"
			bind:selectedId={selectedId8}
			label="Transport method"
			allowClear={false}
			disabled
		/>
		<p class="mt-8 text-color-text-secondary">Selected id: {selectedId8}</p>
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
		<p class="mt-8 text-color-text-secondary">Selected id: {selectedIdForError}</p>
	{/snippet}
</Story>
