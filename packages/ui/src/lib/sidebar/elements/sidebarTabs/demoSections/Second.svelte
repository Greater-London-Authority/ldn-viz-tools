<script lang="ts">
	import Select from './../../../../select/Select.svelte';
	import SidebarGroup from './../../../../sidebar/elements/sidebarSection/SidebarGroup.svelte';
	import SidebarSection from './../../../../sidebar/elements/sidebarSection/SidebarSection.svelte';

	/* Select Options */
	type Option = { label: string; value: number };
	const options: Option[] = [
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

<SidebarSection title="Section Title">
	<SidebarGroup>
		<Select {options} label="Label" id="example-input-3" />
		<!-- <RadioButtonGroupSolid options={buttonGroupOptions} name="Radio Group Two" /> -->
	</SidebarGroup>
</SidebarSection>
