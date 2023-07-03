<script>
	import Menu from '@rgossiaux/svelte-heroicons/solid/Menu';
	import { isSidebarOpen } from './sidebar-state.js'

	const toggleSidebar = () => isSidebarOpen.update((isOpen) => !isOpen)
</script>

<div class="w-12 h-12 flex justify-center items-center cursor-pointer bg-core-grey-800">
	<Menu class="h-8 w-8 mb-1 text-white" aria-hidden="true" on:click={toggleSidebar}/>
</div>