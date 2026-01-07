<script module lang="ts">
	import { Funnel, Map, PresentationChartLine } from '@steeze-ui/heroicons';
	import { defineMeta } from '@storybook/addon-svelte-csf';
	import Button from '../button/Button.svelte';
	import RadioButtonGroupSolid from './RadioButtonGroupSolid.svelte';
	import type { RadioButtonSolidProps } from './types';

	/**
	 * The `RadioButtonGroupSolid` component contains a set of `RadioButtonSolid` buttons for switching between tabs or selecting one option from a small number of alternatives.
	 *
	 * **Alternatives**: consider using the [RadioButton](./?path=/docs/ui-components-radiobuttons-radiobutton--documentation)/[RadioButtonGroup](./?path=/docs/ui-components-radiobuttons-radiobuttongroup--documentation).
	 */

	const { Story } = defineMeta({
		title: 'Ui/Components/RadioButtons/RadioButtonGroupSolid',
		component: RadioButtonGroupSolid,
		tags: ['autodocs']
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
	let selectedId9: string = $state('');
	let selectedId10: string = $state('');
	let selectedIdForError: string = $state('');

	let optionsForGroup: RadioButtonSolidProps[] = [
		{ id: 'bus', label: 'Bus stops' },
		{ id: 'train', label: 'Train stations' },
		{ id: 'underground', label: 'Underground stations' },
		{ id: 'taxi', label: 'Taxi ranks', disabled: true }
	];

	let optionsForGroupIconsAbove: RadioButtonSolidProps[] = [
		{ id: 'bus', label: 'Bus stops', icon: Funnel },
		{ id: 'train', label: 'Train stations', icon: Map },
		{ id: 'underground', label: 'Underground stations', icon: PresentationChartLine }
	];

	let optionsForGroupIconsBelow: RadioButtonSolidProps[] = [
		{ id: 'bus', label: 'Bus stops', icon: Funnel, iconPlacement: 'below' },
		{ id: 'train', label: 'Train stations', icon: Map, iconPlacement: 'below' },
		{
			id: 'underground',
			label: 'Underground stations',
			icon: PresentationChartLine,
			iconPlacement: 'below'
		}
	];
</script>

<Story name="Default">
	{#snippet template(args)}
		<RadioButtonGroupSolid
			options={optionsForGroup}
			name="station-type"
			bind:selectedId
			{...args}
		/>
		<p class="text-color-text-secondary mt-8">Selected id: {selectedId}</p>
	{/snippet}
</Story>

<Story name="With title">
	{#snippet template(args)}
		<RadioButtonGroupSolid
			options={optionsForGroup}
			name="station-type"
			bind:selectedId={selectedId2}
			label="RadioGroup Label"
			{...args}
		/>
		<p class="text-color-text-secondary mt-8">Selected id: {selectedId2}</p>
	{/snippet}
</Story>

<Story name="With description">
	{#snippet template(args)}
		<RadioButtonGroupSolid
			options={optionsForGroup}
			name="station-type"
			bind:selectedId={selectedId3}
			label="RadioGroup Label"
			description="This is a description"
			{...args}
		/>
		<p class="text-color-text-secondary mt-8">Selected id: {selectedId3}</p>
	{/snippet}
</Story>

<Story name="With hint">
	{#snippet template(args)}
		<RadioButtonGroupSolid
			options={optionsForGroup}
			name="station-type"
			bind:selectedId={selectedId4}
			label="RadioGroup Label"
			hint="Contextual Hint"
			description="This is a description"
			{...args}
		/>
		<p class="text-color-text-secondary mt-8">Selected id: {selectedId4}</p>
	{/snippet}
</Story>

<!--
You can create two or more independent instances of the `Two RadioButtonGroupSolid` -  just ensure that you provide
different values as the `name` prop.
-->
<Story name="Using multiple instances">
	{#snippet template(args)}
		<div class="flex flex-col gap-4">
			<div class="flex flex-col gap-1">
				<RadioButtonGroupSolid
					options={optionsForGroup}
					name="station-type-1"
					bind:selectedId={selectedId5}
					{...args}
				/>
				<p class="text-color-text-secondary">Selected id: {selectedId5}</p>
			</div>

			<div class="flex flex-col gap-1">
				<RadioButtonGroupSolid
					options={optionsForGroup}
					name="station-type-2"
					bind:selectedId={selectedId6}
					{...args}
				/>
				<p class="text-color-text-secondary">Selected id: {selectedId6}</p>
			</div>
		</div>
	{/snippet}
</Story>

<Story name="With Icons above">
	{#snippet template(args)}
		<RadioButtonGroupSolid
			name="station-type"
			options={optionsForGroupIconsAbove}
			bind:selectedId={selectedId7}
			{...args}
		></RadioButtonGroupSolid>
		<p class="text-color-text-secondary mt-8">Selected id: {selectedId7}</p>
	{/snippet}
</Story>

<Story name="With Icons below">
	{#snippet template(args)}
		<RadioButtonGroupSolid
			name="station-type"
			options={optionsForGroupIconsBelow}
			bind:selectedId={selectedId8}
			{...args}
		></RadioButtonGroupSolid>
		<p class="text-color-text-secondary mt-8">Selected id: {selectedId8}</p>
	{/snippet}
</Story>

<Story name="With 2 options">
	{#snippet template(args)}
		<RadioButtonGroupSolid
			name="station-type"
			options={[optionsForGroup[0], optionsForGroup[1]]}
			bind:selectedId={selectedId9}
			{...args}
		></RadioButtonGroupSolid>
		<p class="text-color-text-secondary mt-8">Selected id: {selectedId9}</p>
	{/snippet}
</Story>

<Story name="Disabled (global)">
	{#snippet template(args)}
		<RadioButtonGroupSolid
			options={optionsForGroup}
			name="station-type"
			bind:selectedId={selectedId10}
			label="RadioGroup Label"
			hint="Contextual Hint"
			description="This is a description"
			disabled
			{...args}
		/>
		<p class="text-color-text-secondary mt-8">Selected id: {selectedId10}</p>
	{/snippet}
</Story>

<Story name="With error">
	{#snippet template(args)}
		<RadioButtonGroupSolid
			options={optionsForGroup}
			name="station-type"
			bind:selectedId={selectedIdForError}
			label="Preferred mode of transport"
			hint="Contextual Hint"
			description="How you prefer to get around London."
			error={!selectedIdForError ? 'You must select an option' : undefined}
			{...args}
		/>
		<p class="text-color-text-secondary mt-8">Selected id: {selectedIdForError}</p>
		<Button onclick={() => (selectedIdForError = '')}>Clear</Button>
	{/snippet}
</Story>
