<script>
	import { writable } from 'svelte/store';
	import CheckboxGroup from '../../../checkBox/CheckboxGroup.svelte';
	import Overlay from '../../../overlay/Overlay.svelte';
	import SidebarGroup from '../../../sidebar/elements/sidebarSection/SidebarGroup.svelte';
	import SidebarGroupTitle from '../../../sidebar/elements/sidebarSection/sidebarGroupTitle/SidebarGroupTitle.svelte';
	import SidebarSection from '../../../sidebar/elements/sidebarSection/SidebarSection.svelte';
	import { theme } from '../../../theme/themeState.svelte';

	const selectedSewerLayer = writable(['sewer-combined']);
	const selectedSewerOverflowLayer = writable(['sewer_overflows_48hrs_yes']);

	let sewerGroup = $derived([
		{
			id: 'sewer-combined',
			label: 'Combined Sewer',
			color: theme.currentMode.data.categorical.orange
		},
		{
			id: 'sewer-separate',
			label: 'Separate Sewer',
			color: theme.currentMode.data.secondary
		}
	]);

	let sewerOverflowGroup = $derived([
		{
			id: 'sewer_overflows_48hrs_yes',
			label: 'Yes (In past 48 hours)',
			color: theme.currentMode.data.categorical.red
		},
		{
			id: 'sewer_overflows_48hrs_no',
			label: 'No (In past 48 hours)',
			color: theme.currentMode.data.categorical.green
		},
		{
			id: 'sewer_overflows_offline',
			label: 'Offline',
			color: theme.currentMode.data.categorical.grey
		}
	]);
</script>

<SidebarSection title="This is the sewer section title">
	Some further instructions
	<SidebarGroup>
		<SidebarGroupTitle>
			Sewer Type group title
			{#snippet hint()}
				<Overlay overlayType="modal" modalTitle="Modal Title">This is a modal.</Overlay>
			{/snippet}
		</SidebarGroupTitle>

		<CheckboxGroup options={sewerGroup} bind:selectedOptions={$selectedSewerLayer} />
	</SidebarGroup>
</SidebarSection>
<SidebarSection>
	<SidebarGroup>
		<SidebarGroupTitle>
			Sewer Overflows
			{#snippet hint()}
				<Overlay overlayType="modal" modalTitle="Modal Title">This is a modal.</Overlay>
			{/snippet}
		</SidebarGroupTitle>
		<CheckboxGroup
			options={sewerOverflowGroup}
			bind:selectedOptions={$selectedSewerOverflowLayer}
		/>
	</SidebarGroup>
</SidebarSection>
