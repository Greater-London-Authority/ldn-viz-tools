<script lang="ts">
	import Button from '../../../button/Button.svelte';
	import InputWrapper from '../../../input/InputWrapper.svelte';
	import Select from '../../../select/Select.svelte';
	import SidebarGroup from '../../../sidebar/elements/sidebarSection/SidebarGroup.svelte';
	import SidebarSection from '../../../sidebar/elements/sidebarSection/SidebarSection.svelte';
	import SidebarSectionTitle from '../../../sidebar/elements/sidebarSection/sidebarSectionTitle/SidebarSectionTitle.svelte';

	type Item = { label: string; value: number };

	/* Borough Items */
	const boroughItems: Item[] = [
		{ label: 'All London', value: 1 },
		{ label: 'Borough 1', value: 2 },
		{ label: 'Borough 2', value: 3 }
	];

	/* Sector Items */
	const sectorItems: Item[] = [
		{ label: 'All Sectors', value: 1 },
		{ label: 'Sector 1', value: 2 },
		{ label: 'Sector 2', value: 3 }
	];

	let selectedYear = $state(2022);
</script>

<SidebarSection>
	<SidebarSectionTitle>
		Controls
		{#snippet subTitle()}
			Use the selections below to explore and filter the data
		{/snippet}
	</SidebarSectionTitle>

	<SidebarGroup>
		<Select options={boroughItems} label="Borough" id="example-input-1" />
		<Select options={sectorItems} label="Sector" id="example-input-2" />
		<InputWrapper label={`Year: ${selectedYear}`} id="yearSlider">
			<input
				type="range"
				id="yearSlider"
				name="Year"
				min="2005"
				max="2022"
				style="width: 100%;"
				class="form-range"
				bind:value={() => selectedYear.toString(), (v) => (selectedYear = +v)}
			/>
		</InputWrapper>
	</SidebarGroup>
</SidebarSection>
<SidebarSection title="Download Data">
	<span class="text-xs">
		For access to the full LEGGI dataset, and more about our methodology, click below to visit the
		London Datastore.
	</span>
	<SidebarGroup>
		<Button class="w-full">Download Leggi Data</Button>
	</SidebarGroup>
</SidebarSection>
<SidebarSection title="Definitions">
	<span class="text-xs"> For more details on the definitions and terms used in this tool. </span>
	<SidebarGroup>
		<Button emphasis="secondary" class="w-full">View definitions</Button>
	</SidebarGroup>
</SidebarSection>
