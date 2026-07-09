<script module lang="ts">
	import { Map } from '@steeze-ui/heroicons';
	import { defineMeta } from '@storybook/addon-svelte-csf';
	import OpacityIcon from '../layerControl/OpacityIcon.svelte';
	import CheckboxSolid from './CheckboxSolid.svelte';

	/**
	 * The `<CheckboxSolid>` component provides a checkbox control styled as a solid button. It is intended to be used for selecting multiple options from a small list.
	 * It is generally used indirectly vis the [CheckboxGroupSolid](./?path=/docs/ui-components-checkboxes-checkboxgroupsolid--documentation) component.
	 *
	 */

	const { Story } = defineMeta({
		title: 'Ui/Components/Checkboxes/CheckboxSolid',
		component: CheckboxSolid,
		tags: ['autodocs'],
		args: {
			label: 'Bus stops'
		}
	});
</script>

<script lang="ts">
	let checkedDefault = $state(false);
	let checkedOn = $state(true);
</script>

<Story name="Default">
	{#snippet template(args)}
		<div class="w-40">
			<CheckboxSolid {...args} bind:checked={checkedDefault} />
		</div>
	{/snippet}
</Story>

<Story name="Checked">
	{#snippet template(args)}
		<div class="w-40">
			<CheckboxSolid {...args} bind:checked={checkedOn} />
		</div>
	{/snippet}
</Story>

<Story name="Disabled">
	{#snippet template(args)}
		<div class="w-40">
			<CheckboxSolid {...args} disabled />
		</div>
	{/snippet}
</Story>

<Story name="Icon above">
	{#snippet template(args)}
		<div class="w-40">
			<CheckboxSolid {...args} icon={Map} iconPlacement="above" />
		</div>
	{/snippet}
</Story>

<Story name="Icon below">
	{#snippet template(args)}
		<div class="w-40">
			<CheckboxSolid {...args} icon={Map} iconPlacement="below" />
		</div>
	{/snippet}
</Story>

<Story name="Raw icon">
	{#snippet template(args)}
		<div class="w-40">
			<CheckboxSolid {...args} rawIcon={OpacityIcon} iconPlacement="above" />
		</div>
	{/snippet}
</Story>
