<script lang="ts">
	import { setContext } from 'svelte';
	import { writable, type Writable } from 'svelte/store';

	export let height = "";

	export let selectedValue: string | undefined = undefined;
	export let collapsed = false;

	const val: Writable<string> = writable(selectedValue);
	val.subscribe((newVal) => (selectedValue = newVal));
	setContext('selectedValue', {
		selectedValue: val
	});

	const isCollapsed: Writable<boolean> = writable(collapsed);
	isCollapsed.subscribe((newVal) => (collapsed = newVal));
	setContext('collapsed', {
		collapsed: isCollapsed
	});
</script>

<div
	id="sidebar"
	class="bg-core-grey-800 h-screen flex"
	style={`height: ${height ? height : '100vh'}`}
	class:collapsed
	class:expanded={!collapsed}
>
	<slot />
</div>

<style>
	.expanded {
		width: calc(408px + 80px);
	}

	.collapsed {
		width: 80px;
		overflow-x: hidden;
	}
</style>
