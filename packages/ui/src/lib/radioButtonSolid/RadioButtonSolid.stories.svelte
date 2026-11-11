<script module lang="ts">
	import { Funnel, Map } from '@steeze-ui/heroicons';
	import { defineMeta } from '@storybook/addon-svelte-csf';
	import OpacityIcon from '../layerControl/OpacityIcon.svelte';
	import RadioButtonSolid from './RadioButtonSolid.svelte';

	/**
	 * The `RadioButtonSolid` component provides a single button styled radio input for switching between tabs or selecting one option from a small number of alternatives.
	 * It is normally used indirectly via the [RadioButtonGroupSolid](./?path=/docs/ui-components-radiobuttons-radiobuttongroupsolid--documentation); these stories exercise the atom on its own.
	 *
	 * **Alternatives**: consider using the [RadioButton](./?path=/docs/ui-components-radiobuttons-radiobutton--documentation)/[RadioButtonGroup](./?path=/docs/ui-components-radiobuttons-radiobuttongroup--documentation).
	 */

	const { Story } = defineMeta({
		title: 'Ui/Components/RadioButtons/RadioButtonSolid',
		component: RadioButtonSolid,
		tags: ['autodocs']
	});

	let selectedId: string = $state('');
	let selectedId2: string = $state('bus');
	let selectedId3: string = $state('above');
</script>

<Story name="Baseline single button">
	{#snippet template(args)}
		<RadioButtonSolid {...args} id="bus" label="Bus stops" name="station-type" bind:selectedId />
		<p class="mt-8 text-color-text-muted">Selected id: {selectedId}</p>
	{/snippet}
</Story>

<Story name="Selected vs unselected vs disabled">
	{#snippet template(args)}
		<div class="flex w-96 gap-2">
			<RadioButtonSolid
				{...args}
				id="bus"
				label="Selected"
				name="states"
				bind:selectedId={selectedId2}
			/>
			<RadioButtonSolid
				{...args}
				id="train"
				label="Unselected"
				name="states"
				bind:selectedId={selectedId2}
			/>
			<RadioButtonSolid {...args} id="taxi" label="Disabled" name="states" disabled />
		</div>
		<p class="mt-8 text-color-text-muted">Selected id: {selectedId2}</p>
	{/snippet}
</Story>

<Story name="Icon above / below">
	{#snippet template(args)}
		<div class="flex w-96 gap-2">
			<RadioButtonSolid
				{...args}
				id="above"
				label="Icon above"
				name="icon-placement"
				icon={Map}
				iconPlacement="above"
				bind:selectedId={selectedId3}
			/>
			<RadioButtonSolid
				{...args}
				id="below"
				label="Icon below"
				name="icon-placement"
				icon={Funnel}
				iconPlacement="below"
				bind:selectedId={selectedId3}
			/>
			<RadioButtonSolid
				{...args}
				id="raw"
				label="RawIcon"
				name="icon-placement"
				RawIcon={OpacityIcon}
				iconPlacement="above"
				bind:selectedId={selectedId3}
			/>
		</div>
		<p class="mt-8 text-color-text-muted">Selected id: {selectedId3}</p>
	{/snippet}
</Story>
