<script lang="ts">
	import { MergeValuesControl, Popover } from '@ldn-viz/ui';
	import GroupIcon from './GroupIcon.svelte';

	export let table;
	export let col;

	// TODO: set icon based on whether filter applied
	// TODO: position better
</script>

<Popover>
	<svelte:fragment slot="hint">
		<GroupIcon class="w-[18px] h-[18px] ml-0.5" />
		<span class="sr-only">Open Popover</span>
	</svelte:fragment>

	<h2 class="text-large font-bold">Aggregate Values</h2>

	<MergeValuesControl groups={col.groups} onGroupingsChanged={() => table.setMerged()} />
</Popover>
