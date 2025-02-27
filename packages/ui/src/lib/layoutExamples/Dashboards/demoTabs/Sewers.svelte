<script>
	import { writable } from 'svelte/store';
	import CheckboxGroup from '../../../checkBox/CheckboxGroup.svelte';
	import Overlay from '../../../overlay/Overlay.svelte';
	import SidebarGroup from '../../../sidebar/elements/sidebarSection/SidebarGroup.svelte';
	import SidebarGroupTitle from '../../../sidebar/elements/sidebarSection/sidebarGroupTitle/SidebarGroupTitle.svelte';
	import SidebarSection from '../../../sidebar/elements/sidebarSection/SidebarSection.svelte';
	import { currentTheme } from '../../../theme/themeStore';

	const selectedSewerLayer = writable(['sewer-combined']);
	const selectedSewerOverflowLayer = writable(['sewer_overflows_48hrs_yes']);

	// Color the checkboxes based on theme
	$: theme = $currentTheme;

	$: sewerGroup = [
		{
			id: 'sewer-combined',
			label: 'Combined Sewer',
			color: theme.color.data.categorical.orange
		},
		{
			id: 'sewer-separate',
			label: 'Separate Sewer',
			color: theme.color.data.secondary
		}
	];

	$: sewerOverflowGroup = [
		{
			id: 'sewer_overflows_48hrs_yes',
			label: 'Yes (In past 48 hours)',
			color: theme.color.data.categorical.red
		},
		{
			id: 'sewer_overflows_48hrs_no',
			label: 'No (In past 48 hours)',
			color: theme.color.data.categorical.green
		},
		{
			id: 'sewer_overflows_offline',
			label: 'Offline',
			color: theme.color.data.categorical.grey
		}
	];
</script>

<SidebarSection title="This is the sewer section title">
	Some further instructions
	<SidebarGroup>
		<SidebarGroupTitle>
			Sewer Type group title
			<Overlay slot="hint" overlayType="modal" modalTitle="Modal Title">This is a modal.</Overlay>
		</SidebarGroupTitle>

		<CheckboxGroup options={sewerGroup} bind:selectedOptions={$selectedSewerLayer} />
	</SidebarGroup>
</SidebarSection>
<SidebarSection>
	<SidebarGroup>
		<SidebarGroupTitle>
			Sewer Overflows
			<Overlay slot="hint" overlayType="modal" modalTitle="Modal Title">This is a modal.</Overlay>
		</SidebarGroupTitle>
		<CheckboxGroup
			options={sewerOverflowGroup}
			bind:selectedOptions={$selectedSewerOverflowLayer}
		/>
	</SidebarGroup>
</SidebarSection>
