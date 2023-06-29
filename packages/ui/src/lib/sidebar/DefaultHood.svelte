<script>
	import Menu from '@rgossiaux/svelte-heroicons/solid/Menu';
	import { isSidebarOpen } from './sidebar-state.js'

	const toggleSidebar = () => isSidebarOpen.update((isOpen) => !isOpen)
</script>

<div class="default-hood">
	<Menu class="h-5 w-5 mb-1 text-white" aria-hidden="true" on:click={toggleSidebar}/>
</div>

<style>
	.default-hood {
		display: flex;
		justify-content: center;
		align-items: center;

		height: 40px;
		width: 40px;

		cursor: pointer;

		background: #1b2021;
	}
</style>
