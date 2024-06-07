<script lang="ts">
	import Scaffolding from './Scaffolding.svelte';

	export let table;
</script>

<Scaffolding>
	<svelte:fragment slot="dataColumns">
		{#each table.colGroups as colGroup}
			<div colspan={1 + colGroup.endCol - colGroup.startCol} class="flex flex-col font-bold was-th">
				<!-- TODO: fix width by replacing colGroup -->
				<div role="cell" tabindex="0" class="flex flex-col">
					<div class="flex items-end pt-2 -mb-2">
						<div class="text-center w-full"><span class="capitalize">{colGroup.label}</span></div>
					</div>
				</div>
			</div>
		{/each}
	</svelte:fragment>
</Scaffolding>
