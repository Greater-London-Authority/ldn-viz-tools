<script lang="ts">
	import Select from './../../../../select/Select.svelte';
	import SidebarGroup from './../../../../sidebar/elements/sidebarSection/SidebarGroup.svelte';
	import SidebarSection from './../../../../sidebar/elements/sidebarSection/SidebarSection.svelte';

	/* Select Items */
	type Item = { label: string; value: number };
	const options: Item[] = [
		{ label: 'One', value: 1 },
		{ label: 'Two', value: 2 },
		{ label: 'Three', value: 3 }
	];

	/* Radio Button Options */
	let buttonGroupOptions = [
		{ id: 'one', label: 'One' },
		{ id: 'two', label: 'Two' },
		{ id: 'three', label: 'Three' }
	];
</script>

<SidebarSection title="First Section Title">
	<SidebarGroup title={'First Group Title'}>
		<Select {options} label="Label" id="example-input-1" />
		<!-- <RadioButtonGroupSolid options={buttonGroupOptions} name="Radio Group One" /> -->
	</SidebarGroup>

	<SidebarGroup>
		<Select {options} label="Label" id="example-input-2" />
	</SidebarGroup>
</SidebarSection>

<SidebarSection title="Second Section Title">
	<SidebarGroup>
		<Select {options} label="Label" id="example-input-3" />
		<!-- <RadioButtonGroupSolid options={buttonGroupOptions} name="Radio Group Two" /> -->
	</SidebarGroup>
</SidebarSection>
