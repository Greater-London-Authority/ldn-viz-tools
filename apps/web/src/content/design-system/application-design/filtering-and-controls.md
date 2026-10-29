---
title: Filtering and controls
description: Controls for filtering and querying data
navLabel: Filtering and controls
order: 4
heroImage: header-application-design-overflow.svg
thumbnail: cta-application-design-2.svg
---

<script>
	import { CheckboxGroup, Input, RadioButtonGroup, RadioButtonGroupSolid, Select } from '@ldn-viz/ui';
	import UsageTabs from '$lib/components/usageTabs/UsageTabs.svelte';

	const periods = [
		{ id: 'year', label: 'Year' },
		{ id: 'quarter', label: 'Quarter' },
		{ id: 'month', label: 'Month' }
	];
	const boroughs = ['Barnet', 'Camden', 'Croydon', 'Hackney', 'Lambeth', 'Newham'].map((b) => ({ value: b, label: b }));
	const tenures = [
		{ id: 'owned', label: 'Owned' },
		{ id: 'social', label: 'Social rent' },
		{ id: 'private', label: 'Private rent' }
	];

	let period = $state('year');
	let borough = $state();
	let tenure = $state(['owned', 'social', 'private']);
	let measure = $state('count');
</script>

<p class="lead">Most controls in our products filter what a dashboard, chart or map shows.</p>

Choose a control for the kind of choice it offers, give it a label, and put it next to the content it changes.

## Choosing a control

Choose the control by how many options there are and how many the reader can choose.

| The reader chooses                            | Control                                                  |
| --------------------------------------------- | -------------------------------------------------------- |
| One of a few short options, or a view to show | `RadioButtonGroupSolid`, a row of connected buttons      |
| One option from a list                        | `RadioButtonGroup`                                       |
| One option from a list too long for radios    | `Select`, with `searchable` to filter the list by typing |
| Any number of options from a list             | `CheckboxGroup`                                          |
| Any number from a few short options           | `CheckboxGroupSolid`                                     |
| One setting that is on or off                 | `Switch`                                                 |
| A position in a range of numbers              | `Input` with `type="range"`                              |
| A search term                                 | `Input`                                                  |
| A place on a map                              | `MapControlLocationSearch`, from `@ldn-viz/maps`         |
| The layers shown on a map                     | `LayerControlGroup`                                      |

Some controls are easy to misuse:

- Two or three options need radio buttons, not a select. Radios show every option without a click.
- A slider is for a position, not an exact number. To enter an exact number, a text input is quicker.
- The connected buttons of `RadioButtonGroupSolid` record a choice. Don't use them for actions.

There is no date picker in the component library. Products use [@svelte-plugins/datepicker](https://svelte-plugins.github.io/datepicker/) directly.

A filter panel for a housing dashboard might combine three controls:

```svelte
<div class="typeset-product flow-compact">
	<RadioButtonGroupSolid label="Period" options={periods} bind:selectedId={period} />
	<Select label="Borough" options={boroughs} bind:value={borough} searchable clearable />
	<CheckboxGroup label="Tenure" options={tenures} bind:selectedOptions={tenure} />
</div>
```

<div class="border border-color-border-wash p-4 my-4">
	<div class="typeset-product flow-compact max-w-sm">
		<RadioButtonGroupSolid label="Period" options={periods} bind:selectedId={period} />
		<Select label="Borough" options={boroughs} bind:value={borough} searchable clearable />
		<CheckboxGroup label="Tenure" options={tenures} bind:selectedOptions={tenure} />
	</div>
</div>

## Labels and descriptions

Every control needs a label that says what it filters. Without one, a screen reader announces the control with no name. A description below the control can say more, such as the unit or the source. A hint opens longer help in an overlay, from a small trigger beside the label.

Fields are required unless they're marked optional, and an optional field shows "(optional)" after its label.

<UsageTabs>
{#snippet full()}

`Input`, `Select`, `CheckboxGroup`, `CheckboxGroupSolid`, `RadioButtonGroup`, `RadioButtonGroupSolid` and `LayerControlGroup` draw their label, description, hint and error message with `InputWrapper`. Set them with the `label`, `description`, `hint` and `error` props:

```svelte
<RadioButtonGroup
	label="Measure"
	description="Figures are for each financial year."
	hint="A financial year runs from April to March."
	options={[
		{ id: 'count', label: 'Number of homes' },
		{ id: 'share', label: 'Share of all homes' }
	]}
	bind:selectedId={measure}
/>
```

<div class="border border-color-border-wash p-4 my-4">
	<div class="typeset-product">
		<RadioButtonGroup
			label="Measure"
			description="Figures are for each financial year."
			hint="A financial year runs from April to March."
			options={[
				{ id: 'count', label: 'Number of homes' },
				{ id: 'share', label: 'Share of all homes' }
			]}
			bind:selectedId={measure}
		/>
	</div>
</div>

A group with no visible label needs `ariaLabel`, so that a screen reader can name it.

{/snippet}
{#snippet adapting()}

The system CSS styles native form elements with classes. `.form-label` sets the label in the `label-md` role and the label colour. `.form-input`, `.form-select`, `.form-checkbox`, `.form-radio` and `.form-range` style the controls:

```html
<label class="form-label" for="borough">Borough</label>
<select class="form-select" id="borough" aria-describedby="borough-description">
	<option>Barnet</option>
	<option>Camden</option>
</select>
<p class="body-sm text-color-label-muted" id="borough-description">Boroughs in the GLA area.</p>
```

<div class="border border-color-border-wash p-4 my-4">
	<div class="typeset-product flex max-w-sm flex-col gap-1">
		<label class="form-label" for="borough-native">Borough</label>
		<select class="form-select" id="borough-native" aria-describedby="borough-native-description">
			<option>Barnet</option>
			<option>Camden</option>
		</select>
		<p class="body-sm text-color-label-muted" id="borough-native-description">Boroughs in the GLA area.</p>
	</div>
</div>

Link the description to the control with `aria-describedby`, so that a screen reader reads it with the control.

{/snippet}
</UsageTabs>

## Where controls go

Put a control next to the content it changes:

- **Filters for the whole page go in the sidebar.** In a dashboard, a filter in the sidebar should apply to every chart on the canvas. [Page layout](/design-system/application-design/page-layout) describes the sidebar.
- **A filter for one chart goes with the chart.** `ChartContainer`, from `@ldn-viz/charts`, has a `controls` slot below the title and above the chart.
- **Map controls go on the map.** `MapControlGroup` positions them, and the location search usually sits in the top-left corner.

A control panel has little space, so set the `flow-compact` context on it. [Flow](/design-system/foundations/flow) describes the contexts.

<div class="my-4 border border-dashed border-color-border p-4 body-sm text-color-text-muted">Placeholder: a dashboard screenshot with a sidebar filter panel and a filter above one chart, from the Figma Dashboard Layouts page.</div>

## Clearing a choice

Give the reader a way back to the full data:

- `RadioButtonGroup` shows a Clear button above the radios. Set `allowClear` to `false` when one option must always be chosen.
- `CheckboxGroup` has a Select all checkbox, which checks every option that isn't disabled. It's indeterminate when some options are checked.
- `LayerControlGroup` has a Show all checkbox.
- `Select` with `clearable` has a button that clears the value.

## In Storybook

[Storybook](https://greater-london-authority.github.io/ldn-viz-tools) has the props and states of each control, under Ui, Components.
