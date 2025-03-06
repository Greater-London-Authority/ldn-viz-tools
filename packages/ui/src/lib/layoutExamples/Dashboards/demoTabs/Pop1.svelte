<script lang="ts">
	import { writable } from 'svelte/store';
	import InputWrapper from '../../../input/InputWrapper.svelte';
	import Select from '../../../select/Select.svelte';
	import SidebarGroup from '../../../sidebar/elements/sidebarSection/SidebarGroup.svelte';
	import SidebarSection from '../../../sidebar/elements/sidebarSection/SidebarSection.svelte';

	/* Projection Component Items */
	type Item = { label: string; value: number };
	const componentItems: Item[] = [
		{ label: 'Population', value: 1 },
		{ label: 'Births', value: 2 },
		{ label: 'Deaths', value: 3 },
		{ label: 'Net Flow', value: 4 }
	];

	/* Projection Component Items */
	const projectionItems: Item[] = [
		{ label: '5 Year (2022 - based)', value: 1 },
		{ label: '10 Year (2022 - based)', value: 2 },
		{ label: '15 Year (2022 - based)', value: 3 }
	];

	/* Borough Items */
	const boroughItems: Item[] = [
		{ label: 'All London', value: 1 },
		{ label: 'Borough 1', value: 2 },
		{ label: 'Borough 2', value: 3 }
	];

	/* Ward Items */
	const wardItems: Item[] = [
		{ label: 'Ward 0', value: 1 },
		{ label: 'Ward 1', value: 2 },
		{ label: 'Ward 2', value: 3 }
	];

	$: selectedYear = writable(2024);
</script>

<SidebarSection>
	<SidebarGroup title="Projections">
		<Select items={componentItems} label="Component" id="example-input-1" />
		<Select items={projectionItems} label="Projection" id="example-input-2" />
	</SidebarGroup>
	<SidebarGroup title="Projection Area">
		<Select items={boroughItems} label="Borough" id="example-input-3" />
		<Select items={wardItems} label="Ward" id="example-input-4" disabled />
	</SidebarGroup>

	<SidebarGroup title="Year">
		<InputWrapper label={`${$selectedYear}`} id="yearSlider">
			<input
				type="range"
				id="yearSlider"
				name="Year"
				min="2011"
				max="2050"
				style="width: 100%;"
				class="form-range"
				bind:value={$selectedYear}
			/>
		</InputWrapper>
	</SidebarGroup>
</SidebarSection>
