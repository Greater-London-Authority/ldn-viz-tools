<script lang="ts">
		import { ArrowRightIcon } from '@rgossiaux/svelte-heroicons/solid';

	import { classNames } from '../utils/classNames';

	export let href = '';
	export let newWindow = false;
</script>

<a
	{href}
	target={newWindow ? '_blank' : '_self'}
	rel={newWindow ? 'noopener noreferrer' : ''}
	class={classNames(
		'bg-core-grey-700 hover:bg-core-grey-800 text-white',
		'dark:bg-core-grey-200 dark:group dark:hover:bg-core-grey-300 dark:text-black',
		'group transition h-full flex flex-col max-w-xl'
	)}
>
	<div class="p-4 max-w-xl h-full">
		<slot name="body" />
	</div>
	<div
		class={classNames(
			'bg-core-grey-800 group-hover:bg-core-blue-600',
			'dark:bg-core-grey-300 group-hover:bg-core-blue-600',
			'p-4 mt-4 flex justify-between  transition'
		)}
	>
		<slot name="footer" />
		<ArrowRightIcon class="h-6 w-6" />
	</div>
</a>
