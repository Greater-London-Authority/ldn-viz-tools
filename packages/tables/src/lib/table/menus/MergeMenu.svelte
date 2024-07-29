<script lang="ts">
	import GroupIcon from './GroupIcon.svelte';
	import PopoverMenu from './PopoverMenu.svelte';
	import Grouping from './Grouping.svelte';

	export let table;
	export let col;

	// TODO: set icon based on whether filter applied
	// TODO: position better
</script>

<PopoverMenu>
	<svelte:fragment slot="trigger">
		<GroupIcon class="w-[18px] h-[18px] ml-0.5" />
		<span class="sr-only">Open Popover</span>
	</svelte:fragment>

	<h2 class="text-large font-bold">Aggregate Values</h2>

	<Grouping
		fieldName={col.short_label}
		groups={col.groups}
		onGroupingsChanged={() => table.setMerged()}
	/>
</PopoverMenu>
