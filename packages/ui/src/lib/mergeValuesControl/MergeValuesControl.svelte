<script lang="ts">
	import { Minus, Plus, Trash } from '@steeze-ui/heroicons';
	import { Icon } from '@steeze-ui/svelte-icon';

	import Button from '../button/Button.svelte';
	import HelpText from './HelpText.svelte';

	type Grouping = {
		grouped: {
			[groupName: string]: string[];
		};
		ungrouped: string[];
	};

	export let groups: Grouping = { ungrouped: [], grouped: {} };
	export let onGroupingsChanged = () => null;

	const deleteCat = (catName: string) => {
		groups.ungrouped = [...groups.ungrouped, ...groups.grouped[catName]];
		delete groups.grouped[catName];

		onGroupingsChanged();
	};

	const removeFromCat = (catName: string, name: string) => {
		if (!groups.ungrouped.includes(name)) {
			groups.ungrouped = [...groups.ungrouped, name];
		}
		groups.grouped[catName] = groups.grouped[catName].filter((d) => d !== name);

		if (groups.grouped[catName].length === 0) {
			delete groups.grouped[catName];
		}

		onGroupingsChanged();
	};

	const addToCat = (catName: string, name: string) => {
		groups.ungrouped = groups.ungrouped.filter((d) => d !== name);

		// create new group if necessary
		if (!groups.grouped[catName]) {
			groups.grouped[catName] = [];
		}

		if (!groups.grouped[catName].includes(name)) {
			groups.grouped = {
				...groups.grouped,
				[catName]: [...groups.grouped[catName], name]
			};
		}

		onGroupingsChanged();
	};

	const renameGroup = (oldCatName: string, newCatName: string) => {
		if (groups.grouped[newCatName]) {
			return false;
		} else {
			groups.grouped[newCatName] = groups.grouped[oldCatName];
			delete groups.grouped[oldCatName];
			onGroupingsChanged();
			return true;
		}
	};

	let draggedOverGroup: string | undefined;

	const dragOver = (ev: DragEvent, groupName: string) => {
		ev.preventDefault();
		draggedOverGroup = groupName;
	};

	const dragLeave = () => {
		//   ev.preventDefault();
		draggedOverGroup = undefined;
	};

	const dragDrop = (ev: DragEvent, groupName: string) => {
		ev.preventDefault();

		if (!ev.dataTransfer) {
			return;
		}

		const valName = ev.dataTransfer.getData('valName');

		// if in existing group, remove from that first
		const oldGroupName = ev.dataTransfer.getData('groupDraggedFrom');
		if (oldGroupName) {
			removeFromCat(oldGroupName, valName);
		}

		addToCat(groupName, valName);

		draggedOverGroup = undefined;
	};

	///
	const dragStart = (ev: DragEvent, groupName: string) => {
		if (!ev.dataTransfer) {
			return;
		}

		ev.dataTransfer.setData('groupDraggedFrom', groupName);
		ev.dataTransfer.setData('valName', (ev.target as HTMLElement)?.dataset?.id ?? '');
	};

	const dropOutOfGroup = (ev: DragEvent) => {
		// We were dropped on the list of elements that don't belong to a group
		ev.preventDefault();

		if (!ev.dataTransfer) {
			return;
		}

		const groupDraggedFrom = ev.dataTransfer.getData('groupDraggedFrom');
		if (groupDraggedFrom) {
			removeFromCat(groupDraggedFrom, ev.dataTransfer.getData('valName'));
		}
		draggedOverGroup = undefined;
	};

	let newGroupName = 'Unnamed Category';
	$: {
		let i = 0;
		const allGroupNames = Object.keys(groups.grouped);

		while (allGroupNames.includes(newGroupName)) {
			i++;
			newGroupName = `Unnamed Category ${i}`;
		}
	}
</script>

<div class="flex flex-col gap-4 text-color-text-primary">
	<HelpText>
		Drag and drop to assign values to categories; not all values need to be assigned to a category.
		Click on category name to edit.
	</HelpText>

	<div class="flex flex-col gap-1 w-96">
		<span class="font-bold">Values not assigned to a category:</span>
		<ul
			class="list-none"
			on:dragover={(ev) => dragOver(ev, '')}
			on:dragleave={() => dragLeave()}
			on:dragenter={(ev) => ev.preventDefault()}
			on:drop={dropOutOfGroup}
			class:currentDropTarget={draggedOverGroup === ''}
		>
			{#each groups.ungrouped as val}
				<li
					class="pl-2 cursor-grab hover:bg-color-input-background-hover"
					draggable="true"
					data-id={val}
					on:dragstart={(ev) => dragStart(ev, '')}
					aria-grabbed="true"
					aria-dropeffect="move"
				>
					{val}
				</li>
			{/each}
		</ul>
	</div>

	<div class="flex flex-col gap-1 w-96">
		<div
			class="border-core-green-600 border-2 black p-2 flex items-center"
			on:dragover={(ev) => dragOver(ev, newGroupName)}
			on:dragleave={(ev) => dragLeave()}
			on:dragenter={(ev) => ev.preventDefault()}
			on:drop={(ev) => dragDrop(ev, newGroupName)}
			class:currentDropTarget={draggedOverGroup === newGroupName}
			role="none"
		>
			<Icon src={Plus} theme="solid" class="w-4 h-4 mr-2" aria-hidden="true" />
			New category
		</div>
	</div>

	<ul class="list-none">
		{#each Object.keys(groups.grouped) as groupName}
			<li
				class="pt-4 pl-2"
				on:dragover={(ev) => dragOver(ev, groupName)}
				on:dragleave={() => dragLeave()}
				on:dragenter={(ev) => ev.preventDefault()}
				on:drop={(ev) => dragDrop(ev, groupName)}
				class:currentDropTarget={draggedOverGroup === groupName}
			>
				<div class="flex flex-col gap-1">
					<div class="flex">
						<input
							on:change={(ev) => {
								if (ev.target && !renameGroup(groupName, ev.target.value)) {
									ev.target.value = groupName;
								}
							}}
							value={groupName}
							class="border-0 padding-0 font-bold width-fit"
						/>
						<Button
							on:click={() => deleteCat(groupName)}
							variant="text"
							size="sm"
							title="Click to delete this category."
						>
							<Icon src={Trash} theme="solid" class="w-4 h-4 mr-2" aria-hidden="true" />
						</Button>
					</div>
				</div>

				<ul class="list-none">
					{#each groups.grouped[groupName] as val}
						<li
							data-id={val}
							draggable="true"
							class="cursor-grab hover:bg-color-input-background-hover flex"
							on:dragstart={(ev) => dragStart(ev, groupName)}
						>
							<Button
								on:click={() => removeFromCat(groupName, val)}
								variant="text"
								size="sm"
								class="h-5 leading-5 py-0"
								title="Click to remove value from category"
							>
								<Icon src={Minus} theme="solid" class="w-4 h-4 mr-2" aria-hidden="true" />
							</Button>

							{val}
						</li>
					{/each}
				</ul>
			</li>
		{/each}
	</ul>
</div>

<style lang="postcss">
	.currentDropTarget {
		@apply border-2 border-dashed border-color-action-primary-active;
	}
</style>
