<script lang="ts">
	import { Plus } from '@steeze-ui/heroicons';
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

	let selected: Record<string, boolean> = {};

	let catName = '';
	const createCat = () => {
		groups.grouped[catName] = Object.keys(selected).filter((name) => selected[name]);
		groups.ungrouped = groups.ungrouped.filter((name) => !selected[name]);

		selected = {};
		catName = '';

		onGroupingsChanged();
	};

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

	let numCheckedCategories = 0;
	$: numCheckedCategories = Object.values(selected).filter((d) => d).length;

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

	let newGroupName = 'New Category';
	$: {
		let i = 0;
		const allGroupNames = Object.keys(groups.grouped);

		while (allGroupNames.includes(newGroupName)) {
			i++;
			newGroupName = `New Category ${i}`;
		}
	}
</script>

<div class="flex flex-col gap-4">
	<div class="flex flex-col gap-1 w-96">
		<HelpText>Merge selected values</HelpText>

		<div class="flex gap-1">
			<label for="category-name">New name:</label>
			<input id="category-name" class="form-input h-5 w-36" bind:value={catName} />
			<Button
				disabled={!catName}
				on:click={createCat}
				class="h-5 leading-5 py-0 items-center text-base"
			>
				<Icon src={Plus} theme="solid" class="w-4 h-4 mr-2" aria-hidden="true" />
				Create
			</Button>
		</div>
	</div>

	<div class="flex flex-col gap-1 w-96">
		<HelpText>Or drag a value to the drop-zone below.</HelpText>

		<div
			class="border-core-green-600 border-2 black p-2 flex items-center"
			on:dragover={(ev) => dragOver(ev, newGroupName)}
			on:dragleave={(ev) => dragLeave()}
			on:dragenter={(ev) => ev.preventDefault()}
			on:drop={(ev) => dragDrop(ev, newGroupName)}
			class:currentDropTarget={draggedOverGroup === newGroupName}
		>
			<Icon src={Plus} theme="solid" class="w-4 h-4 mr-2" aria-hidden="true" />
			Drag value here to create new category
		</div>
	</div>

	<div class="flex flex-col gap-1 w-96">
		<span class="font-bold">Un-merged values:</span>
		<ul
			class="list-none"
			on:dragover={(ev) => dragOver(ev, '')}
			on:dragleave={(ev) => dragLeave()}
			on:dragenter={(ev) => ev.preventDefault()}
			on:drop={dropOutOfGroup}
			class:currentDropTarget={draggedOverGroup === ''}
		>
			{#each groups.ungrouped as val}
				<li
					class="pl-2 cursor-grab hover:bg-core-blue-500 hover:p-1"
					draggable="true"
					data-id={val}
					on:dragstart={(ev) => dragStart(ev, '')}
				>
					<input type="checkbox" bind:checked={selected[val]} />
					{val}
				</li>
			{/each}
		</ul>
	</div>

	<ul class="list-none">
		{#each Object.keys(groups.grouped) as groupName}
			<li
				class="pt-4 pl-2"
				on:dragover={(ev) => dragOver(ev, groupName)}
				on:dragleave={(ev) => dragLeave()}
				on:dragenter={(ev) => ev.preventDefault()}
				on:drop={(ev) => dragDrop(ev, groupName)}
				class:currentDropTarget={draggedOverGroup === groupName}
			>
				<div class="flex flex-col gap-1">
					<div>
						<input
							on:change={(ev) => {
								if (ev.target && !renameGroup(groupName, ev.target.value)) {
									ev.target.value = groupName;
								}
							}}
							value={groupName}
							class="border-0 padding-0 font-bold width-fit"
						/>
						<Button on:click={() => deleteCat(groupName)} variant="text" size="sm">Delete</Button>
					</div>
					<HelpText>Click on name on edit</HelpText>
				</div>

				<ul class="list-none">
					{#each groups.grouped[groupName] as val}
						<li
							data-id={val}
							draggable="true"
							class="cursor-grab hover:bg-core-blue-500 hover:p-1"
							on:dragstart={(ev) => dragStart(ev, groupName)}
						>
							{val}
							<Button
								on:click={() => removeFromCat(groupName, val)}
								variant="text"
								size="sm"
								class="h-5 leading-5 py-0"
								>-
							</Button>
						</li>
					{/each}
				</ul>
			</li>
		{/each}
	</ul>
</div>

<style>
	.currentDropTarget {
		@apply border-2 border-dashed border-core-blue-600;
		@apply pb-4;
	}
</style>
