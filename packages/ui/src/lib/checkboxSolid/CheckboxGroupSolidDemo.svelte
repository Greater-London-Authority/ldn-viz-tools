<script lang="ts">
	// N.B. This story has been extracted into a separate component because each Story is wrapped by a snippet; this would capture the `customOverlay()` snippet, preventing it from being accessed in the `<script>` section and added to the  objects in the `optionsWithCustomOverlay` array.

	import Overlay from '../overlay/Overlay.svelte';
	import CheckboxGroupSolid from './CheckboxGroupSolid.svelte';

	let selectedOptions: string[] = $state(['bus', 'underground']);

	let optionsForGroup = [
		{ id: 'bus', name: 'bus', label: 'Bus stops' },
		{
			id: 'train',
			name: 'train',
			label: 'Train stations',
			hint: 'Excluding underground stations'
		},
		{ id: 'underground', name: 'underground', label: 'Underground stations' },
		{ id: 'taxi', name: 'taxi', label: 'Taxi ranks', disabled: true }
	];
</script>

{#snippet customOverlay()}
	<Overlay
		overlayType="modal"
		modalTitle="Modal title"
		modalDescription="This is a modal description"
	>
		This is the modal content
	</Overlay>
{/snippet}

<CheckboxGroupSolid
	options={optionsForGroup}
	bind:selectedOptions
	ariaLabel="Select transport methods"
	label="Transport method"
	{customOverlay}
/>
<p class="text-color-text-muted mt-4">
	selectedOptions: {JSON.stringify(selectedOptions)}
</p>
